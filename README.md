# Clinic & Medical Store Expense Book & Financial Manager

An interactive Excel-identical financial bookkeeping, daily reconciliation, and multi-category expense manager web application. Built to mirror authentic spreadsheet workflows with instant reactive calculations and full-page A4 landscape voucher printing.

---

## 🌟 Features

- **7 Side-by-Side Excel Panels (Daily Sheet)**:
  1. **Debit (Expenses)**: Store Med Purchases, Dispensary Purchases, Clinic Expenses, LB, Home Expenses, US Exp, Dental Exp, Store Exp, Receivables, Partner Payouts (ZK, KH, BP), and custom lines.
  2. **Credit (Income)**: Daraz Cash, Clinic Pt + Dispensary Income, LB, US, St S, ECG.
  3. **Dispensary & Store Purchases & Clinic Expenses**: Itemized vendor tracking with TP & Retail calculations.
  4. **US Total, Cash Breakdown & Home Expenses**: Detailed daily receipts and household petty items.
  5. **Staff & Vendors & Receivables**:
     - Staff payments with dedicated **Reason / Detail** column (Salary, Advance, Fuel, Bonus) linked to monthly ledger.
     - **Receivables (Pending / Due)** tracking with Party Name, Reason, and Amount that **automatically syncs live to the Debit column**.
  6. **Dental, Store & US Expenses**: Specialized departmental cost centers.
  7. **Clinic Bills**: Daily patient OPD & consultation invoices auto-feeding into Credit.

- **Instant Reactive Recalculations**: Live automatic formulas for all subtotals, Debit/Credit totals, Cash reconciliation (`Cash Taken Away + Daraz`), and Surplus/Deficit difference.
- **Full-Page A4 Landscape Print**: High-contrast, clean 1-page printable voucher with clinic header, 7 panel grids, bottom reconciliation summary, and a 3-column signature block.
- **Excel Light Theme**: Authentic clean spreadsheet palette with Lavender headers (`#ccc1da`), soft grid borders (`#cbd5e1`), and high-contrast typography.
- **Master Data Grid (`Data` Sheet)**: 31-day consolidated matrix.
- **Staff & Doctor Roster Matrix (`Staff` Sheet)**: Monthly breakdown per staff member.
- **Total P&L Statement (`Total` Sheet)**: Dispensary gross, clinic net, and total outflows.
- **Multi-Category Reporting**: Filter by date range or specific categories (including Receivables and individual staff) with CSV and Print export.
- **Fresh Zero Slate & Data Backup**: Starts with clean zero values for fresh entry, with 1-click JSON backup/restore and reference Excel data reloading.

---

## 🚀 Running Locally

1. Double click `Run_Clinic_App.bat`
   * Or run `node server.js` in your terminal
2. Open `http://127.0.0.1:3456` in any browser.

---

## 🌐 Online Access (GitHub Pages)

To access this application anywhere online from any mobile, tablet, or PC:
1. Go to your repository on GitHub: `https://github.com/ammaradan/clinicexpbook`
2. Click **Settings** > **Pages** (under Code and automation).
3. Under **Branch**, select `main` (or `master`) and `/ (root)`, then click **Save**.
4. Within 1 minute, your web application will be live at:
   **https://ammaradan.github.io/clinicexpbook/**
