/**
 * Data Storage & Business Logic Manager
 * Light Excel Theme, Fresh Zero Initial Data, Receivables Integration & Category Reporting
 */

const STORAGE_KEYS = {
    DAYS: 'clinic_exp_days_v6_clean',
    CATEGORIES: 'clinic_exp_categories_v6',
    STAFF: 'clinic_exp_staff_v6',
    SETTINGS: 'clinic_exp_settings_v6',
    INITIALIZED: 'clinic_exp_initialized_v6_clean'
};

const DEFAULT_STAFF_LIST = [
    { id: 'staff_1', name: 'S.Naeem', role: 'Staff / Admin' },
    { id: 'staff_2', name: 'Ammar', role: 'Management' },
    { id: 'staff_3', name: 'Noman', role: 'Staff' },
    { id: 'staff_4', name: 'Naveed', role: 'Staff' },
    { id: 'staff_5', name: 'Baig sb', role: 'Doctor / Specialist' },
    { id: 'staff_6', name: 'Bilal MR', role: 'Representative' },
    { id: 'staff_7', name: 'Komal', role: 'Staff' },
    { id: 'staff_8', name: 'Amir Shah', role: 'Staff' },
    { id: 'staff_9', name: 'Adnan', role: 'Staff' },
    { id: 'staff_10', name: 'Abu Sufyan', role: 'Staff' },
    { id: 'staff_11', name: 'Eisha', role: 'Staff' },
    { id: 'staff_12', name: 'Shakila', role: 'Staff' },
    { id: 'staff_13', name: 'Driver K', role: 'Logistics' },
    { id: 'staff_14', name: 'Abbas (Swp)', role: 'Support' },
    { id: 'staff_15', name: 'Latif (Swp)', role: 'Support' },
    { id: 'staff_16', name: 'NS LHV', role: 'LHV' }
];

const DEFAULT_CATEGORIES = {
    expense: [
        { id: 'store_med_purchases', name: 'Store Med Purchases', code: 'SMP', system: true },
        { id: 'dispensary_purchases', name: 'Dispensary Purchases', code: 'DP', system: true },
        { id: 'clinic_expenses', name: 'Clinic Expenses', code: 'CE', system: true },
        { id: 'lb_expenses', name: 'LB Expenses', code: 'LBE', system: true },
        { id: 'home_expenses', name: 'Home Expenses', code: 'HE', system: true },
        { id: 'us_expenses', name: 'US Exp', code: 'USE', system: true },
        { id: 'dental_expenses', name: 'Dental Exp', code: 'DE', system: true },
        { id: 'store_expenses', name: 'Store Exp', code: 'SE', system: true },
        { id: 'receivables', name: 'Receivables', code: 'REC', system: true },
        { id: 'staff_vendors', name: 'Staff & Vendors', code: 'SV', system: true }
    ],
    income: [
        { id: 'daraz_cash', name: 'Daraz Cash', code: 'DC', system: true },
        { id: 'clinic_pt_disp_inc', name: 'Clinic Pt + Dispensary Inc', code: 'CPDI', system: true },
        { id: 'lb_inc', name: 'LB (Lab) Income', code: 'LBI', system: true },
        { id: 'us_inc', name: 'US (Ultrasound) Income', code: 'USI', system: true },
        { id: 'st_s', name: 'St S (Store Sale)', code: 'STS', system: true },
        { id: 'ecg', name: 'ECG Income', code: 'ECG', system: true }
    ],
    partners: [
        { id: 'partner_zk', name: 'ZK', type: 'debit' },
        { id: 'partner_kh', name: 'KH', type: 'debit' },
        { id: 'partner_bp', name: 'BP', type: 'debit' },
        { id: 'total_cash_available', name: 'Total Cash Available', type: 'debit' }
    ]
};

class ClinicDataManager {
    constructor() {
        this.days = {};
        this.categories = DEFAULT_CATEGORIES;
        this.staffList = DEFAULT_STAFF_LIST;
        this.settings = {
            clinicName: 'Clinic & Medical Store',
            currency: 'Rs.'
        };
        this.init();
    }

    init() {
        const isInit = localStorage.getItem(STORAGE_KEYS.INITIALIZED);

        if (!isInit) {
            // Fresh clean start with zeroes as requested by user!
            this.clearToZero();
            this.categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
            this.staffList = JSON.parse(JSON.stringify(DEFAULT_STAFF_LIST));
            this.saveAll();
            localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
        } else {
            try {
                this.days = JSON.parse(localStorage.getItem(STORAGE_KEYS.DAYS)) || {};
                Object.keys(this.days).forEach(k => {
                    this.days[k] = this.cleanDayItemNames(this.days[k]);
                });
                this.categories = JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES)) || DEFAULT_CATEGORIES;
                this.staffList = JSON.parse(localStorage.getItem(STORAGE_KEYS.STAFF)) || DEFAULT_STAFF_LIST;
                this.settings = JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS)) || this.settings;
            } catch (e) {
                console.error('Error loading localStorage:', e);
                this.clearToZero();
            }
        }
    }

    clearToZero() {
        this.days = {};
        // Generate blank 0-days for 01 through 31
        for (let i = 1; i <= 31; i++) {
            const strDay = String(i).padStart(2, '0');
            const dateKey = `2026-09-${strDay}`;
            const blankDay = this.createBlankDay(dateKey);
            this.days[strDay] = blankDay;
            this.days[dateKey] = blankDay;
        }
        this.saveAll();
    }

    cleanDayItemNames(dayData) {
        if (!dayData) return dayData;
        const standardDebits = [
            'store med purchases', 'dispensary purchases', 'clinic expenses',
            'lb expenses', 'home expenses', 'us exp', 'dental exp', 'store exp',
            'receivables', 'zk', 'kh', 'bp', 'total cash available'
        ];
        if (dayData.debits) {
            dayData.debits = dayData.debits.filter(d => {
                const n = (d.name || '').trim().toLowerCase();
                return n !== 'kam hisab' && n !== 'kam_hisab';
            });
            dayData.debits.forEach(d => {
                const n = (d.name || '').trim().toLowerCase();
                if (!standardDebits.includes(n)) {
                    d.isCustom = true;
                }
            });
        }
        const standardCredits = [
            'daraz cash', 'clinic pt + dispensary inc', 'lb', 'us', 'st s', 'ecg'
        ];
        if (dayData.credits) {
            dayData.credits = dayData.credits.filter(c => {
                const n = (c.name || '').trim().toLowerCase();
                return n !== 'darex credit' && n !== 'darex_credit';
            });
            dayData.credits.forEach(c => {
                const n = (c.name || '').trim().toLowerCase();
                if (!standardCredits.includes(n)) {
                    c.isCustom = true;
                }
            });
        }
        if (!dayData.snExpenseDetails) dayData.snExpenseDetails = [];
        this.syncStaffPaymentsWithDebits(dayData);
        return dayData;
    }

    syncStaffPaymentsWithDebits(dayData) {
        if (!dayData) return dayData;
        if (!dayData.staffPayments) dayData.staffPayments = {};

        const staffList = this.getStaffList();
        staffList.forEach(staff => {
            const sName = staff.name.trim();
            const sNameLower = sName.toLowerCase();

            // Find all matching debit rows
            const matchingDebits = (dayData.debits || []).filter(d => {
                if (d.staffRef && d.staffRef.trim().toLowerCase() === sNameLower) return true;
                const dName = (d.name || '').trim().toLowerCase();
                if (dName === sNameLower) return true;
                if (dName.startsWith(sNameLower + ' ') || dName.startsWith(sNameLower + '(') || dName.startsWith(sNameLower + '-') || dName.startsWith(sNameLower + ':')) return true;
                return false;
            });

            if (matchingDebits.length > 0) {
                const totalAmt = matchingDebits.reduce((acc, d) => acc + (parseFloat(d.amount) || 0), 0);
                const reasons = matchingDebits.map(d => {
                    if (d.reason) return d.reason;
                    const m = (d.name || '').match(/\(([^)]+)\)/);
                    return m ? m[1] : '';
                }).filter(Boolean).join(', ');

                const currentP = dayData.staffPayments[sName];
                const oldReason = typeof currentP === 'object' && currentP?.reason ? currentP.reason : '';

                dayData.staffPayments[sName] = {
                    amount: totalAmt,
                    reason: reasons || oldReason || 'Staff payment'
                };
            } else {
                // If there are no matching debit rows, any previous payment is reset to 0
                if (dayData.staffPayments[sName] !== undefined) {
                    const currentAmt = typeof dayData.staffPayments[sName] === 'number'
                        ? dayData.staffPayments[sName]
                        : (dayData.staffPayments[sName]?.amount || 0);
                    if (currentAmt > 0) {
                        dayData.staffPayments[sName] = {
                            amount: 0,
                            reason: typeof dayData.staffPayments[sName] === 'object' && dayData.staffPayments[sName]?.reason
                                ? dayData.staffPayments[sName].reason
                                : ''
                        };
                    }
                }
            }
        });

        return dayData;
    }

    syncDebitFromStaffPayment(dayData, staffName, newAmt, reason = '') {
        if (!dayData) return;
        if (!dayData.debits) dayData.debits = [];
        const sName = staffName.trim();
        const sNameLower = sName.toLowerCase();

        let deb = dayData.debits.find(d => {
            if (d.staffRef && d.staffRef.trim().toLowerCase() === sNameLower) return true;
            const dName = (d.name || '').trim().toLowerCase();
            return dName === sNameLower || dName.startsWith(sNameLower + ' ') || dName.startsWith(sNameLower + '(') || dName.startsWith(sNameLower + '-');
        });

        if (newAmt > 0) {
            const displayName = reason ? `${sName} (${reason})` : `${sName} (Payment)`;
            if (deb) {
                deb.amount = newAmt;
                deb.name = displayName;
                deb.staffRef = sName;
                deb.isCustom = true;
            } else {
                let targetIdx = dayData.debits.findIndex(d => {
                    const n = (d.name || '').trim().toLowerCase();
                    return n === 'zk' || n.startsWith('zk ') || n.includes('zk');
                });
                if (targetIdx === -1) {
                    targetIdx = dayData.debits.findIndex(d => {
                        const n = (d.name || '').trim().toLowerCase();
                        return n === 'kh' || n === 'bp' || n.includes('total cash available');
                    });
                }
                if (targetIdx === -1) targetIdx = dayData.debits.length;
                dayData.debits.splice(targetIdx, 0, {
                    name: displayName,
                    amount: newAmt,
                    isCustom: true,
                    staffRef: sName,
                    reason: reason || 'Payment'
                });
            }
        } else {
            // Amount is 0 or removed
            if (deb) {
                deb.amount = 0;
            }
        }
    }

    getPrevDateKey(dateKey) {
        if (!dateKey) return null;
        const str = String(dateKey).trim();
        if (str.includes('-')) {
            const parts = str.split('-');
            if (parts.length === 3) {
                const y = parseInt(parts[0], 10);
                const m = parseInt(parts[1], 10) - 1;
                const d = parseInt(parts[2], 10);
                const dateObj = new Date(y, m, d);
                dateObj.setDate(dateObj.getDate() - 1);
                const ny = dateObj.getFullYear();
                const nm = String(dateObj.getMonth() + 1).padStart(2, '0');
                const nd = String(dateObj.getDate()).padStart(2, '0');
                return `${ny}-${nm}-${nd}`;
            }
        }
        const num = parseInt(str, 10);
        if (!isNaN(num) && num > 1) {
            return String(num - 1).padStart(2, '0');
        }
        return null;
    }

    getNextDateKey(dateKey) {
        if (!dateKey) return null;
        const str = String(dateKey).trim();
        if (str.includes('-')) {
            const parts = str.split('-');
            if (parts.length === 3) {
                const y = parseInt(parts[0], 10);
                const m = parseInt(parts[1], 10) - 1;
                const d = parseInt(parts[2], 10);
                const dateObj = new Date(y, m, d);
                dateObj.setDate(dateObj.getDate() + 1);
                const ny = dateObj.getFullYear();
                const nm = String(dateObj.getMonth() + 1).padStart(2, '0');
                const nd = String(dateObj.getDate()).padStart(2, '0');
                return `${ny}-${nm}-${nd}`;
            }
        }
        const num = parseInt(str, 10);
        if (!isNaN(num) && num >= 1 && num < 31) {
            return String(num + 1).padStart(2, '0');
        }
        return null;
    }

    getExistingDay(dateKey) {
        if (!dateKey) return null;
        if (this.days[dateKey]) {
            return this.days[dateKey];
        }
        if (String(dateKey).startsWith('2026-09-')) {
            const dayNum = String(dateKey).split('-')[2];
            if (this.days[dayNum]) {
                return this.days[dayNum];
            }
        }
        return null;
    }

    syncNextDayDarazCash(currentDateKey, darazCashAmount) {
        const nextDateKey = this.getNextDateKey(currentDateKey);
        if (!nextDateKey) return;

        let nextDay = this.getExistingDay(nextDateKey);
        if (!nextDay) {
            nextDay = this.createBlankDay(nextDateKey);
            this.days[nextDateKey] = nextDay;
        } else {
            if (!Array.isArray(nextDay.credits)) nextDay.credits = [];
            let credItem = nextDay.credits.find(c => (c.name || '').toLowerCase().trim() === 'daraz cash');
            if (credItem) {
                credItem.amount = parseFloat(darazCashAmount) || 0;
            } else {
                nextDay.credits.unshift({ name: 'Daraz Cash', amount: parseFloat(darazCashAmount) || 0, isAuto: false });
            }
            const totalDebit = (nextDay.debits || []).reduce((acc, d) => acc + (parseFloat(d.amount) || 0), 0);
            const totalCredit = (nextDay.credits || []).reduce((acc, c) => acc + (parseFloat(c.amount) || 0), 0);
            if (!nextDay.summary) nextDay.summary = {};
            nextDay.summary.debitTotal = totalDebit;
            nextDay.summary.creditTotal = totalCredit;
            nextDay.summary.difference = totalCredit - totalDebit;
        }

        this.saveDay(nextDateKey, nextDay);
    }

    createBlankDay(dateKey) {
        let initialDarazCash = 0;
        const prevKey = this.getPrevDateKey(dateKey);
        if (prevKey) {
            const prevDay = this.getExistingDay(prevKey);
            if (prevDay && prevDay.summary && prevDay.summary.darazCash !== undefined) {
                initialDarazCash = parseFloat(prevDay.summary.darazCash) || 0;
            }
        }

        return {
            date: dateKey,
            debits: [
                { name: 'Store Med Purchases', amount: 0, isAuto: true },
                { name: 'Dispensary Purchases', amount: 0, isAuto: true },
                { name: 'Clinic Expenses', amount: 0, isAuto: true },
                { name: 'LB Expenses', amount: 0, isAuto: false },
                { name: 'Home Expenses', amount: 0, isAuto: true },
                { name: 'US Exp', amount: 0, isAuto: true },
                { name: 'Dental Exp', amount: 0, isAuto: true },
                { name: 'Store Exp', amount: 0, isAuto: true },
                { name: 'Receivables', amount: 0, isAuto: true },
                { name: 'ZK', amount: 0, isPartner: true },
                { name: 'KH', amount: 0, isPartner: true },
                { name: 'BP', amount: 0, isPartner: true },
                { name: 'Total Cash Available', amount: 0, isCash: true }
            ],
            credits: [
                { name: 'Daraz Cash', amount: initialDarazCash, isAuto: false },
                { name: 'Clinic Pt + Dispensary Inc', amount: 0, isAuto: true },
                { name: 'LB', amount: 0, isAuto: false },
                { name: 'US', amount: 0, isAuto: true },
                { name: 'St S', amount: 0, isAuto: false },
                { name: 'ECG', amount: 0, isAuto: false }
            ],
            dispPurchases: [
                { item: '', amount: 0 },
                { item: '', amount: 0 }
            ],
            storePurchases: [
                { vendor: '', tp: 0, retail: 0 },
                { vendor: '', tp: 0, retail: 0 }
            ],
            clinicExpenseDetails: [
                { item: '', amount: 0 },
                { item: '', amount: 0 }
            ],
            usDetails: [
                { amount: 0 },
                { amount: 0 }
            ],
            cashItems: [
                { item: '', amount: 0 },
                { item: '', amount: 0 }
            ],
            homeExpenseDetails: [
                { item: '', amount: 0 },
                { item: '', amount: 0 }
            ],
            staffPayments: {},
            receivables: [
                { item: '', detail: '', amount: 0 }
            ],
            dentalDetails: [
                { item: '', amount: 0 },
                { item: '', amount: 0 }
            ],
            storeExpenseDetails: [
                { item: '', amount: 0 },
                { item: '', amount: 0 }
            ],
            usExpenseDetails: [
                { item: '', amount: 0 },
                { item: '', amount: 0 }
            ],
            snExpenseDetails: [
                { item: '', amount: 0 },
                { item: '', amount: 0 }
            ],
            clinicBills: [
                { amount: 0 },
                { amount: 0 },
                { amount: 0 },
                { amount: 0 },
                { amount: 0 }
            ],
            summary: {
                debitTotal: 0,
                creditTotal: initialDarazCash,
                difference: initialDarazCash,
                cashTakenAway: 0,
                darazCash: 0,
                totalCash: 0
            }
        };
    }

    saveAll() {
        localStorage.setItem(STORAGE_KEYS.DAYS, JSON.stringify(this.days));
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(this.categories));
        localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(this.staffList));
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(this.settings));
        if (window.cloudSync && typeof window.cloudSync.saveMetaToCloud === 'function') {
            window.cloudSync.saveMetaToCloud(this.categories, this.staffList, this.settings);
        }
    }

    saveDay(dateKey, dayData) {
        dayData = this.cleanDayItemNames(dayData);
        this.days[dateKey] = dayData;
        const m = String(dateKey).match(/\d{4}-\d{2}-(\d{2})/);
        if (m) {
            this.days[m[1]] = dayData;
        }
        localStorage.setItem(STORAGE_KEYS.DAYS, JSON.stringify(this.days));
        if (window.cloudSync && typeof window.cloudSync.saveDayToCloud === 'function') {
            window.cloudSync.saveDayToCloud(dateKey, dayData);
        }
    }

    getDay(dateKey) {
        if (!dateKey) {
            dateKey = new Date().toISOString().split('T')[0];
        }
        let res = null;
        if (this.days[dateKey]) {
            res = JSON.parse(JSON.stringify(this.days[dateKey]));
        } else if (dateKey.startsWith('2026-09-')) {
            const dayNum = dateKey.split('-')[2];
            if (this.days[dayNum]) {
                res = JSON.parse(JSON.stringify(this.days[dayNum]));
            }
        }

        if (!res) {
            res = this.createBlankDay(dateKey);
            this.days[dateKey] = res;
            this.saveDay(dateKey, res);
        }
        return this.cleanDayItemNames(res);
    }

    getCategories() {
        return this.categories;
    }

    addCategory(type, categoryObj) {
        if (!this.categories[type]) this.categories[type] = [];
        const id = 'cat_' + Date.now();
        const newCat = {
            id,
            name: categoryObj.name.trim(),
            code: categoryObj.code ? categoryObj.code.trim().toUpperCase() : '',
            system: false
        };
        this.categories[type].push(newCat);
        this.saveAll();
        return newCat;
    }

    deleteCategory(type, id) {
        if (!this.categories[type]) return false;
        const catObj = this.categories[type].find(c => c.id === id);
        this.categories[type] = this.categories[type].filter(c => c.id !== id);
        if (catObj && catObj.name) {
            const cNameLower = catObj.name.trim().toLowerCase();
            Object.values(this.days).forEach(day => {
                if (!day) return;
                if (type === 'expense' && day.debits) {
                    day.debits = day.debits.filter(d => {
                        const dName = (d.name || '').trim().toLowerCase();
                        return !(d.isCustom && dName === cNameLower);
                    });
                } else if (type === 'income' && day.credits) {
                    day.credits = day.credits.filter(c => {
                        const cName = (c.name || '').trim().toLowerCase();
                        return !(c.isCustom && cName === cNameLower);
                    });
                }
            });
        }
        this.saveAll();
        return true;
    }

    getStaffList() {
        return this.staffList;
    }

    addStaff(staffObj) {
        const id = 'staff_' + Date.now();
        const newStaff = {
            id,
            name: staffObj.name.trim(),
            role: staffObj.role ? staffObj.role.trim() : 'Staff'
        };
        this.staffList.push(newStaff);
        this.saveAll();
        return newStaff;
    }

    deleteStaff(id) {
        const staffObj = this.staffList.find(s => s.id === id);
        this.staffList = this.staffList.filter(s => s.id !== id);
        if (staffObj && staffObj.name) {
            const sName = staffObj.name.trim();
            const sNameLower = sName.toLowerCase();
            Object.values(this.days).forEach(day => {
                if (!day) return;
                if (day.staffPayments && day.staffPayments[sName] !== undefined) {
                    delete day.staffPayments[sName];
                }
                if (day.debits) {
                    day.debits = day.debits.filter(d => {
                        if (d.staffRef && d.staffRef.trim().toLowerCase() === sNameLower) return false;
                        const dName = (d.name || '').trim().toLowerCase();
                        if (d.isCustom && (dName === sNameLower || dName.startsWith(sNameLower + ' ') || dName.startsWith(sNameLower + '(') || dName.startsWith(sNameLower + '-'))) {
                            return false;
                        }
                        return true;
                    });
                }
            });
        }
        this.saveAll();
        return true;
    }

    getDaysForMonth(yearMonthStr = '2026-09') {
        const results = [];
        const parts = yearMonthStr.split('-');
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const daysInMonth = new Date(year, month, 0).getDate();

        for (let i = 1; i <= daysInMonth; i++) {
            const dayStr = String(i).padStart(2, '0');
            const dateKey = `${yearMonthStr}-${dayStr}`;
            let dayData = this.days[dateKey];
            if (!dayData && yearMonthStr === '2026-09' && this.days[dayStr]) {
                dayData = this.days[dayStr];
            }
            if (!dayData) {
                dayData = this.createBlankDay(dateKey);
            }
            results.push({ dayNum: i, dateKey, data: this.cleanDayItemNames(dayData) });
        }
        return results;
    }

    getDaysForRange(startDateStr, endDateStr) {
        const results = [];
        const start = new Date(startDateStr);
        const end = new Date(endDateStr);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return this.getDaysForMonth('2026-09');
        }
        let cur = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        const stop = new Date(end.getFullYear(), end.getMonth(), end.getDate());

        while (cur <= stop) {
            const y = cur.getFullYear();
            const m = String(cur.getMonth() + 1).padStart(2, '0');
            const d = String(cur.getDate()).padStart(2, '0');
            const dateKey = `${y}-${m}-${d}`;
            let dayData = this.days[dateKey];
            if (!dayData && `${y}-${m}` === '2026-09' && this.days[d]) {
                dayData = this.days[d];
            }
            if (!dayData) {
                dayData = this.createBlankDay(dateKey);
            }
            results.push({
                dayNum: parseInt(d, 10),
                monthStr: `${y}-${m}`,
                dateKey,
                data: this.cleanDayItemNames(dayData)
            });
            cur.setDate(cur.getDate() + 1);
        }
        return results;
    }

    getSummaryForDays(days, periodLabel = '') {
        let sumDr = 0, sumCr = 0;
        let sumStoreMedPurchases = 0, sumStoreSalesRetail = 0;
        let sumHomeExp = 0, sumClinicExp = 0, sumUSInc = 0;
        let sumDispInc = 0, sumStSaleThisMonth = 0;
        let sumLBInc = 0, sumLBExp = 0;
        let sumKH = 0, sumZK = 0, sumBP = 0;
        let sumECG = 0, sumCash = 0, sumDispPurchases = 0;
        let sumReceivables = 0, sumUSExp = 0, sumDentalExp = 0, sumStoreExp = 0;
        let sumOthersDebit = 0, sumOthersCredit = 0;
        let sumSNExp = 0;

        const staffTotals = {};
        this.staffList.forEach(s => { staffTotals[s.name] = 0; });

        days.forEach(({ data }) => {
            sumDr += (data.summary?.debitTotal || 0);
            sumCr += (data.summary?.creditTotal || 0);
            sumCash += (data.summary?.cashTakenAway || 0);

            (data.debits || []).forEach(d => {
                const name = (d.name || '').toLowerCase().trim();
                const amt = parseFloat(d.amount) || 0;
                if (name.includes('store med purchase')) sumStoreMedPurchases += amt;
                else if (name.includes('dispensary purchase')) sumDispPurchases += amt;
                else if (name.includes('clinic exp')) sumClinicExp += amt;
                else if (name.includes('lb exp')) sumLBExp += amt;
                else if (name.includes('home exp')) sumHomeExp += amt;
                else if (name.includes('us exp')) sumUSExp += amt;
                else if (name.includes('dental exp')) sumDentalExp += amt;
                else if (name.includes('store exp')) sumStoreExp += amt;
                else if (name.includes('receivable')) sumReceivables += amt;
                else if (name === 'kh') sumKH += amt;
                else if (name === 'zk') sumZK += amt;
                else if (name === 'bp') sumBP += amt;
                else if (name.includes('total cash available')) { /* Cash row */ }
                else {
                    sumOthersDebit += amt;
                }
            });

            (data.credits || []).forEach(c => {
                const name = (c.name || '').toLowerCase().trim();
                const amt = parseFloat(c.amount) || 0;
                if (name.includes('clinic pt') || name.includes('dispensary inc')) sumDispInc += amt;
                else if (name === 'lb' || name.includes('lb inc')) sumLBInc += amt;
                else if (name === 'us' || name.includes('us inc')) sumUSInc += amt;
                else if (name === 'st s' || name.includes('store sale')) sumStSaleThisMonth += amt;
                else if (name === 'ecg') sumECG += amt;
                else if (name.includes('daraz cash')) { /* Daraz cash */ }
                else {
                    sumOthersCredit += amt;
                }
            });

            if (data.snExpenseDetails) {
                data.snExpenseDetails.forEach(sn => {
                    sumSNExp += (parseFloat(sn.amount) || 0);
                });
            }

            if (data.storePurchases) {
                data.storePurchases.forEach(sp => {
                    sumStoreSalesRetail += (sp.retail || 0);
                });
            }

            if (data.staffPayments) {
                Object.entries(data.staffPayments).forEach(([sName, pObj]) => {
                    const amt = typeof pObj === 'number' ? pObj : (pObj?.amount || 0);
                    if (staffTotals[sName] !== undefined) staffTotals[sName] += amt;
                    else staffTotals[sName] = amt;
                });
            }
        });

        const storeProfit = sumStoreSalesRetail - sumStoreMedPurchases;
        const storeGross = storeProfit - sumStoreExp;
        const lbProfit = sumLBInc - sumLBExp;
        const dispGross = sumDispInc - sumDispPurchases;
        const usGross = sumUSInc - sumUSExp;
        let totalSalaries = Object.values(staffTotals).reduce((a, b) => a + b, 0);
        const clinicGross = dispGross - totalSalaries - sumClinicExp;
        const overallGross = clinicGross + usGross;
        const partnersTotal = sumZK + sumKH + sumBP;

        return {
            periodLabel,
            yearMonth: periodLabel,
            daysCount: days.length,
            sumDr,
            sumCr,
            sumStoreMedPurchases,
            sumStoreSalesRetail,
            sumHomeExp,
            sumClinicExp,
            sumUSInc,
            sumDispInc,
            sumStSaleThisMonth,
            sumLBInc,
            sumLBExp,
            sumKH,
            sumZK,
            sumBP,
            sumECG,
            sumCash,
            sumDispPurchases,
            sumReceivables,
            sumUSExp,
            sumDentalExp,
            sumStoreExp,
            sumOthersDebit,
            sumOthersCredit,
            sumSNExp,
            staffTotals,
            totalSalaries,
            storeProfit,
            storeGross,
            lbProfit,
            dispGross,
            usGross,
            clinicGross,
            overallGross,
            partnersTotal
        };
    }

    getMonthlySummary(yearMonthStr = '2026-09') {
        const days = this.getDaysForMonth(yearMonthStr);
        return this.getSummaryForDays(days, yearMonthStr);
    }

    getCategoryReport(categoryKey, startDate, endDate) {
        const rows = [];
        let grandTotal = 0;
        const catKeyLower = categoryKey.toLowerCase();

        const start = startDate ? new Date(startDate) : new Date('2000-01-01');
        const end = endDate ? new Date(endDate) : new Date('2099-12-31');
        end.setHours(23, 59, 59, 999);

        const processedDates = new Set();

        Object.entries(this.days).forEach(([key, dayData]) => {
            if (!dayData) return;

            let dayDate;
            if (dayData.date) {
                dayDate = new Date(dayData.date);
            } else if (/^\d+$/.test(key)) {
                dayDate = new Date(`2026-09-${key.padStart(2, '0')}`);
            } else {
                dayDate = new Date(key);
            }

            if (isNaN(dayDate.getTime())) return;
            if (dayDate < start || dayDate > end) return;

            const formattedDate = dayDate.toISOString().split('T')[0];
            if (processedDates.has(formattedDate)) return;
            processedDates.add(formattedDate);

            // 1. Receivables (User explicitly requested!)
            if (catKeyLower === 'receivables' || catKeyLower === 'rec') {
                if (dayData.receivables && dayData.receivables.length > 0) {
                    dayData.receivables.forEach(r => {
                        if (r.amount > 0) {
                            const partyName = r.item || r.party || 'Party';
                            const detailNote = r.detail || r.reason || '';
                            rows.push({
                                date: formattedDate,
                                category: 'Receivables',
                                item: partyName,
                                description: detailNote ? `${partyName}: ${detailNote}` : `Receivable: ${partyName}`,
                                type: 'Debit (Pending / Due)',
                                amount: r.amount
                            });
                            grandTotal += r.amount;
                        }
                    });
                } else {
                    const match = (dayData.debits || []).find(d => (d.name || '').toLowerCase().includes('receivable'));
                    if (match && match.amount > 0) {
                        rows.push({
                            date: formattedDate,
                            category: 'Receivables',
                            item: 'Receivables',
                            description: 'Total daily receivables',
                            type: 'Debit (Pending / Due)',
                            amount: match.amount
                        });
                        grandTotal += match.amount;
                    }
                }
            }
            // 2. Staff & Vendors (All staff)
            else if (catKeyLower === 'staff_vendors' || catKeyLower === 'staff') {
                if (dayData.staffPayments) {
                    Object.entries(dayData.staffPayments).forEach(([staffName, pObj]) => {
                        const amount = typeof pObj === 'number' ? pObj : (pObj?.amount || 0);
                        const reason = typeof pObj === 'object' && pObj?.reason ? pObj.reason : 'Staff payment';
                        if (amount > 0) {
                            rows.push({
                                date: formattedDate,
                                category: 'Staff & Vendors',
                                item: staffName,
                                description: reason || `Staff payout for ${staffName}`,
                                type: 'Debit (Expense)',
                                amount
                            });
                            grandTotal += amount;
                        }
                    });
                }
            }
            // 3. Specific Staff Member
            else if (catKeyLower.startsWith('staff:')) {
                const targetStaff = categoryKey.replace(/^staff:/i, '').trim().toLowerCase();
                if (dayData.staffPayments) {
                    Object.entries(dayData.staffPayments).forEach(([staffName, pObj]) => {
                        if (staffName.toLowerCase() === targetStaff) {
                            const amount = typeof pObj === 'number' ? pObj : (pObj?.amount || 0);
                            const reason = typeof pObj === 'object' && pObj?.reason ? pObj.reason : 'Payout';
                            if (amount > 0) {
                                rows.push({
                                    date: formattedDate,
                                    category: `Staff: ${staffName}`,
                                    item: staffName,
                                    description: reason || `Payment to ${staffName}`,
                                    type: 'Debit (Expense)',
                                    amount
                                });
                                grandTotal += amount;
                            }
                        }
                    });
                }
            }
            // 4. Store Purchases
            else if (catKeyLower === 'store_purchases' || catKeyLower === 'store_med_purchases') {
                if (dayData.storePurchases && dayData.storePurchases.length > 0) {
                    dayData.storePurchases.forEach(sp => {
                        if (sp.tp > 0) {
                            rows.push({
                                date: formattedDate,
                                category: 'Store Purchases',
                                item: sp.vendor || 'Distributor',
                                description: `Purchase TP: Rs. ${sp.tp} | Retail: Rs. ${sp.retail}`,
                                type: 'Debit (Expense)',
                                amount: sp.tp
                            });
                            grandTotal += sp.tp;
                        }
                    });
                }
            }
            // 5. Store Sales
            else if (catKeyLower === 'st_s' || catKeyLower === 'store_sales') {
                const match = (dayData.credits || []).find(c => (c.name || '').toLowerCase() === 'st s' || (c.name || '').toLowerCase().includes('store sale'));
                if (match && match.amount > 0) {
                    rows.push({
                        date: formattedDate,
                        category: 'Store Sales',
                        item: 'St S (Store Sale)',
                        description: 'Daily Store Medicines Counter Sale',
                        type: 'Credit (Income)',
                        amount: match.amount
                    });
                    grandTotal += match.amount;
                }
            }
            // 6. Dental Expense
            else if (catKeyLower === 'dental_expenses' || catKeyLower === 'dental') {
                if (dayData.dentalDetails && dayData.dentalDetails.length > 0) {
                    dayData.dentalDetails.forEach(dd => {
                        if (dd.amount > 0) {
                            rows.push({
                                date: formattedDate,
                                category: 'Dental Exp',
                                item: dd.item || 'Dental Expense',
                                description: dd.item || 'Dental operating cost',
                                type: 'Debit (Expense)',
                                amount: dd.amount
                            });
                            grandTotal += dd.amount;
                        }
                    });
                } else {
                    const match = (dayData.debits || []).find(d => (d.name || '').toLowerCase().includes('dental'));
                    if (match && match.amount > 0) {
                        rows.push({
                            date: formattedDate,
                            category: 'Dental Exp',
                            item: 'Dental Clinic Expense',
                            description: 'Dental operating cost',
                            type: 'Debit (Expense)',
                            amount: match.amount
                        });
                        grandTotal += match.amount;
                    }
                }
            }
            // 7. Ultrasound (US) Expense & Income
            else if (catKeyLower === 'us_expenses' || catKeyLower === 'us_exp') {
                if (dayData.usExpenseDetails && dayData.usExpenseDetails.length > 0) {
                    dayData.usExpenseDetails.forEach(ue => {
                        if (ue.amount > 0) {
                            rows.push({
                                date: formattedDate,
                                category: 'US Exp',
                                item: ue.item || 'US Expense',
                                description: ue.item || 'Ultrasound expense',
                                type: 'Debit (Expense)',
                                amount: ue.amount
                            });
                            grandTotal += ue.amount;
                        }
                    });
                } else {
                    const match = (dayData.debits || []).find(d => (d.name || '').toLowerCase().includes('us exp'));
                    if (match && match.amount > 0) {
                        rows.push({
                            date: formattedDate,
                            category: 'US Exp',
                            item: 'Ultrasound Expense',
                            description: 'US doctor/department expense',
                            type: 'Debit (Expense)',
                            amount: match.amount
                        });
                        grandTotal += match.amount;
                    }
                }
            }
            else if (catKeyLower === 'us_inc' || catKeyLower === 'us_income') {
                if (dayData.usDetails && dayData.usDetails.length > 0) {
                    dayData.usDetails.forEach(ud => {
                        if (ud.amount > 0) {
                            rows.push({
                                date: formattedDate,
                                category: 'US Income',
                                item: ud.item || 'US Receipt',
                                description: ud.item || 'Patient ultrasound consultation',
                                type: 'Credit (Income)',
                                amount: ud.amount
                            });
                            grandTotal += ud.amount;
                        }
                    });
                } else {
                    const match = (dayData.credits || []).find(c => (c.name || '').toLowerCase() === 'us' || (c.name || '').toLowerCase().includes('us'));
                    if (match && match.amount > 0) {
                        rows.push({
                            date: formattedDate,
                            category: 'US Income',
                            item: 'Ultrasound Income',
                            description: 'Patient ultrasound receipts',
                            type: 'Credit (Income)',
                            amount: match.amount
                        });
                        grandTotal += match.amount;
                    }
                }
            }
            // 8. Clinic Expenses
            else if (catKeyLower === 'clinic_expenses' || catKeyLower === 'clinic_exp') {
                if (dayData.clinicExpenseDetails && dayData.clinicExpenseDetails.length > 0) {
                    dayData.clinicExpenseDetails.forEach(ced => {
                        if (ced.amount > 0) {
                            rows.push({
                                date: formattedDate,
                                category: 'Clinic Expenses',
                                item: ced.item || 'Clinic Petty Item',
                                description: `Clinic Expense: ${ced.item || 'Item'}`,
                                type: 'Debit (Expense)',
                                amount: ced.amount
                            });
                            grandTotal += ced.amount;
                        }
                    });
                }
            }
            // 9. Clinic Pt & Dispensary Income
            else if (catKeyLower === 'clinic_inc' || catKeyLower === 'clinic_pt_disp_inc') {
                if (dayData.clinicBills && dayData.clinicBills.length > 0) {
                    dayData.clinicBills.forEach(cb => {
                        if (cb.amount > 0) {
                            rows.push({
                                date: formattedDate,
                                category: 'Clinic & Disp Income',
                                item: cb.item || 'Clinic Bill',
                                description: cb.item || 'Patient consultation fee',
                                type: 'Credit (Income)',
                                amount: cb.amount
                            });
                            grandTotal += cb.amount;
                        }
                    });
                } else {
                    const match = (dayData.credits || []).find(c => (c.name || '').toLowerCase().includes('clinic pt') || (c.name || '').toLowerCase().includes('dispensary inc'));
                    if (match && match.amount > 0) {
                        rows.push({
                            date: formattedDate,
                            category: 'Clinic & Disp Income',
                            item: 'Clinic Pt + Dispensary Inc',
                            description: 'Dispensary and patient consultations',
                            type: 'Credit (Income)',
                            amount: match.amount
                        });
                        grandTotal += match.amount;
                    }
                }
            }
            // 10. Home Expenses
            else if (catKeyLower === 'home_expenses' || catKeyLower === 'home_exp') {
                if (dayData.homeExpenseDetails && dayData.homeExpenseDetails.length > 0) {
                    dayData.homeExpenseDetails.forEach(hed => {
                        if (hed.amount > 0) {
                            rows.push({
                                date: formattedDate,
                                category: 'Home Expenses',
                                item: hed.item || 'Household Item',
                                description: hed.item || 'Home cash expense',
                                type: 'Debit (Expense)',
                                amount: hed.amount
                            });
                            grandTotal += hed.amount;
                        }
                    });
                }
            }
            // 11. SN Expenses (Independent tracked category)
            else if (catKeyLower === 'sn_expenses' || catKeyLower === 'sn_exp' || catKeyLower === 'sn') {
                if (dayData.snExpenseDetails && dayData.snExpenseDetails.length > 0) {
                    dayData.snExpenseDetails.forEach(sn => {
                        const amt = parseFloat(sn.amount) || 0;
                        if (amt > 0) {
                            rows.push({
                                date: formattedDate,
                                category: 'SN Expenses',
                                item: sn.item || 'SN Expense Item',
                                description: sn.item || 'SN Expense Entry',
                                type: 'SN Expense',
                                amount: amt
                            });
                            grandTotal += amt;
                        }
                    });
                }
            }
            // 12. Partner Withdrawals
            else if (catKeyLower === 'partners') {
                (dayData.debits || []).forEach(d => {
                    const dName = (d.name || '').trim().toUpperCase();
                    if (dName === 'ZK' || dName === 'KH' || dName === 'BP') {
                        if (d.amount > 0) {
                            rows.push({
                                date: formattedDate,
                                category: `Partner (${dName})`,
                                item: dName,
                                description: `Partner account payout: ${dName}`,
                                type: 'Debit (Expense)',
                                amount: d.amount
                            });
                            grandTotal += d.amount;
                        }
                    }
                });
            }
            // 12. Clinic Bills (User Requested)
            else if (catKeyLower === 'clinic_bills') {
                if (dayData.clinicBills && dayData.clinicBills.length > 0) {
                    dayData.clinicBills.forEach((cb, idx) => {
                        if (cb.amount > 0) {
                            rows.push({
                                date: formattedDate,
                                category: 'Clinic Bills',
                                item: cb.item || `Bill #${idx + 1}`,
                                description: `Patient Clinic Bill #${idx + 1}`,
                                type: 'Credit (Income)',
                                amount: cb.amount
                            });
                            grandTotal += cb.amount;
                        }
                    });
                }
            }
            // 13. Store Exp
            else if (catKeyLower === 'store_exp' || catKeyLower === 'store_expenses') {
                if (dayData.storeExpenseDetails && dayData.storeExpenseDetails.length > 0) {
                    dayData.storeExpenseDetails.forEach(se => {
                        if (se.amount > 0) {
                            rows.push({
                                date: formattedDate,
                                category: 'Store Exp',
                                item: se.item || 'Store Expense',
                                description: se.item || 'Store operating expense',
                                type: 'Debit (Expense)',
                                amount: se.amount
                            });
                            grandTotal += se.amount;
                        }
                    });
                } else {
                    const match = (dayData.debits || []).find(d => (d.name || '').toLowerCase().includes('store exp'));
                    if (match && match.amount > 0) {
                        rows.push({
                            date: formattedDate,
                            category: 'Store Exp',
                            item: 'Store Expense',
                            description: 'Store running expense',
                            type: 'Debit (Expense)',
                            amount: match.amount
                        });
                        grandTotal += match.amount;
                    }
                }
            }
            // 14. Dispensary Purchases
            else if (catKeyLower === 'disp_purchases' || catKeyLower === 'dispensary_purchases') {
                if (dayData.dispPurchases && dayData.dispPurchases.length > 0) {
                    dayData.dispPurchases.forEach(dp => {
                        if (dp.amount > 0) {
                            rows.push({
                                date: formattedDate,
                                category: 'Dispensary Purchases',
                                item: dp.item || 'Medicine / Stock',
                                description: dp.item || 'Dispensary procurement',
                                type: 'Debit (Expense)',
                                amount: dp.amount
                            });
                            grandTotal += dp.amount;
                        }
                    });
                }
            }
            // 15. Cash Breakdown
            else if (catKeyLower === 'cash_breakdown') {
                if (dayData.cashItems && dayData.cashItems.length > 0) {
                    dayData.cashItems.forEach(ci => {
                        if (ci.amount > 0) {
                            rows.push({
                                date: formattedDate,
                                category: 'Cash Breakdown',
                                item: ci.item || 'Cash Entry',
                                description: ci.item || 'Cash denomination / source',
                                type: 'Cash / Asset',
                                amount: ci.amount
                            });
                            grandTotal += ci.amount;
                        }
                    });
                }
            }
            // 16. All Debits (All Expenses)
            else if (catKeyLower === 'all_debits' || catKeyLower === 'all_expenses') {
                (dayData.debits || []).forEach(d => {
                    if (d.amount > 0) {
                        rows.push({
                            date: formattedDate,
                            category: d.name,
                            item: d.name,
                            description: 'Daily Expense Item',
                            type: 'Debit (Expense)',
                            amount: d.amount
                        });
                        grandTotal += d.amount;
                    }
                });
            }
            // 17. All Credits (All Incomes)
            else if (catKeyLower === 'all_credits' || catKeyLower === 'all_incomes') {
                (dayData.credits || []).forEach(c => {
                    if (c.amount > 0) {
                        rows.push({
                            date: formattedDate,
                            category: c.name,
                            item: c.name,
                            description: 'Daily Income Receipt',
                            type: 'Credit (Income)',
                            amount: c.amount
                        });
                        grandTotal += c.amount;
                    }
                });
            }
            // 18. All (Complete Ledger Audit)
            else if (catKeyLower === 'all') {
                (dayData.debits || []).forEach(d => {
                    if (d.amount > 0) {
                        rows.push({
                            date: formattedDate,
                            category: d.name,
                            item: d.name,
                            description: 'Expense item',
                            type: 'Debit (Expense)',
                            amount: d.amount
                        });
                        grandTotal += d.amount;
                    }
                });
                (dayData.credits || []).forEach(c => {
                    if (c.amount > 0) {
                        rows.push({
                            date: formattedDate,
                            category: c.name,
                            item: c.name,
                            description: 'Income receipt',
                            type: 'Credit (Income)',
                            amount: c.amount
                        });
                    }
                });
            }
        });

        rows.sort((a, b) => new Date(a.date) - new Date(b.date));

        return {
            categoryKey,
            startDate: startDate || 'All',
            endDate: endDate || 'All',
            count: rows.length,
            grandTotal,
            rows
        };
    }

    loadSeedData() {
        const seed = typeof window !== 'undefined' ? window.EXP_CLINIC_SEED : null;
        if (seed && seed.days) {
            this.days = JSON.parse(JSON.stringify(seed.days));
            this.saveAll();
            return true;
        }
        return false;
    }

    resetToSeed() {
        return this.loadSeedData();
    }

    exportBackupJSON() {
        return JSON.stringify({
            exportedAt: new Date().toISOString(),
            days: this.days,
            categories: this.categories,
            staffList: this.staffList,
            settings: this.settings
        }, null, 2);
    }

    importBackupJSON(jsonStr) {
        try {
            const parsed = JSON.parse(jsonStr);
            if (parsed.days) this.days = parsed.days;
            if (parsed.categories) this.categories = parsed.categories;
            if (parsed.staffList) this.staffList = parsed.staffList;
            if (parsed.settings) this.settings = parsed.settings;
            this.saveAll();
            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
        }
    }
}

window.clinicDB = new ClinicDataManager();
