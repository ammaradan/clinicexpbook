/**
 * Main Application Controller & UI Logic
 * Authentic Excel Spreadsheet Experience with Instant Reactive Recalculations
 */

document.addEventListener('DOMContentLoaded', () => {
    function getTodayDateString() {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const todayDateStr = getTodayDateString();

    // Current Active State
    const state = {
        currentDate: todayDateStr,
        currentMonth: todayDateStr.substring(0, 7),
        activeTab: 'daily',
        currentDayData: null,
        masterFilter: { mode: 'month', month: todayDateStr.substring(0, 7), start: '2026-09-01', end: todayDateStr },
        masterSubTab: 'grid', // 'grid' or 'sn_ledger'
        staffFilter: { mode: 'month', month: todayDateStr.substring(0, 7), start: '2026-09-01', end: todayDateStr },
        pnlFilter: { mode: 'month', month: todayDateStr.substring(0, 7), start: '2026-09-01', end: todayDateStr },
        stockFilter: { mode: 'month', month: todayDateStr.substring(0, 7), start: '2026-09-01', end: todayDateStr }
    };

    // ==========================================================
    // SECURITY AUTHENTICATION / APP LOCK SYSTEM
    // ==========================================================
    const SECURITY_STORAGE_KEY = 'clinic_app_security_pin';
    const DEFAULT_PIN = '266270';

    function getStoredPassword() {
        return localStorage.getItem(SECURITY_STORAGE_KEY) || DEFAULT_PIN;
    }

    function setStoredPassword(newPin) {
        localStorage.setItem(SECURITY_STORAGE_KEY, newPin);
    }

    function checkAppLock() {
        const isUnlocked = sessionStorage.getItem('clinic_app_unlocked') === 'true';
        const lockOverlay = document.getElementById('app-lock-screen');
        const pwdInput = document.getElementById('lock-password-input');
        const errorMsg = document.getElementById('lock-error-msg');

        if (!isUnlocked) {
            if (lockOverlay) lockOverlay.style.display = 'flex';
            if (pwdInput) {
                pwdInput.value = '';
                setTimeout(() => pwdInput.focus(), 150);
            }
            if (errorMsg) errorMsg.style.display = 'none';
        } else {
            if (lockOverlay) lockOverlay.style.display = 'none';
        }
    }

    function unlockApp(enteredPassword) {
        const correct = getStoredPassword();
        const lockOverlay = document.getElementById('app-lock-screen');
        const pwdInput = document.getElementById('lock-password-input');
        const errorMsg = document.getElementById('lock-error-msg');
        const lockCard = document.querySelector('.lock-card');

        if (enteredPassword === correct) {
            sessionStorage.setItem('clinic_app_unlocked', 'true');
            if (lockOverlay) lockOverlay.style.display = 'none';
            if (errorMsg) errorMsg.style.display = 'none';
            showToast('System unlocked successfully!', 'success');
            return true;
        } else {
            if (errorMsg) errorMsg.style.display = 'block';
            if (lockCard) {
                lockCard.classList.remove('shake-anim');
                void lockCard.offsetWidth;
                lockCard.classList.add('shake-anim');
            }
            if (pwdInput) {
                pwdInput.value = '';
                pwdInput.focus();
            }
            return false;
        }
    }

    function setupSecurityLock() {
        checkAppLock();

        const loginForm = document.getElementById('app-login-form');
        const pwdInput = document.getElementById('lock-password-input');
        const btnToggle = document.getElementById('btn-toggle-lock-pwd');

        if (loginForm && pwdInput) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                unlockApp(pwdInput.value);
            });
        }

        if (btnToggle && pwdInput) {
            btnToggle.addEventListener('click', () => {
                if (pwdInput.type === 'password') {
                    pwdInput.type = 'text';
                    btnToggle.textContent = '🔒';
                } else {
                    pwdInput.type = 'password';
                    btnToggle.textContent = '👁️';
                }
            });
        }

        const btnLockApp = document.getElementById('btn-lock-app');
        if (btnLockApp) {
            btnLockApp.addEventListener('click', () => {
                sessionStorage.removeItem('clinic_app_unlocked');
                checkAppLock();
                showToast('Application locked.', 'info');
            });
        }
    }

    // DOM Elements
    const elements = {
        tabs: document.querySelectorAll('.tab-btn'),
        views: document.querySelectorAll('.app-view'),
        dateInput: document.getElementById('daily-date-picker'),
        dateBadge: document.getElementById('daily-date-badge'),
        prevDayBtn: document.getElementById('prev-day-btn'),
        nextDayBtn: document.getElementById('next-day-btn'),
        todayBtn: document.getElementById('today-btn'),
        saveDayBtn: document.getElementById('save-day-btn'),
        printDayBtn: document.getElementById('print-day-btn'),

        // Auto Save & Organize Sections Elements
        autoSaveIndicator: document.getElementById('auto-save-indicator'),
        btnOrganizeSections: document.getElementById('btn-organize-sections'),
        hiddenSectionsBadge: document.getElementById('hidden-sections-badge'),
        organizeModal: document.getElementById('organize-sections-modal'),
        closeOrganizeModal: document.getElementById('btn-close-organize-modal') || document.getElementById('close-organize-modal'),
        organizeSectionsList: document.getElementById('organize-sections-list'),
        btnResetSectionsLayout: document.getElementById('btn-reset-layout') || document.getElementById('btn-reset-sections-layout'),
        doneOrganizeModal: document.getElementById('btn-save-organize-modal') || document.getElementById('done-organize-modal'),

        // Top KPIs
        kpiDebit: document.getElementById('kpi-debit-total'),
        kpiCredit: document.getElementById('kpi-credit-total'),
        kpiDiff: document.getElementById('kpi-diff-total'),
        kpiCash: document.getElementById('kpi-cash-total'),
        printSheetDate: document.getElementById('print-sheet-date'),

        // Table bodies on daily sheet
        tbodyDebit: document.getElementById('tbody-debit'),
        tbodyCredit: document.getElementById('tbody-credit'),
        tbodyDispPurch: document.getElementById('tbody-disp-purchases'),
        tbodyStorePurch: document.getElementById('tbody-store-purchases'),
        tbodyClinicExp: document.getElementById('tbody-clinic-exp-details'),
        tbodyUSDetails: document.getElementById('tbody-us-details'),
        tbodyCashItems: document.getElementById('tbody-cash-items'),
        tbodyHomeX: document.getElementById('tbody-home-x-details'),
        tbodyStaffVendors: document.getElementById('tbody-staff-vendors'),
        tbodyReceivables: document.getElementById('tbody-receivables'),
        tbodyDental: document.getElementById('tbody-dental-details'),
        tbodyStoreExp: document.getElementById('tbody-store-exp-details'),
        tbodyUSExp: document.getElementById('tbody-us-exp-details'),
        tbodyClinicBills: document.getElementById('tbody-clinic-bills'),
        tbodySNExp: document.getElementById('tbody-sn-exp-details'),

        // Header and Footer Badges
        badgeDebitTotal: document.getElementById('badge-debit-total'),
        badgeCreditTotal: document.getElementById('badge-credit-total'),
        footerDebitTotal: document.getElementById('footer-debit-total'),
        footerCreditTotal: document.getElementById('footer-credit-total'),

        // Subtotals
        subtotalDispPurch: document.getElementById('subtotal-disp-purch'),
        badgeDispPurchTotal: document.getElementById('badge-disp-purch-total'),
        subtotalStoreTP: document.getElementById('subtotal-store-tp'),
        subtotalStoreRetail: document.getElementById('subtotal-store-retail'),
        badgeStorePurchTP: document.getElementById('badge-store-purch-tp'),
        subtotalClinicExp: document.getElementById('subtotal-clinic-exp'),
        badgeClinicExpTotal: document.getElementById('badge-clinic-exp-total'),
        subtotalUSTotal: document.getElementById('subtotal-us-total'),
        badgeUSTotal: document.getElementById('badge-us-total'),
        subtotalCashTotal: document.getElementById('subtotal-cash-total'),
        badgeCashBreakdownTotal: document.getElementById('badge-cash-breakdown-total'),
        subtotalHomeX: document.getElementById('subtotal-home-x'),
        badgeHomeXTotal: document.getElementById('badge-home-x-total'),
        subtotalStaffVendors: document.getElementById('subtotal-staff-vendors'),
        badgeStaffVendorsTotal: document.getElementById('badge-staff-vendors-total'),
        subtotalReceivables: document.getElementById('subtotal-receivables'),
        badgeReceivablesTotal: document.getElementById('badge-receivables-total'),
        subtotalDentalExp: document.getElementById('subtotal-dental-exp'),
        badgeDentalExpTotal: document.getElementById('badge-dental-exp-total'),
        subtotalStoreExp: document.getElementById('subtotal-store-exp'),
        badgeStoreExpTotal: document.getElementById('badge-store-exp-total'),
        subtotalUSExp: document.getElementById('subtotal-us-exp'),
        badgeUSExpTotal: document.getElementById('badge-us-exp-total'),
        subtotalClinicBills: document.getElementById('subtotal-clinic-bills'),
        badgeClinicBillsTotal: document.getElementById('badge-clinic-bills-total'),
        subtotalSNExp: document.getElementById('subtotal-sn-exp'),
        badgeSNExpTotal: document.getElementById('badge-sn-exp-total'),

        // Bottom Reconciliation Inputs
        inputCashTaken: document.getElementById('input-cash-taken'),
        inputDaraz: document.getElementById('input-daraz'),
        inputDiff: document.getElementById('input-diff'),
        inputTotalCash: document.getElementById('input-total-cash'),
        boxReconStatus: document.getElementById('box-recon-status'),

        // Add row buttons
        btnAddDebitRow: document.getElementById('btn-add-debit-row'),
        btnAddStaffDebitBtn: document.getElementById('btn-add-staff-debit-btn'),
        btnAddCreditRow: document.getElementById('btn-add-credit-row'),
        btnAddDispPurchRow: document.getElementById('btn-add-disp-purch-row'),
        btnAddStoreRow: document.getElementById('btn-add-store-row'),
        btnAddClinicExpRow: document.getElementById('btn-add-clinic-exp-row'),
        btnAddUSRow: document.getElementById('btn-add-us-row'),
        btnAddCashRow: document.getElementById('btn-add-cash-row'),
        btnAddHomeRow: document.getElementById('btn-add-home-row'),
        btnAddRecRow: document.getElementById('btn-add-rec-row'),
        btnAddDentalRow: document.getElementById('btn-add-dental-row'),
        btnAddStoreExpRow: document.getElementById('btn-add-store-exp-row'),
        btnAddUSExpRow: document.getElementById('btn-add-us-exp-row'),
        btnAddBillRow: document.getElementById('btn-add-bill-row'),
        btnAddSNExpRow: document.getElementById('btn-add-sn-exp-row'),

        // Toast
        toastContainer: document.getElementById('toast-container')
    };

    // Auto-Save Management (Debounced 1.5s + Immediate on navigation)
    let autoSaveTimeout = null;

    function updateAutoSaveIndicator(status) {
        if (!elements.autoSaveIndicator) return;
        if (status === 'saving') {
            elements.autoSaveIndicator.textContent = 'Saving...';
            elements.autoSaveIndicator.className = 'auto-save-pill saving';
        } else if (status === 'saved') {
            elements.autoSaveIndicator.textContent = '✓ Saved';
            elements.autoSaveIndicator.className = 'auto-save-pill saved';
        } else {
            elements.autoSaveIndicator.textContent = '✓ Saved';
            elements.autoSaveIndicator.className = 'auto-save-pill';
        }
    }

    function saveCurrentDay(showToastMsg = true) {
        if (autoSaveTimeout) {
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = null;
        }
        if (state.currentDayData) {
            clinicDB.saveDay(state.currentDate, state.currentDayData);
            if (state.currentDayData.summary && state.currentDayData.summary.darazCash !== undefined) {
                clinicDB.syncNextDayDarazCash(state.currentDate, state.currentDayData.summary.darazCash);
            }
            updateAutoSaveIndicator('saved');
            if (showToastMsg) {
                showToast('Day sheet saved successfully!', 'success');
            }
        }
    }

    function scheduleAutoSave() {
        updateAutoSaveIndicator('saving');
        if (autoSaveTimeout) clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(() => {
            saveCurrentDay(false);
        }, 1500);
    }

    function setupAutoSaveListener() {
        const viewport = document.getElementById('excel-sheet-viewport');
        if (viewport) {
            viewport.addEventListener('input', () => {
                scheduleAutoSave();
            });
            viewport.addEventListener('change', () => {
                scheduleAutoSave();
            });
        }
    }

    // ==========================================================
    // AUTO-ZERO ON BACKSPACE / DELETE / CLEAR FOR ALL AMOUNT INPUTS
    // ==========================================================
    function setupAutoZeroNumberInputs() {
        let isSelfUpdating = false;

        function handleAutoZero(target, shouldSelect = false) {
            if (!target || target.readOnly || target.disabled) return;
            if (!target.matches('input[type="number"], .num-input, .recon-excel-input')) return;

            if (target.value === '' || target.value === null || isNaN(parseFloat(target.value))) {
                isSelfUpdating = true;
                target.value = '0';
                if (shouldSelect) {
                    try {
                        target.select();
                    } catch (_) {}
                }
                // Dispatch input event to trigger calculations and save
                target.dispatchEvent(new Event('input', { bubbles: false }));
                isSelfUpdating = false;
            }
        }

        // 1. When user backspaces or deletes content (input event)
        document.addEventListener('input', (e) => {
            if (isSelfUpdating) return;
            const target = e.target;
            if (!target || target.readOnly || target.disabled) return;
            if (!target.matches('input[type="number"], .num-input, .recon-excel-input')) return;

            if (target.value === '' || target.value === null) {
                handleAutoZero(target, true);
            }
        }, true);

        // 2. Also listen on keyup for Backspace / Delete
        document.addEventListener('keyup', (e) => {
            if (isSelfUpdating) return;
            if (e.key === 'Backspace' || e.key === 'Delete') {
                const target = e.target;
                if (!target || target.readOnly || target.disabled) return;
                if (!target.matches('input[type="number"], .num-input, .recon-excel-input')) return;

                if (target.value === '' || target.value === null) {
                    handleAutoZero(target, true);
                }
            }
        }, true);

        // 3. On focus: auto-select 0 so typing a new number replaces it immediately without needing to delete first
        document.addEventListener('focus', (e) => {
            const target = e.target;
            if (!target || target.readOnly || target.disabled) return;
            if (!target.matches('input[type="number"], .num-input, .recon-excel-input')) return;

            if (target.value === '0' || target.value === '0.00' || parseFloat(target.value) === 0) {
                setTimeout(() => {
                    try {
                        target.select();
                    } catch (_) {}
                }, 10);
            }
        }, true);

        // 4. On blur: ensure cell is never left blank
        document.addEventListener('blur', (e) => {
            const target = e.target;
            if (!target || target.readOnly || target.disabled) return;
            if (!target.matches('input[type="number"], .num-input, .recon-excel-input')) return;

            if (target.value.trim() === '' || isNaN(parseFloat(target.value))) {
                handleAutoZero(target, false);
            }
        }, true);
    }

    // ==========================================================
    // EXCEL SPREADSHEET 2D KEYBOARD ARROW NAVIGATION (UP/DOWN/LEFT/RIGHT/ENTER)
    // ==========================================================
    function setupSpreadsheetArrowNavigation() {
        function focusAndSelect(target) {
            if (!target) return;
            target.focus();
            try {
                if (target.select) target.select();
            } catch (_) {}
        }

        document.addEventListener('keydown', (e) => {
            if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(e.key)) return;

            const input = e.target;
            if (!input || (!input.classList.contains('cell-input') && !input.classList.contains('recon-excel-input'))) return;

            // Handle bottom reconciliation inputs
            if (input.classList.contains('recon-excel-input')) {
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const lastCell = document.querySelector('#table-debit tbody tr:last-child .cell-input');
                    if (lastCell) focusAndSelect(lastCell);
                } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'Enter') {
                    const allRecon = Array.from(document.querySelectorAll('.recon-excel-input:not([disabled])'));
                    const rIdx = allRecon.indexOf(input);
                    if (rIdx < allRecon.length - 1) {
                        e.preventDefault();
                        focusAndSelect(allRecon[rIdx + 1]);
                    }
                } else if (e.key === 'ArrowLeft') {
                    const allRecon = Array.from(document.querySelectorAll('.recon-excel-input:not([disabled])'));
                    const rIdx = allRecon.indexOf(input);
                    if (rIdx > 0) {
                        e.preventDefault();
                        focusAndSelect(allRecon[rIdx - 1]);
                    }
                }
                return;
            }

            const tr = input.closest('tr');
            if (!tr) return;

            const tbody = tr.closest('tbody');
            if (!tbody) return;

            const rowInputs = Array.from(tr.querySelectorAll('.cell-input:not([disabled])'));
            const inputIdxInRow = rowInputs.indexOf(input);
            if (inputIdxInRow === -1) return;

            const isNum = input.type === 'number';

            // 1. VERTICAL NAVIGATION: DOWN (ArrowDown or Enter)
            if (e.key === 'ArrowDown' || e.key === 'Enter') {
                e.preventDefault();
                let nextTr = tr.nextElementSibling;
                while (nextTr && (nextTr.tagName !== 'TR' || nextTr.style.display === 'none')) {
                    nextTr = nextTr.nextElementSibling;
                }
                if (nextTr) {
                    const nextRowInputs = Array.from(nextTr.querySelectorAll('.cell-input:not([disabled])'));
                    if (nextRowInputs.length > 0) {
                        const targetIdx = Math.min(inputIdxInRow, nextRowInputs.length - 1);
                        focusAndSelect(nextRowInputs[targetIdx]);
                        return;
                    }
                }

                // If at bottom of current table, try next sub-section module in same column
                const currentMod = tr.closest('.sub-section-module');
                if (currentMod) {
                    let nextMod = currentMod.nextElementSibling;
                    while (nextMod && (!nextMod.classList.contains('sub-section-module') || nextMod.classList.contains('is-user-hidden') || nextMod.style.display === 'none')) {
                        nextMod = nextMod.nextElementSibling;
                    }
                    if (nextMod) {
                        const firstInput = nextMod.querySelector('tbody tr .cell-input:not([disabled])');
                        if (firstInput) {
                            focusAndSelect(firstInput);
                            return;
                        }
                    }
                }

                // If at bottom of column 0 or 1, can navigate down to reconciliation input
                const reconInput = document.getElementById('recon-cash-hand');
                if (reconInput) {
                    focusAndSelect(reconInput);
                }
                return;
            }

            // 2. VERTICAL NAVIGATION: UP (ArrowUp)
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                let prevTr = tr.previousElementSibling;
                while (prevTr && (prevTr.tagName !== 'TR' || prevTr.style.display === 'none')) {
                    prevTr = prevTr.previousElementSibling;
                }
                if (prevTr) {
                    const prevRowInputs = Array.from(prevTr.querySelectorAll('.cell-input:not([disabled])'));
                    if (prevRowInputs.length > 0) {
                        const targetIdx = Math.min(inputIdxInRow, prevRowInputs.length - 1);
                        focusAndSelect(prevRowInputs[targetIdx]);
                        return;
                    }
                }

                // If at top of current table, try previous sub-section module in same column
                const currentMod = tr.closest('.sub-section-module');
                if (currentMod) {
                    let prevMod = currentMod.previousElementSibling;
                    while (prevMod && (!prevMod.classList.contains('sub-section-module') || prevMod.classList.contains('is-user-hidden') || prevMod.style.display === 'none')) {
                        prevMod = prevMod.previousElementSibling;
                    }
                    if (prevMod) {
                        const lastInputs = Array.from(prevMod.querySelectorAll('tbody tr .cell-input:not([disabled])'));
                        if (lastInputs.length > 0) {
                            focusAndSelect(lastInputs[lastInputs.length - 1]);
                            return;
                        }
                    }
                }
                return;
            }

            // 3. HORIZONTAL NAVIGATION: RIGHT (ArrowRight)
            if (e.key === 'ArrowRight') {
                const atEnd = isNum || (input.selectionEnd === input.value.length);
                if (atEnd) {
                    // Inside same row: next input
                    if (inputIdxInRow < rowInputs.length - 1) {
                        e.preventDefault();
                        focusAndSelect(rowInputs[inputIdxInRow + 1]);
                        return;
                    }

                    // At end of row: move to adjacent column panel to the right at same row index
                    const currentPanel = tr.closest('.excel-col-panel');
                    if (currentPanel) {
                        let nextPanel = currentPanel.nextElementSibling;
                        while (nextPanel && (!nextPanel.classList.contains('excel-col-panel') || nextPanel.style.display === 'none' || nextPanel.classList.contains('is-empty-col'))) {
                            nextPanel = nextPanel.nextElementSibling;
                        }
                        if (nextPanel) {
                            const trIndex = Array.from(tbody.children).indexOf(tr);
                            const nextTbody = nextPanel.querySelector('tbody');
                            if (nextTbody && nextTbody.children[trIndex]) {
                                const targetInput = nextTbody.children[trIndex].querySelector('.cell-input:not([disabled])');
                                if (targetInput) {
                                    e.preventDefault();
                                    focusAndSelect(targetInput);
                                    return;
                                }
                            }
                            const anyFirstInput = nextPanel.querySelector('tbody tr .cell-input:not([disabled])');
                            if (anyFirstInput) {
                                e.preventDefault();
                                focusAndSelect(anyFirstInput);
                                return;
                            }
                        }
                    }

                    // Otherwise wrap to next row's first input
                    let nextTr = tr.nextElementSibling;
                    if (nextTr) {
                        const nextRowInputs = Array.from(nextTr.querySelectorAll('.cell-input:not([disabled])'));
                        if (nextRowInputs.length > 0) {
                            e.preventDefault();
                            focusAndSelect(nextRowInputs[0]);
                        }
                    }
                }
                return;
            }

            // 4. HORIZONTAL NAVIGATION: LEFT (ArrowLeft)
            if (e.key === 'ArrowLeft') {
                const atStart = isNum || (input.selectionStart === 0 && input.selectionEnd === 0);
                if (atStart) {
                    // Inside same row: previous input
                    if (inputIdxInRow > 0) {
                        e.preventDefault();
                        focusAndSelect(rowInputs[inputIdxInRow - 1]);
                        return;
                    }

                    // At start of row: move to adjacent column panel to the left at same row index
                    const currentPanel = tr.closest('.excel-col-panel');
                    if (currentPanel) {
                        let prevPanel = currentPanel.previousElementSibling;
                        while (prevPanel && (!prevPanel.classList.contains('excel-col-panel') || prevPanel.style.display === 'none' || prevPanel.classList.contains('is-empty-col'))) {
                            prevPanel = prevPanel.previousElementSibling;
                        }
                        if (prevPanel) {
                            const trIndex = Array.from(tbody.children).indexOf(tr);
                            const prevTbody = prevPanel.querySelector('tbody');
                            if (prevTbody && prevTbody.children[trIndex]) {
                                const rowInputsInPrev = Array.from(prevTbody.children[trIndex].querySelectorAll('.cell-input:not([disabled])'));
                                if (rowInputsInPrev.length > 0) {
                                    e.preventDefault();
                                    focusAndSelect(rowInputsInPrev[rowInputsInPrev.length - 1]);
                                    return;
                                }
                            }
                            const allInputsInPrev = Array.from(prevPanel.querySelectorAll('tbody tr .cell-input:not([disabled])'));
                            if (allInputsInPrev.length > 0) {
                                e.preventDefault();
                                focusAndSelect(allInputsInPrev[allInputsInPrev.length - 1]);
                                return;
                            }
                        }
                    }

                    // Otherwise wrap to previous row's last input
                    let prevTr = tr.previousElementSibling;
                    if (prevTr) {
                        const prevRowInputs = Array.from(prevTr.querySelectorAll('.cell-input:not([disabled])'));
                        if (prevRowInputs.length > 0) {
                            e.preventDefault();
                            focusAndSelect(prevRowInputs[prevRowInputs.length - 1]);
                        }
                    }
                }
                return;
            }
        });
    }

    // ==========================================================
    // CLOUD SYNC UI & REALTIME REMOTE REFRESH
    // ==========================================================
    function setupCloudSyncUI() {
        const pill = document.getElementById('cloud-sync-pill');
        if (!pill) return;

        if (window.cloudSync) {
            window.cloudSync.onStatusChange((status, detail) => {
                if (status === 'connected') {
                    pill.textContent = '🟢 Cloud Synced';
                    pill.title = 'Realtime Multi-Device Cloud Sync Active';
                    pill.style.background = 'rgba(16, 185, 129, 0.12)';
                    pill.style.color = '#059669';
                    pill.style.borderColor = 'rgba(16, 185, 129, 0.25)';
                } else if (status === 'syncing') {
                    pill.textContent = '🔄 Syncing...';
                    pill.title = 'Saving updates to cloud...';
                    pill.style.background = 'rgba(56, 189, 248, 0.12)';
                    pill.style.color = '#0284c7';
                    pill.style.borderColor = 'rgba(56, 189, 248, 0.25)';
                } else if (status === 'offline') {
                    pill.textContent = '🟡 Offline Mode';
                    pill.title = 'Working offline. Changes will sync when online.';
                    pill.style.background = 'rgba(245, 158, 11, 0.12)';
                    pill.style.color = '#d97706';
                    pill.style.borderColor = 'rgba(245, 158, 11, 0.25)';
                } else {
                    pill.textContent = detail && detail.includes('Permission') ? '🔴 Permission Error' : '🔴 Cloud Error';
                    pill.title = detail || 'Firestore Database not enabled or permission denied in Firebase Console.';
                    pill.style.background = 'rgba(239, 68, 68, 0.12)';
                    pill.style.color = '#dc2626';
                    pill.style.borderColor = 'rgba(239, 68, 68, 0.25)';
                }
            });

            window.cloudSync.onRemoteDataChange((type) => {
                showToast('Cloud data synced in real-time!', 'info');
                if (type === 'meta' || type === 'all' || type === 'days') {
                    applySectionsLayout();
                    applyCollapsedSections();
                    applyCustomSectionTitles();
                }
                if (state.activeTab === 'daily') {
                    loadDay(state.currentDate);
                } else if (state.activeTab === 'master') {
                    renderMasterGrid();
                } else if (state.activeTab === 'staff') {
                    renderStaffMatrix();
                } else if (state.activeTab === 'pnl') {
                    renderPnL();
                } else if (state.activeTab === 'stock') {
                    renderStockReconciliationView();
                } else if (state.activeTab === 'reports') {
                    renderCategoryReports();
                } else if (state.activeTab === 'settings') {
                    renderSettings();
                }
            });

            // Perform initial seed upload if cloud is clean
            setTimeout(() => {
                if (window.cloudSync) window.cloudSync.initialCloudUpload();
            }, 1200);
        } else {
            pill.textContent = '☁️ Local Storage';
        }
    }

    // Boot App
    function init() {
        localStorage.removeItem('clinic_col_widths');
        setupSecurityLock();
        setupNavigation();
        setupDateControls();
        setupCollapsibleSections();
        setupSectionReorderingAndVisibility();
        applyCustomSectionTitles();
        setupAutoSaveListener();
        setupAddRowButtons();
        setupAutoZeroNumberInputs();
        setupSpreadsheetArrowNavigation();
        setupCloudSyncUI();
        loadDay(state.currentDate);
        renderSettings();
    }

    // Navigation Tabs
    function setupNavigation() {
        elements.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetViewId = tab.dataset.view;
                switchTab(targetViewId);
            });
        });

        const quickStockBtn = document.getElementById('btn-quick-stock-rec');
        if (quickStockBtn) {
            quickStockBtn.addEventListener('click', () => switchTab('view-stock'));
        }
    }

    function switchTab(viewId) {
        if (state.activeTab === 'daily') {
            saveCurrentDay(false);
        }
        state.activeTab = viewId.replace('view-', '');
        elements.tabs.forEach(t => t.classList.toggle('active', t.dataset.view === viewId));
        elements.views.forEach(v => v.classList.toggle('active', v.id === viewId));

        if (viewId === 'view-daily') {
            loadDay(state.currentDate);
        } else if (viewId === 'view-master') {
            renderMasterGrid();
        } else if (viewId === 'view-staff') {
            renderStaffMatrix();
        } else if (viewId === 'view-pnl') {
            renderPnL();
        } else if (viewId === 'view-stock') {
            renderStockReconciliationView();
        } else if (viewId === 'view-reports') {
            renderCategoryReports();
        } else if (viewId === 'view-settings') {
            renderSettings();
        }
    }

    // ==========================================================
    // COLLAPSIBLE SUB-SECTIONS (Saves collapse state across refresh & print)
    // ==========================================================
    const COLLAPSED_STORAGE_KEY = 'clinic_collapsed_sections_v1';

    function getCollapsedSections() {
        try {
            const saved = localStorage.getItem(COLLAPSED_STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) return parsed;
            }
            if (clinicDB?.settings?.collapsedSections && Array.isArray(clinicDB.settings.collapsedSections)) {
                return clinicDB.settings.collapsedSections;
            }
        } catch (e) {
            console.error('Error reading collapsed sections:', e);
        }
        return [];
    }

    function saveCollapsedSections(collapsedList) {
        try {
            localStorage.setItem(COLLAPSED_STORAGE_KEY, JSON.stringify(collapsedList));
            if (clinicDB && clinicDB.settings) {
                clinicDB.settings.collapsedSections = collapsedList;
                clinicDB.saveAll();
            }
            if (window.cloudSync && typeof window.cloudSync.saveMetaToCloud === 'function') {
                window.cloudSync.saveMetaToCloud(clinicDB?.categories, clinicDB?.staffList, clinicDB?.settings);
            }
        } catch (e) {
            console.error('Error saving collapsed sections:', e);
        }
    }

    function toggleSectionCollapse(h, targetState) {
        const targetId = h.dataset.collapse;
        let body = targetId ? document.getElementById(targetId) : null;
        if (!body) body = h.nextElementSibling;
        if (!body) return;

        const mod = h.closest('.sub-section-module');
        const isCurrentlyCollapsed = body.classList.contains('is-collapsed');
        const willBeCollapsed = (typeof targetState === 'boolean') ? targetState : !isCurrentlyCollapsed;

        if (willBeCollapsed) {
            body.classList.add('is-collapsed');
            h.classList.add('is-collapsed');
            if (mod) mod.classList.add('is-collapsed');
            const icon = h.querySelector('.collapse-icon');
            if (icon) icon.textContent = '▸';
        } else {
            body.classList.remove('is-collapsed');
            h.classList.remove('is-collapsed');
            if (mod) mod.classList.remove('is-collapsed');
            const icon = h.querySelector('.collapse-icon');
            if (icon) icon.textContent = '▾';
        }

        const secId = targetId || (mod ? mod.id : null);
        if (secId) {
            const currentList = new Set(getCollapsedSections());
            if (willBeCollapsed) {
                currentList.add(secId);
            } else {
                currentList.delete(secId);
            }
            saveCollapsedSections(Array.from(currentList));
        }
    }

    function applyCollapsedSections() {
        const collapsedList = getCollapsedSections();
        const set = new Set(collapsedList || []);
        const headers = document.querySelectorAll('.collapsible-header');
        headers.forEach(h => {
            const targetId = h.dataset.collapse;
            const mod = h.closest('.sub-section-module');
            const secId = targetId || (mod ? mod.id : null);
            let body = targetId ? document.getElementById(targetId) : null;
            if (!body) body = h.nextElementSibling;
            if (body && secId) {
                const shouldBeCollapsed = set.has(secId);
                body.classList.toggle('is-collapsed', shouldBeCollapsed);
                h.classList.toggle('is-collapsed', shouldBeCollapsed);
                if (mod) mod.classList.toggle('is-collapsed', shouldBeCollapsed);
                const icon = h.querySelector('.collapse-icon');
                if (icon) icon.textContent = shouldBeCollapsed ? '▸' : '▾';
            }
        });
    }

    function setupCollapsibleSections() {
        const headers = document.querySelectorAll('.collapsible-header');
        headers.forEach(h => {
            if (h.dataset.collapsibleBound) return;
            h.dataset.collapsibleBound = 'true';
            h.style.cursor = 'pointer';
            h.addEventListener('click', (e) => {
                if (e.target.closest('button, input, select, .drag-handle')) return;
                toggleSectionCollapse(h);
            });
        });

        // Apply saved collapse states on initial load
        applyCollapsedSections();
    }

    // ==========================================================
    // RE-ARRANGEABLE & HIDE/UNHIDE SUB-SECTIONS SYSTEM
    // ==========================================================
    const SECTIONS_STORAGE_KEY = 'clinic_sections_layout_v2';
    const COLUMN_ORDER = ['col-2', 'col-3', 'col-4', 'col-5', 'col-6'];

    const DEFAULT_SECTIONS_LAYOUT = {
        columns: {
            'col-2': ['mod-disp-purch', 'mod-store-purch', 'mod-clinic-exp'],
            'col-3': ['mod-us-total', 'mod-cash-breakdown'],
            'col-4': ['mod-home-x', 'mod-staff-vendors'],
            'col-5': ['mod-receivables', 'mod-dental-exp'],
            'col-6': ['mod-store-exp', 'mod-us-exp', 'mod-clinic-bills', 'mod-sn-exp']
        },
        hidden: []
    };

    const SECTION_TITLES_STORAGE_KEY = 'clinic_custom_section_titles';

    const DEFAULT_SECTION_TITLES = {
        'mod-disp-purch': 'Dispensary Purchases',
        'mod-store-purch': 'Store Purchases',
        'mod-clinic-exp': 'Clinic Expenses Details',
        'mod-us-total': 'US Total',
        'mod-cash-breakdown': 'Cash Breakdown',
        'mod-home-x': 'Home X (Expenses)',
        'mod-staff-vendors': 'Staff & Vendors (Name & Reason)',
        'mod-receivables': 'Receivables (Pending / Due)',
        'mod-dental-exp': 'Dental Exp',
        'mod-store-exp': 'Store Exp',
        'mod-us-exp': 'US Exp',
        'mod-clinic-bills': 'Clinic Bills',
        'mod-sn-exp': 'SN Expenses'
    };

    function getCustomSectionTitles() {
        try {
            const saved = localStorage.getItem(SECTION_TITLES_STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed && typeof parsed === 'object') {
                    return { ...DEFAULT_SECTION_TITLES, ...parsed };
                }
            }
        } catch (e) {
            console.error('Error reading custom section titles:', e);
        }
        return { ...DEFAULT_SECTION_TITLES };
    }

    function saveCustomSectionTitles(titles) {
        localStorage.setItem(SECTION_TITLES_STORAGE_KEY, JSON.stringify(titles));
        if (clinicDB && clinicDB.settings) {
            clinicDB.settings.customSectionTitles = titles;
            clinicDB.saveAll();
        }
        applyCustomSectionTitles();
    }

    function applyCustomSectionTitles() {
        const titles = getCustomSectionTitles();
        Object.keys(DEFAULT_SECTION_TITLES).forEach(modId => {
            const title = titles[modId] || DEFAULT_SECTION_TITLES[modId];
            const mod = document.getElementById(modId);
            if (mod) {
                mod.dataset.title = title;
                const titleSpan = mod.querySelector('.section-title-text');
                if (titleSpan) {
                    titleSpan.textContent = title;
                }
            }
        });
    }

    const SECTION_METADATA = [
        { id: 'mod-disp-purch', title: 'Dispensary Purchases', code: 'DP' },
        { id: 'mod-store-purch', title: 'Store Purchases (Med)', code: 'SP' },
        { id: 'mod-clinic-exp', title: 'Clinic Petty Exp Details', code: 'CE' },
        { id: 'mod-us-total', title: 'US Total (Ultrasound)', code: 'US' },
        { id: 'mod-cash-breakdown', title: 'Cash Breakdown', code: 'CB' },
        { id: 'mod-home-x', title: 'Home X (Personal/House)', code: 'HX' },
        { id: 'mod-staff-vendors', title: 'Staff & Vendors Payments', code: 'SV' },
        { id: 'mod-receivables', title: 'Receivables & Advances', code: 'RC' },
        { id: 'mod-dental-exp', title: 'Dental Exp Details', code: 'DE' },
        { id: 'mod-store-exp', title: 'Store Exp Details', code: 'SE' },
        { id: 'mod-us-exp', title: 'US Exp Details', code: 'UE' },
        { id: 'mod-clinic-bills', title: 'Clinic Bills (Dispensary/PT)', code: 'CB' },
        { id: 'mod-sn-exp', title: 'SN Expenses', code: 'SN' }
    ];

    function getSectionsLayout() {
        try {
            let parsed = null;
            const saved = localStorage.getItem(SECTIONS_STORAGE_KEY);
            if (saved) {
                parsed = JSON.parse(saved);
            } else if (clinicDB?.settings?.sectionsLayout) {
                parsed = clinicDB.settings.sectionsLayout;
            }
            if (parsed && parsed.columns && Array.isArray(parsed.hidden)) {
                // Ensure mod-sn-exp is accounted for
                const allPlaced = Object.values(parsed.columns).flat();
                if (!allPlaced.includes('mod-sn-exp')) {
                    if (!parsed.columns['col-6']) parsed.columns['col-6'] = [];
                    parsed.columns['col-6'].push('mod-sn-exp');
                }
                return parsed;
            }
        } catch (e) {
            console.error('Error reading sections layout:', e);
        }
        return JSON.parse(JSON.stringify(DEFAULT_SECTIONS_LAYOUT));
    }

    function saveSectionsLayout(layout) {
        try {
            localStorage.setItem(SECTIONS_STORAGE_KEY, JSON.stringify(layout));
            if (clinicDB && clinicDB.settings) {
                clinicDB.settings.sectionsLayout = layout;
                clinicDB.saveAll();
            }
            if (window.cloudSync && typeof window.cloudSync.saveMetaToCloud === 'function') {
                window.cloudSync.saveMetaToCloud(clinicDB?.categories, clinicDB?.staffList, clinicDB?.settings);
            }
        } catch (e) {
            console.error('Error saving sections layout:', e);
        }
        updateHiddenSectionsBadge();
    }

    function updateHiddenSectionsBadge() {
        const layout = getSectionsLayout();
        const count = layout.hidden ? layout.hidden.length : 0;
        if (elements.hiddenSectionsBadge) {
            if (count > 0) {
                elements.hiddenSectionsBadge.style.display = 'inline-block';
                elements.hiddenSectionsBadge.textContent = count;
            } else {
                elements.hiddenSectionsBadge.style.display = 'none';
            }
        }
    }

    function applySectionsLayout() {
        const layout = getSectionsLayout();

        // 1. Move modules to their stored columns & positions
        Object.keys(layout.columns).forEach(colId => {
            const container = document.querySelector(`.col-subsections-container[data-col-id="${colId}"]`);
            if (container) {
                const modIds = layout.columns[colId] || [];
                modIds.forEach(modId => {
                    const el = document.getElementById(modId);
                    if (el) {
                        container.appendChild(el);
                    }
                });
            }
        });

        // 2. Apply hidden state to modules
        SECTION_METADATA.forEach(sec => {
            const el = document.getElementById(sec.id);
            if (el) {
                const isHidden = (layout.hidden || []).includes(sec.id);
                if (isHidden) {
                    el.classList.add('is-user-hidden');
                } else {
                    el.classList.remove('is-user-hidden');
                }
            }
        });

        // 3. Dynamically hide any column container that has zero visible modules
        document.querySelectorAll('.col-subsections-container').forEach(col => {
            const visibleModules = col.querySelectorAll('.sub-section-module:not(.is-user-hidden)');
            if (visibleModules.length === 0) {
                col.classList.add('is-empty-col');
            } else {
                col.classList.remove('is-empty-col');
            }
        });

        updateHiddenSectionsBadge();
    }

    function recordCurrentDomLayout() {
        const columns = {};
        const colContainers = document.querySelectorAll('.col-subsections-container[data-col-id]');
        colContainers.forEach(col => {
            const colId = col.dataset.colId;
            columns[colId] = [];
            const mods = col.querySelectorAll('.sub-section-module');
            mods.forEach(m => {
                if (m.id) columns[colId].push(m.id);
            });
            const visibleMods = col.querySelectorAll('.sub-section-module:not(.is-user-hidden)');
            if (visibleMods.length === 0) {
                col.classList.add('is-empty-col');
            } else {
                col.classList.remove('is-empty-col');
            }
        });

        const currentLayout = getSectionsLayout();
        const newLayout = {
            columns: columns,
            hidden: currentLayout.hidden || []
        };
        saveSectionsLayout(newLayout);
        return newLayout;
    }

    function setupSectionReorderingAndVisibility() {
        // Initial layout application
        applySectionsLayout();

        // 1. Module Move Left / Right buttons
        document.querySelectorAll('.btn-move-left').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const mod = btn.closest('.sub-section-module');
                if (!mod) return;
                const parentCol = mod.closest('.col-subsections-container');
                if (!parentCol) return;
                const currentColId = parentCol.dataset.colId;
                const currentIndex = COLUMN_ORDER.indexOf(currentColId);
                if (currentIndex > 0) {
                    const prevColId = COLUMN_ORDER[currentIndex - 1];
                    const prevCol = document.querySelector(`.col-subsections-container[data-col-id="${prevColId}"]`);
                    if (prevCol) {
                        prevCol.appendChild(mod);
                        recordCurrentDomLayout();
                        applySectionsLayout();
                        showToast(`Moved to previous column!`, 'info');
                    }
                } else {
                    showToast('Already in first column!', 'info');
                }
            });
        });

        document.querySelectorAll('.btn-move-right').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const mod = btn.closest('.sub-section-module');
                if (!mod) return;
                const parentCol = mod.closest('.col-subsections-container');
                if (!parentCol) return;
                const currentColId = parentCol.dataset.colId;
                const currentIndex = COLUMN_ORDER.indexOf(currentColId);
                if (currentIndex !== -1 && currentIndex < COLUMN_ORDER.length - 1) {
                    const nextColId = COLUMN_ORDER[currentIndex + 1];
                    const nextCol = document.querySelector(`.col-subsections-container[data-col-id="${nextColId}"]`);
                    if (nextCol) {
                        nextCol.appendChild(mod);
                        recordCurrentDomLayout();
                        applySectionsLayout();
                        showToast(`Moved to next column!`, 'info');
                    }
                } else {
                    showToast('Already in last column!', 'info');
                }
            });
        });

        // 2. Module Hide Button (Eye icon)
        document.querySelectorAll('.btn-hide-sec').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const mod = btn.closest('.sub-section-module');
                if (!mod) return;
                const secTitle = mod.dataset.title || 'Section';
                const layout = getSectionsLayout();
                if (!layout.hidden) layout.hidden = [];
                if (!layout.hidden.includes(mod.id)) {
                    layout.hidden.push(mod.id);
                }
                saveSectionsLayout(layout);
                applySectionsLayout();
                showToast(`Hidden "${secTitle}". Restore anytime from "🗂️ Organize Sections".`, 'info');
            });
        });

        // 3. Drag and Drop between and within columns
        const modules = document.querySelectorAll('.sub-section-module');
        const containers = document.querySelectorAll('.col-subsections-container');

        modules.forEach(mod => {
            mod.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', mod.id);
                e.dataTransfer.effectAllowed = 'move';
                mod.classList.add('is-dragging');
            });

            mod.addEventListener('dragend', () => {
                mod.classList.remove('is-dragging');
                document.querySelectorAll('.drag-over-top, .drag-over-bottom, .col-drag-over').forEach(el => {
                    el.classList.remove('drag-over-top', 'drag-over-bottom', 'col-drag-over');
                });
            });

            mod.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const rect = mod.getBoundingClientRect();
                const isTop = (e.clientY - rect.top) < (rect.height / 2);
                if (isTop) {
                    mod.classList.add('drag-over-top');
                    mod.classList.remove('drag-over-bottom');
                } else {
                    mod.classList.add('drag-over-bottom');
                    mod.classList.remove('drag-over-top');
                }
            });

            mod.addEventListener('dragleave', () => {
                mod.classList.remove('drag-over-top', 'drag-over-bottom');
            });

            mod.addEventListener('drop', (e) => {
                e.preventDefault();
                e.stopPropagation();
                mod.classList.remove('drag-over-top', 'drag-over-bottom');
                const draggedId = e.dataTransfer.getData('text/plain');
                const draggedEl = document.getElementById(draggedId);
                if (!draggedEl || draggedEl === mod) return;

                const rect = mod.getBoundingClientRect();
                const isTop = (e.clientY - rect.top) < (rect.height / 2);
                if (isTop) {
                    mod.parentNode.insertBefore(draggedEl, mod);
                } else {
                    mod.parentNode.insertBefore(draggedEl, mod.nextSibling);
                }
                recordCurrentDomLayout();
                showToast(`Section reordered!`, 'info');
            });
        });

        containers.forEach(col => {
            col.addEventListener('dragover', (e) => {
                e.preventDefault();
                col.classList.add('col-drag-over');
            });

            col.addEventListener('dragleave', (e) => {
                if (e.relatedTarget && col.contains(e.relatedTarget)) return;
                col.classList.remove('col-drag-over');
            });

            col.addEventListener('drop', (e) => {
                col.classList.remove('col-drag-over');
                const draggedId = e.dataTransfer.getData('text/plain');
                const draggedEl = document.getElementById(draggedId);
                if (!draggedEl) return;
                if (e.target === col || !e.target.closest('.sub-section-module')) {
                    col.appendChild(draggedEl);
                    recordCurrentDomLayout();
                    showToast(`Moved section to column!`, 'info');
                }
            });
        });

        // 4. Organize Sections Modal
        function renderOrganizeModalList() {
            if (!elements.organizeSectionsList) return;
            const layout = getSectionsLayout();
            const colTitles = {
                'col-2': 'Col 3 (Purchases/Exp)',
                'col-3': 'Col 4 (US/Cash)',
                'col-4': 'Col 5 (Home/Staff)',
                'col-5': 'Col 6 (Rec/Dental)',
                'col-6': 'Col 7 (Store/Bills)'
            };

            const customTitles = getCustomSectionTitles();
            let html = '';
            SECTION_METADATA.forEach(sec => {
                const isHidden = (layout.hidden || []).includes(sec.id);
                const displayTitle = customTitles[sec.id] || sec.title;
                // Find current column
                let currentCol = 'col-2';
                Object.keys(layout.columns).forEach(cId => {
                    if ((layout.columns[cId] || []).includes(sec.id)) currentCol = cId;
                });

                html += `
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 0.85rem; border-radius: 6px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); gap: 0.75rem;">
                        <label style="display: flex; align-items: center; gap: 0.65rem; cursor: pointer; flex-1; margin: 0; user-select: none;">
                            <input type="checkbox" class="organize-vis-chk" data-mod-id="${sec.id}" ${!isHidden ? 'checked' : ''} style="width: 17px; height: 17px; accent-color: var(--accent-color); cursor: pointer;">
                            <div>
                                <span style="font-weight: 600; font-size: 0.88rem; color: ${isHidden ? 'var(--text-muted)' : 'var(--text-main)'};">${escapeHtml(displayTitle)}</span>
                                <div style="font-size: 0.72rem; color: var(--text-muted);">${escapeHtml(colTitles[currentCol] || currentCol)}</div>
                            </div>
                        </label>
                        <select class="organize-col-select form-input" data-mod-id="${sec.id}" style="width: auto; padding: 0.25rem 0.5rem; font-size: 0.78rem;">
                            <option value="col-2" ${currentCol === 'col-2' ? 'selected' : ''}>Col 3 (Purchases/CE)</option>
                            <option value="col-3" ${currentCol === 'col-3' ? 'selected' : ''}>Col 4 (US/Cash)</option>
                            <option value="col-4" ${currentCol === 'col-4' ? 'selected' : ''}>Col 5 (Home/Staff)</option>
                            <option value="col-5" ${currentCol === 'col-5' ? 'selected' : ''}>Col 6 (Rec/Dental)</option>
                            <option value="col-6" ${currentCol === 'col-6' ? 'selected' : ''}>Col 7 (Store/Bills)</option>
                        </select>
                    </div>
                `;
            });

            elements.organizeSectionsList.innerHTML = html;

            // Visibility checkboxes
            elements.organizeSectionsList.querySelectorAll('.organize-vis-chk').forEach(chk => {
                chk.addEventListener('change', () => {
                    const modId = chk.dataset.modId;
                    const curLayout = getSectionsLayout();
                    if (!curLayout.hidden) curLayout.hidden = [];
                    if (chk.checked) {
                        curLayout.hidden = curLayout.hidden.filter(id => id !== modId);
                    } else {
                        if (!curLayout.hidden.includes(modId)) curLayout.hidden.push(modId);
                    }
                    saveSectionsLayout(curLayout);
                    applySectionsLayout();
                    renderOrganizeModalList();
                });
            });

            // Column selects
            elements.organizeSectionsList.querySelectorAll('.organize-col-select').forEach(sel => {
                sel.addEventListener('change', (e) => {
                    const modId = sel.dataset.modId;
                    const targetColId = e.target.value;
                    const modEl = document.getElementById(modId);
                    const targetCol = document.querySelector(`.col-subsections-container[data-col-id="${targetColId}"]`);
                    if (modEl && targetCol) {
                        targetCol.appendChild(modEl);
                        recordCurrentDomLayout();
                        renderOrganizeModalList();
                        showToast(`Moved to ${targetColId}!`, 'info');
                    }
                });
            });
        }

        if (elements.btnOrganizeSections && elements.organizeModal) {
            const openModal = () => {
                renderOrganizeModalList();
                elements.organizeModal.classList.add('active');
                elements.organizeModal.style.setProperty('display', 'flex', 'important');
            };
            const closeModal = () => {
                elements.organizeModal.classList.remove('active');
                elements.organizeModal.style.setProperty('display', 'none', 'important');
            };

            elements.btnOrganizeSections.addEventListener('click', openModal);

            const closeBtn = document.getElementById('btn-close-organize-modal') || elements.closeOrganizeModal;
            if (closeBtn) closeBtn.addEventListener('click', closeModal);

            const doneBtn = document.getElementById('btn-save-organize-modal') || elements.doneOrganizeModal;
            if (doneBtn) doneBtn.addEventListener('click', closeModal);

            elements.organizeModal.addEventListener('click', (e) => {
                if (e.target === elements.organizeModal) closeModal();
            });

            const resetBtn = document.getElementById('btn-reset-layout') || elements.btnResetSectionsLayout;
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    if (confirm('Reset all sub-sections to their original layout and make all visible?')) {
                        saveSectionsLayout(JSON.parse(JSON.stringify(DEFAULT_SECTIONS_LAYOUT)));
                        saveCollapsedSections([]);
                        applySectionsLayout();
                        document.querySelectorAll('.collapsible-header').forEach(h => {
                            toggleSectionCollapse(h, false);
                        });
                        renderOrganizeModalList();
                        showToast('Sections reset to default layout!', 'success');
                    }
                });
            }
        }
    }

    // Date Controls
    function setupDateControls() {
        elements.dateInput.value = state.currentDate;
        updateDateBadge(state.currentDate);

        elements.dateInput.addEventListener('change', (e) => {
            if (e.target.value) {
                saveCurrentDay(false);
                state.currentDate = e.target.value;
                updateDateBadge(state.currentDate);
                loadDay(state.currentDate);
            }
        });

        elements.prevDayBtn.addEventListener('click', () => changeDay(-1));
        elements.nextDayBtn.addEventListener('click', () => changeDay(1));
        if (elements.todayBtn) {
            elements.todayBtn.addEventListener('click', () => {
                saveCurrentDay(false);
                const today = getTodayDateString();
                state.currentDate = today;
                elements.dateInput.value = state.currentDate;
                updateDateBadge(state.currentDate);
                loadDay(state.currentDate);
            });
        }

        elements.saveDayBtn.addEventListener('click', () => {
            saveCurrentDay(true);
        });

        elements.printDayBtn.addEventListener('click', () => {
            window.print();
        });
    }

    function changeDay(offset) {
        saveCurrentDay(false);
        const parts = state.currentDate.split('-');
        const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        d.setDate(d.getDate() + offset);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        state.currentDate = `${year}-${month}-${day}`;
        elements.dateInput.value = state.currentDate;
        updateDateBadge(state.currentDate);
        loadDay(state.currentDate);
    }

    function updateDateBadge(dateStr) {
        const parts = dateStr.split('-');
        const dayNum = parseInt(parts[2], 10);
        const d = new Date(parts[0], parts[1] - 1, parts[2]);
        const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
        const label = `Day ${String(dayNum).padStart(2, '0')} - ${d.toLocaleDateString('en-GB', options)}`;
        elements.dateBadge.textContent = label;
        state.currentMonth = `${parts[0]}-${parts[1]}`;
        if (elements.printSheetDate) {
            elements.printSheetDate.textContent = `Date: ${d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`;
        }
    }

    // ==========================================================
    // DAILY SHEET: RENDER ALL EXCEL PANELS
    // ==========================================================
    function normalizeDayData(data) {
        if (!data) return;
        if (!Array.isArray(data.dispPurchases) || data.dispPurchases.length === 0) {
            data.dispPurchases = [{ item: '', amount: 0 }, { item: '', amount: 0 }];
        }
        if (!Array.isArray(data.storePurchases) || data.storePurchases.length === 0) {
            data.storePurchases = [{ vendor: '', tp: 0, retail: 0 }, { vendor: '', tp: 0, retail: 0 }];
        }
        if (!Array.isArray(data.clinicExpenseDetails) || data.clinicExpenseDetails.length === 0) {
            data.clinicExpenseDetails = [{ item: '', amount: 0 }, { item: '', amount: 0 }];
        }
        if (!Array.isArray(data.usDetails) || data.usDetails.length === 0) {
            data.usDetails = [{ amount: 0 }, { amount: 0 }];
        }
        if (!Array.isArray(data.cashItems) || data.cashItems.length === 0) {
            data.cashItems = [{ item: '', amount: 0 }, { item: '', amount: 0 }];
        }
        // Clean any legacy placeholder strings in saved data
        if (Array.isArray(data.cashItems)) {
            data.cashItems.forEach(ci => {
                if (ci && typeof ci === 'object' && ci.item && /^Entry\s*#\d+$/i.test(ci.item.trim())) {
                    ci.item = '';
                }
            });
        }
        if (Array.isArray(data.homeExpenseDetails)) {
            data.homeExpenseDetails.forEach(hi => {
                if (hi && typeof hi === 'object' && hi.item && /^Home Item\s*#\d+$/i.test(hi.item.trim())) {
                    hi.item = '';
                }
            });
        }
        if (Array.isArray(data.usDetails)) {
            data.usDetails.forEach(ud => {
                if (ud && typeof ud === 'object' && ud.item && /^Receipt\s*#\d+$/i.test(ud.item.trim())) {
                    ud.item = '';
                }
            });
        }
        if (!Array.isArray(data.homeExpenseDetails) || data.homeExpenseDetails.length === 0) {
            data.homeExpenseDetails = [{ item: '', amount: 0 }, { item: '', amount: 0 }];
        }
        if (!Array.isArray(data.receivables) || data.receivables.length === 0) {
            data.receivables = [{ item: '', detail: '', amount: 0 }];
        }
        if (!Array.isArray(data.dentalDetails) || data.dentalDetails.length === 0) {
            data.dentalDetails = [{ item: '', amount: 0 }, { item: '', amount: 0 }];
        }
        if (!Array.isArray(data.storeExpenseDetails) || data.storeExpenseDetails.length === 0) {
            data.storeExpenseDetails = [{ item: '', amount: 0 }, { item: '', amount: 0 }];
        }
        if (!Array.isArray(data.usExpenseDetails) || data.usExpenseDetails.length === 0) {
            data.usExpenseDetails = [{ item: '', amount: 0 }, { item: '', amount: 0 }];
        }
        if (!Array.isArray(data.clinicBills) || data.clinicBills.length === 0) {
            data.clinicBills = [{ amount: 0 }, { amount: 0 }, { amount: 0 }, { amount: 0 }, { amount: 0 }];
        }
        if (!Array.isArray(data.snExpenseDetails) || data.snExpenseDetails.length === 0) {
            data.snExpenseDetails = [{ item: '', amount: 0 }, { item: '', amount: 0 }];
        }
        if (clinicDB && typeof clinicDB.ensureStandardDebits === 'function') {
            clinicDB.ensureStandardDebits(data);
        }
    }

    function loadDay(dateKey) {
        state.currentDayData = clinicDB.getDay(dateKey);
        normalizeDayData(state.currentDayData);
        clinicDB.syncStaffPaymentsWithDebits(state.currentDayData);

        // Auto-reflect previous day's bottom Daraz Cash if current day's Credit Daraz Cash is 0
        const prevKey = clinicDB.getPrevDateKey(dateKey);
        if (prevKey) {
            const prevDay = clinicDB.getExistingDay(prevKey);
            if (prevDay && prevDay.summary && prevDay.summary.darazCash !== undefined) {
                const prevDaraz = parseFloat(prevDay.summary.darazCash) || 0;
                let credItem = (state.currentDayData.credits || []).find(c => (c.name || '').toLowerCase().trim() === 'daraz cash');
                if (credItem && (credItem.amount === 0 || credItem.amount === undefined) && prevDaraz > 0) {
                    credItem.amount = prevDaraz;
                }
            }
        }

        renderAllPanels();
        recalculateAll();
    }

    function renderAllPanels() {
        const data = state.currentDayData;

        // 1. Debit Column
        renderDebitTable(data);

        // 2. Credit Column
        renderCreditTable(data);

        // 3. Dispensary Purchases
        renderDispPurchasesTable(data);

        // 4. Store Purchases
        renderStorePurchasesTable(data);

        // 5. Clinic Expenses Details
        renderClinicExpDetailsTable(data);

        // 6. US Total
        renderUSTotalTable(data);

        // 7. Cash Breakdown
        renderCashBreakdownTable(data);

        // 8. Home X Details
        renderHomeXTable(data);

        // 9. Staff & Vendors (with Reason column!)
        renderStaffVendorsTable(data);

        // 10. Receivables
        renderReceivablesTable(data);

        // 11. Dental Exp Details
        renderDentalDetailsTable(data);

        // 12. Store Exp Details
        renderStoreExpDetailsTable(data);

        // 13. US Exp Details
        renderUSExpDetailsTable(data);

        // 14. Clinic Bills
        renderClinicBillsTable(data);

        // 15. SN Expenses (Independent tracked category)
        renderSNExpensesTable(data);

        // 16. Reconciliation Inputs
        elements.inputCashTaken.value = data.summary?.cashTakenAway || 0;
        elements.inputDaraz.value = data.summary?.darazCash || 0;

        elements.inputCashTaken.oninput = (e) => {
            data.summary.cashTakenAway = parseFloat(e.target.value) || 0;
            recalculateAll();
        };

        elements.inputDaraz.oninput = (e) => {
            const val = parseFloat(e.target.value) || 0;
            data.summary.darazCash = val;
            recalculateAll();
            clinicDB.syncNextDayDarazCash(state.currentDate, val);
            scheduleAutoSave();
        };
    }

    function confirmDeletion(itemName, onConfirm) {
        const label = itemName ? `"${itemName}"` : 'this entry';
        const msg = `⚠️ Are you sure you want to delete ${label}?\n\nThis will remove the item from today's record. Click OK to confirm or Cancel to keep it.`;
        if (window.confirm(msg)) {
            onConfirm();
        }
    }

    // --- PANEL 1: DEBIT TABLE ---
    function renderDebitTable(data) {
        ensureDebitRowOrder(data);
        elements.tbodyDebit.innerHTML = '';
        (data.debits || []).forEach((item, idx) => {
            const tr = document.createElement('tr');
            const isAuto = item.isAuto;
            tr.innerHTML = `
                <td>
                    ${item.isCustom ? `
                        <div style="display: flex; align-items: center; justify-content: space-between; gap: 4px; width: 100%;">
                            <input type="text" class="cell-input debit-name-input" value="${escapeHtml(item.name)}" style="flex: 1;" placeholder="Expense Category / Payee">
                            <button type="button" class="btn-icon btn-sm del-debit-row-btn no-print" data-index="${idx}" title="Delete Category / Row" style="color: #ef4444; padding: 2px 6px; font-size: 0.75rem; border-radius: 4px; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); cursor: pointer; flex-shrink: 0;">🗑️</button>
                        </div>
                    ` : `<span>${escapeHtml(item.name)}</span>`}
                    ${isAuto ? `<span class="auto-tag">⚡ Auto</span>` : ''}
                </td>
                <td class="num-cell">
                    <input type="number" step="any" class="cell-input num-input debit-amt-input ${isAuto ? 'auto-cell' : ''}" 
                           value="${item.amount || 0}" data-index="${idx}" ${isAuto ? 'readonly' : ''}>
                </td>
            `;

            if (item.isCustom) {
                const nameInp = tr.querySelector('.debit-name-input');
                if (nameInp) {
                    nameInp.addEventListener('input', (e) => {
                        item.name = e.target.value;
                        clinicDB.syncStaffPaymentsWithDebits(data);
                        scheduleAutoSave();
                    });
                }

                const delBtn = tr.querySelector('.del-debit-row-btn');
                if (delBtn) {
                    delBtn.addEventListener('click', () => {
                        const rowName = item.name || 'Expense Category';
                        confirmDeletion(rowName, () => {
                            data.debits.splice(idx, 1);
                            clinicDB.syncStaffPaymentsWithDebits(data);
                            renderDebitTable(data);
                            renderStaffVendorsTable(data);
                            recalculateAll();
                            scheduleAutoSave();
                            showToast(`Deleted "${rowName}"`, 'info');
                        });
                    });
                }
            }

            const amtInput = tr.querySelector('.debit-amt-input');
            if (!isAuto) {
                amtInput.addEventListener('input', (e) => {
                    item.amount = parseFloat(e.target.value) || 0;
                    clinicDB.syncStaffPaymentsWithDebits(data);
                    renderStaffVendorsTable(data);
                    recalculateAll();
                    scheduleAutoSave();
                });
            }
            elements.tbodyDebit.appendChild(tr);
        });
    }

    // --- PANEL 2: CREDIT TABLE ---
    function renderCreditTable(data) {
        elements.tbodyCredit.innerHTML = '';
        (data.credits || []).forEach((item, idx) => {
            const tr = document.createElement('tr');
            const isAuto = item.isAuto;
            const isDarazCash = (item.name || '').toLowerCase().trim() === 'daraz cash';
            tr.innerHTML = `
                <td>
                    ${item.isCustom ? `
                        <div style="display: flex; align-items: center; justify-content: space-between; gap: 4px; width: 100%;">
                            <input type="text" class="cell-input credit-name-input" value="${escapeHtml(item.name)}" style="flex: 1;" placeholder="Income Category">
                            <button type="button" class="btn-icon btn-sm del-credit-row-btn no-print" data-index="${idx}" title="Delete Income Category / Row" style="color: #ef4444; padding: 2px 6px; font-size: 0.75rem; border-radius: 4px; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); cursor: pointer; flex-shrink: 0;">🗑️</button>
                        </div>
                    ` : `<span>${escapeHtml(item.name)}</span>`}
                    ${isAuto ? `<span class="auto-tag">⚡ Auto</span>` : (isDarazCash ? `<span class="auto-tag" style="background: rgba(217, 119, 6, 0.12); color: #d97706; border: 1px solid rgba(217, 119, 6, 0.25); font-size: 0.68rem; padding: 1px 4px; border-radius: 3px; font-weight: 600; margin-left: 4px;" title="Auto-reflected from previous day's bottom Daraz Cash">🔄 Prev Day</span>` : '')}
                </td>
                <td class="num-cell">
                    <input type="number" step="any" class="cell-input num-input credit-amt-input ${isAuto ? 'auto-cell' : ''}" 
                           value="${item.amount || 0}" data-index="${idx}" ${isAuto ? 'readonly' : ''} ${isDarazCash ? 'title="Reflected from previous day\'s bottom Daraz Cash"' : ''}>
                </td>
            `;

            if (item.isCustom) {
                const nameInp = tr.querySelector('.credit-name-input');
                if (nameInp) {
                    nameInp.addEventListener('input', (e) => {
                        item.name = e.target.value;
                        scheduleAutoSave();
                    });
                }

                const delBtn = tr.querySelector('.del-credit-row-btn');
                if (delBtn) {
                    delBtn.addEventListener('click', () => {
                        const rowName = item.name || 'Income Category';
                        confirmDeletion(rowName, () => {
                            data.credits.splice(idx, 1);
                            renderCreditTable(data);
                            recalculateAll();
                            scheduleAutoSave();
                            showToast(`Deleted "${rowName}"`, 'info');
                        });
                    });
                }
            }

            const amtInput = tr.querySelector('.credit-amt-input');
            if (!isAuto) {
                amtInput.addEventListener('input', (e) => {
                    item.amount = parseFloat(e.target.value) || 0;
                    recalculateAll();
                    scheduleAutoSave();
                });
            }
            elements.tbodyCredit.appendChild(tr);
        });
    }

    // --- PANEL 3A: DISPENSARY PURCHASES ---
    function renderDispPurchasesTable(data) {
        elements.tbodyDispPurch.innerHTML = '';
        const list = data.dispPurchases || [];
        list.forEach((item, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="text" class="cell-input dp-item" value="${escapeHtml(item.item || '')}" placeholder="Item description"></td>
                <td class="num-cell" style="padding: 1px 4px;">
                    <div style="display: flex; align-items: center; justify-content: flex-end; gap: 4px;">
                        <input type="number" step="any" class="cell-input num-input dp-amt" value="${item.amount || 0}">
                        <button type="button" class="btn-icon btn-sm del-detail-row-btn no-print" title="Delete Row" style="color: #ef4444; padding: 1px 5px; font-size: 0.72rem; border-radius: 3px; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); cursor: pointer; flex-shrink: 0;">✕</button>
                    </div>
                </td>
            `;
            tr.querySelector('.dp-item').oninput = (e) => {
                item.item = e.target.value;
                scheduleAutoSave();
            };
            tr.querySelector('.dp-amt').oninput = (e) => {
                item.amount = parseFloat(e.target.value) || 0;
                recalculateAll();
                scheduleAutoSave();
            };
            tr.querySelector('.del-detail-row-btn').onclick = () => {
                const name = item.item || 'Dispensary Item';
                confirmDeletion(name, () => {
                    list.splice(i, 1);
                    renderDispPurchasesTable(data);
                    recalculateAll();
                    scheduleAutoSave();
                    showToast(`Deleted "${name}"`, 'info');
                });
            };
            elements.tbodyDispPurch.appendChild(tr);
        });
    }

    // --- PANEL 3B: STORE PURCHASES ---
    function renderStorePurchasesTable(data) {
        elements.tbodyStorePurch.innerHTML = '';
        const list = data.storePurchases || [];
        list.forEach((p, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="text" class="cell-input sp-vendor" value="${escapeHtml(p.vendor || '')}" placeholder="Company / Distributor"></td>
                <td class="num-cell"><input type="number" step="any" class="cell-input num-input sp-tp" value="${p.tp || 0}"></td>
                <td class="num-cell" style="padding: 1px 4px;">
                    <div style="display: flex; align-items: center; justify-content: flex-end; gap: 4px;">
                        <input type="number" step="any" class="cell-input num-input sp-retail" value="${p.retail || 0}">
                        <button type="button" class="btn-icon btn-sm del-detail-row-btn no-print" title="Delete Row" style="color: #ef4444; padding: 1px 5px; font-size: 0.72rem; border-radius: 3px; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); cursor: pointer; flex-shrink: 0;">✕</button>
                    </div>
                </td>
            `;
            tr.querySelector('.sp-vendor').oninput = (e) => {
                p.vendor = e.target.value;
                scheduleAutoSave();
            };
            tr.querySelector('.sp-tp').oninput = (e) => {
                p.tp = parseFloat(e.target.value) || 0;
                recalculateAll();
                scheduleAutoSave();
            };
            tr.querySelector('.sp-retail').oninput = (e) => {
                p.retail = parseFloat(e.target.value) || 0;
                recalculateAll();
                scheduleAutoSave();
            };
            tr.querySelector('.del-detail-row-btn').onclick = () => {
                const name = p.vendor || 'Store Distributor';
                confirmDeletion(name, () => {
                    list.splice(i, 1);
                    renderStorePurchasesTable(data);
                    recalculateAll();
                    scheduleAutoSave();
                    showToast(`Deleted "${name}"`, 'info');
                });
            };
            elements.tbodyStorePurch.appendChild(tr);
        });
    }

    // --- PANEL 3C: CLINIC EXPENSES DETAILS ---
    function renderClinicExpDetailsTable(data) {
        elements.tbodyClinicExp.innerHTML = '';
        const list = data.clinicExpenseDetails || [];
        list.forEach((it, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="text" class="cell-input ce-item" value="${escapeHtml(it.item || '')}" placeholder="Expense Description"></td>
                <td class="num-cell" style="padding: 1px 4px;">
                    <div style="display: flex; align-items: center; justify-content: flex-end; gap: 4px;">
                        <input type="number" step="any" class="cell-input num-input ce-amt" value="${it.amount || 0}">
                        <button type="button" class="btn-icon btn-sm del-detail-row-btn no-print" title="Delete Row" style="color: #ef4444; padding: 1px 5px; font-size: 0.72rem; border-radius: 3px; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); cursor: pointer; flex-shrink: 0;">✕</button>
                    </div>
                </td>
            `;
            tr.querySelector('.ce-item').oninput = (e) => {
                it.item = e.target.value;
                scheduleAutoSave();
            };
            tr.querySelector('.ce-amt').oninput = (e) => {
                it.amount = parseFloat(e.target.value) || 0;
                recalculateAll();
                scheduleAutoSave();
            };
            tr.querySelector('.del-detail-row-btn').onclick = () => {
                const name = it.item || 'Expense Item';
                confirmDeletion(name, () => {
                    list.splice(i, 1);
                    renderClinicExpDetailsTable(data);
                    recalculateAll();
                    scheduleAutoSave();
                    showToast(`Deleted "${name}"`, 'info');
                });
            };
            elements.tbodyClinicExp.appendChild(tr);
        });
    }

    // --- PANEL 4A: US TOTAL (SINGLE AMOUNT COLUMN) ---
    function renderUSTotalTable(data) {
        elements.tbodyUSDetails.innerHTML = '';
        const list = data.usDetails || [];
        list.forEach((it, i) => {
            const amt = typeof it === 'number' ? it : (it?.amount || 0);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="num-cell" style="padding: 1px 4px;">
                    <div style="display: flex; align-items: center; justify-content: flex-end; gap: 4px;">
                        <input type="number" step="any" class="cell-input num-input us-amt" value="${amt}">
                        <button type="button" class="btn-icon btn-sm del-detail-row-btn no-print" title="Delete Row" style="color: #ef4444; padding: 1px 5px; font-size: 0.72rem; border-radius: 3px; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); cursor: pointer; flex-shrink: 0;">✕</button>
                    </div>
                </td>
            `;
            tr.querySelector('.us-amt').oninput = (e) => {
                const val = parseFloat(e.target.value) || 0;
                if (typeof it === 'object' && it !== null) {
                    it.amount = val;
                } else {
                    list[i] = { amount: val };
                }
                recalculateAll();
                scheduleAutoSave();
            };
            tr.querySelector('.del-detail-row-btn').onclick = () => {
                const val = typeof it === 'object' && it ? it.amount : it;
                confirmDeletion(`US Entry (${val || 0})`, () => {
                    list.splice(i, 1);
                    renderUSTotalTable(data);
                    recalculateAll();
                    scheduleAutoSave();
                    showToast('Deleted US Entry', 'info');
                });
            };
            elements.tbodyUSDetails.appendChild(tr);
        });
    }

    // --- PANEL 4B: CASH BREAKDOWN (NOTE + AMOUNT) ---
    function renderCashBreakdownTable(data) {
        elements.tbodyCashItems.innerHTML = '';
        const list = data.cashItems || [];
        list.forEach((it, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="text" class="cell-input cash-item-note" value="${escapeHtml(it.item || '')}" placeholder="Cash description / Note"></td>
                <td class="num-cell" style="padding: 1px 4px;">
                    <div style="display: flex; align-items: center; justify-content: flex-end; gap: 4px;">
                        <input type="number" step="any" class="cell-input num-input cash-item-amt" value="${it.amount || 0}">
                        <button type="button" class="btn-icon btn-sm del-detail-row-btn no-print" title="Delete Row" style="color: #ef4444; padding: 1px 5px; font-size: 0.72rem; border-radius: 3px; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); cursor: pointer; flex-shrink: 0;">✕</button>
                    </div>
                </td>
            `;
            tr.querySelector('.cash-item-note').oninput = (e) => {
                it.item = e.target.value;
                scheduleAutoSave();
            };
            tr.querySelector('.cash-item-amt').oninput = (e) => {
                it.amount = parseFloat(e.target.value) || 0;
                recalculateAll();
                scheduleAutoSave();
            };
            tr.querySelector('.del-detail-row-btn').onclick = () => {
                const name = it.item || 'Cash Entry';
                confirmDeletion(name, () => {
                    list.splice(i, 1);
                    renderCashBreakdownTable(data);
                    recalculateAll();
                    scheduleAutoSave();
                    showToast(`Deleted "${name}"`, 'info');
                });
            };
            elements.tbodyCashItems.appendChild(tr);
        });
    }

    // --- PANEL 4C: HOME X DETAILS ---
    function renderHomeXTable(data) {
        elements.tbodyHomeX.innerHTML = '';
        const list = data.homeExpenseDetails || [];
        list.forEach((it, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="text" class="cell-input home-x-item" value="${escapeHtml(it.item || '')}" placeholder="Home expense item"></td>
                <td class="num-cell" style="padding: 1px 4px;">
                    <div style="display: flex; align-items: center; justify-content: flex-end; gap: 4px;">
                        <input type="number" step="any" class="cell-input num-input home-x-amt" value="${it.amount || 0}">
                        <button type="button" class="btn-icon btn-sm del-detail-row-btn no-print" title="Delete Row" style="color: #ef4444; padding: 1px 5px; font-size: 0.72rem; border-radius: 3px; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); cursor: pointer; flex-shrink: 0;">✕</button>
                    </div>
                </td>
            `;
            tr.querySelector('.home-x-item').oninput = (e) => {
                it.item = e.target.value;
                scheduleAutoSave();
            };
            tr.querySelector('.home-x-amt').oninput = (e) => {
                it.amount = parseFloat(e.target.value) || 0;
                recalculateAll();
                scheduleAutoSave();
            };
            tr.querySelector('.del-detail-row-btn').onclick = () => {
                const name = it.item || 'Home Exp Item';
                confirmDeletion(name, () => {
                    list.splice(i, 1);
                    renderHomeXTable(data);
                    recalculateAll();
                    scheduleAutoSave();
                    showToast(`Deleted "${name}"`, 'info');
                });
            };
            elements.tbodyHomeX.appendChild(tr);
        });
    }

    // --- PANEL 5A: STAFF & VENDORS (NAME + REASON / DETAIL + AMOUNT) ---
    function renderStaffVendorsTable(data) {
        elements.tbodyStaffVendors.innerHTML = '';
        const staffList = clinicDB.getStaffList();
        const payments = data.staffPayments || {};

        staffList.forEach(s => {
            const pObj = payments[s.name] || { amount: 0, reason: '' };
            const amt = typeof pObj === 'number' ? pObj : (pObj?.amount || 0);
            const reason = typeof pObj === 'object' && pObj?.reason ? pObj.reason : '';

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${escapeHtml(s.name)}</strong></td>
                <td><input type="text" class="cell-input staff-reason-input" value="${escapeHtml(reason)}" placeholder="Reason"></td>
                <td class="num-cell" style="padding: 1px 4px;">
                    <div style="display: flex; align-items: center; justify-content: flex-end; gap: 4px;">
                        <input type="number" step="any" class="cell-input num-input staff-pay-amt" value="${amt}">
                        ${amt > 0 ? `<button type="button" class="btn-icon btn-sm btn-clear-staff-pay no-print" title="Clear / Zero Payment" style="color: #ef4444; padding: 1px 5px; font-size: 0.72rem; border-radius: 3px; background: rgba(239, 68, 68, 0.1); border: none; cursor: pointer; flex-shrink: 0;">✕</button>` : ''}
                    </div>
                </td>
            `;

            const reasonInp = tr.querySelector('.staff-reason-input');
            reasonInp.oninput = (e) => {
                if (!data.staffPayments[s.name]) data.staffPayments[s.name] = { amount: 0, reason: '' };
                data.staffPayments[s.name].reason = e.target.value;
                clinicDB.syncDebitFromStaffPayment(data, s.name, data.staffPayments[s.name].amount, e.target.value);
                renderDebitTable(data);
                scheduleAutoSave();
            };

            const amtInp = tr.querySelector('.staff-pay-amt');
            amtInp.oninput = (e) => {
                const val = parseFloat(e.target.value) || 0;
                if (!data.staffPayments[s.name]) data.staffPayments[s.name] = { amount: 0, reason: '' };
                data.staffPayments[s.name].amount = val;
                clinicDB.syncDebitFromStaffPayment(data, s.name, val, data.staffPayments[s.name].reason);
                renderDebitTable(data);
                recalculateAll();
                scheduleAutoSave();
            };

            const clearBtn = tr.querySelector('.btn-clear-staff-pay');
            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    confirmDeletion(`Payment for ${s.name}`, () => {
                        if (!data.staffPayments[s.name]) data.staffPayments[s.name] = { amount: 0, reason: '' };
                        data.staffPayments[s.name].amount = 0;
                        clinicDB.syncDebitFromStaffPayment(data, s.name, 0, '');
                        renderDebitTable(data);
                        renderStaffVendorsTable(data);
                        recalculateAll();
                        scheduleAutoSave();
                        showToast(`Cleared payment for ${s.name}`, 'info');
                    });
                });
            }

            elements.tbodyStaffVendors.appendChild(tr);
        });
    }

    // --- PANEL 5B: RECEIVABLES (PARTY NAME + DETAIL/NOTE + AMOUNT) ---
    function renderReceivablesTable(data) {
        elements.tbodyReceivables.innerHTML = '';
        const list = data.receivables || [];
        list.forEach((it, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="text" class="cell-input rec-item" value="${escapeHtml(it.item || it.party || '')}" placeholder="Party name"></td>
                <td><input type="text" class="cell-input rec-detail" value="${escapeHtml(it.detail || it.reason || '')}" placeholder="Reason / detail"></td>
                <td class="num-cell" style="padding: 1px 4px;">
                    <div style="display: flex; align-items: center; justify-content: flex-end; gap: 4px;">
                        <input type="number" step="any" class="cell-input num-input rec-amt" value="${it.amount || 0}">
                        <button type="button" class="btn-icon btn-sm del-detail-row-btn no-print" title="Delete Row" style="color: #ef4444; padding: 1px 5px; font-size: 0.72rem; border-radius: 3px; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); cursor: pointer; flex-shrink: 0;">✕</button>
                    </div>
                </td>
            `;
            tr.querySelector('.rec-item').oninput = (e) => {
                it.item = e.target.value;
                scheduleAutoSave();
            };
            tr.querySelector('.rec-detail').oninput = (e) => {
                it.detail = e.target.value;
                scheduleAutoSave();
            };
            tr.querySelector('.rec-amt').oninput = (e) => {
                it.amount = parseFloat(e.target.value) || 0;
                recalculateAll();
                scheduleAutoSave();
            };
            tr.querySelector('.del-detail-row-btn').onclick = () => {
                const name = it.item || it.party || 'Receivable Entry';
                confirmDeletion(name, () => {
                    list.splice(i, 1);
                    renderReceivablesTable(data);
                    recalculateAll();
                    scheduleAutoSave();
                    showToast(`Deleted "${name}"`, 'info');
                });
            };
            elements.tbodyReceivables.appendChild(tr);
        });
    }

    // --- PANEL 6A: DENTAL EXP DETAILS ---
    function renderDentalDetailsTable(data) {
        elements.tbodyDental.innerHTML = '';
        const list = data.dentalDetails || [];
        list.forEach((it, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="text" class="cell-input de-item" value="${escapeHtml(it.item || '')}" placeholder="Dental expense item"></td>
                <td class="num-cell" style="padding: 1px 4px;">
                    <div style="display: flex; align-items: center; justify-content: flex-end; gap: 4px;">
                        <input type="number" step="any" class="cell-input num-input de-amt" value="${it.amount || 0}">
                        <button type="button" class="btn-icon btn-sm del-detail-row-btn no-print" title="Delete Row" style="color: #ef4444; padding: 1px 5px; font-size: 0.72rem; border-radius: 3px; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); cursor: pointer; flex-shrink: 0;">✕</button>
                    </div>
                </td>
            `;
            tr.querySelector('.de-item').oninput = (e) => {
                it.item = e.target.value;
                scheduleAutoSave();
            };
            tr.querySelector('.de-amt').oninput = (e) => {
                it.amount = parseFloat(e.target.value) || 0;
                recalculateAll();
                scheduleAutoSave();
            };
            tr.querySelector('.del-detail-row-btn').onclick = () => {
                const name = it.item || 'Dental Item';
                confirmDeletion(name, () => {
                    list.splice(i, 1);
                    renderDentalDetailsTable(data);
                    recalculateAll();
                    scheduleAutoSave();
                    showToast(`Deleted "${name}"`, 'info');
                });
            };
            elements.tbodyDental.appendChild(tr);
        });
    }

    // --- PANEL 6B: STORE EXP DETAILS ---
    function renderStoreExpDetailsTable(data) {
        elements.tbodyStoreExp.innerHTML = '';
        const list = data.storeExpenseDetails || [];
        list.forEach((it, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="text" class="cell-input se-item" value="${escapeHtml(it.item || '')}" placeholder="Store expense item"></td>
                <td class="num-cell" style="padding: 1px 4px;">
                    <div style="display: flex; align-items: center; justify-content: flex-end; gap: 4px;">
                        <input type="number" step="any" class="cell-input num-input se-amt" value="${it.amount || 0}">
                        <button type="button" class="btn-icon btn-sm del-detail-row-btn no-print" title="Delete Row" style="color: #ef4444; padding: 1px 5px; font-size: 0.72rem; border-radius: 3px; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); cursor: pointer; flex-shrink: 0;">✕</button>
                    </div>
                </td>
            `;
            tr.querySelector('.se-item').oninput = (e) => {
                it.item = e.target.value;
                scheduleAutoSave();
            };
            tr.querySelector('.se-amt').oninput = (e) => {
                it.amount = parseFloat(e.target.value) || 0;
                recalculateAll();
                scheduleAutoSave();
            };
            tr.querySelector('.del-detail-row-btn').onclick = () => {
                const name = it.item || 'Store Exp Item';
                confirmDeletion(name, () => {
                    list.splice(i, 1);
                    renderStoreExpDetailsTable(data);
                    recalculateAll();
                    scheduleAutoSave();
                    showToast(`Deleted "${name}"`, 'info');
                });
            };
            elements.tbodyStoreExp.appendChild(tr);
        });
    }

    // --- PANEL 6C: US EXP DETAILS ---
    function renderUSExpDetailsTable(data) {
        elements.tbodyUSExp.innerHTML = '';
        const list = data.usExpenseDetails || [];
        list.forEach((it, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="text" class="cell-input ue-item" value="${escapeHtml(it.item || '')}" placeholder="US expense item"></td>
                <td class="num-cell" style="padding: 1px 4px;">
                    <div style="display: flex; align-items: center; justify-content: flex-end; gap: 4px;">
                        <input type="number" step="any" class="cell-input num-input ue-amt" value="${it.amount || 0}">
                        <button type="button" class="btn-icon btn-sm del-detail-row-btn no-print" title="Delete Row" style="color: #ef4444; padding: 1px 5px; font-size: 0.72rem; border-radius: 3px; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); cursor: pointer; flex-shrink: 0;">✕</button>
                    </div>
                </td>
            `;
            tr.querySelector('.ue-item').oninput = (e) => {
                it.item = e.target.value;
                scheduleAutoSave();
            };
            tr.querySelector('.ue-amt').oninput = (e) => {
                it.amount = parseFloat(e.target.value) || 0;
                recalculateAll();
                scheduleAutoSave();
            };
            tr.querySelector('.del-detail-row-btn').onclick = () => {
                const name = it.item || 'US Exp Item';
                confirmDeletion(name, () => {
                    list.splice(i, 1);
                    renderUSExpDetailsTable(data);
                    recalculateAll();
                    scheduleAutoSave();
                    showToast(`Deleted "${name}"`, 'info');
                });
            };
            elements.tbodyUSExp.appendChild(tr);
        });
    }

    // --- PANEL 7: CLINIC BILLS (SINGLE AMOUNT ENTRY COLUMN) ---
    function renderClinicBillsTable(data) {
        elements.tbodyClinicBills.innerHTML = '';
        const list = data.clinicBills || [];
        list.forEach((it, i) => {
            const amt = typeof it === 'number' ? it : (it?.amount || 0);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="num-cell" style="padding: 1px 4px;">
                    <div style="display: flex; align-items: center; justify-content: flex-end; gap: 4px;">
                        <input type="number" step="any" class="cell-input num-input cb-amt" value="${amt}">
                        <button type="button" class="btn-icon btn-sm del-detail-row-btn no-print" title="Delete Row" style="color: #ef4444; padding: 1px 5px; font-size: 0.72rem; border-radius: 3px; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); cursor: pointer; flex-shrink: 0;">✕</button>
                    </div>
                </td>
            `;
            tr.querySelector('.cb-amt').oninput = (e) => {
                const val = parseFloat(e.target.value) || 0;
                if (typeof it === 'object' && it !== null) {
                    it.amount = val;
                } else {
                    list[i] = { amount: val };
                }
                recalculateAll();
                scheduleAutoSave();
            };
            tr.querySelector('.del-detail-row-btn').onclick = () => {
                const val = typeof it === 'object' && it ? it.amount : it;
                confirmDeletion(`Clinic Bill (${val || 0})`, () => {
                    list.splice(i, 1);
                    renderClinicBillsTable(data);
                    recalculateAll();
                    scheduleAutoSave();
                    showToast('Deleted Clinic Bill Entry', 'info');
                });
            };
            elements.tbodyClinicBills.appendChild(tr);
        });
    }

    // --- PANEL 7B: SN EXPENSES (SPECIAL INDEPENDENT TRACKED EXPENSES) ---
    function renderSNExpensesTable(data) {
        if (!elements.tbodySNExp) return;
        elements.tbodySNExp.innerHTML = '';
        const list = data.snExpenseDetails || [];
        list.forEach((it, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="text" class="cell-input sn-item" value="${escapeHtml(it.item || '')}" placeholder="SN expense item / description"></td>
                <td class="num-cell" style="padding: 1px 4px;">
                    <div style="display: flex; align-items: center; justify-content: flex-end; gap: 4px;">
                        <input type="number" step="any" class="cell-input num-input sn-amt" value="${it.amount || 0}">
                        <button type="button" class="btn-icon btn-sm del-detail-row-btn no-print" title="Delete Row" style="color: #ef4444; padding: 1px 5px; font-size: 0.72rem; border-radius: 3px; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); cursor: pointer; flex-shrink: 0;">✕</button>
                    </div>
                </td>
            `;
            tr.querySelector('.sn-item').oninput = (e) => {
                it.item = e.target.value;
                scheduleAutoSave();
            };
            tr.querySelector('.sn-amt').oninput = (e) => {
                it.amount = parseFloat(e.target.value) || 0;
                recalculateAll();
                scheduleAutoSave();
            };
            tr.querySelector('.del-detail-row-btn').onclick = () => {
                const name = it.item || 'SN Exp Item';
                confirmDeletion(name, () => {
                    list.splice(i, 1);
                    renderSNExpensesTable(data);
                    recalculateAll();
                    scheduleAutoSave();
                    showToast(`Deleted "${name}"`, 'info');
                });
            };
            elements.tbodySNExp.appendChild(tr);
        });
    }

    // ==========================================================
    // RECALCULATE ALL EXCEL FORMULAS & SYNC WITH LIVE INPUTS
    // ==========================================================
    function recalculateAll() {
        const data = state.currentDayData;

        // 1. Dispensary Purchases Subtotal -> Auto updates Debit C7
        let sumDispPurch = (data.dispPurchases || []).reduce((acc, p) => acc + (parseFloat(p.amount) || 0), 0);
        elements.subtotalDispPurch.textContent = formatNumber(sumDispPurch);
        elements.badgeDispPurchTotal.textContent = formatNumber(sumDispPurch);
        setDebitAutoAmount('Dispensary Purchases', sumDispPurch);

        // 2. Store Purchases Subtotals -> TP updates Debit C6
        let sumStoreTP = 0, sumStoreRetail = 0;
        (data.storePurchases || []).forEach(p => {
            sumStoreTP += (parseFloat(p.tp) || 0);
            sumStoreRetail += (parseFloat(p.retail) || 0);
        });
        elements.subtotalStoreTP.textContent = formatNumber(sumStoreTP);
        elements.subtotalStoreRetail.textContent = formatNumber(sumStoreRetail);
        elements.badgeStorePurchTP.textContent = `TP: ${formatNumber(sumStoreTP)}`;
        setDebitAutoAmount('Store Med Purchases', sumStoreTP);

        // 3. Clinic Expenses Details Subtotal -> Auto updates Debit C8
        let sumClinicExp = (data.clinicExpenseDetails || []).reduce((acc, it) => acc + (parseFloat(it.amount) || 0), 0);
        elements.subtotalClinicExp.textContent = formatNumber(sumClinicExp);
        elements.badgeClinicExpTotal.textContent = formatNumber(sumClinicExp);
        setDebitAutoAmount('Clinic Expenses', sumClinicExp);

        // 4. US Total Receipts -> Auto updates Credit F9
        let sumUSReceipts = (data.usDetails || []).reduce((acc, a) => {
            const val = typeof a === 'number' ? a : (a?.amount || 0);
            return acc + (parseFloat(val) || 0);
        }, 0);
        elements.subtotalUSTotal.textContent = formatNumber(sumUSReceipts);
        elements.badgeUSTotal.textContent = formatNumber(sumUSReceipts);
        setCreditAutoAmount('US', sumUSReceipts);

        // 5. Cash Breakdown -> Auto-syncs to Debit 'Total Cash Available' (fixed at bottom of Debit)
        let sumCashItems = (data.cashItems || []).reduce((acc, a) => {
            const val = typeof a === 'number' ? a : (a?.amount || 0);
            return acc + (parseFloat(val) || 0);
        }, 0);
        elements.subtotalCashTotal.textContent = formatNumber(sumCashItems);
        elements.badgeCashBreakdownTotal.textContent = formatNumber(sumCashItems);
        ensureDebitRowOrder(data);
        setDebitAutoAmount('Total Cash Available', sumCashItems);

        // 6. Home X Details -> Auto updates Debit C10
        let sumHomeX = (data.homeExpenseDetails || []).reduce((acc, a) => {
            const val = typeof a === 'number' ? a : (a?.amount || 0);
            return acc + (parseFloat(val) || 0);
        }, 0);
        elements.subtotalHomeX.textContent = formatNumber(sumHomeX);
        elements.badgeHomeXTotal.textContent = formatNumber(sumHomeX);
        setDebitAutoAmount('Home Expenses', sumHomeX);

        // 7. Staff & Vendors Total
        let sumStaffPay = Object.values(data.staffPayments || {}).reduce((acc, a) => {
            const val = typeof a === 'number' ? a : (a?.amount || 0);
            return acc + (parseFloat(val) || 0);
        }, 0);
        elements.subtotalStaffVendors.textContent = formatNumber(sumStaffPay);
        elements.badgeStaffVendorsTotal.textContent = formatNumber(sumStaffPay);

        // 8. Receivables Total -> Auto-syncs to Debit (Expences)!
        let sumReceivables = (data.receivables || []).reduce((acc, it) => acc + (parseFloat(it.amount) || 0), 0);
        elements.subtotalReceivables.textContent = formatNumber(sumReceivables);
        elements.badgeReceivablesTotal.textContent = formatNumber(sumReceivables);
        setDebitAutoAmount('Receivables', sumReceivables);

        // 9. Dental Exp Details -> Auto updates Debit C12
        let sumDental = (data.dentalDetails || []).reduce((acc, it) => acc + (parseFloat(it.amount) || 0), 0);
        elements.subtotalDentalExp.textContent = formatNumber(sumDental);
        elements.badgeDentalExpTotal.textContent = formatNumber(sumDental);
        setDebitAutoAmount('Dental Exp', sumDental);

        // 10. Store Exp Details -> Auto updates Debit C13
        let sumStoreExp = (data.storeExpenseDetails || []).reduce((acc, it) => acc + (parseFloat(it.amount) || 0), 0);
        elements.subtotalStoreExp.textContent = formatNumber(sumStoreExp);
        elements.badgeStoreExpTotal.textContent = formatNumber(sumStoreExp);
        setDebitAutoAmount('Store Exp', sumStoreExp);

        // 11. US Exp Details -> Auto updates Debit C11
        let sumUSExp = (data.usExpenseDetails || []).reduce((acc, it) => acc + (parseFloat(it.amount) || 0), 0);
        elements.subtotalUSExp.textContent = formatNumber(sumUSExp);
        elements.badgeUSExpTotal.textContent = formatNumber(sumUSExp);
        setDebitAutoAmount('US Exp', sumUSExp);

        // 12. Clinic Bills -> Auto updates Credit F7
        let sumClinicBills = (data.clinicBills || []).reduce((acc, a) => {
            const val = typeof a === 'number' ? a : (a?.amount || 0);
            return acc + (parseFloat(val) || 0);
        }, 0);
        elements.subtotalClinicBills.textContent = formatNumber(sumClinicBills);
        elements.badgeClinicBillsTotal.textContent = formatNumber(sumClinicBills);
        setCreditAutoAmount('Clinic Pt + Dispensary Inc', sumClinicBills);

        // 12b. SN Expenses (Auto updates Debit "SN Expenses")
        let sumSNExp = (data.snExpenseDetails || []).reduce((acc, a) => acc + (parseFloat(a.amount) || 0), 0);
        if (elements.subtotalSNExp) elements.subtotalSNExp.textContent = formatNumber(sumSNExp);
        if (elements.badgeSNExpTotal) elements.badgeSNExpTotal.textContent = formatNumber(sumSNExp);
        setDebitAutoAmount('SN Expenses', sumSNExp);

        // 13. Debit Column Grand Total (SUM C6:C34)
        let totalDebit = (data.debits || []).reduce((acc, d) => acc + (parseFloat(d.amount) || 0), 0);
        if (elements.badgeDebitTotal) elements.badgeDebitTotal.textContent = `Rs. ${formatNumber(totalDebit)}`;
        if (elements.footerDebitTotal) elements.footerDebitTotal.textContent = formatNumber(totalDebit);
        if (elements.kpiDebit) elements.kpiDebit.textContent = `Rs. ${formatNumber(totalDebit)}`;

        // 14. Credit Column Grand Total (SUM F6:F34)
        let totalCredit = (data.credits || []).reduce((acc, c) => acc + (parseFloat(c.amount) || 0), 0);
        if (elements.badgeCreditTotal) elements.badgeCreditTotal.textContent = `Rs. ${formatNumber(totalCredit)}`;
        if (elements.footerCreditTotal) elements.footerCreditTotal.textContent = formatNumber(totalCredit);
        if (elements.kpiCredit) elements.kpiCredit.textContent = `Rs. ${formatNumber(totalCredit)}`;

        // 15. Reconciliation & Bottom Footer
        const diff = totalCredit - totalDebit;
        const cashTaken = parseFloat(data.summary?.cashTakenAway) || 0;
        const darazCash = parseFloat(data.summary?.darazCash) || 0;
        const totalCash = cashTaken + darazCash;

        if (!data.summary) data.summary = {};
        data.summary.debitTotal = totalDebit;
        data.summary.creditTotal = totalCredit;
        data.summary.difference = diff;
        data.summary.totalCash = totalCash;

        if (elements.inputDiff) elements.inputDiff.value = formatNumber(diff);
        if (elements.inputTotalCash) elements.inputTotalCash.value = formatNumber(totalCash);
        if (elements.kpiDiff) {
            elements.kpiDiff.textContent = `Rs. ${formatNumber(diff)}`;
            elements.kpiDiff.className = `kpi-val ${diff >= 0 ? 'diff-pos' : 'diff-neg'}`;
        }
        if (elements.kpiCash) elements.kpiCash.textContent = `Rs. ${formatNumber(totalCash)}`;

        if (elements.boxReconStatus) {
            if (Math.abs(diff) < 1) {
                elements.boxReconStatus.className = 'recon-status-badge balanced';
                elements.boxReconStatus.textContent = 'Calculated: Balanced';
            } else if (diff > 0) {
                elements.boxReconStatus.className = 'recon-status-badge discrepancy';
                elements.boxReconStatus.textContent = `Surplus: +${formatNumber(diff)} (Cash Short)`;
            } else {
                elements.boxReconStatus.className = 'recon-status-badge balanced';
                elements.boxReconStatus.textContent = `Deficit: ${formatNumber(diff)} (Cash Excess)`;
            }
        }
    }

    // Debit Ordering Helpers: Keeps Total Cash Available at bottom, inserts lines above ZK
    function ensureDebitRowOrder(data) {
        if (!data || !data.debits) return;
        const cashIdx = data.debits.findIndex(d => (d.name || '').toLowerCase().includes('total cash available'));
        let cashItem = null;
        if (cashIdx !== -1) {
            cashItem = data.debits.splice(cashIdx, 1)[0];
        } else {
            cashItem = { name: 'Total Cash Available', amount: 0, isAuto: true, isCash: true };
        }
        cashItem.isAuto = true;
        cashItem.isCash = true;
        data.debits.push(cashItem);
    }

    function insertDebitRowAboveZK(data, newItem) {
        if (!data.debits) data.debits = [];
        ensureDebitRowOrder(data);

        // Find index of ZK
        let targetIdx = data.debits.findIndex(d => {
            const n = (d.name || '').trim().toLowerCase();
            return n === 'zk' || n.startsWith('zk ') || n.includes('zk');
        });

        // Fallback: find KH, BP, or Total Cash Available
        if (targetIdx === -1) {
            targetIdx = data.debits.findIndex(d => {
                const n = (d.name || '').trim().toLowerCase();
                return n === 'kh' || n === 'bp' || n.includes('total cash available');
            });
        }

        if (targetIdx === -1) {
            targetIdx = Math.max(0, data.debits.length - 1);
        }

        data.debits.splice(targetIdx, 0, newItem);
        ensureDebitRowOrder(data);
    }

    function setDebitAutoAmount(namePart, newAmt) {
        if (!state.currentDayData.debits) state.currentDayData.debits = [];
        const npLower = namePart.toLowerCase().trim();
        let d = state.currentDayData.debits.find(it => (it.name || '').toLowerCase().trim().includes(npLower));
        if (!d) {
            d = { name: namePart, amount: newAmt, isAuto: true };
            if (npLower.includes('total cash available')) {
                d.isCash = true;
                state.currentDayData.debits.push(d);
            } else {
                insertDebitRowAboveZK(state.currentDayData, d);
            }
            renderDebitTable(state.currentDayData);
            return;
        }
        d.amount = newAmt;
        const rows = elements.tbodyDebit.querySelectorAll('tr');
        rows.forEach((r, idx) => {
            const debItem = state.currentDayData.debits[idx];
            const debName = debItem ? (debItem.name || '').toLowerCase() : '';
            if (debName.includes(npLower) || r.innerText.toLowerCase().includes(npLower)) {
                const inp = r.querySelector('.debit-amt-input');
                if (inp) inp.value = newAmt;
            }
        });
    }

    function setCreditAutoAmount(namePart, newAmt) {
        if (!state.currentDayData.credits) state.currentDayData.credits = [];
        const npLower = namePart.toLowerCase().trim();
        const c = state.currentDayData.credits.find(it => (it.name || '').toLowerCase().trim().includes(npLower));
        if (c) {
            c.amount = newAmt;
            const rows = elements.tbodyCredit.querySelectorAll('tr');
            rows.forEach((r, idx) => {
                const credItem = state.currentDayData.credits[idx];
                const credName = credItem ? (credItem.name || '').toLowerCase() : '';
                if (credName.includes(npLower) || r.innerText.toLowerCase().includes(npLower)) {
                    const inp = r.querySelector('.credit-amt-input');
                    if (inp) inp.value = newAmt;
                }
            });
        }
    }

    // Add Row Buttons
    function setupAddRowButtons() {
        // 1. Add Custom Expense Line in Debit (Inserted ABOVE ZK)
        elements.btnAddDebitRow.addEventListener('click', () => {
            const name = prompt('Enter description for new Debit (Expense) item:') || 'Other Expense';
            insertDebitRowAboveZK(state.currentDayData, { name, amount: 0, isCustom: true });
            renderDebitTable(state.currentDayData);
            recalculateAll();
            scheduleAutoSave();
        });

        // 2. Add Staff Payment directly into Debit with Selection + Reason (Inserted ABOVE ZK)
        elements.btnAddStaffDebitBtn.addEventListener('click', () => {
            const staffList = clinicDB.getStaffList();
            const staffOptions = staffList.map((s, i) => `${i + 1}. ${s.name}`).join('\n');
            const selection = prompt(`Select Staff / Vendor (Enter number 1-${staffList.length}) or type Name:\n${staffOptions}`);
            if (!selection) return;

            let chosenStaff = null;
            const num = parseInt(selection, 10);
            if (!isNaN(num) && num >= 1 && num <= staffList.length) {
                chosenStaff = staffList[num - 1].name;
            } else {
                const found = staffList.find(s => s.name.toLowerCase() === selection.trim().toLowerCase());
                chosenStaff = found ? found.name : selection.trim();
            }

            const reason = prompt(`Enter detail / reason for payment to "${chosenStaff}" (e.g. Salary, Advance, Fuel, Bonus):`) || 'Payment';
            const amtStr = prompt(`Enter payment amount (Rs.) for "${chosenStaff}":`) || '0';
            const amount = parseFloat(amtStr) || 0;

            // 1. Add to Debit list above ZK
            const lineName = `${chosenStaff} (${reason})`;
            insertDebitRowAboveZK(state.currentDayData, { name: lineName, amount, isCustom: true, staffRef: chosenStaff });

            // 2. Link to Staff & Vendors Table
            if (!state.currentDayData.staffPayments) state.currentDayData.staffPayments = {};
            const existing = state.currentDayData.staffPayments[chosenStaff];
            const prevAmt = typeof existing === 'number' ? existing : (existing?.amount || 0);
            state.currentDayData.staffPayments[chosenStaff] = {
                amount: prevAmt + amount,
                reason: reason
            };

            renderDebitTable(state.currentDayData);
            renderStaffVendorsTable(state.currentDayData);
            recalculateAll();
            scheduleAutoSave();
            showToast(`Added Rs. ${amount} for ${chosenStaff}!`, 'success');
        });

        // 3. Add Custom Income Line in Credit
        elements.btnAddCreditRow.addEventListener('click', () => {
            const name = prompt('Enter description for new Credit (Income) item:') || 'Other Income';
            state.currentDayData.credits.push({ name, amount: 0, isCustom: true });
            renderCreditTable(state.currentDayData);
            recalculateAll();
            scheduleAutoSave();
        });

        // 4. Detail Panel Add Buttons
        elements.btnAddDispPurchRow.addEventListener('click', () => {
            if (!state.currentDayData.dispPurchases) state.currentDayData.dispPurchases = [];
            state.currentDayData.dispPurchases.push({ item: '', amount: 0 });
            renderDispPurchasesTable(state.currentDayData);
            recalculateAll();
            scheduleAutoSave();
            showToast('Added row to Dispensary Purchases', 'info');
        });

        elements.btnAddStoreRow.addEventListener('click', () => {
            if (!state.currentDayData.storePurchases) state.currentDayData.storePurchases = [];
            state.currentDayData.storePurchases.push({ vendor: '', tp: 0, retail: 0 });
            renderStorePurchasesTable(state.currentDayData);
            recalculateAll();
            scheduleAutoSave();
            showToast('Added distributor row to Store Purchases', 'info');
        });

        elements.btnAddClinicExpRow.addEventListener('click', () => {
            if (!state.currentDayData.clinicExpenseDetails) state.currentDayData.clinicExpenseDetails = [];
            state.currentDayData.clinicExpenseDetails.push({ item: '', amount: 0 });
            renderClinicExpDetailsTable(state.currentDayData);
            recalculateAll();
            scheduleAutoSave();
            showToast('Added row to Clinic Expenses', 'info');
        });

        elements.btnAddUSRow.addEventListener('click', () => {
            if (!state.currentDayData.usDetails) state.currentDayData.usDetails = [];
            state.currentDayData.usDetails.push({ amount: 0 });
            renderUSTotalTable(state.currentDayData);
            recalculateAll();
            scheduleAutoSave();
            showToast('Added row to US Total', 'info');
        });

        elements.btnAddCashRow.addEventListener('click', () => {
            if (!state.currentDayData.cashItems) state.currentDayData.cashItems = [];
            state.currentDayData.cashItems.push({ item: '', amount: 0 });
            renderCashBreakdownTable(state.currentDayData);
            recalculateAll();
            scheduleAutoSave();
            showToast('Added row to Cash Breakdown', 'info');
        });

        elements.btnAddHomeRow.addEventListener('click', () => {
            if (!state.currentDayData.homeExpenseDetails) state.currentDayData.homeExpenseDetails = [];
            state.currentDayData.homeExpenseDetails.push({ item: '', amount: 0 });
            renderHomeXTable(state.currentDayData);
            recalculateAll();
            scheduleAutoSave();
            showToast('Added row to Home Expenses', 'info');
        });

        elements.btnAddRecRow.addEventListener('click', () => {
            if (!state.currentDayData.receivables) state.currentDayData.receivables = [];
            state.currentDayData.receivables.push({ item: '', detail: '', amount: 0 });
            renderReceivablesTable(state.currentDayData);
            recalculateAll();
            scheduleAutoSave();
            showToast('Added row to Receivables', 'info');
        });

        elements.btnAddDentalRow.addEventListener('click', () => {
            if (!state.currentDayData.dentalDetails) state.currentDayData.dentalDetails = [];
            state.currentDayData.dentalDetails.push({ item: '', amount: 0 });
            renderDentalDetailsTable(state.currentDayData);
            recalculateAll();
            scheduleAutoSave();
            showToast('Added row to Dental Expenses', 'info');
        });

        elements.btnAddStoreExpRow.addEventListener('click', () => {
            if (!state.currentDayData.storeExpenseDetails) state.currentDayData.storeExpenseDetails = [];
            state.currentDayData.storeExpenseDetails.push({ item: '', amount: 0 });
            renderStoreExpDetailsTable(state.currentDayData);
            recalculateAll();
            scheduleAutoSave();
            showToast('Added row to Store Expenses', 'info');
        });

        elements.btnAddUSExpRow.addEventListener('click', () => {
            if (!state.currentDayData.usExpenseDetails) state.currentDayData.usExpenseDetails = [];
            state.currentDayData.usExpenseDetails.push({ item: '', amount: 0 });
            renderUSExpDetailsTable(state.currentDayData);
            recalculateAll();
            scheduleAutoSave();
            showToast('Added row to US Expenses', 'info');
        });

        elements.btnAddBillRow.addEventListener('click', () => {
            if (!state.currentDayData.clinicBills) state.currentDayData.clinicBills = [];
            state.currentDayData.clinicBills.push({ amount: 0 });
            renderClinicBillsTable(state.currentDayData);
            recalculateAll();
            scheduleAutoSave();
            showToast('Added row to Clinic Bills', 'info');
        });

        if (elements.btnAddSNExpRow) {
            elements.btnAddSNExpRow.addEventListener('click', () => {
                if (!state.currentDayData.snExpenseDetails) state.currentDayData.snExpenseDetails = [];
                state.currentDayData.snExpenseDetails.push({ item: '', amount: 0 });
                renderSNExpensesTable(state.currentDayData);
                recalculateAll();
                scheduleAutoSave();
                showToast('Added row to SN Expenses', 'info');
            });
        }
    }

    function formatMonthDisplay(ymStr) {
        if (!ymStr) return '';
        const parts = ymStr.split('-');
        const y = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10);
        const d = new Date(y, m - 1, 1);
        return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    }

    function formatDateToISO(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }

    function formatDateKeyDisplay(dateKey) {
        if (!dateKey) return '';
        const parts = dateKey.split('-');
        if (parts.length === 3) {
            const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const m = parseInt(parts[1], 10);
            return `${parts[2]}-${names[m - 1] || parts[1]}-${parts[0].slice(2)}`;
        }
        return dateKey;
    }

    function resolvePeriodData(filter) {
        if (filter.mode === 'last3') {
            const d = new Date();
            const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
            const start = new Date(d.getFullYear(), d.getMonth() - 2, 1);
            const sStr = formatDateToISO(start);
            const eStr = formatDateToISO(end);
            const days = clinicDB.getDaysForRange(sStr, eStr);
            const summary = clinicDB.getSummaryForDays(days, `Last 3 Months (${sStr} to ${eStr})`);
            return {
                days,
                summary,
                label: `Last 3 Months (${formatMonthDisplay(sStr.substring(0, 7))} - ${formatMonthDisplay(eStr.substring(0, 7))})`,
                fileLabel: `Last_3_Months_${sStr}_to_${eStr}`
            };
        } else if (filter.mode === 'last6') {
            const d = new Date();
            const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
            const start = new Date(d.getFullYear(), d.getMonth() - 5, 1);
            const sStr = formatDateToISO(start);
            const eStr = formatDateToISO(end);
            const days = clinicDB.getDaysForRange(sStr, eStr);
            const summary = clinicDB.getSummaryForDays(days, `Last 6 Months (${sStr} to ${eStr})`);
            return {
                days,
                summary,
                label: `Last 6 Months (${formatMonthDisplay(sStr.substring(0, 7))} - ${formatMonthDisplay(eStr.substring(0, 7))})`,
                fileLabel: `Last_6_Months_${sStr}_to_${eStr}`
            };
        } else if (filter.mode === 'custom') {
            const sStr = filter.start || '2026-09-01';
            const eStr = filter.end || todayDateStr;
            const days = clinicDB.getDaysForRange(sStr, eStr);
            const summary = clinicDB.getSummaryForDays(days, `Custom (${sStr} to ${eStr})`);
            return {
                days,
                summary,
                label: `Custom Range (${sStr} to ${eStr})`,
                fileLabel: `Custom_${sStr}_to_${eStr}`
            };
        } else {
            const ym = filter.month || state.currentMonth;
            const days = clinicDB.getDaysForMonth(ym);
            const summary = clinicDB.getMonthlySummary(ym);
            return {
                days,
                summary,
                label: formatMonthDisplay(ym),
                fileLabel: `${ym}_Data`
            };
        }
    }

    function getMonthSelectorHtml(id, selectedYM) {
        const months = [
            { ym: '2026-01', label: 'January 2026' },
            { ym: '2026-02', label: 'February 2026' },
            { ym: '2026-03', label: 'March 2026' },
            { ym: '2026-04', label: 'April 2026' },
            { ym: '2026-05', label: 'May 2026' },
            { ym: '2026-06', label: 'June 2026' },
            { ym: '2026-07', label: 'July 2026' },
            { ym: '2026-08', label: 'August 2026' },
            { ym: '2026-09', label: 'September 2026' },
            { ym: '2026-10', label: 'October 2026' },
            { ym: '2026-11', label: 'November 2026' },
            { ym: '2026-12', label: 'December 2026' },
            { ym: '2027-01', label: 'January 2027' },
            { ym: '2027-02', label: 'February 2027' },
            { ym: '2027-03', label: 'March 2027' }
        ];
        return `
            <select id="${id}" class="filter-select" style="font-size: 0.8rem; padding: 0.3rem 0.6rem; font-weight: 600;">
                ${months.map(m => `<option value="${m.ym}" ${m.ym === selectedYM ? 'selected' : ''}>${m.label}</option>`).join('')}
            </select>
        `;
    }

    function getPeriodFilterBarHtml(prefix, filter) {
        const isMonth = filter.mode === 'month';
        const isCustom = filter.mode === 'custom';
        return `
            <div class="period-filter-wrapper no-print" style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; background: #eef3f8; padding: 0.35rem 0.65rem; border-radius: 6px; border: 1px solid var(--border-color);">
                <div style="display: flex; align-items: center; gap: 0.35rem;">
                    <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted);">Period:</span>
                    <select id="${prefix}-filter-mode" class="filter-select" style="font-size: 0.8rem; padding: 0.25rem 0.5rem; font-weight: 600;">
                        <option value="month" ${filter.mode === 'month' ? 'selected' : ''}>📅 Single Month</option>
                        <option value="last3" ${filter.mode === 'last3' ? 'selected' : ''}>📊 Last 3 Months</option>
                        <option value="last6" ${filter.mode === 'last6' ? 'selected' : ''}>📈 Last 6 Months</option>
                        <option value="custom" ${filter.mode === 'custom' ? 'selected' : ''}>🔍 Custom Date Range</option>
                    </select>
                </div>
                <div id="${prefix}-month-box" style="display: ${isMonth ? 'inline-block' : 'none'};">
                    ${getMonthSelectorHtml(`${prefix}-month-select`, filter.month || state.currentMonth)}
                </div>
                <div id="${prefix}-custom-box" style="display: ${isCustom ? 'inline-flex' : 'none'}; align-items: center; gap: 0.35rem;">
                    <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600;">From:</span>
                    <input type="date" id="${prefix}-start-date" class="date-input" style="font-size: 0.78rem; padding: 0.2rem 0.4rem;" value="${filter.start || '2026-09-01'}">
                    <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600;">To:</span>
                    <input type="date" id="${prefix}-end-date" class="date-input" style="font-size: 0.78rem; padding: 0.2rem 0.4rem;" value="${filter.end || todayDateStr}">
                    <button type="button" class="btn btn-primary btn-sm" id="${prefix}-apply-btn" style="padding: 0.2rem 0.55rem; font-size: 0.75rem;">Apply</button>
                </div>
            </div>
        `;
    }

    function bindPeriodFilterEvents(prefix, filter, onUpdate) {
        const modeSel = document.getElementById(`${prefix}-filter-mode`);
        const monthBox = document.getElementById(`${prefix}-month-box`);
        const monthSel = document.getElementById(`${prefix}-month-select`);
        const customBox = document.getElementById(`${prefix}-custom-box`);
        const startInput = document.getElementById(`${prefix}-start-date`);
        const endInput = document.getElementById(`${prefix}-end-date`);
        const applyBtn = document.getElementById(`${prefix}-apply-btn`);

        if (modeSel) {
            modeSel.addEventListener('change', (e) => {
                filter.mode = e.target.value;
                if (filter.mode === 'month') {
                    if (monthBox) monthBox.style.display = 'inline-block';
                    if (customBox) customBox.style.display = 'none';
                    onUpdate();
                } else if (filter.mode === 'custom') {
                    if (monthBox) monthBox.style.display = 'none';
                    if (customBox) customBox.style.display = 'inline-flex';
                } else {
                    if (monthBox) monthBox.style.display = 'none';
                    if (customBox) customBox.style.display = 'none';
                    onUpdate();
                }
            });
        }

        if (monthSel) {
            monthSel.addEventListener('change', (e) => {
                filter.month = e.target.value;
                state.currentMonth = e.target.value;
                onUpdate();
            });
        }

        if (applyBtn) {
            applyBtn.addEventListener('click', () => {
                if (startInput) filter.start = startInput.value;
                if (endInput) filter.end = endInput.value;
                onUpdate();
            });
        }
    }

    // ==========================================================
    // MASTER GRID VIEW (EXCEL DATA SHEET RECREATION)
    // ==========================================================
    function renderMasterGrid() {
        const container = document.getElementById('master-grid-container');
        const { days, summary, label, fileLabel } = resolvePeriodData(state.masterFilter);

        // Sub-Tab: Dedicated SN Expenses Ledger View
        if (state.masterSubTab === 'sn_ledger') {
            const snRows = [];
            let snTotal = 0;
            days.forEach(({ dayNum, dateKey, data }) => {
                const list = data.snExpenseDetails || [];
                list.forEach(item => {
                    const amt = parseFloat(item.amount) || 0;
                    if (amt > 0 || (item.item && item.item.trim())) {
                        snRows.push({
                            dateKey,
                            item: item.item || 'SN Expense',
                            amount: amt
                        });
                        snTotal += amt;
                    }
                });
            });

            let html = `
                <div class="table-card">
                    <div class="table-toolbar" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
                        <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
                            <div style="display: flex; align-items: center; gap: 0.35rem; background: rgba(255, 255, 255, 0.08); padding: 3px; border-radius: 6px; border: 1px solid var(--border-color);">
                                <button type="button" class="btn btn-sm btn-secondary" id="btn-switch-master-grid" style="font-size: 0.78rem; padding: 0.25rem 0.65rem;">
                                    📊 Master Grid
                                </button>
                                <button type="button" class="btn btn-sm btn-primary" id="btn-switch-sn-ledger" style="font-size: 0.78rem; padding: 0.25rem 0.65rem;">
                                    📑 SN Expenses Ledger
                                </button>
                            </div>
                            <div class="table-title">
                                📑 SN Expenses Ledger - ${label}
                            </div>
                            ${getPeriodFilterBarHtml('master', state.masterFilter)}
                        </div>
                        <div style="display: flex; gap: 0.75rem;">
                            <button type="button" class="btn btn-secondary btn-sm" id="export-sn-ledger-csv-btn">
                                📥 Export CSV
                            </button>
                            <button type="button" class="btn btn-primary btn-sm" onclick="window.print()">
                                🖨️ Print Ledger
                            </button>
                        </div>
                    </div>

                    <!-- Summary Cards -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.25rem;">
                        <div class="kpi-card" style="border-left: 4px solid #a855f7;">
                            <span class="kpi-title">Total SN Expenses</span>
                            <span class="kpi-value" style="color: #a855f7;">Rs. ${formatNumber(snTotal)}</span>
                            <span class="kpi-subtext">${snRows.length} entries recorded (${label})</span>
                        </div>
                        <div class="kpi-card" style="border-left: 4px solid #38bdf8;">
                            <span class="kpi-title">Average Per Entry</span>
                            <span class="kpi-value" style="color: #38bdf8;">Rs. ${formatNumber(snRows.length > 0 ? snTotal / snRows.length : 0)}</span>
                            <span class="kpi-subtext">Across active entries</span>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="custom-table" id="sn-ledger-table">
                            <thead>
                                <tr>
                                    <th style="width: 55px;">#</th>
                                    <th style="width: 140px;">Date</th>
                                    <th>SN Item / Description</th>
                                    <th class="num-cell" style="width: 160px;">Amount (Rs.)</th>
                                    <th class="no-print" style="width: 110px; text-align: center;">Action</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

            if (snRows.length === 0) {
                html += `
                    <tr>
                        <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 2rem;">
                            No SN Expense entries recorded for ${label}. Add entries in Daily Entry via "+ Add SN Item".
                        </td>
                    </tr>
                `;
            } else {
                snRows.forEach((r, idx) => {
                    html += `
                        <tr class="master-row" data-date="${r.dateKey}" style="cursor: pointer;" title="Click to view day sheet">
                            <td>${idx + 1}</td>
                            <td><strong>${formatDateKeyDisplay(r.dateKey)}</strong></td>
                            <td>${escapeHtml(r.item)}</td>
                            <td class="num-cell" style="font-weight: 700; color: #a855f7;">Rs. ${formatNumber(r.amount)}</td>
                            <td class="no-print" style="text-align: center;">
                                <button type="button" class="btn btn-secondary btn-sm" style="font-size: 0.72rem; padding: 0.15rem 0.45rem;">View Day</button>
                            </td>
                        </tr>
                    `;
                });
            }

            html += `
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="3" style="font-weight: 700; text-align: right;">TOTAL SN EXPENSES (${label})</td>
                                    <td class="num-cell" style="font-weight: 800; color: #a855f7; font-size: 1rem;">Rs. ${formatNumber(snTotal)}</td>
                                    <td class="no-print"></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            `;

            container.innerHTML = html;

            document.getElementById('btn-switch-master-grid').onclick = () => {
                state.masterSubTab = 'grid';
                renderMasterGrid();
            };

            container.querySelectorAll('.master-row').forEach(r => {
                r.addEventListener('click', () => {
                    const dt = r.dataset.date;
                    if (!confirm(`Open Daily Sheet for ${dt}?`)) return;
                    saveCurrentDay(false);
                    state.currentDate = dt;
                    elements.dateInput.value = dt;
                    updateDateBadge(dt);
                    loadDay(dt);
                    switchTab('view-daily');
                });
            });

            bindPeriodFilterEvents('master', state.masterFilter, renderMasterGrid);

            const exportBtn = document.getElementById('export-sn-ledger-csv-btn');
            if (exportBtn) {
                exportBtn.addEventListener('click', () => {
                    exportTableToCSV('sn-ledger-table', `${fileLabel}_SN_Expenses_Ledger.csv`);
                });
            }
            return;
        }

        // Default: Master Grid Table
        let html = `
            <div class="table-card">
                <div class="table-toolbar" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
                    <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
                        <div style="display: flex; align-items: center; gap: 0.35rem; background: rgba(255, 255, 255, 0.08); padding: 3px; border-radius: 6px; border: 1px solid var(--border-color);">
                            <button type="button" class="btn btn-sm btn-primary" id="btn-switch-master-grid" style="font-size: 0.78rem; padding: 0.25rem 0.65rem;">
                                📊 Master Grid
                            </button>
                            <button type="button" class="btn btn-sm btn-secondary" id="btn-switch-sn-ledger" style="font-size: 0.78rem; padding: 0.25rem 0.65rem;">
                                📑 SN Expenses Ledger
                            </button>
                        </div>
                        <div class="table-title">
                            📊 Master Grid (Data Sheet) - ${label}
                        </div>
                        ${getPeriodFilterBarHtml('master', state.masterFilter)}
                    </div>
                    <div style="display: flex; gap: 0.75rem;">
                        <button type="button" class="btn btn-secondary btn-sm" id="export-master-csv-btn">
                            📥 Export CSV
                        </button>
                        <button type="button" class="btn btn-primary btn-sm" onclick="window.print()">
                            🖨️ Print Sheet
                        </button>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="custom-table" id="master-grid-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th class="num-cell">Total Dr</th>
                                <th class="num-cell">Total Cr</th>
                                <th class="num-cell">Store Med (TP)</th>
                                <th class="num-cell">Sale Med (Retail)</th>
                                <th class="num-cell">Home Exp</th>
                                <th class="num-cell">Clinic Exp</th>
                                <th class="num-cell">US Inc</th>
                                <th class="num-cell">Disp Inc</th>
                                <th class="num-cell">St S (Store)</th>
                                <th class="num-cell">LB Inc</th>
                                <th class="num-cell">LB Exp</th>
                                <th class="num-cell">KH</th>
                                <th class="num-cell">ECG</th>
                                <th class="num-cell">Cash</th>
                                <th class="num-cell">Disp Purch</th>
                                <th class="num-cell">ZK</th>
                                <th class="num-cell">BP</th>
                                <th class="num-cell">US Exp</th>
                                <th class="num-cell">Dental Exp</th>
                                <th class="num-cell">Store Exp</th>
                                <th class="num-cell" style="color: #a855f7; background: rgba(168,85,247,0.06);">SN Exp</th>
                                <th class="num-cell" style="color: #0284c7; background: rgba(2,132,199,0.06);">A/C</th>
                                <th class="num-cell" style="color: #f43f5e; background: rgba(244,63,94,0.06);">Others Exp</th>
                                <th class="num-cell" style="color: #10b981; background: rgba(16,185,129,0.06);">Others Inc</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        days.forEach(({ dayNum, dateKey, data }) => {
            const debits = data.debits || [];
            const credits = data.credits || [];
            const dSummary = data.summary || {};

            const getDeb = (name) => {
                const f = debits.find(d => {
                    const n = (d.name || '').toLowerCase().trim();
                    return n === name || n.startsWith(name + ' ') || n.includes(name);
                });
                return f ? (parseFloat(f.amount) || 0) : 0;
            };
            const getCred = (name) => {
                const f = credits.find(c => {
                    const n = (c.name || '').toLowerCase().trim();
                    if (name === 'lb') return n === 'lb' || n === 'lb inc' || n.includes('lb inc') || n.includes('lab');
                    if (name === 'us') return n === 'us' || n === 'us inc' || n.includes('us inc') || n.includes('ultrasound');
                    if (name === 'ecg') return n === 'ecg' || n.includes('ecg');
                    return n === name || n.includes(name);
                });
                return f ? (parseFloat(f.amount) || 0) : 0;
            };

            const storeRetail = (data.storePurchases || []).reduce((acc, p) => acc + (p.retail || 0), 0);

            const standardDebits = [
                'store med purchase', 'dispensary purchase', 'clinic exp',
                'lb exp', 'home exp', 'us exp', 'dental exp', 'store exp',
                'sn exp', 'sn expenses', 'a/c', 'account', 'ac',
                'receivable', 'zk', 'kh', 'bp', 'total cash available'
            ];
            const othersDeb = debits.filter(d => {
                const n = (d.name || '').toLowerCase().trim();
                return !standardDebits.some(sd => n.includes(sd) || n === sd);
            }).reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);

            const standardCredits = [
                'clinic pt', 'dispensary inc', 'lb', 'us', 'st s', 'store sale', 'ecg'
            ];
            const othersCred = credits.filter(c => {
                const n = (c.name || '').toLowerCase().trim();
                if (n.includes('daraz cash')) return false;
                return !standardCredits.some(sc => n.includes(sc) || n === sc);
            }).reduce((sum, c) => sum + (parseFloat(c.amount) || 0), 0);

            const snDetailsSum = (data.snExpenseDetails || []).reduce((acc, it) => acc + (parseFloat(it.amount) || 0), 0);
            const snDebit = debits.find(d => {
                const n = (d.name || '').trim().toLowerCase();
                return n === 'sn expenses' || n === 'sn exp' || n === 'sn' || n === 'sne';
            });
            const snDebitAmt = snDebit ? (parseFloat(snDebit.amount) || 0) : 0;
            const snDailyTotal = Math.max(snDetailsSum, snDebitAmt);

            const acDailyTotal = debits.filter(d => {
                const n = (d.name || '').trim().toLowerCase();
                return n === 'a/c' || n === 'ac' || n === 'account' || n.startsWith('a/c');
            }).reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);

            html += `
                <tr class="master-row" data-date="${dateKey}" style="cursor: pointer;" title="Click to view and edit day sheet">
                    <td><strong>${formatDateKeyDisplay(dateKey)}</strong></td>
                    <td class="num-cell" style="color: #fb7185;">${formatNumber(dSummary.debitTotal || 0)}</td>
                    <td class="num-cell" style="color: #34d399;">${formatNumber(dSummary.creditTotal || 0)}</td>
                    <td class="num-cell">${formatNumber(getDeb('store med purchase'))}</td>
                    <td class="num-cell">${formatNumber(storeRetail)}</td>
                    <td class="num-cell">${formatNumber(getDeb('home exp'))}</td>
                    <td class="num-cell">${formatNumber(getDeb('clinic exp'))}</td>
                    <td class="num-cell">${formatNumber(getCred('us'))}</td>
                    <td class="num-cell">${formatNumber(getCred('clinic pt') || getCred('dispensary inc'))}</td>
                    <td class="num-cell">${formatNumber(getCred('st s'))}</td>
                    <td class="num-cell">${formatNumber(getCred('lb'))}</td>
                    <td class="num-cell">${formatNumber(getDeb('lb exp'))}</td>
                    <td class="num-cell">${formatNumber(getDeb('kh'))}</td>
                    <td class="num-cell">${formatNumber(getCred('ecg'))}</td>
                    <td class="num-cell">${formatNumber(dSummary.cashTakenAway || 0)}</td>
                    <td class="num-cell">${formatNumber(getDeb('dispensary purchase'))}</td>
                    <td class="num-cell">${formatNumber(getDeb('zk'))}</td>
                    <td class="num-cell">${formatNumber(getDeb('bp'))}</td>
                    <td class="num-cell">${formatNumber(getDeb('us exp'))}</td>
                    <td class="num-cell">${formatNumber(getDeb('dental exp'))}</td>
                    <td class="num-cell">${formatNumber(getDeb('store exp'))}</td>
                    <td class="num-cell" style="color: #a855f7; font-weight: 600;">${snDailyTotal > 0 ? formatNumber(snDailyTotal) : '-'}</td>
                    <td class="num-cell" style="color: #0284c7; font-weight: 600;">${acDailyTotal > 0 ? formatNumber(acDailyTotal) : '-'}</td>
                    <td class="num-cell" style="color: #f43f5e; font-weight: 600;">${othersDeb > 0 ? formatNumber(othersDeb) : '-'}</td>
                    <td class="num-cell" style="color: #10b981; font-weight: 600;">${othersCred > 0 ? formatNumber(othersCred) : '-'}</td>
                </tr>
            `;
        });

        html += `
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>TOTAL</td>
                                <td class="num-cell" style="color: #fb7185;">Rs. ${formatNumber(summary.sumDr)}</td>
                                <td class="num-cell" style="color: #34d399;">Rs. ${formatNumber(summary.sumCr)}</td>
                                <td class="num-cell">${formatNumber(summary.sumStoreMedPurchases)}</td>
                                <td class="num-cell">${formatNumber(summary.sumStoreSalesRetail)}</td>
                                <td class="num-cell">${formatNumber(summary.sumHomeExp)}</td>
                                <td class="num-cell">${formatNumber(summary.sumClinicExp)}</td>
                                <td class="num-cell">${formatNumber(summary.sumUSInc)}</td>
                                <td class="num-cell">${formatNumber(summary.sumDispInc)}</td>
                                <td class="num-cell">${formatNumber(summary.sumStSaleThisMonth)}</td>
                                <td class="num-cell">${formatNumber(summary.sumLBInc)}</td>
                                <td class="num-cell">${formatNumber(summary.sumLBExp)}</td>
                                <td class="num-cell">${formatNumber(summary.sumKH)}</td>
                                <td class="num-cell">${formatNumber(summary.sumECG)}</td>
                                <td class="num-cell">${formatNumber(summary.sumCash)}</td>
                                <td class="num-cell">${formatNumber(summary.sumDispPurchases)}</td>
                                <td class="num-cell">${formatNumber(summary.sumZK)}</td>
                                <td class="num-cell">${formatNumber(summary.sumBP)}</td>
                                <td class="num-cell">${formatNumber(summary.sumUSExp)}</td>
                                <td class="num-cell">${formatNumber(summary.sumDentalExp)}</td>
                                <td class="num-cell">${formatNumber(summary.sumStoreExp)}</td>
                                <td class="num-cell" style="color: #a855f7; font-weight: 700;">Rs. ${formatNumber(summary.sumSNExp || 0)}</td>
                                <td class="num-cell" style="color: #0284c7; font-weight: 700;">Rs. ${formatNumber(summary.sumAC || 0)}</td>
                                <td class="num-cell" style="color: #f43f5e; font-weight: 700;">Rs. ${formatNumber(summary.sumOthersDebit || 0)}</td>
                                <td class="num-cell" style="color: #10b981; font-weight: 700;">Rs. ${formatNumber(summary.sumOthersCredit || 0)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        `;

        container.innerHTML = html;

        const btnSwitchSN = document.getElementById('btn-switch-sn-ledger');
        if (btnSwitchSN) {
            btnSwitchSN.onclick = () => {
                state.masterSubTab = 'sn_ledger';
                renderMasterGrid();
            };
        }

        container.querySelectorAll('.master-row').forEach(r => {
            r.addEventListener('click', () => {
                const dt = r.dataset.date;
                if (!confirm(`Open Daily Sheet for ${dt}?`)) return;
                saveCurrentDay(false);
                state.currentDate = dt;
                elements.dateInput.value = dt;
                updateDateBadge(dt);
                loadDay(dt);
                switchTab('view-daily');
            });
        });

        bindPeriodFilterEvents('master', state.masterFilter, renderMasterGrid);

        const exportBtn = document.getElementById('export-master-csv-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                exportTableToCSV('master-grid-table', `${fileLabel}_Clinic_Master_Data.csv`);
            });
        }
    }

    // ==========================================================
    // STAFF & DOCTORS LEDGER (EXCEL STAFF SHEET)
    // ==========================================================
    function renderStaffMatrix() {
        const container = document.getElementById('staff-matrix-container');
        const staffList = clinicDB.getStaffList();
        const { days, summary, label, fileLabel } = resolvePeriodData(state.staffFilter);

        let html = `
            <div class="table-card">
                <div class="table-toolbar" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
                    <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
                        <div class="table-title">
                            👥 Staff & Vendors Ledger - ${label}
                        </div>
                        ${getPeriodFilterBarHtml('staff', state.staffFilter)}
                    </div>
                    <div style="display: flex; gap: 0.75rem;">
                        <button type="button" class="btn btn-secondary btn-sm" id="export-staff-csv-btn">
                            📥 Export CSV
                        </button>
                        <button type="button" class="btn btn-primary btn-sm" onclick="window.print()">
                            🖨️ Print Ledger
                        </button>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="custom-table" id="staff-matrix-table">
                        <thead>
                            <tr>
                                <th>Date</th>
        `;

        staffList.forEach(s => {
            html += `<th class="num-cell">${escapeHtml(s.name)}</th>`;
        });

        html += `
                                <th class="num-cell" style="color: #f43f5e;">Day Total</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        days.forEach(({ dayNum, dateKey, data }) => {
            const payments = data.staffPayments || {};
            let dayTotal = 0;

            html += `<tr><td><strong>${formatDateKeyDisplay(dateKey)}</strong></td>`;

            staffList.forEach(s => {
                const pObj = payments[s.name];
                const amt = typeof pObj === 'number' ? pObj : (pObj?.amount || 0);
                dayTotal += amt;
                html += `<td class="num-cell">${amt > 0 ? formatNumber(amt) : '-'}</td>`;
            });

            html += `<td class="num-cell" style="font-weight: 700; color: #fda4af;">${formatNumber(dayTotal)}</td></tr>`;
        });

        html += `
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>TOTAL</td>
        `;

        let grandStaffSum = 0;
        staffList.forEach(s => {
            const sTotal = summary.staffTotals[s.name] || 0;
            grandStaffSum += sTotal;
            html += `<td class="num-cell" style="color: #38bdf8;">Rs. ${formatNumber(sTotal)}</td>`;
        });

        html += `
                                <td class="num-cell" style="color: #f43f5e; font-size: 1.1rem;">Rs. ${formatNumber(grandStaffSum)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <!-- Employee Individual Statements -->
            <div style="margin-top: 1.5rem;">
                <h3 style="font-family: var(--font-heading); margin-bottom: 1rem;">Employee Payout Slips & Detail Statements (${label})</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem;">
        `;

        staffList.forEach(s => {
            const total = summary.staffTotals[s.name] || 0;
            html += `
                <div class="pnl-card" style="padding: 1.25rem;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <h4 style="font-size: 1.05rem; font-weight: 700;">${escapeHtml(s.name)}</h4>
                            <span style="font-size: 0.75rem; color: var(--text-muted);">${escapeHtml(s.role)}</span>
                        </div>
                        <span class="col-total-badge debit" style="font-size: 0.9rem;">Rs. ${formatNumber(total)}</span>
                    </div>
                    <button type="button" class="btn btn-secondary btn-sm print-staff-slip-btn" data-staff="${escapeHtml(s.name)}" style="margin-top: 0.75rem;">
                        📄 View Statement with Reasons
                    </button>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;

        container.innerHTML = html;

        container.querySelectorAll('.print-staff-slip-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const sName = btn.dataset.staff;
                const reportSelect = document.getElementById('report-category-select');
                if (reportSelect) {
                    reportSelect.value = `staff:${sName}`;
                    switchTab('view-reports');
                }
            });
        });

        bindPeriodFilterEvents('staff', state.staffFilter, renderStaffMatrix);

        const exportStaffBtn = document.getElementById('export-staff-csv-btn');
        if (exportStaffBtn) {
            exportStaffBtn.addEventListener('click', () => {
                exportTableToCSV('staff-matrix-table', `${fileLabel}_Staff_Salaries.csv`);
            });
        }
    }

    // ==========================================================
    // TOTAL SHEET: P&L FINANCIAL STATEMENTS
    // ==========================================================
    function renderPnL() {
        const container = document.getElementById('pnl-container');
        const { summary, label, days } = resolvePeriodData(state.pnlFilter);

        // Determine unique period key for stock reconciliation
        const periodKey = state.pnlFilter.mode === 'month' 
            ? (state.pnlFilter.month || state.currentMonth)
            : (state.pnlFilter.start ? `${state.pnlFilter.start}_${state.pnlFilter.end}` : state.currentMonth);

        const stockData = clinicDB.getStockReconciliation(periodKey);
        const prevStockTP = stockData.prevStockTP || 0;
        const presentStockTP = stockData.presentStockTP || 0;

        // Calculate Purchase This Month TP from store purchases in this period
        let purchaseThisMonthTP = 0;
        (days || []).forEach(({ data }) => {
            if (data.storePurchases && Array.isArray(data.storePurchases)) {
                data.storePurchases.forEach(sp => {
                    purchaseThisMonthTP += (parseFloat(sp.tp) || 0);
                });
            }
        });
        if (purchaseThisMonthTP === 0 && summary.sumStoreMedPurchases) {
            purchaseThisMonthTP = summary.sumStoreMedPurchases;
        }

        // Calculate St Sale This Month from credits
        let stSaleThisMonth = summary.sumStSaleThisMonth || 0;
        if (stSaleThisMonth === 0) {
            (days || []).forEach(({ data }) => {
                (data.credits || []).forEach(c => {
                    const n = (c.name || '').toLowerCase().trim();
                    if (n === 'st s' || n.includes('store sale') || n === 'sts') {
                        stSaleThisMonth += (parseFloat(c.amount) || 0);
                    }
                });
            });
        }

        const total1 = prevStockTP + purchaseThisMonthTP;
        const total2 = stSaleThisMonth + presentStockTP;
        const stockDiff = total1 - total2;

        let html = `
            <div class="grand-statement">
                <div class="grand-title" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; width: 100%; gap: 1rem;">
                    <div>
                        <h2>Clinic & Medical Center P&L Statement</h2>
                        <p>Consolidated Accounts & Departmental Gross Profit (${label})</p>
                    </div>
                    <div class="no-print" style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
                        <div style="background: rgba(255, 255, 255, 0.15); padding: 0.35rem 0.6rem; border-radius: 6px; display: flex; align-items: center; gap: 0.5rem;">
                            ${getPeriodFilterBarHtml('pnl', state.pnlFilter)}
                        </div>
                        <button type="button" class="btn btn-primary btn-sm" id="print-pnl-btn" onclick="window.print()" style="display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.35rem 0.8rem; font-weight: 600; cursor: pointer; border-radius: 6px; font-size: 0.82rem; background: #2563eb; color: #fff; border: 1px solid #1d4ed8; box-shadow: 0 1px 3px rgba(0,0,0,0.2);">
                            🖨️ Print Report
                        </button>
                    </div>
                </div>
                <div class="grand-metrics">
                    <div class="grand-metric-item">
                        <span class="grand-metric-label">Clinic Gross</span>
                        <span class="grand-metric-val" style="color: #38bdf8;">Rs. ${formatNumber(summary.clinicGross)}</span>
                    </div>
                    <div class="grand-metric-item">
                        <span class="grand-metric-label">US Gross</span>
                        <span class="grand-metric-val" style="color: #34d399;">Rs. ${formatNumber(summary.usGross)}</span>
                    </div>
                    <div class="grand-metric-item">
                        <span class="grand-metric-label">Clinic + US Combined Gross</span>
                        <span class="grand-metric-val" style="color: #60a5fa;">Rs. ${formatNumber(summary.overallGross)}</span>
                    </div>
                </div>
            </div>

            <div class="pnl-grid">
                <!-- Store Performance -->
                <div class="pnl-card">
                    <div class="pnl-card-header">🏪 Medical Store Performance</div>
                    <div class="pnl-row">
                        <span>Sale Price (TP) Med:</span>
                        <span class="num-cell">Rs. ${formatNumber(summary.sumStoreSalesRetail)}</span>
                    </div>
                    <div class="pnl-row">
                        <span>Purchase Price Med:</span>
                        <span class="num-cell" style="color: #fb7185;">- Rs. ${formatNumber(summary.sumStoreMedPurchases)}</span>
                    </div>
                    <div class="pnl-row highlight primary">
                        <span>Store Margin / Profit:</span>
                        <span class="num-cell">Rs. ${formatNumber(summary.storeProfit)}</span>
                    </div>
                    <div class="pnl-row sub">
                        <span>Store Running Expenses:</span>
                        <span class="num-cell">- Rs. ${formatNumber(summary.sumStoreExp)}</span>
                    </div>
                    <div class="pnl-row highlight credit">
                        <span>Store Gross Profit:</span>
                        <span class="num-cell">Rs. ${formatNumber(summary.storeGross)}</span>
                    </div>
                </div>

                <!-- US Performance -->
                <div class="pnl-card">
                    <div class="pnl-card-header">🔬 Ultrasound (US) Department</div>
                    <div class="pnl-row">
                        <span>US Patient Receipts:</span>
                        <span class="num-cell" style="color: #34d399;">Rs. ${formatNumber(summary.sumUSInc)}</span>
                    </div>
                    <div class="pnl-row">
                        <span>US Expenses:</span>
                        <span class="num-cell" style="color: #fb7185;">- Rs. ${formatNumber(summary.sumUSExp)}</span>
                    </div>
                    <div class="pnl-row highlight credit">
                        <span>US Gross Profit:</span>
                        <span class="num-cell">Rs. ${formatNumber(summary.usGross)}</span>
                    </div>
                </div>

                <!-- Lab Performance -->
                <div class="pnl-card">
                    <div class="pnl-card-header">🧪 Laboratory (LB) Department</div>
                    <div class="pnl-row">
                        <span>LB Diagnostic Receipts:</span>
                        <span class="num-cell" style="color: #34d399;">Rs. ${formatNumber(summary.sumLBInc)}</span>
                    </div>
                    <div class="pnl-row">
                        <span>LB Expenses:</span>
                        <span class="num-cell" style="color: #fb7185;">- Rs. ${formatNumber(summary.sumLBExp)}</span>
                    </div>
                    <div class="pnl-row highlight primary">
                        <span>LB Net Profit:</span>
                        <span class="num-cell">Rs. ${formatNumber(summary.lbProfit)}</span>
                    </div>
                </div>

                <!-- Clinic & Dispensary -->
                <div class="pnl-card">
                    <div class="pnl-card-header">🩺 Dispensary & Clinic Operations</div>
                    <div class="pnl-row">
                        <span>Dispensary Income:</span>
                        <span class="num-cell">Rs. ${formatNumber(summary.sumDispInc)}</span>
                    </div>
                    <div class="pnl-row">
                        <span>Dispensary Purchases:</span>
                        <span class="num-cell" style="color: #fb7185;">- Rs. ${formatNumber(summary.sumDispPurchases)}</span>
                    </div>
                    <div class="pnl-row highlight primary">
                        <span>Dispensary Gross:</span>
                        <span class="num-cell">Rs. ${formatNumber(summary.dispGross)}</span>
                    </div>
                    <div class="pnl-row sub">
                        <span>Clinic Petty Expenses:</span>
                        <span class="num-cell">- Rs. ${formatNumber(summary.sumClinicExp)}</span>
                    </div>
                    <div class="pnl-row sub">
                        <span>Salaries / Staff Total:</span>
                        <span class="num-cell">- Rs. ${formatNumber(summary.totalSalaries)}</span>
                    </div>
                    <div class="pnl-row highlight credit">
                        <span>Clinic Net Gross:</span>
                        <span class="num-cell">Rs. ${formatNumber(summary.clinicGross)}</span>
                    </div>
                </div>

                <!-- Partners -->
                <div class="pnl-card">
                    <div class="pnl-card-header">🤝 Partner Withdrawals & Accounts</div>
                    <div class="pnl-row">
                        <span>ZK Withdrawals:</span>
                        <span class="num-cell">Rs. ${formatNumber(summary.sumZK)}</span>
                    </div>
                    <div class="pnl-row">
                        <span>KH Withdrawals:</span>
                        <span class="num-cell">Rs. ${formatNumber(summary.sumKH)}</span>
                    </div>
                    <div class="pnl-row">
                        <span>BP Withdrawals:</span>
                        <span class="num-cell">Rs. ${formatNumber(summary.sumBP)}</span>
                    </div>
                    <div class="pnl-row highlight debit">
                        <span>Total Partner Payouts:</span>
                        <span class="num-cell">Rs. ${formatNumber(summary.partnersTotal)}</span>
                    </div>
                </div>

                <!-- General Outflows -->
                <div class="pnl-card">
                    <div class="pnl-card-header">🏠 Household & Other Withdrawals</div>
                    <div class="pnl-row">
                        <span>Home Expenses:</span>
                        <span class="num-cell" style="color: #fb7185;">Rs. ${formatNumber(summary.sumHomeExp)}</span>
                    </div>
                    <div class="pnl-row">
                        <span>Dental Clinic Exp:</span>
                        <span class="num-cell">Rs. ${formatNumber(summary.sumDentalExp)}</span>
                    </div>
                    <div class="pnl-row">
                        <span>A/C (Account):</span>
                        <span class="num-cell" style="color: #0284c7;">Rs. ${formatNumber(summary.sumAC || 0)}</span>
                    </div>
                    <div class="pnl-row">
                        <span>SN Expenses:</span>
                        <span class="num-cell" style="color: #a855f7;">Rs. ${formatNumber(summary.sumSNExp || 0)}</span>
                    </div>
                    <div class="pnl-row">
                        <span>ECG Income:</span>
                        <span class="num-cell" style="color: #34d399;">Rs. ${formatNumber(summary.sumECG)}</span>
                    </div>
                    <div class="pnl-row">
                        <span>Cash Taken Away (Safe/Deposit):</span>
                        <span class="num-cell" style="color: #f59e0b;">Rs. ${formatNumber(summary.sumCash)}</span>
                    </div>
                </div>
            </div>

            <!-- Medical Store Stock Reconciliation & Difference (User Requested Segment) -->
            <div class="stock-reconciliation-card">
                <div class="stock-rec-header">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span>📦</span>
                        <span>Medical Store Stock Reconciliation & Difference (${label})</span>
                    </div>
                    <span id="stock-save-pill" class="auto-save-pill" style="font-size: 0.72rem; padding: 0.15rem 0.5rem; background: rgba(255,255,255,0.2); color: #fff; border: 1px solid rgba(255,255,255,0.3);">✓ Auto-saved</span>
                </div>

                <div class="stock-rec-body">
                    <!-- ROW 1: Prev Month Stock TP + Purchase This Month TP -->
                    <div class="stock-block">
                        <div class="stock-block-header">
                            <div>Prev Month Stock TP</div>
                            <div style="font-size: 1.15rem; font-weight: 900;">+</div>
                            <div>Purchase This Month TP</div>
                        </div>
                        <div class="stock-block-row">
                            <input type="number" step="any" class="stock-cell-input" id="stock-prev-month" value="${prevStockTP || 0}" title="Enter Previous Month Stock TP (Manual)">
                            <div class="stock-cell-plus">+</div>
                            <div class="stock-cell-readonly" id="stock-purchase-display">${formatNumber(purchaseThisMonthTP)}</div>
                        </div>
                        <div class="stock-subtotal-row" id="stock-total-1-display">
                            ${formatNumber(total1)}
                        </div>
                    </div>

                    <!-- ROW 2: St Sale This Month + Present Month Stock TP -->
                    <div class="stock-block">
                        <div class="stock-block-header">
                            <div>St Sale This Month</div>
                            <div style="font-size: 1.15rem; font-weight: 900;">+</div>
                            <div>Present Month Stock TP</div>
                        </div>
                        <div class="stock-block-row">
                            <div class="stock-cell-readonly" id="stock-sale-display">${formatNumber(stSaleThisMonth)}</div>
                            <div class="stock-cell-plus">+</div>
                            <input type="number" step="any" class="stock-cell-input" id="stock-present-month" value="${presentStockTP || 0}" title="Enter Present Month Stock TP (Manual count)">
                        </div>
                        <div class="stock-subtotal-row" id="stock-total-2-display">
                            ${formatNumber(total2)}
                        </div>
                    </div>

                    <!-- ROW 3: Stock Difference -->
                    <div class="stock-block">
                        <div class="stock-block-header single">
                            Stock Difference
                        </div>
                        <div class="stock-diff-val" id="stock-diff-display">
                            ${formatNumber(stockDiff)}
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;

        // Wire up interactive calculation and auto-saving for stock reconciliation
        const inpPrev = document.getElementById('stock-prev-month');
        const inpPresent = document.getElementById('stock-present-month');
        const dispTotal1 = document.getElementById('stock-total-1-display');
        const dispTotal2 = document.getElementById('stock-total-2-display');
        const dispDiff = document.getElementById('stock-diff-display');
        const savePill = document.getElementById('stock-save-pill');

        function updateStockCalculations() {
            const pVal = parseFloat(inpPrev?.value) || 0;
            const prVal = parseFloat(inpPresent?.value) || 0;
            const t1 = pVal + purchaseThisMonthTP;
            const t2 = stSaleThisMonth + prVal;
            const diff = t1 - t2;

            if (dispTotal1) dispTotal1.textContent = formatNumber(t1);
            if (dispTotal2) dispTotal2.textContent = formatNumber(t2);
            if (dispDiff) dispDiff.textContent = formatNumber(diff);

            clinicDB.saveStockReconciliation(periodKey, { prevStockTP: pVal, presentStockTP: prVal });
            if (savePill) {
                savePill.textContent = '✓ Saved';
                savePill.style.background = '#ecfdf5';
                savePill.style.color = '#059669';
                setTimeout(() => {
                    if (savePill) {
                        savePill.textContent = '✓ Auto-saved';
                        savePill.style.background = 'rgba(255,255,255,0.2)';
                        savePill.style.color = '#fff';
                    }
                }, 1500);
            }
        }

        if (inpPrev) {
            inpPrev.addEventListener('input', updateStockCalculations);
            inpPrev.addEventListener('focus', () => { if (inpPrev.value === '0') inpPrev.select(); });
        }
        if (inpPresent) {
            inpPresent.addEventListener('input', updateStockCalculations);
            inpPresent.addEventListener('focus', () => { if (inpPresent.value === '0') inpPresent.select(); });
        }

        bindPeriodFilterEvents('pnl', state.pnlFilter, renderPnL);
        const printBtn = document.getElementById('print-pnl-btn');
        if (printBtn) printBtn.onclick = () => window.print();
    }

    // ==========================================================
    // 4B. MEDICAL STORE STOCK RECONCILIATION & DIFFERENCE VIEW
    // ==========================================================
    function renderStockReconciliationView() {
        const container = document.getElementById('stock-view-container');
        if (!container) return;
        const { summary, label, days } = resolvePeriodData(state.stockFilter);

        const periodKey = state.stockFilter.mode === 'month' 
            ? (state.stockFilter.month || state.currentMonth)
            : (state.stockFilter.start ? `${state.stockFilter.start}_${state.stockFilter.end}` : state.currentMonth);

        const stockData = clinicDB.getStockReconciliation(periodKey);
        const prevStockTP = stockData.prevStockTP || 0;
        const presentStockTP = stockData.presentStockTP || 0;

        // Calculate Purchase This Month TP from store purchases in this period
        let purchaseThisMonthTP = 0;
        const purchaseBreakdown = [];
        (days || []).forEach(({ dateKey, data }) => {
            if (data.storePurchases && Array.isArray(data.storePurchases)) {
                data.storePurchases.forEach(sp => {
                    const tpVal = parseFloat(sp.tp) || 0;
                    if (tpVal > 0 || (sp.distributor && sp.distributor.trim())) {
                        purchaseThisMonthTP += tpVal;
                        purchaseBreakdown.push({
                            date: dateKey,
                            distributor: sp.distributor || 'General Store',
                            tp: tpVal,
                            retail: parseFloat(sp.retail) || 0
                        });
                    }
                });
            }
        });
        if (purchaseThisMonthTP === 0 && summary.sumStoreMedPurchases) {
            purchaseThisMonthTP = summary.sumStoreMedPurchases;
        }

        // Calculate St Sale This Month from credits
        let stSaleThisMonth = summary.sumStSaleThisMonth || 0;
        const saleBreakdown = [];
        (days || []).forEach(({ dateKey, data }) => {
            (data.credits || []).forEach(c => {
                const n = (c.name || '').toLowerCase().trim();
                if (n === 'st s' || n.includes('store sale') || n === 'sts') {
                    const amt = parseFloat(c.amount) || 0;
                    if (amt > 0) {
                        saleBreakdown.push({
                            date: dateKey,
                            name: c.name || 'Store Sale',
                            amount: amt
                        });
                    }
                }
            });
        });
        if (stSaleThisMonth === 0 && saleBreakdown.length > 0) {
            stSaleThisMonth = saleBreakdown.reduce((sum, item) => sum + item.amount, 0);
        }

        const total1 = prevStockTP + purchaseThisMonthTP;
        const total2 = stSaleThisMonth + presentStockTP;
        const stockDiff = total1 - total2;

        let diffStatusHtml = '';
        if (stockDiff > 0) {
            diffStatusHtml = `<span style="color: #dc2626; font-weight: 800; background: #fef2f2; padding: 0.35rem 0.85rem; border-radius: 6px; border: 1.5px solid #f87171;">Surplus: +${formatNumber(stockDiff)} (Cash Short)</span>`;
        } else if (stockDiff < 0) {
            diffStatusHtml = `<span style="color: #059669; font-weight: 800; background: #ecfdf5; padding: 0.35rem 0.85rem; border-radius: 6px; border: 1.5px solid #34d399;">Deficit: -${formatNumber(Math.abs(stockDiff))} (Cash Excess)</span>`;
        } else {
            diffStatusHtml = `<span style="color: #0284c7; font-weight: 800; background: #f0f9ff; padding: 0.35rem 0.85rem; border-radius: 6px; border: 1.5px solid #38bdf8;">Calculated: Balanced (Rs. 0)</span>`;
        }

        let html = `
            <div class="stock-view-layout" style="max-width: 860px; margin: 0 auto; padding-bottom: 2.5rem;">
                <!-- Header Banner -->
                <div class="grand-statement" style="margin-bottom: 1.5rem;">
                    <div class="grand-title" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; width: 100%; gap: 1rem;">
                        <div>
                            <h2>📦 Medical Store Stock Reconciliation & Difference</h2>
                            <p>Monthly Physical Stock vs Daily Sales Audit (${label})</p>
                        </div>
                        <div class="no-print" style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
                            <div style="background: rgba(255, 255, 255, 0.15); padding: 0.35rem 0.6rem; border-radius: 6px; display: flex; align-items: center; gap: 0.5rem;">
                                ${getPeriodFilterBarHtml('stock', state.stockFilter)}
                            </div>
                            <button type="button" class="btn btn-primary btn-sm" id="print-stock-view-btn" onclick="window.print()" style="display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.35rem 0.8rem; font-weight: 600; cursor: pointer; border-radius: 6px; font-size: 0.82rem; background: #2563eb; color: #fff; border: 1px solid #1d4ed8; box-shadow: 0 1px 3px rgba(0,0,0,0.2);">
                                🖨️ Print Stock Sheet
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Print Banner (Visible only on print) -->
                <div class="print-only print-header-banner" style="margin-bottom: 1.25rem;">
                    <div>
                        <h2>CLINIC & MEDICAL STORE - STOCK RECONCILIATION</h2>
                        <p>Period: ${label} | Physical Stock vs Daily Sales Audit</p>
                    </div>
                    <div style="text-align: right;">
                        <span>Printed: ${todayDateStr}</span>
                    </div>
                </div>

                <!-- Main Reconciliation Card -->
                <div class="stock-reconciliation-card" style="max-width: 680px; margin: 0 auto 1.5rem auto;">
                    <div class="stock-rec-header">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span>📦</span>
                            <span>Medical Store Stock Reconciliation & Difference (${label})</span>
                        </div>
                        <span id="stock-view-save-pill" class="auto-save-pill" style="font-size: 0.72rem; padding: 0.15rem 0.5rem; background: rgba(255,255,255,0.2); color: #fff; border: 1px solid rgba(255,255,255,0.3);">✓ Auto-saved</span>
                    </div>

                    <div class="stock-rec-body">
                        <!-- ROW 1: Prev Month Stock TP + Purchase This Month TP -->
                        <div class="stock-block">
                            <div class="stock-block-header">
                                <div>Prev Month Stock TP</div>
                                <div style="font-size: 1.15rem; font-weight: 900;">+</div>
                                <div>Purchase This Month TP</div>
                            </div>
                            <div class="stock-block-row">
                                <input type="number" step="any" class="stock-cell-input" id="stock-view-prev-month" value="${prevStockTP || 0}" title="Enter Previous Month Stock TP (Manual count)">
                                <div class="stock-cell-plus">+</div>
                                <div class="stock-cell-readonly" id="stock-view-purchase-display">${formatNumber(purchaseThisMonthTP)}</div>
                            </div>
                            <div class="stock-subtotal-row" id="stock-view-total-1-display">
                                ${formatNumber(total1)}
                            </div>
                        </div>

                        <!-- ROW 2: St Sale This Month + Present Month Stock TP -->
                        <div class="stock-block">
                            <div class="stock-block-header">
                                <div>St Sale This Month</div>
                                <div style="font-size: 1.15rem; font-weight: 900;">+</div>
                                <div>Present Month Stock TP</div>
                            </div>
                            <div class="stock-block-row">
                                <div class="stock-cell-readonly" id="stock-view-sale-display">${formatNumber(stSaleThisMonth)}</div>
                                <div class="stock-cell-plus">+</div>
                                <input type="number" step="any" class="stock-cell-input" id="stock-view-present-month" value="${presentStockTP || 0}" title="Enter Present Month Stock TP (Manual count)">
                            </div>
                            <div class="stock-subtotal-row" id="stock-view-total-2-display">
                                ${formatNumber(total2)}
                            </div>
                        </div>

                        <!-- ROW 3: Stock Difference -->
                        <div class="stock-block">
                            <div class="stock-block-header single">
                                Stock Difference
                            </div>
                            <div class="stock-diff-val" id="stock-view-diff-display">
                                ${formatNumber(stockDiff)}
                            </div>
                        </div>

                        <!-- Status Badge -->
                        <div style="text-align: center; margin-top: 0.25rem;">
                            <span id="stock-view-status-display">${diffStatusHtml}</span>
                        </div>
                    </div>
                </div>

                <!-- Explanation & Formula Guide -->
                <div class="stock-guide-box no-print" style="max-width: 680px; margin: 0 auto 1.5rem auto; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 1rem 1.25rem; box-shadow: var(--shadow-sm);">
                    <div style="font-weight: 700; font-size: 0.9rem; color: #1e293b; margin-bottom: 0.4rem;">
                        💡 How this calculation works:
                    </div>
                    <ul style="font-size: 0.82rem; color: #475569; margin: 0; padding-left: 1.2rem; line-height: 1.6;">
                        <li><strong>Subtotal 1:</strong> Previous Month Stock (TP) + Store Purchases (TP) during this period.</li>
                        <li><strong>Subtotal 2:</strong> Store Sales (St S) during this period + Present Month Physical Stock (TP).</li>
                        <li><strong>Stock Difference:</strong> Subtotal 1 minus Subtotal 2.</li>
                        <li>Yellow fields with bold numbers can be edited — changes are <strong>auto-saved</strong> instantly.</li>
                    </ul>
                </div>

                <!-- Detailed Audit Breakdown (Purchases & Sales) -->
                <div class="no-print" style="max-width: 680px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.25rem;">
                    <!-- Store Purchases Table -->
                    <div style="background: #ffffff; border: 1.5px solid #000000; border-radius: 6px; overflow: hidden; box-shadow: var(--shadow-sm);">
                        <div style="background: #1e293b; color: #ffffff; padding: 0.5rem 1rem; font-weight: 700; font-size: 0.85rem; display: flex; justify-content: space-between; align-items: center;">
                            <span>📦 Store Purchases TP Breakdown (${purchaseBreakdown.length} Entries)</span>
                            <span>Total TP: Rs. ${formatNumber(purchaseThisMonthTP)}</span>
                        </div>
                        <div style="max-height: 240px; overflow-y: auto;">
                            <table class="stock-audit-table" style="width: 100%; border-collapse: collapse; font-size: 0.82rem;">
                                <thead>
                                    <tr style="background: #f1f5f9; border-bottom: 1px solid #cbd5e1;">
                                        <th style="padding: 6px 10px; text-align: left;">Date</th>
                                        <th style="padding: 6px 10px; text-align: left;">Distributor</th>
                                        <th style="padding: 6px 10px; text-align: right;">TP (Rs.)</th>
                                        <th style="padding: 6px 10px; text-align: right;">Retail (Rs.)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${purchaseBreakdown.length === 0 ? '<tr><td colspan="4" style="text-align: center; padding: 12px; color: #94a3b8;">No store purchase entries found in this period</td></tr>' : purchaseBreakdown.map(p => `
                                        <tr style="border-bottom: 1px solid #f1f5f9;">
                                            <td style="padding: 5px 10px;">${p.date}</td>
                                            <td style="padding: 5px 10px; font-weight: 600;">${p.distributor}</td>
                                            <td style="padding: 5px 10px; text-align: right; font-weight: 700; color: #0284c7;">Rs. ${formatNumber(p.tp)}</td>
                                            <td style="padding: 5px 10px; text-align: right; color: #64748b;">Rs. ${formatNumber(p.retail)}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Store Sales Table -->
                    <div style="background: #ffffff; border: 1.5px solid #000000; border-radius: 6px; overflow: hidden; box-shadow: var(--shadow-sm);">
                        <div style="background: #1e293b; color: #ffffff; padding: 0.5rem 1rem; font-weight: 700; font-size: 0.85rem; display: flex; justify-content: space-between; align-items: center;">
                            <span>💰 Store Sales (St S) Breakdown (${saleBreakdown.length} Entries)</span>
                            <span>Total Sales: Rs. ${formatNumber(stSaleThisMonth)}</span>
                        </div>
                        <div style="max-height: 240px; overflow-y: auto;">
                            <table class="stock-audit-table" style="width: 100%; border-collapse: collapse; font-size: 0.82rem;">
                                <thead>
                                    <tr style="background: #f1f5f9; border-bottom: 1px solid #cbd5e1;">
                                        <th style="padding: 6px 10px; text-align: left;">Date</th>
                                        <th style="padding: 6px 10px; text-align: left;">Entry Name</th>
                                        <th style="padding: 6px 10px; text-align: right;">Amount (Rs.)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${saleBreakdown.length === 0 ? '<tr><td colspan="3" style="text-align: center; padding: 12px; color: #94a3b8;">No store sales entries found in this period</td></tr>' : saleBreakdown.map(s => `
                                        <tr style="border-bottom: 1px solid #f1f5f9;">
                                            <td style="padding: 5px 10px;">${s.date}</td>
                                            <td style="padding: 5px 10px; font-weight: 600;">${s.name}</td>
                                            <td style="padding: 5px 10px; text-align: right; font-weight: 700; color: #059669;">Rs. ${formatNumber(s.amount)}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Signature Footer for Print -->
                <div class="print-only signature-area" style="display: flex; justify-content: space-between; margin-top: 3.5rem; padding-top: 1rem; border-top: 1px solid #000;">
                    <div style="text-align: center; width: 200px; border-top: 1.5px dashed #000; padding-top: 5px; font-weight: bold; font-size: 8.5pt;">Store In-charge</div>
                    <div style="text-align: center; width: 200px; border-top: 1.5px dashed #000; padding-top: 5px; font-weight: bold; font-size: 8.5pt;">Internal Auditor</div>
                    <div style="text-align: center; width: 200px; border-top: 1.5px dashed #000; padding-top: 5px; font-weight: bold; font-size: 8.5pt;">Authorized Signature</div>
                </div>
            </div>
        `;

        container.innerHTML = html;

        // Wire interactive inputs
        const inpPrev = document.getElementById('stock-view-prev-month');
        const inpPresent = document.getElementById('stock-view-present-month');
        const dispTotal1 = document.getElementById('stock-view-total-1-display');
        const dispTotal2 = document.getElementById('stock-view-total-2-display');
        const dispDiff = document.getElementById('stock-view-diff-display');
        const dispStatus = document.getElementById('stock-view-status-display');
        const savePill = document.getElementById('stock-view-save-pill');

        function updateStockViewCalculations() {
            const pVal = parseFloat(inpPrev?.value) || 0;
            const prVal = parseFloat(inpPresent?.value) || 0;
            const t1 = pVal + purchaseThisMonthTP;
            const t2 = stSaleThisMonth + prVal;
            const diff = t1 - t2;

            if (dispTotal1) dispTotal1.textContent = formatNumber(t1);
            if (dispTotal2) dispTotal2.textContent = formatNumber(t2);
            if (dispDiff) dispDiff.textContent = formatNumber(diff);

            if (dispStatus) {
                if (diff > 0) {
                    dispStatus.innerHTML = `<span style="color: #dc2626; font-weight: 800; background: #fef2f2; padding: 0.35rem 0.85rem; border-radius: 6px; border: 1.5px solid #f87171;">Surplus: +${formatNumber(diff)} (Cash Short)</span>`;
                } else if (diff < 0) {
                    dispStatus.innerHTML = `<span style="color: #059669; font-weight: 800; background: #ecfdf5; padding: 0.35rem 0.85rem; border-radius: 6px; border: 1.5px solid #34d399;">Deficit: -${formatNumber(Math.abs(diff))} (Cash Excess)</span>`;
                } else {
                    dispStatus.innerHTML = `<span style="color: #0284c7; font-weight: 800; background: #f0f9ff; padding: 0.35rem 0.85rem; border-radius: 6px; border: 1.5px solid #38bdf8;">Calculated: Balanced (Rs. 0)</span>`;
                }
            }

            clinicDB.saveStockReconciliation(periodKey, { prevStockTP: pVal, presentStockTP: prVal });
            if (savePill) {
                savePill.textContent = '✓ Saved';
                savePill.style.background = '#ecfdf5';
                savePill.style.color = '#059669';
                setTimeout(() => {
                    if (savePill) {
                        savePill.textContent = '✓ Auto-saved';
                        savePill.style.background = 'rgba(255,255,255,0.2)';
                        savePill.style.color = '#fff';
                    }
                }, 1500);
            }
        }

        if (inpPrev) {
            inpPrev.addEventListener('input', updateStockViewCalculations);
            inpPrev.addEventListener('focus', () => { if (inpPrev.value === '0') inpPrev.select(); });
        }
        if (inpPresent) {
            inpPresent.addEventListener('input', updateStockViewCalculations);
            inpPresent.addEventListener('focus', () => { if (inpPresent.value === '0') inpPresent.select(); });
        }

        bindPeriodFilterEvents('stock', state.stockFilter, renderStockReconciliationView);
        const printBtn = document.getElementById('print-stock-view-btn');
        if (printBtn) printBtn.onclick = () => window.print();
    }

    // ==========================================================
    // MULTI-CATEGORY REPORTS (USER REQUESTED FEATURE)
    // ==========================================================
    function renderCategoryReports() {
        const filterCatSelect = document.getElementById('report-category-select');
        const filterRangeSelect = document.getElementById('report-range-select');
        const runBtn = document.getElementById('run-report-btn');
        const printBtn = document.getElementById('print-report-btn');
        const exportCsvBtn = document.getElementById('export-report-csv-btn');

        if (filterCatSelect) {
            const currentVal = filterCatSelect.value || 'all';
            const staffList = clinicDB.getStaffList();
            let optHtml = `
                <option value="all">-- All Combined (Complete Audit) --</option>
                <option value="all_debits">All Expenses (Debit Total)</option>
                <option value="all_credits">All Incomes (Credit Total)</option>
                <optgroup label="Daily Sheet Sub-Sections">
                    <option value="clinic_bills">Clinic Bills (Patient Bills)</option>
                    <option value="receivables">Receivables (Pending / Due)</option>
                    <option value="staff_vendors">Staff & Vendors (All Staff)</option>
                    <option value="disp_purchases">Dispensary Purchases</option>
                    <option value="store_purchases">Store Purchases (Medicines TP)</option>
                    <option value="st_s">Store Sales (St S)</option>
                    <option value="clinic_expenses">Clinic Petty Expenses</option>
                    <option value="clinic_inc">Clinic Pt + Dispensary Income</option>
                    <option value="lb_expenses">LB Expenses (Laboratory)</option>
                    <option value="lb_inc">LB Income (Laboratory)</option>
                    <option value="ecg">ECG Income</option>
                    <option value="us_expenses">US (Ultrasound) Expense</option>
                    <option value="us_inc">US (Ultrasound) Income</option>
                    <option value="dental_expenses">Dental Expense</option>
                    <option value="store_exp">Store Exp</option>
                    <option value="sn_expenses">SN Expenses (Breakdown)</option>
                    <option value="account_ac">A/C (Account Transfers / Deposits)</option>
                    <option value="daraz_cash">Daraz Cash (Opening Balance)</option>
                    <option value="cash_breakdown">Cash Breakdown</option>
                    <option value="home_expenses">Home Expenses (Home X)</option>
                    <option value="partners">Partner Payouts (ZK, KH, BP)</option>
                </optgroup>
                <optgroup label="Staff & Vendors">
            `;
            staffList.forEach(s => {
                optHtml += `<option value="staff:${escapeHtml(s.name)}">${escapeHtml(s.name)}</option>`;
            });
            optHtml += `</optgroup>`;

            const customExpenses = (clinicDB.categories?.expense || []).filter(c => !c.system);
            const customIncomes = (clinicDB.categories?.income || []).filter(c => !c.system);
            if (customExpenses.length > 0 || customIncomes.length > 0) {
                optHtml += `<optgroup label="Custom Categories">`;
                customExpenses.forEach(c => {
                    optHtml += `<option value="${escapeHtml(c.id || c.name)}">${escapeHtml(c.name)} (Custom Expense)</option>`;
                });
                customIncomes.forEach(c => {
                    optHtml += `<option value="${escapeHtml(c.id || c.name)}">${escapeHtml(c.name)} (Custom Income)</option>`;
                });
                optHtml += `</optgroup>`;
            }

            filterCatSelect.innerHTML = optHtml;
            if (currentVal && Array.from(filterCatSelect.options).some(o => o.value === currentVal)) {
                filterCatSelect.value = currentVal;
            }

            filterCatSelect.onchange = executeCategoryReport;
        }

        const monthSel = document.getElementById('report-month-select');
        if (monthSel) monthSel.onchange = executeCategoryReport;

        const yearSel = document.getElementById('report-year-select');
        if (yearSel) yearSel.onchange = executeCategoryReport;

        const singleDateInput = document.getElementById('report-single-date');
        if (singleDateInput) singleDateInput.onchange = executeCategoryReport;

        const startDateInput = document.getElementById('report-start-date');
        if (startDateInput) startDateInput.onchange = executeCategoryReport;

        const endDateInput = document.getElementById('report-end-date');
        if (endDateInput) endDateInput.onchange = executeCategoryReport;

        if (filterRangeSelect) {
            filterRangeSelect.onchange = () => {
                const v = filterRangeSelect.value;
                const monthYearGroup = document.getElementById('report-month-year-group');
                const monthWrapper = document.getElementById('report-month-wrapper');
                const singleDateGroup = document.getElementById('report-single-date-group');
                const customDateGroup = document.getElementById('custom-date-group');

                if (monthYearGroup) monthYearGroup.style.display = (v === 'month' || v === 'year') ? 'flex' : 'none';
                if (monthWrapper) monthWrapper.style.display = (v === 'month') ? 'block' : 'none';
                if (singleDateGroup) singleDateGroup.style.display = (v === 'single') ? 'flex' : 'none';
                if (customDateGroup) customDateGroup.style.display = (v === 'custom') ? 'flex' : 'none';

                executeCategoryReport();
            };
        }

        if (runBtn) runBtn.onclick = executeCategoryReport;
        if (printBtn) printBtn.onclick = () => window.print();
        if (exportCsvBtn) exportCsvBtn.onclick = () => exportTableToCSV('category-report-table', 'Category_Report.csv');

        executeCategoryReport();
    }

    function executeCategoryReport() {
        const catKey = document.getElementById('report-category-select')?.value || 'all';
        const range = document.getElementById('report-range-select')?.value || 'month';
        let start = '', end = '';

        if (range === 'month') {
            const y = document.getElementById('report-year-select')?.value || '2026';
            const m = document.getElementById('report-month-select')?.value || '09';
            const lastDay = new Date(parseInt(y, 10), parseInt(m, 10), 0).getDate();
            start = `${y}-${m}-01`;
            end = `${y}-${m}-${String(lastDay).padStart(2, '0')}`;
        } else if (range === 'year') {
            const y = document.getElementById('report-year-select')?.value || '2026';
            start = `${y}-01-01`;
            end = `${y}-12-31`;
        } else if (range === 'single' || range === 'today') {
            const singleInput = document.getElementById('report-single-date');
            const dVal = singleInput?.value || state.currentDate;
            start = dVal;
            end = dVal;
        } else if (range === 'custom') {
            start = document.getElementById('report-start-date')?.value || '2026-01-01';
            end = document.getElementById('report-end-date')?.value || '2026-12-31';
            if (start > end) {
                const temp = start;
                start = end;
                end = temp;
            }
        } else if (range === 'all-time') {
            start = '2000-01-01';
            end = '2099-12-31';
        }

        const report = clinicDB.getCategoryReport(catKey, start, end);
        const resultsContainer = document.getElementById('report-results-container');
        const catSelect = document.getElementById('report-category-select');
        const selectedLabel = (catSelect && catSelect.selectedOptions && catSelect.selectedOptions[0]) 
            ? catSelect.selectedOptions[0].textContent 
            : catKey.replace('staff:', 'Doctor/Staff: ');

        let html = `
            <div class="category-summary-banner">
                <div>
                    <h3>Category: ${escapeHtml(selectedLabel)}</h3>
                    <span style="color: var(--text-muted); font-size: 0.85rem;">Period: ${report.startDate} to ${report.endDate} &bull; Total Transactions: ${report.count}</span>
                </div>
                <div style="text-align: right;">
                    <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted);">Category Total</span>
                    <div class="cat-banner-total">Rs. ${formatNumber(report.grandTotal)}</div>
                </div>
            </div>

            <div class="table-card">
                <div class="table-responsive">
                    <table class="custom-table" id="category-report-table">
                        <thead>
                            <tr>
                                <th style="width: 14%;">Date</th>
                                <th style="width: 18%;">Category</th>
                                <th style="width: 28%;">Payee / Item</th>
                                <th style="width: 26%;">Reason / Detail</th>
                                <th class="num-cell" style="width: 14%;">Amount (Rs.)</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        if (report.rows.length === 0) {
            html += `<tr><td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-muted);">No entries found for this category and date range.</td></tr>`;
        } else {
            report.rows.forEach(r => {
                const isCredit = r.type.includes('Credit');
                html += `
                    <tr>
                        <td><strong>${r.date}</strong></td>
                        <td><span class="report-cat-badge">${escapeHtml(r.category)}</span></td>
                        <td><strong>${escapeHtml(r.item)}</strong></td>
                        <td class="report-desc-cell">${escapeHtml(r.description)}</td>
                        <td class="num-cell report-amount-cell ${isCredit ? 'cr' : 'dr'}">Rs. ${formatNumber(r.amount)}</td>
                    </tr>
                `;
            });
        }

        html += `
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="4">CATEGORY GRAND TOTAL</td>
                                <td class="num-cell cat-grand-total">Rs. ${formatNumber(report.grandTotal)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        `;

        resultsContainer.innerHTML = html;
    }

    // ==========================================================
    // SETTINGS VIEW: CATEGORIES & STAFF MANAGEMENT
    // ==========================================================
    function renderSettings() {
        const catListExpense = document.getElementById('settings-expense-categories');
        const catListIncome = document.getElementById('settings-income-categories');
        const staffListEl = document.getElementById('settings-staff-list');

        if (!catListExpense) return;

        const categories = clinicDB.getCategories();
        const staff = clinicDB.getStaffList();

        catListExpense.innerHTML = '';
        (categories.expense || []).forEach(cat => {
            const div = document.createElement('div');
            div.className = 'settings-item';
            div.innerHTML = `
                <div>
                    <strong>${escapeHtml(cat.name)}</strong>
                    ${cat.code ? `<span style="font-size: 0.7rem; padding: 0.15rem 0.4rem; background: rgba(255,255,255,0.08); border-radius: 4px; margin-left: 0.4rem;">${escapeHtml(cat.code)}</span>` : ''}
                    ${cat.system ? `<span style="font-size: 0.7rem; color: #38bdf8; margin-left: 0.4rem;">(Predefined)</span>` : ''}
                </div>
                <div>
                    ${!cat.system ? `<button type="button" class="btn-icon btn-sm del-cat-btn" style="color: #f43f5e;" data-id="${cat.id}">&times; Delete</button>` : ''}
                </div>
            `;
            const delBtn = div.querySelector('.del-cat-btn');
            if (delBtn) {
                delBtn.addEventListener('click', () => {
                    if (confirm(`Delete category "${cat.name}"?`)) {
                        clinicDB.deleteCategory('expense', cat.id);
                        renderSettings();
                        showToast('Category deleted', 'info');
                    }
                });
            }
            catListExpense.appendChild(div);
        });

        catListIncome.innerHTML = '';
        (categories.income || []).forEach(cat => {
            const div = document.createElement('div');
            div.className = 'settings-item';
            div.innerHTML = `
                <div>
                    <strong>${escapeHtml(cat.name)}</strong>
                    ${cat.code ? `<span style="font-size: 0.7rem; padding: 0.15rem 0.4rem; background: rgba(255,255,255,0.08); border-radius: 4px; margin-left: 0.4rem;">${escapeHtml(cat.code)}</span>` : ''}
                    ${cat.system ? `<span style="font-size: 0.7rem; color: #38bdf8; margin-left: 0.4rem;">(Predefined)</span>` : ''}
                </div>
                <div>
                    ${!cat.system ? `<button type="button" class="btn-icon btn-sm del-inc-btn" style="color: #f43f5e;" data-id="${cat.id}">&times; Delete</button>` : ''}
                </div>
            `;
            const delBtn = div.querySelector('.del-inc-btn');
            if (delBtn) {
                delBtn.addEventListener('click', () => {
                    if (confirm(`Delete category "${cat.name}"?`)) {
                        clinicDB.deleteCategory('income', cat.id);
                        renderSettings();
                        showToast('Category deleted', 'info');
                    }
                });
            }
            catListIncome.appendChild(div);
        });

        staffListEl.innerHTML = '';
        staff.forEach(s => {
            const div = document.createElement('div');
            div.className = 'settings-item';
            div.innerHTML = `
                <div>
                    <strong>${escapeHtml(s.name)}</strong>
                </div>
                <div>
                    <button type="button" class="btn-icon btn-sm del-staff-btn" style="color: #f43f5e;" data-id="${s.id}">&times; Remove</button>
                </div>
            `;
            div.querySelector('.del-staff-btn').addEventListener('click', () => {
                if (confirm(`Remove "${s.name}" from Staff & Vendors?`)) {
                    clinicDB.deleteStaff(s.id);
                    renderSettings();
                    showToast('Removed from Staff & Vendors', 'info');
                }
            });
            staffListEl.appendChild(div);
        });

        // Sub-Sections & Headings Customizer
        const sectionTitlesContainer = document.getElementById('settings-section-titles-list');
        if (sectionTitlesContainer) {
            const currentTitles = getCustomSectionTitles();
            sectionTitlesContainer.innerHTML = '';
            Object.keys(DEFAULT_SECTION_TITLES).forEach(modId => {
                const defTitle = DEFAULT_SECTION_TITLES[modId];
                const curTitle = currentTitles[modId] || defTitle;
                const itemDiv = document.createElement('div');
                itemDiv.style.cssText = 'background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-color); border-radius: 6px; padding: 0.65rem 0.85rem; display: flex; flex-direction: column; gap: 0.35rem;';
                itemDiv.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">Sub-Section</span>
                        <span style="font-size: 0.7rem; color: #38bdf8;">Default: ${escapeHtml(defTitle)}</span>
                    </div>
                    <input type="text" class="form-input section-title-input" data-mod-id="${modId}" value="${escapeHtml(curTitle)}" placeholder="${escapeHtml(defTitle)}" style="font-size: 0.85rem; font-weight: 600;">
                `;
                sectionTitlesContainer.appendChild(itemDiv);
            });
        }

        const btnSaveSectionTitles = document.getElementById('btn-save-section-titles');
        if (btnSaveSectionTitles) {
            btnSaveSectionTitles.onclick = () => {
                const inputs = document.querySelectorAll('.section-title-input');
                const newTitles = {};
                inputs.forEach(inp => {
                    const modId = inp.dataset.modId;
                    const val = (inp.value || '').trim();
                    newTitles[modId] = val || DEFAULT_SECTION_TITLES[modId];
                });
                saveCustomSectionTitles(newTitles);
                showToast('Section headings saved successfully!', 'success');
            };
        }

        const btnResetSectionTitles = document.getElementById('btn-reset-section-titles');
        if (btnResetSectionTitles) {
            btnResetSectionTitles.onclick = () => {
                if (confirm('Reset all section headings to their original default names?')) {
                    saveCustomSectionTitles({ ...DEFAULT_SECTION_TITLES });
                    renderSettings();
                    showToast('Section headings reset to defaults', 'info');
                }
            };
        }

        document.getElementById('add-expense-cat-btn').onclick = () => {
            const name = prompt('Enter new Expense Category Name:');
            if (name && name.trim()) {
                const code = prompt('Enter Short Code (optional):') || '';
                clinicDB.addCategory('expense', { name, code });
                renderSettings();
                showToast(`Expense Category "${name}" added!`, 'success');
            }
        };

        document.getElementById('add-income-cat-btn').onclick = () => {
            const name = prompt('Enter new Income Category Name:');
            if (name && name.trim()) {
                const code = prompt('Enter Short Code (optional):') || '';
                clinicDB.addCategory('income', { name, code });
                renderSettings();
                showToast(`Income Category "${name}" added!`, 'success');
            }
        };

        document.getElementById('add-staff-btn').onclick = () => {
            const name = prompt('Enter Name for Staff / Vendor:');
            if (name && name.trim()) {
                clinicDB.addStaff({ name: name.trim(), role: '' });
                renderSettings();
                showToast(`"${name.trim()}" added to Staff & Vendors!`, 'success');
            }
        };

        document.getElementById('download-backup-btn').onclick = () => {
            const jsonStr = clinicDB.exportBackupJSON();
            const blob = new Blob([jsonStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Clinic_Exp_Backup_${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
            showToast('Backup downloaded!', 'success');
        };

        const restoreFileInp = document.getElementById('restore-backup-file');
        document.getElementById('restore-backup-btn').onclick = () => restoreFileInp.click();

        restoreFileInp.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const res = clinicDB.importBackupJSON(event.target.result);
                    if (res.success) {
                        showToast('Backup restored successfully!', 'success');
                        setTimeout(() => location.reload(), 800);
                    } else {
                        alert('Error importing backup: ' + res.error);
                    }
                };
                reader.readAsText(file);
            }
        };


        const btnResetSeed = document.getElementById('reset-seed-btn');
        if (btnResetSeed) {
            btnResetSeed.onclick = () => {
                if (confirm('Reload reference September 2026 data from Excel?')) {
                    clinicDB.resetToSeed();
                    showToast('Reloaded original reference Excel data!', 'success');
                    setTimeout(() => location.reload(), 800);
                }
            };
        }

        const btnUpdatePwd = document.getElementById('btn-update-pwd');
        if (btnUpdatePwd) {
            btnUpdatePwd.onclick = () => {
                const currentInp = document.getElementById('setting-current-pwd');
                const newInp = document.getElementById('setting-new-pwd');
                const confirmInp = document.getElementById('setting-confirm-pwd');
                const currentVal = (currentInp?.value || '').trim();
                const newVal = (newInp?.value || '').trim();
                const confirmVal = (confirmInp?.value || '').trim();

                const stored = getStoredPassword();
                if (!currentVal) {
                    alert('Please enter your current password.');
                    currentInp?.focus();
                    return;
                }
                if (currentVal !== stored) {
                    alert('Current password does not match.');
                    currentInp?.focus();
                    return;
                }
                if (!newVal) {
                    alert('Please enter a new password.');
                    newInp?.focus();
                    return;
                }
                if (newVal.length < 4) {
                    alert('Password should be at least 4 characters.');
                    newInp?.focus();
                    return;
                }
                if (newVal !== confirmVal) {
                    alert('New password and Confirm password do not match.');
                    confirmInp?.focus();
                    return;
                }

                setStoredPassword(newVal);
                if (currentInp) currentInp.value = '';
                if (newInp) newInp.value = '';
                if (confirmInp) confirmInp.value = '';
                showToast('Password updated successfully! New password saved.', 'success');
            };
        }
    }

    // Utilities
    function formatNumber(num) {
        if (num === undefined || num === null || isNaN(num)) return '0';
        return Number(num).toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str).replace(/[&<>"']/g, (m) => {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
        });
    }

    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<span>${escapeHtml(message)}</span>`;
        elements.toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    function exportTableToCSV(tableId, filename) {
        const table = document.getElementById(tableId);
        if (!table) return;

        let csv = [];
        const rows = table.querySelectorAll('tr');

        rows.forEach(r => {
            const cols = r.querySelectorAll('th, td');
            let rowData = [];
            cols.forEach(c => {
                let text = c.innerText.replace(/"/g, '""').trim();
                rowData.push(`"${text}"`);
            });
            csv.push(rowData.join(','));
        });

        const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + csv.join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Start
    init();
});
