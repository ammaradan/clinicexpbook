/**
 * Main Application Controller & UI Logic
 * Authentic Excel Spreadsheet Experience with Instant Reactive Recalculations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Current Active State
    const state = {
        currentDate: '2026-09-01',
        currentMonth: '2026-09',
        activeTab: 'daily',
        currentDayData: null
    };

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

        // Toast
        toastContainer: document.getElementById('toast-container')
    };

    // Boot App
    function init() {
        localStorage.removeItem('clinic_col_widths');
        setupNavigation();
        setupDateControls();
        setupAddRowButtons();
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
    }

    function switchTab(viewId) {
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
        } else if (viewId === 'view-reports') {
            renderCategoryReports();
        } else if (viewId === 'view-settings') {
            renderSettings();
        }
    }

    // Date Controls
    function setupDateControls() {
        elements.dateInput.value = state.currentDate;
        updateDateBadge(state.currentDate);

        elements.dateInput.addEventListener('change', (e) => {
            if (e.target.value) {
                state.currentDate = e.target.value;
                updateDateBadge(state.currentDate);
                loadDay(state.currentDate);
            }
        });

        elements.prevDayBtn.addEventListener('click', () => changeDay(-1));
        elements.nextDayBtn.addEventListener('click', () => changeDay(1));
        elements.todayBtn.addEventListener('click', () => {
            state.currentDate = '2026-09-01';
            elements.dateInput.value = state.currentDate;
            updateDateBadge(state.currentDate);
            loadDay(state.currentDate);
        });

        elements.saveDayBtn.addEventListener('click', () => {
            saveCurrentDay();
            showToast('Day sheet saved successfully!', 'success');
        });

        elements.printDayBtn.addEventListener('click', () => {
            window.print();
        });
    }

    function changeDay(offset) {
        const d = new Date(state.currentDate);
        d.setDate(d.getDate() + offset);
        state.currentDate = d.toISOString().split('T')[0];
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
        if (elements.printSheetDate) {
            elements.printSheetDate.textContent = `Date: ${d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`;
        }
    }

    // ==========================================================
    // DAILY SHEET: RENDER ALL EXCEL PANELS
    // ==========================================================
    function loadDay(dateKey) {
        state.currentDayData = clinicDB.getDay(dateKey);
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

        // 15. Reconciliation Inputs
        elements.inputCashTaken.value = data.summary?.cashTakenAway || 0;
        elements.inputDaraz.value = data.summary?.darazCash || 0;

        elements.inputCashTaken.oninput = (e) => {
            data.summary.cashTakenAway = parseFloat(e.target.value) || 0;
            recalculateAll();
        };

        elements.inputDaraz.oninput = (e) => {
            data.summary.darazCash = parseFloat(e.target.value) || 0;
            recalculateAll();
        };
    }

    // --- PANEL 1: DEBIT TABLE ---
    function renderDebitTable(data) {
        elements.tbodyDebit.innerHTML = '';
        (data.debits || []).forEach((item, idx) => {
            const tr = document.createElement('tr');
            const isAuto = item.isAuto;
            tr.innerHTML = `
                <td>
                    ${item.isCustom ? `<input type="text" class="cell-input debit-name-input" value="${escapeHtml(item.name)}">` : `<span>${escapeHtml(item.name)}</span>`}
                    ${isAuto ? `<span class="auto-tag">⚡ Auto</span>` : ''}
                </td>
                <td class="num-cell">
                    <input type="number" step="any" class="cell-input num-input debit-amt-input ${isAuto ? 'auto-cell' : ''}" 
                           value="${item.amount || 0}" data-index="${idx}" ${isAuto ? 'readonly' : ''}>
                </td>
            `;

            if (item.isCustom) {
                tr.querySelector('.debit-name-input').addEventListener('input', (e) => {
                    item.name = e.target.value;
                });
            }

            const amtInput = tr.querySelector('.debit-amt-input');
            if (!isAuto) {
                amtInput.addEventListener('input', (e) => {
                    item.amount = parseFloat(e.target.value) || 0;
                    recalculateAll();
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
            tr.innerHTML = `
                <td>
                    ${item.isCustom ? `<input type="text" class="cell-input credit-name-input" value="${escapeHtml(item.name)}">` : `<span>${escapeHtml(item.name)}</span>`}
                    ${isAuto ? `<span class="auto-tag">⚡ Auto</span>` : ''}
                </td>
                <td class="num-cell">
                    <input type="number" step="any" class="cell-input num-input credit-amt-input ${isAuto ? 'auto-cell' : ''}" 
                           value="${item.amount || 0}" data-index="${idx}" ${isAuto ? 'readonly' : ''}>
                </td>
            `;

            if (item.isCustom) {
                tr.querySelector('.credit-name-input').addEventListener('input', (e) => {
                    item.name = e.target.value;
                });
            }

            const amtInput = tr.querySelector('.credit-amt-input');
            if (!isAuto) {
                amtInput.addEventListener('input', (e) => {
                    item.amount = parseFloat(e.target.value) || 0;
                    recalculateAll();
                });
            }
            elements.tbodyCredit.appendChild(tr);
        });
    }

    // --- PANEL 3A: DISPENSARY PURCHASES ---
    function renderDispPurchasesTable(data) {
        elements.tbodyDispPurch.innerHTML = '';
        const list = data.dispPurchases || [];
        const count = Math.max(list.length, 3);

        for (let i = 0; i < count; i++) {
            const item = list[i] || { item: '', amount: 0 };
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="text" class="cell-input dp-item" value="${escapeHtml(item.item)}" placeholder="Vendor / Item"></td>
                <td class="num-cell"><input type="number" step="any" class="cell-input num-input dp-amt" value="${item.amount || 0}"></td>
            `;
            tr.querySelector('.dp-item').oninput = (e) => {
                if (!data.dispPurchases[i]) data.dispPurchases[i] = { item: '', amount: 0 };
                data.dispPurchases[i].item = e.target.value;
            };
            tr.querySelector('.dp-amt').oninput = (e) => {
                if (!data.dispPurchases[i]) data.dispPurchases[i] = { item: '', amount: 0 };
                data.dispPurchases[i].amount = parseFloat(e.target.value) || 0;
                recalculateAll();
            };
            elements.tbodyDispPurch.appendChild(tr);
        }
    }

    // --- PANEL 3B: STORE PURCHASES ---
    function renderStorePurchasesTable(data) {
        elements.tbodyStorePurch.innerHTML = '';
        const list = data.storePurchases || [];
        const count = Math.max(list.length, 5);

        for (let i = 0; i < count; i++) {
            const p = list[i] || { vendor: '', tp: 0, retail: 0 };
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="text" class="cell-input sp-vendor" value="${escapeHtml(p.vendor)}" placeholder="Distributor"></td>
                <td class="num-cell"><input type="number" step="any" class="cell-input num-input sp-tp" value="${p.tp || 0}"></td>
                <td class="num-cell"><input type="number" step="any" class="cell-input num-input sp-retail" value="${p.retail || 0}"></td>
            `;
            tr.querySelector('.sp-vendor').oninput = (e) => {
                if (!data.storePurchases[i]) data.storePurchases[i] = { vendor: '', tp: 0, retail: 0 };
                data.storePurchases[i].vendor = e.target.value;
            };
            tr.querySelector('.sp-tp').oninput = (e) => {
                if (!data.storePurchases[i]) data.storePurchases[i] = { vendor: '', tp: 0, retail: 0 };
                data.storePurchases[i].tp = parseFloat(e.target.value) || 0;
                recalculateAll();
            };
            tr.querySelector('.sp-retail').oninput = (e) => {
                if (!data.storePurchases[i]) data.storePurchases[i] = { vendor: '', tp: 0, retail: 0 };
                data.storePurchases[i].retail = parseFloat(e.target.value) || 0;
                recalculateAll();
            };
            elements.tbodyStorePurch.appendChild(tr);
        }
    }

    // --- PANEL 3C: CLINIC EXPENSES DETAILS ---
    function renderClinicExpDetailsTable(data) {
        elements.tbodyClinicExp.innerHTML = '';
        const list = data.clinicExpenseDetails || [];
        const count = Math.max(list.length, 5);

        for (let i = 0; i < count; i++) {
            const it = list[i] || { item: '', amount: 0 };
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="text" class="cell-input ce-item" value="${escapeHtml(it.item)}" placeholder="chae, pani, baraf..."></td>
                <td class="num-cell"><input type="number" step="any" class="cell-input num-input ce-amt" value="${it.amount || 0}"></td>
            `;
            tr.querySelector('.ce-item').oninput = (e) => {
                if (!data.clinicExpenseDetails[i]) data.clinicExpenseDetails[i] = { item: '', amount: 0 };
                data.clinicExpenseDetails[i].item = e.target.value;
            };
            tr.querySelector('.ce-amt').oninput = (e) => {
                if (!data.clinicExpenseDetails[i]) data.clinicExpenseDetails[i] = { item: '', amount: 0 };
                data.clinicExpenseDetails[i].amount = parseFloat(e.target.value) || 0;
                recalculateAll();
            };
            elements.tbodyClinicExp.appendChild(tr);
        }
    }

    // --- PANEL 4A: US TOTAL (DESCRIPTION + AMOUNT FULLY EDITABLE) ---
    function renderUSTotalTable(data) {
        elements.tbodyUSDetails.innerHTML = '';
        const list = data.usDetails || [];
        const count = Math.max(list.length, 2);

        for (let i = 0; i < count; i++) {
            const it = list[i] || { item: `Receipt #${i+1}`, amount: 0 };
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="text" class="cell-input us-item" value="${escapeHtml(it.item)}" placeholder="Patient / OPD..."></td>
                <td class="num-cell"><input type="number" step="any" class="cell-input num-input us-amt" value="${it.amount || 0}"></td>
            `;
            tr.querySelector('.us-item').oninput = (e) => {
                if (!data.usDetails[i]) data.usDetails[i] = { item: '', amount: 0 };
                data.usDetails[i].item = e.target.value;
            };
            tr.querySelector('.us-amt').oninput = (e) => {
                if (!data.usDetails[i]) data.usDetails[i] = { item: '', amount: 0 };
                data.usDetails[i].amount = parseFloat(e.target.value) || 0;
                recalculateAll();
            };
            elements.tbodyUSDetails.appendChild(tr);
        }
    }

    // --- PANEL 4B: CASH BREAKDOWN (DESCRIPTION + AMOUNT FULLY EDITABLE) ---
    function renderCashBreakdownTable(data) {
        elements.tbodyCashItems.innerHTML = '';
        const list = data.cashItems || [];
        const count = Math.max(list.length, 2);

        for (let i = 0; i < count; i++) {
            const it = list[i] || { item: `Entry #${i+1}`, amount: 0 };
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="text" class="cell-input cash-item-note" value="${escapeHtml(it.item)}" placeholder="Safe / Morning..."></td>
                <td class="num-cell"><input type="number" step="any" class="cell-input num-input cash-item-amt" value="${it.amount || 0}"></td>
            `;
            tr.querySelector('.cash-item-note').oninput = (e) => {
                if (!data.cashItems[i]) data.cashItems[i] = { item: '', amount: 0 };
                data.cashItems[i].item = e.target.value;
            };
            tr.querySelector('.cash-item-amt').oninput = (e) => {
                if (!data.cashItems[i]) data.cashItems[i] = { item: '', amount: 0 };
                data.cashItems[i].amount = parseFloat(e.target.value) || 0;
                recalculateAll();
            };
            elements.tbodyCashItems.appendChild(tr);
        }
    }

    // --- PANEL 4C: HOME X DETAILS (DESCRIPTION + AMOUNT FULLY EDITABLE) ---
    function renderHomeXTable(data) {
        elements.tbodyHomeX.innerHTML = '';
        const list = data.homeExpenseDetails || [];
        const count = Math.max(list.length, 6);

        for (let i = 0; i < count; i++) {
            const it = list[i] || { item: `Home Item #${i+1}`, amount: 0 };
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="text" class="cell-input home-x-item" value="${escapeHtml(it.item)}" placeholder="sabzi, bill..."></td>
                <td class="num-cell"><input type="number" step="any" class="cell-input num-input home-x-amt" value="${it.amount || 0}"></td>
            `;
            tr.querySelector('.home-x-item').oninput = (e) => {
                if (!data.homeExpenseDetails[i]) data.homeExpenseDetails[i] = { item: '', amount: 0 };
                data.homeExpenseDetails[i].item = e.target.value;
            };
            tr.querySelector('.home-x-amt').oninput = (e) => {
                if (!data.homeExpenseDetails[i]) data.homeExpenseDetails[i] = { item: '', amount: 0 };
                data.homeExpenseDetails[i].amount = parseFloat(e.target.value) || 0;
                recalculateAll();
            };
            elements.tbodyHomeX.appendChild(tr);
        }
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
                <td><input type="text" class="cell-input staff-reason-input" value="${escapeHtml(reason)}" placeholder="Adv, Salary..."></td>
                <td class="num-cell"><input type="number" step="any" class="cell-input num-input staff-pay-amt" value="${amt}"></td>
            `;

            tr.querySelector('.staff-reason-input').oninput = (e) => {
                if (!data.staffPayments[s.name]) data.staffPayments[s.name] = { amount: 0, reason: '' };
                data.staffPayments[s.name].reason = e.target.value;
            };

            tr.querySelector('.staff-pay-amt').oninput = (e) => {
                const val = parseFloat(e.target.value) || 0;
                if (!data.staffPayments[s.name]) data.staffPayments[s.name] = { amount: 0, reason: '' };
                data.staffPayments[s.name].amount = val;
                recalculateAll();
            };

            elements.tbodyStaffVendors.appendChild(tr);
        });
    }

    // --- PANEL 5B: RECEIVABLES (PARTY NAME + DETAIL/NOTE + AMOUNT) ---
    function renderReceivablesTable(data) {
        elements.tbodyReceivables.innerHTML = '';
        const list = data.receivables || [];
        const count = Math.max(list.length, 3);

        for (let i = 0; i < count; i++) {
            const it = list[i] || { item: '', detail: '', amount: 0 };
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="text" class="cell-input rec-item" value="${escapeHtml(it.item || it.party || '')}" placeholder="Party name"></td>
                <td><input type="text" class="cell-input rec-detail" value="${escapeHtml(it.detail || it.reason || '')}" placeholder="Reason / Note"></td>
                <td class="num-cell"><input type="number" step="any" class="cell-input num-input rec-amt" value="${it.amount || 0}"></td>
            `;
            tr.querySelector('.rec-item').oninput = (e) => {
                if (!data.receivables[i]) data.receivables[i] = { item: '', detail: '', amount: 0 };
                data.receivables[i].item = e.target.value;
            };
            tr.querySelector('.rec-detail').oninput = (e) => {
                if (!data.receivables[i]) data.receivables[i] = { item: '', detail: '', amount: 0 };
                data.receivables[i].detail = e.target.value;
            };
            tr.querySelector('.rec-amt').oninput = (e) => {
                if (!data.receivables[i]) data.receivables[i] = { item: '', detail: '', amount: 0 };
                data.receivables[i].amount = parseFloat(e.target.value) || 0;
                recalculateAll();
            };
            elements.tbodyReceivables.appendChild(tr);
        }
    }

    // --- PANEL 6A: DENTAL EXP DETAILS ---
    function renderDentalDetailsTable(data) {
        elements.tbodyDental.innerHTML = '';
        const list = data.dentalDetails || [];
        const count = Math.max(list.length, 2);

        for (let i = 0; i < count; i++) {
            const it = list[i] || { item: '', amount: 0 };
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="text" class="cell-input de-item" value="${escapeHtml(it.item)}" placeholder="Dental item"></td>
                <td class="num-cell"><input type="number" step="any" class="cell-input num-input de-amt" value="${it.amount || 0}"></td>
            `;
            tr.querySelector('.de-item').oninput = (e) => {
                if (!data.dentalDetails[i]) data.dentalDetails[i] = { item: '', amount: 0 };
                data.dentalDetails[i].item = e.target.value;
            };
            tr.querySelector('.de-amt').oninput = (e) => {
                if (!data.dentalDetails[i]) data.dentalDetails[i] = { item: '', amount: 0 };
                data.dentalDetails[i].amount = parseFloat(e.target.value) || 0;
                recalculateAll();
            };
            elements.tbodyDental.appendChild(tr);
        }
    }

    // --- PANEL 6B: STORE EXP DETAILS ---
    function renderStoreExpDetailsTable(data) {
        elements.tbodyStoreExp.innerHTML = '';
        const list = data.storeExpenseDetails || [];
        const count = Math.max(list.length, 2);

        for (let i = 0; i < count; i++) {
            const it = list[i] || { item: '', amount: 0 };
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="text" class="cell-input se-item" value="${escapeHtml(it.item)}" placeholder="Store exp item"></td>
                <td class="num-cell"><input type="number" step="any" class="cell-input num-input se-amt" value="${it.amount || 0}"></td>
            `;
            tr.querySelector('.se-item').oninput = (e) => {
                if (!data.storeExpenseDetails[i]) data.storeExpenseDetails[i] = { item: '', amount: 0 };
                data.storeExpenseDetails[i].item = e.target.value;
            };
            tr.querySelector('.se-amt').oninput = (e) => {
                if (!data.storeExpenseDetails[i]) data.storeExpenseDetails[i] = { item: '', amount: 0 };
                data.storeExpenseDetails[i].amount = parseFloat(e.target.value) || 0;
                recalculateAll();
            };
            elements.tbodyStoreExp.appendChild(tr);
        }
    }

    // --- PANEL 6C: US EXP DETAILS ---
    function renderUSExpDetailsTable(data) {
        elements.tbodyUSExp.innerHTML = '';
        const list = data.usExpenseDetails || [];
        const count = Math.max(list.length, 2);

        for (let i = 0; i < count; i++) {
            const it = list[i] || { item: '', amount: 0 };
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="text" class="cell-input ue-item" value="${escapeHtml(it.item)}" placeholder="US exp / Doctor"></td>
                <td class="num-cell"><input type="number" step="any" class="cell-input num-input ue-amt" value="${it.amount || 0}"></td>
            `;
            tr.querySelector('.ue-item').oninput = (e) => {
                if (!data.usExpenseDetails[i]) data.usExpenseDetails[i] = { item: '', amount: 0 };
                data.usExpenseDetails[i].item = e.target.value;
            };
            tr.querySelector('.ue-amt').oninput = (e) => {
                if (!data.usExpenseDetails[i]) data.usExpenseDetails[i] = { item: '', amount: 0 };
                data.usExpenseDetails[i].amount = parseFloat(e.target.value) || 0;
                recalculateAll();
            };
            elements.tbodyUSExp.appendChild(tr);
        }
    }

    // --- PANEL 7: CLINIC BILLS (ROW # + AMOUNT DIRECT ENTRY) ---
    function renderClinicBillsTable(data) {
        elements.tbodyClinicBills.innerHTML = '';
        const list = data.clinicBills || [];
        const count = Math.max(list.length, 8);

        for (let i = 0; i < count; i++) {
            const it = list[i] || { item: `Bill #${i+1}`, amount: 0 };
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="text-align: center; color: var(--text-muted); font-size: 0.72rem; font-weight: 600; background: #f8fafc;">#${i+1}</td>
                <td class="num-cell"><input type="number" step="any" class="cell-input num-input cb-amt" value="${it.amount || 0}"></td>
            `;
            tr.querySelector('.cb-amt').oninput = (e) => {
                if (!data.clinicBills[i]) data.clinicBills[i] = { item: `Bill #${i+1}`, amount: 0 };
                data.clinicBills[i].amount = parseFloat(e.target.value) || 0;
                recalculateAll();
            };
            elements.tbodyClinicBills.appendChild(tr);
        }
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

        // 5. Cash Breakdown
        let sumCashItems = (data.cashItems || []).reduce((acc, a) => {
            const val = typeof a === 'number' ? a : (a?.amount || 0);
            return acc + (parseFloat(val) || 0);
        }, 0);
        elements.subtotalCashTotal.textContent = formatNumber(sumCashItems);
        elements.badgeCashBreakdownTotal.textContent = formatNumber(sumCashItems);

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
        if (sumDental > 0) setDebitAutoAmount('Dental Exp', sumDental);

        // 10. Store Exp Details -> Auto updates Debit C13
        let sumStoreExp = (data.storeExpenseDetails || []).reduce((acc, it) => acc + (parseFloat(it.amount) || 0), 0);
        elements.subtotalStoreExp.textContent = formatNumber(sumStoreExp);
        elements.badgeStoreExpTotal.textContent = formatNumber(sumStoreExp);
        if (sumStoreExp > 0) setDebitAutoAmount('Store Exp', sumStoreExp);

        // 11. US Exp Details -> Auto updates Debit C11
        let sumUSExp = (data.usExpenseDetails || []).reduce((acc, it) => acc + (parseFloat(it.amount) || 0), 0);
        elements.subtotalUSExp.textContent = formatNumber(sumUSExp);
        elements.badgeUSExpTotal.textContent = formatNumber(sumUSExp);
        if (sumUSExp > 0) setDebitAutoAmount('US Exp', sumUSExp);

        // 12. Clinic Bills -> Auto updates Credit F7
        let sumClinicBills = (data.clinicBills || []).reduce((acc, a) => {
            const val = typeof a === 'number' ? a : (a?.amount || 0);
            return acc + (parseFloat(val) || 0);
        }, 0);
        elements.subtotalClinicBills.textContent = formatNumber(sumClinicBills);
        elements.badgeClinicBillsTotal.textContent = formatNumber(sumClinicBills);
        setCreditAutoAmount('Clinic Pt + Dispensary Inc', sumClinicBills);

        // 13. Debit Column Grand Total (SUM C6:C34)
        let totalDebit = (data.debits || []).reduce((acc, d) => acc + (parseFloat(d.amount) || 0), 0);
        elements.badgeDebitTotal.textContent = `Rs. ${formatNumber(totalDebit)}`;
        elements.footerDebitTotal.textContent = formatNumber(totalDebit);
        elements.kpiDebit.textContent = `Rs. ${formatNumber(totalDebit)}`;

        // 14. Credit Column Grand Total (SUM F6:F34)
        let totalCredit = (data.credits || []).reduce((acc, c) => acc + (parseFloat(c.amount) || 0), 0);
        elements.badgeCreditTotal.textContent = `Rs. ${formatNumber(totalCredit)}`;
        elements.footerCreditTotal.textContent = formatNumber(totalCredit);
        elements.kpiCredit.textContent = `Rs. ${formatNumber(totalCredit)}`;

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

        elements.inputDiff.value = formatNumber(diff);
        elements.inputTotalCash.value = formatNumber(totalCash);
        elements.kpiDiff.textContent = `Rs. ${formatNumber(diff)}`;
        elements.kpiDiff.className = `kpi-val ${diff >= 0 ? 'diff-pos' : 'diff-neg'}`;
        elements.kpiCash.textContent = `Rs. ${formatNumber(totalCash)}`;

        if (Math.abs(diff) < 1) {
            elements.boxReconStatus.className = 'recon-status-badge balanced';
            elements.boxReconStatus.textContent = 'Balanced';
        } else if (diff > 0) {
            elements.boxReconStatus.className = 'recon-status-badge balanced';
            elements.boxReconStatus.textContent = `Surplus: +${formatNumber(diff)}`;
        } else {
            elements.boxReconStatus.className = 'recon-status-badge discrepancy';
            elements.boxReconStatus.textContent = `Deficit: ${formatNumber(diff)}`;
        }
    }

    function setDebitAutoAmount(namePart, newAmt) {
        if (!state.currentDayData.debits) state.currentDayData.debits = [];
        let d = state.currentDayData.debits.find(it => (it.name || '').toLowerCase().includes(namePart.toLowerCase()));
        if (!d) {
            d = { name: namePart, amount: newAmt, isAuto: true };
            state.currentDayData.debits.push(d);
            renderDebitTable(state.currentDayData);
            return;
        }
        d.amount = newAmt;
        const rows = elements.tbodyDebit.querySelectorAll('tr');
        rows.forEach(r => {
            if (r.innerText.toLowerCase().includes(namePart.toLowerCase())) {
                const inp = r.querySelector('.debit-amt-input');
                if (inp) inp.value = newAmt;
            }
        });
    }

    function setCreditAutoAmount(namePart, newAmt) {
        const c = (state.currentDayData.credits || []).find(it => (it.name || '').toLowerCase().includes(namePart.toLowerCase()));
        if (c) {
            c.amount = newAmt;
            const rows = elements.tbodyCredit.querySelectorAll('tr');
            rows.forEach(r => {
                if (r.innerText.toLowerCase().includes(namePart.toLowerCase())) {
                    const inp = r.querySelector('.credit-amt-input');
                    if (inp) inp.value = newAmt;
                }
            });
        }
    }

    // Add Row Buttons
    function setupAddRowButtons() {
        // 1. Add Custom Expense Line in Debit
        elements.btnAddDebitRow.addEventListener('click', () => {
            const name = prompt('Enter description for new Debit (Expense) item:') || 'Other Expense';
            state.currentDayData.debits.push({ name, amount: 0, isCustom: true });
            renderDebitTable(state.currentDayData);
            recalculateAll();
        });

        // 2. Add Staff Payment directly into Debit with Selection + Reason
        elements.btnAddStaffDebitBtn.addEventListener('click', () => {
            const staffList = clinicDB.getStaffList();
            const staffOptions = staffList.map((s, i) => `${i + 1}. ${s.name} (${s.role})`).join('\n');
            const selection = prompt(`Select Staff Member (Enter number 1-${staffList.length}) or type Name:\n${staffOptions}`);
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

            // 1. Add to Debit list
            const lineName = `${chosenStaff} (${reason})`;
            state.currentDayData.debits.push({ name: lineName, amount, isCustom: true, staffRef: chosenStaff });

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
            showToast(`Added Rs. ${amount} for ${chosenStaff}!`, 'success');
        });

        // 3. Add Custom Income Line in Credit
        elements.btnAddCreditRow.addEventListener('click', () => {
            const name = prompt('Enter description for new Credit (Income) item:') || 'Other Income';
            state.currentDayData.credits.push({ name, amount: 0, isCustom: true });
            renderCreditTable(state.currentDayData);
            recalculateAll();
        });

        // 4. Detail Panel Add Buttons
        elements.btnAddDispPurchRow.addEventListener('click', () => {
            if (!state.currentDayData.dispPurchases) state.currentDayData.dispPurchases = [];
            state.currentDayData.dispPurchases.push({ item: '', amount: 0 });
            renderDispPurchasesTable(state.currentDayData);
            recalculateAll();
        });

        elements.btnAddStoreRow.addEventListener('click', () => {
            if (!state.currentDayData.storePurchases) state.currentDayData.storePurchases = [];
            state.currentDayData.storePurchases.push({ vendor: '', tp: 0, retail: 0 });
            renderStorePurchasesTable(state.currentDayData);
            recalculateAll();
        });

        elements.btnAddClinicExpRow.addEventListener('click', () => {
            if (!state.currentDayData.clinicExpenseDetails) state.currentDayData.clinicExpenseDetails = [];
            state.currentDayData.clinicExpenseDetails.push({ item: '', amount: 0 });
            renderClinicExpDetailsTable(state.currentDayData);
            recalculateAll();
        });

        elements.btnAddUSRow.addEventListener('click', () => {
            if (!state.currentDayData.usDetails) state.currentDayData.usDetails = [];
            const count = state.currentDayData.usDetails.length + 1;
            state.currentDayData.usDetails.push({ item: `Receipt #${count}`, amount: 0 });
            renderUSTotalTable(state.currentDayData);
            recalculateAll();
        });

        elements.btnAddCashRow.addEventListener('click', () => {
            if (!state.currentDayData.cashItems) state.currentDayData.cashItems = [];
            const count = state.currentDayData.cashItems.length + 1;
            state.currentDayData.cashItems.push({ item: `Entry #${count}`, amount: 0 });
            renderCashBreakdownTable(state.currentDayData);
            recalculateAll();
        });

        elements.btnAddHomeRow.addEventListener('click', () => {
            if (!state.currentDayData.homeExpenseDetails) state.currentDayData.homeExpenseDetails = [];
            const count = state.currentDayData.homeExpenseDetails.length + 1;
            state.currentDayData.homeExpenseDetails.push({ item: `Home Item #${count}`, amount: 0 });
            renderHomeXTable(state.currentDayData);
            recalculateAll();
        });

        elements.btnAddRecRow.addEventListener('click', () => {
            if (!state.currentDayData.receivables) state.currentDayData.receivables = [];
            state.currentDayData.receivables.push({ item: '', detail: '', amount: 0 });
            renderReceivablesTable(state.currentDayData);
            recalculateAll();
        });

        elements.btnAddDentalRow.addEventListener('click', () => {
            if (!state.currentDayData.dentalDetails) state.currentDayData.dentalDetails = [];
            state.currentDayData.dentalDetails.push({ item: '', amount: 0 });
            renderDentalDetailsTable(state.currentDayData);
            recalculateAll();
        });

        elements.btnAddStoreExpRow.addEventListener('click', () => {
            if (!state.currentDayData.storeExpenseDetails) state.currentDayData.storeExpenseDetails = [];
            state.currentDayData.storeExpenseDetails.push({ item: '', amount: 0 });
            renderStoreExpDetailsTable(state.currentDayData);
            recalculateAll();
        });

        elements.btnAddUSExpRow.addEventListener('click', () => {
            if (!state.currentDayData.usExpenseDetails) state.currentDayData.usExpenseDetails = [];
            state.currentDayData.usExpenseDetails.push({ item: '', amount: 0 });
            renderUSExpDetailsTable(state.currentDayData);
            recalculateAll();
        });

        elements.btnAddBillRow.addEventListener('click', () => {
            if (!state.currentDayData.clinicBills) state.currentDayData.clinicBills = [];
            const count = state.currentDayData.clinicBills.length + 1;
            state.currentDayData.clinicBills.push({ item: `Bill #${count}`, amount: 0 });
            renderClinicBillsTable(state.currentDayData);
            recalculateAll();
        });
    }

    function saveCurrentDay() {
        clinicDB.saveDay(state.currentDate, state.currentDayData);
    }

    // ==========================================================
    // MASTER GRID VIEW (EXCEL DATA SHEET RECREATION)
    // ==========================================================
    function renderMasterGrid() {
        const container = document.getElementById('master-grid-container');
        const monthSummary = clinicDB.getMonthlySummary(state.currentMonth);
        const days = clinicDB.getDaysForMonth(state.currentMonth);

        let html = `
            <div class="table-card">
                <div class="table-toolbar">
                    <div class="table-title">
                        📊 September 2026 Master Grid (Excel Data Sheet)
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
                            </tr>
                        </thead>
                        <tbody>
        `;

        days.forEach(({ dayNum, dateKey, data }) => {
            const debits = data.debits || [];
            const credits = data.credits || [];
            const summary = data.summary || {};

            const getDeb = (name) => {
                const f = debits.find(d => (d.name || '').toLowerCase().includes(name));
                return f ? f.amount : 0;
            };
            const getCred = (name) => {
                const f = credits.find(c => (c.name || '').toLowerCase().includes(name));
                return f ? f.amount : 0;
            };

            const storeRetail = (data.storePurchases || []).reduce((acc, p) => acc + (p.retail || 0), 0);

            html += `
                <tr class="master-row" data-date="${dateKey}">
                    <td><strong>${String(dayNum).padStart(2, '0')}-Sep</strong></td>
                    <td class="num-cell" style="color: #fb7185;">${formatNumber(summary.debitTotal || 0)}</td>
                    <td class="num-cell" style="color: #34d399;">${formatNumber(summary.creditTotal || 0)}</td>
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
                    <td class="num-cell">${formatNumber(summary.cashTakenAway || 0)}</td>
                    <td class="num-cell">${formatNumber(getDeb('dispensary purchase'))}</td>
                    <td class="num-cell">${formatNumber(getDeb('zk'))}</td>
                    <td class="num-cell">${formatNumber(getDeb('bp'))}</td>
                    <td class="num-cell">${formatNumber(getDeb('us exp'))}</td>
                    <td class="num-cell">${formatNumber(getDeb('dental exp'))}</td>
                    <td class="num-cell">${formatNumber(getDeb('store exp'))}</td>
                </tr>
            `;
        });

        html += `
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>TOTAL</td>
                                <td class="num-cell" style="color: #fb7185;">Rs. ${formatNumber(monthSummary.sumDr)}</td>
                                <td class="num-cell" style="color: #34d399;">Rs. ${formatNumber(monthSummary.sumCr)}</td>
                                <td class="num-cell">${formatNumber(monthSummary.sumStoreMedPurchases)}</td>
                                <td class="num-cell">${formatNumber(monthSummary.sumStoreSalesRetail)}</td>
                                <td class="num-cell">${formatNumber(monthSummary.sumHomeExp)}</td>
                                <td class="num-cell">${formatNumber(monthSummary.sumClinicExp)}</td>
                                <td class="num-cell">${formatNumber(monthSummary.sumUSInc)}</td>
                                <td class="num-cell">${formatNumber(monthSummary.sumDispInc)}</td>
                                <td class="num-cell">${formatNumber(monthSummary.sumStSaleThisMonth)}</td>
                                <td class="num-cell">${formatNumber(monthSummary.sumLBInc)}</td>
                                <td class="num-cell">${formatNumber(monthSummary.sumLBExp)}</td>
                                <td class="num-cell">${formatNumber(monthSummary.sumKH)}</td>
                                <td class="num-cell">${formatNumber(monthSummary.sumECG)}</td>
                                <td class="num-cell">${formatNumber(monthSummary.sumCash)}</td>
                                <td class="num-cell">${formatNumber(monthSummary.sumDispPurchases)}</td>
                                <td class="num-cell">${formatNumber(monthSummary.sumZK)}</td>
                                <td class="num-cell">${formatNumber(monthSummary.sumBP)}</td>
                                <td class="num-cell">${formatNumber(monthSummary.sumUSExp)}</td>
                                <td class="num-cell">${formatNumber(monthSummary.sumDentalExp)}</td>
                                <td class="num-cell">${formatNumber(monthSummary.sumStoreExp)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        `;

        container.innerHTML = html;

        container.querySelectorAll('.master-row').forEach(r => {
            r.addEventListener('click', () => {
                const dt = r.dataset.date;
                state.currentDate = dt;
                elements.dateInput.value = dt;
                updateDateBadge(dt);
                switchTab('view-daily');
            });
        });

        const exportBtn = document.getElementById('export-master-csv-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                exportTableToCSV('master-grid-table', 'September_2026_Clinic_Master_Data.csv');
            });
        }
    }

    // ==========================================================
    // STAFF & DOCTORS LEDGER (EXCEL STAFF SHEET)
    // ==========================================================
    function renderStaffMatrix() {
        const container = document.getElementById('staff-matrix-container');
        const staffList = clinicDB.getStaffList();
        const days = clinicDB.getDaysForMonth(state.currentMonth);
        const monthSummary = clinicDB.getMonthlySummary(state.currentMonth);

        let html = `
            <div class="table-card">
                <div class="table-toolbar">
                    <div class="table-title">
                        👥 Staff & Doctors Monthly Salary Ledger (Excel Staff Sheet)
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

            html += `<tr><td><strong>${String(dayNum).padStart(2, '0')}-Sep</strong></td>`;

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
            const sTotal = monthSummary.staffTotals[s.name] || 0;
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
                <h3 style="font-family: var(--font-heading); margin-bottom: 1rem;">Employee Payout Slips & Detail Statements</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem;">
        `;

        staffList.forEach(s => {
            const total = monthSummary.staffTotals[s.name] || 0;
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

        const exportStaffBtn = document.getElementById('export-staff-csv-btn');
        if (exportStaffBtn) {
            exportStaffBtn.addEventListener('click', () => {
                exportTableToCSV('staff-matrix-table', 'Staff_Salaries_September_2026.csv');
            });
        }
    }

    // ==========================================================
    // TOTAL SHEET: P&L FINANCIAL STATEMENTS
    // ==========================================================
    function renderPnL() {
        const container = document.getElementById('pnl-container');
        const summary = clinicDB.getMonthlySummary(state.currentMonth);

        let html = `
            <div class="grand-statement">
                <div class="grand-title">
                    <h2>Clinic & Medical Center P&L Statement</h2>
                    <p>Consolidated Accounts & Departmental Gross Profit (September 2026)</p>
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
                        <span>ECG Income:</span>
                        <span class="num-cell" style="color: #34d399;">Rs. ${formatNumber(summary.sumECG)}</span>
                    </div>
                    <div class="pnl-row">
                        <span>Cash Taken Away (Safe/Deposit):</span>
                        <span class="num-cell" style="color: #f59e0b;">Rs. ${formatNumber(summary.sumCash)}</span>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    // ==========================================================
    // MULTI-CATEGORY REPORTS (USER REQUESTED FEATURE)
    // ==========================================================
    function renderCategoryReports() {
        const filterCatSelect = document.getElementById('report-category-select');
        const filterRangeSelect = document.getElementById('report-range-select');
        const customDateGroup = document.getElementById('custom-date-group');
        const runBtn = document.getElementById('run-report-btn');
        const printBtn = document.getElementById('print-report-btn');
        const exportCsvBtn = document.getElementById('export-report-csv-btn');

        if (filterCatSelect && filterCatSelect.children.length <= 1) {
            const staffList = clinicDB.getStaffList();
            let optHtml = `
                <option value="all">-- All Categories --</option>
                <optgroup label="Main Categories">
                    <option value="receivables">Receivables (Pending / Due)</option>
                    <option value="staff_vendors">Staff & Vendors (All Staff)</option>
                    <option value="dental_expenses">Dental Expense</option>
                    <option value="us_expenses">US (Ultrasound) Expense</option>
                    <option value="us_inc">US (Ultrasound) Income</option>
                    <option value="clinic_expenses">Clinic Expenses</option>
                    <option value="clinic_inc">Clinic Pt + Dispensary Income</option>
                    <option value="store_purchases">Store Purchases</option>
                    <option value="st_s">Store Sales (St S)</option>
                    <option value="home_expenses">Home Expenses</option>
                    <option value="partners">Partner Payouts (ZK, KH, BP)</option>
                </optgroup>
                <optgroup label="Individual Staff & Doctors">
            `;
            staffList.forEach(s => {
                optHtml += `<option value="staff:${s.name}">${s.name} (${s.role})</option>`;
            });
            optHtml += `</optgroup>`;
            filterCatSelect.innerHTML = optHtml;
        }

        filterRangeSelect.onchange = () => {
            customDateGroup.style.display = filterRangeSelect.value === 'custom' ? 'flex' : 'none';
        };

        runBtn.onclick = executeCategoryReport;
        printBtn.onclick = () => window.print();
        exportCsvBtn.onclick = () => exportTableToCSV('category-report-table', 'Category_Report.csv');

        executeCategoryReport();
    }

    function executeCategoryReport() {
        const catKey = document.getElementById('report-category-select').value;
        const range = document.getElementById('report-range-select').value;
        let start = '', end = '';

        if (range === 'month') {
            start = '2026-09-01';
            end = '2026-09-30';
        } else if (range === 'today') {
            start = state.currentDate;
            end = state.currentDate;
        } else if (range === 'custom') {
            start = document.getElementById('report-start-date').value;
            end = document.getElementById('report-end-date').value;
        }

        const report = clinicDB.getCategoryReport(catKey, start, end);
        const resultsContainer = document.getElementById('report-results-container');

        let html = `
            <div class="category-summary-banner">
                <div>
                    <h3>Category: ${escapeHtml(catKey.replace('staff:', 'Doctor/Staff: '))}</h3>
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
                                <th>Date</th>
                                <th>Category</th>
                                <th>Payee / Item</th>
                                <th>Reason / Detail</th>
                                <th>Type</th>
                                <th class="num-cell">Amount (Rs.)</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        if (report.rows.length === 0) {
            html += `<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">No entries found for this category and date range.</td></tr>`;
        } else {
            report.rows.forEach(r => {
                html += `
                    <tr>
                        <td><strong>${r.date}</strong></td>
                        <td><span style="padding: 0.2rem 0.5rem; background: rgba(255,255,255,0.06); border-radius: 4px; font-size: 0.75rem;">${escapeHtml(r.category)}</span></td>
                        <td><strong>${escapeHtml(r.item)}</strong></td>
                        <td style="color: #cbd5e1; font-weight: 500;">${escapeHtml(r.description)}</td>
                        <td><span style="color: ${r.type.includes('Credit') ? '#34d399' : '#fb7185'}; font-size: 0.78rem;">${escapeHtml(r.type)}</span></td>
                        <td class="num-cell" style="font-weight: 700; color: ${r.type.includes('Credit') ? '#34d399' : '#fb7185'};">Rs. ${formatNumber(r.amount)}</td>
                    </tr>
                `;
            });
        }

        html += `
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="5">CATEGORY GRAND TOTAL</td>
                                <td class="num-cell" style="color: #38bdf8; font-size: 1.15rem;">Rs. ${formatNumber(report.grandTotal)}</td>
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
                    <span style="font-size: 0.75rem; color: var(--text-muted); margin-left: 0.5rem;">(${escapeHtml(s.role)})</span>
                </div>
                <div>
                    <button type="button" class="btn-icon btn-sm del-staff-btn" style="color: #f43f5e;" data-id="${s.id}">&times; Remove</button>
                </div>
            `;
            div.querySelector('.del-staff-btn').addEventListener('click', () => {
                if (confirm(`Remove staff member "${s.name}"?`)) {
                    clinicDB.deleteStaff(s.id);
                    renderSettings();
                    showToast('Staff removed', 'info');
                }
            });
            staffListEl.appendChild(div);
        });

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
            const name = prompt('Enter new Staff / Doctor / Vendor Name:');
            if (name && name.trim()) {
                const role = prompt('Enter Designation / Role:') || 'Staff';
                clinicDB.addStaff({ name, role });
                renderSettings();
                showToast(`Staff member "${name}" added!`, 'success');
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

        const clearZeroBtn = document.getElementById('clear-all-zero-btn');
        if (clearZeroBtn) {
            clearZeroBtn.onclick = () => {
                if (confirm('Are you sure you want to clear ALL 31 days to 0? This will give you a completely fresh, blank slate for day-to-day entries.')) {
                    clinicDB.clearToZero();
                    showToast('All days cleared to 0! Fresh start ready.', 'success');
                    setTimeout(() => location.reload(), 800);
                }
            };
        }

        document.getElementById('reset-seed-btn').onclick = () => {
            if (confirm('Reload reference September 2026 data from Excel?')) {
                clinicDB.resetToSeed();
                showToast('Reloaded original reference Excel data!', 'success');
                setTimeout(() => location.reload(), 800);
            }
        };
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
