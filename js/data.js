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
        if (dayData.debits) {
            dayData.debits = dayData.debits.filter(d => {
                const n = (d.name || '').trim().toLowerCase();
                return n !== 'kam hisab' && n !== 'kam_hisab';
            });
        }
        if (dayData.credits) {
            dayData.credits = dayData.credits.filter(c => {
                const n = (c.name || '').trim().toLowerCase();
                return n !== 'darex credit' && n !== 'darex_credit';
            });
        }
        return dayData;
    }

    createBlankDay(dateKey) {
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
                { name: 'Daraz Cash', amount: 0, isAuto: false },
                { name: 'Clinic Pt + Dispensary Inc', amount: 0, isAuto: true },
                { name: 'LB', amount: 0, isAuto: false },
                { name: 'US', amount: 0, isAuto: true },
                { name: 'St S', amount: 0, isAuto: false },
                { name: 'ECG', amount: 0, isAuto: false }
            ],
            dispPurchases: [],
            storePurchases: [],
            clinicExpenseDetails: [],
            usDetails: [],
            cashItems: [],
            homeExpenseDetails: [],
            staffPayments: {},
            receivables: [],
            dentalDetails: [],
            storeExpenseDetails: [],
            usExpenseDetails: [],
            clinicBills: [],
            summary: {
                debitTotal: 0,
                creditTotal: 0,
                difference: 0,
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
    }

    saveDay(dateKey, dayData) {
        dayData = this.cleanDayItemNames(dayData);
        this.days[dateKey] = dayData;
        const dayMatch = dateKey.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (dayMatch) {
            const dayNum = parseInt(dayMatch[3], 10);
            const strDay = String(dayNum).padStart(2, '0');
            this.days[strDay] = dayData;
        }
        localStorage.setItem(STORAGE_KEYS.DAYS, JSON.stringify(this.days));
    }

    getDay(dateKey) {
        let res = null;
        if (this.days[dateKey]) {
            res = JSON.parse(JSON.stringify(this.days[dateKey]));
        } else {
            const dayMatch = dateKey.match(/^(\d{4})-(\d{2})-(\d{2})$/);
            if (dayMatch) {
                const dayNum = parseInt(dayMatch[3], 10);
                const strDay = String(dayNum).padStart(2, '0');
                if (this.days[strDay]) {
                    res = JSON.parse(JSON.stringify(this.days[strDay]));
                }
            }
        }

        if (!res) {
            res = this.createBlankDay(dateKey);
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
        this.categories[type] = this.categories[type].filter(c => c.id !== id);
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
        this.staffList = this.staffList.filter(s => s.id !== id);
        this.saveAll();
        return true;
    }

    getDaysForMonth(yearMonthStr = '2026-09') {
        const results = [];
        for (let i = 1; i <= 31; i++) {
            const dayStr = String(i).padStart(2, '0');
            const dateKey = `${yearMonthStr}-${dayStr}`;
            let dayData = this.days[dayStr] || this.days[dateKey];
            if (dayData) {
                results.push({ dayNum: i, dateKey, data: dayData });
            }
        }
        return results;
    }

    getMonthlySummary(yearMonthStr = '2026-09') {
        const days = this.getDaysForMonth(yearMonthStr);

        let sumDr = 0, sumCr = 0;
        let sumStoreMedPurchases = 0, sumStoreSalesRetail = 0;
        let sumHomeExp = 0, sumClinicExp = 0, sumUSInc = 0;
        let sumDispInc = 0, sumStSaleThisMonth = 0;
        let sumLBInc = 0, sumLBExp = 0;
        let sumKH = 0, sumZK = 0, sumBP = 0;
        let sumECG = 0, sumCash = 0, sumDispPurchases = 0;
        let sumReceivables = 0, sumUSExp = 0, sumDentalExp = 0, sumStoreExp = 0;

        const staffTotals = {};
        this.staffList.forEach(s => { staffTotals[s.name] = 0; });

        days.forEach(({ data }) => {
            sumDr += (data.summary?.debitTotal || 0);
            sumCr += (data.summary?.creditTotal || 0);
            sumCash += (data.summary?.cashTakenAway || 0);

            (data.debits || []).forEach(d => {
                const name = (d.name || '').toLowerCase();
                const amt = d.amount || 0;
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
            });

            (data.credits || []).forEach(c => {
                const name = (c.name || '').toLowerCase();
                const amt = c.amount || 0;
                if (name.includes('clinic pt') || name.includes('dispensary inc')) sumDispInc += amt;
                else if (name === 'lb' || name.includes('lb inc')) sumLBInc += amt;
                else if (name === 'us' || name.includes('us inc')) sumUSInc += amt;
                else if (name === 'st s' || name.includes('store sale')) sumStSaleThisMonth += amt;
                else if (name === 'ecg') sumECG += amt;
            });

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
            yearMonth: yearMonthStr,
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
            // 11. Partner Withdrawals
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
            // 12. All (Complete Ledger Audit)
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
