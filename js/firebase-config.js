/**
 * Firebase Realtime Cloud Sync Configuration & Controller
 * Clinic Expense Book - Multi-Device Live Synchronization
 */

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCNyZ-OxiI_s6RhFJD0B3kfkTdbBqxn9WQ",
  authDomain: "clinic-expense-book.firebaseapp.com",
  projectId: "clinic-expense-book",
  storageBucket: "clinic-expense-book.firebasestorage.app",
  messagingSenderId: "864001587933",
  appId: "1:864001587933:web:4d3e5fe89a073ec3eaf934",
  measurementId: "G-K4ENZZVEDV"
};

class FirebaseSyncManager {
    constructor(config) {
        this.config = config;
        this.app = null;
        this.db = null;
        this.isOnline = false;
        this.isInitialized = false;
        this.statusCallback = null;
        this.dataChangeCallback = null;
        this.init();
    }

    init() {
        if (typeof firebase === 'undefined') {
            console.warn('[Firebase] Firebase SDK not loaded yet.');
            return;
        }

        try {
            if (!firebase.apps.length) {
                this.app = firebase.initializeApp(this.config);
            } else {
                this.app = firebase.app();
            }

            this.db = firebase.firestore();

            // Enable offline persistence for reliable offline clinic usage
            this.db.enablePersistence({ synchronizeTabs: true }).catch((err) => {
                if (err.code === 'failed-precondition') {
                    console.warn('[Firebase] Multiple tabs open, persistence in primary tab.');
                } else if (err.code === 'unimplemented') {
                    console.warn('[Firebase] Current browser does not support offline persistence.');
                }
            });

            this.isInitialized = true;
            this.updateStatus('connected');
            this.setupRealtimeListeners();
            console.log('[Firebase] Cloud sync initialized successfully for project:', this.config.projectId);
        } catch (e) {
            console.error('[Firebase] Initialization error:', e);
            this.updateStatus('error');
        }
    }

    updateStatus(status, detail = '') {
        this.status = status;
        this.statusDetail = detail;
        if (typeof this.statusCallback === 'function') {
            this.statusCallback(status, detail);
        }
    }

    onStatusChange(cb) {
        this.statusCallback = cb;
        if (this.status) cb(this.status, this.statusDetail || '');
    }

    onRemoteDataChange(cb) {
        this.dataChangeCallback = cb;
    }

    setupRealtimeListeners() {
        if (!this.db) return;

        // 1. Listen for Days Collection in real-time
        this.db.collection('days').onSnapshot({ includeMetadataChanges: false }, (snapshot) => {
            if (!snapshot.empty) {
                // Populate all days from Firestore into clinicDB
                let hasChanges = false;
                snapshot.docs.forEach((doc) => {
                    const dateKey = doc.id;
                    const data = doc.data();
                    if (data && clinicDB) {
                        clinicDB.days[dateKey] = data;
                        hasChanges = true;
                    }
                });

                if (hasChanges && clinicDB) {
                    localStorage.setItem('clinic_exp_days_v6_clean', JSON.stringify(clinicDB.days));
                    if (typeof this.dataChangeCallback === 'function') {
                        this.dataChangeCallback('days');
                    }
                }
            } else if (clinicDB && Object.keys(clinicDB.days || {}).length > 0) {
                // Cloud is empty but local has data: seed to cloud!
                console.log('[Firebase] Cloud empty, seeding from local data...');
                this.initialCloudUpload();
            }
            this.updateStatus('connected');
        }, (error) => {
            console.error('[Firebase] Snapshot error on days:', error);
            const msg = error.code === 'permission-denied' 
                ? 'Permission Denied: Start Firestore in Test Mode' 
                : (error.message || 'Connection error');
            this.updateStatus('error', msg);
        });

        // 2. Listen for Metadata (Categories, Staff, Settings)
        this.db.collection('meta').doc('appMeta').onSnapshot((doc) => {
            if (doc.exists && clinicDB) {
                const meta = doc.data();
                let updated = false;
                if (meta.categories && JSON.stringify(meta.categories) !== JSON.stringify(clinicDB.categories)) {
                    clinicDB.categories = meta.categories;
                    localStorage.setItem('clinic_exp_categories_v6', JSON.stringify(meta.categories));
                    updated = true;
                }
                if (meta.staffList && JSON.stringify(meta.staffList) !== JSON.stringify(clinicDB.staffList)) {
                    clinicDB.staffList = meta.staffList;
                    localStorage.setItem('clinic_exp_staff_v6', JSON.stringify(meta.staffList));
                    updated = true;
                }
                if (meta.settings && JSON.stringify(meta.settings) !== JSON.stringify(clinicDB.settings)) {
                    clinicDB.settings = meta.settings;
                    localStorage.setItem('clinic_exp_settings_v6', JSON.stringify(meta.settings));
                    updated = true;
                }
                if (updated && typeof this.dataChangeCallback === 'function') {
                    this.dataChangeCallback('meta');
                }
            }
        }, (error) => {
            console.warn('[Firebase] Snapshot error on meta:', error.message);
        });
    }

    async saveDayToCloud(dateKey, dayData) {
        if (!this.db) return;
        this.updateStatus('syncing');
        try {
            // Clean object of any undefined values for Firestore
            const cleaned = JSON.parse(JSON.stringify(dayData));
            await this.db.collection('days').doc(dateKey).set(cleaned, { merge: true });
            this.updateStatus('connected');
        } catch (e) {
            console.error(`[Firebase] Error saving day ${dateKey} to cloud:`, e);
            const msg = e.code === 'permission-denied' 
                ? 'Permission Denied: Start Firestore in Test Mode' 
                : (e.message || 'Save error');
            this.updateStatus('error', msg);
        }
    }

    async saveMetaToCloud(categories, staffList, settings) {
        if (!this.db) return;
        this.updateStatus('syncing');
        try {
            const payload = {
                categories: JSON.parse(JSON.stringify(categories || {})),
                staffList: JSON.parse(JSON.stringify(staffList || [])),
                settings: JSON.parse(JSON.stringify(settings || {})),
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
            };
            await this.db.collection('meta').doc('appMeta').set(payload, { merge: true });
            this.updateStatus('connected');
        } catch (e) {
            console.error('[Firebase] Error saving metadata to cloud:', e);
            this.updateStatus('offline');
        }
    }

    async initialCloudUpload() {
        if (!this.db || !clinicDB) return;
        // Check if cloud has days already
        try {
            const snap = await this.db.collection('days').limit(1).get();
            if (snap.empty) {
                console.log('[Firebase] Cloud database is empty, uploading local data as seed...');
                this.updateStatus('syncing');
                const batch = this.db.batch();
                let opCount = 0;

                // Upload all local days
                Object.keys(clinicDB.days).forEach(dateKey => {
                    const docRef = this.db.collection('days').doc(dateKey);
                    batch.set(docRef, JSON.parse(JSON.stringify(clinicDB.days[dateKey])));
                    opCount++;
                });

                // Upload meta
                const metaRef = this.db.collection('meta').doc('appMeta');
                batch.set(metaRef, {
                    categories: JSON.parse(JSON.stringify(clinicDB.categories || {})),
                    staffList: JSON.parse(JSON.stringify(clinicDB.staffList || [])),
                    settings: JSON.parse(JSON.stringify(clinicDB.settings || {}))
                });
                opCount++;

                if (opCount > 0) {
                    await batch.commit();
                    console.log(`[Firebase] Initial sync of ${opCount} records completed successfully!`);
                }
                this.updateStatus('connected');
            }
        } catch (e) {
            console.error('[Firebase] Error during initial upload:', e);
        }
    }
}

// Global Cloud Sync instance
let cloudSync = null;
window.addEventListener('DOMContentLoaded', () => {
    if (typeof firebase !== 'undefined') {
        cloudSync = new FirebaseSyncManager(FIREBASE_CONFIG);
        window.cloudSync = cloudSync;
    }
});
