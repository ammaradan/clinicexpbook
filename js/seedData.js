/**
 * Seed data preloaded from Exp book Sept 26.xlsx
 * Contains full September 2026 transactions, exact cell mapping, staff matrix, data master, and total summaries.
 */
window.EXP_CLINIC_SEED = {
  "categories": {
    "expense": [
      {
        "id": "store_med_purchases",
        "name": "Store Med Purchases",
        "code": "SMP",
        "system": true,
        "hasDetails": true
      },
      {
        "id": "dispensary_purchases",
        "name": "Dispensary Purchases",
        "code": "DP",
        "system": true,
        "hasDetails": true
      },
      {
        "id": "clinic_expenses",
        "name": "Clinic Expenses",
        "code": "CE",
        "system": true,
        "hasDetails": true
      },
      {
        "id": "lb_expenses",
        "name": "LB Expenses",
        "code": "LBE",
        "system": true,
        "hasDetails": false
      },
      {
        "id": "home_expenses",
        "name": "Home Expenses",
        "code": "HE",
        "system": true,
        "hasDetails": true
      },
      {
        "id": "us_expenses",
        "name": "US Exp",
        "code": "USE",
        "system": true,
        "hasDetails": true
      },
      {
        "id": "dental_expenses",
        "name": "Dental Exp",
        "code": "DE",
        "system": true,
        "hasDetails": true
      },
      {
        "id": "store_expenses",
        "name": "Store Exp",
        "code": "SE",
        "system": true,
        "hasDetails": true
      },
      {
        "id": "staff_vendors",
        "name": "Staff & Vendors",
        "code": "SV",
        "system": true,
        "hasDetails": true
      }
    ],
    "income": [
      {
        "id": "daraz_cash",
        "name": "Daraz Cash",
        "code": "DC",
        "system": true
      },
      {
        "id": "clinic_pt_disp_inc",
        "name": "Clinic Pt + Dispensary Inc",
        "code": "CPDI",
        "system": true,
        "hasDetails": true
      },
      {
        "id": "lb_inc",
        "name": "LB (Lab) Income",
        "code": "LBI",
        "system": true
      },
      {
        "id": "us_inc",
        "name": "US (Ultrasound) Income",
        "code": "USI",
        "system": true,
        "hasDetails": true
      },
      {
        "id": "st_s",
        "name": "St S (Store Sale)",
        "code": "STS",
        "system": true
      },
      {
        "id": "ecg",
        "name": "ECG Income",
        "code": "ECG",
        "system": true
      },
      {
        "id": "darex_credit",
        "name": "Darex credit",
        "code": "DC",
        "system": true
      }
    ],
    "partners": [
      {
        "id": "kam_hisab",
        "name": "Kam hisab",
        "type": "debit"
      },
      {
        "id": "partner_zk",
        "name": "ZK",
        "type": "debit"
      },
      {
        "id": "partner_kh",
        "name": "KH",
        "type": "debit"
      },
      {
        "id": "partner_bp",
        "name": "BP",
        "type": "debit"
      },
      {
        "id": "total_cash_available",
        "name": "Total Cash Available",
        "type": "debit"
      }
    ]
  },
  "staffList": [
    {
      "id": "staff_1",
      "name": "S.Naeem",
      "role": "Staff / Admin"
    },
    {
      "id": "staff_2",
      "name": "Ammar",
      "role": "Management"
    },
    {
      "id": "staff_3",
      "name": "Noman",
      "role": "Staff"
    },
    {
      "id": "staff_4",
      "name": "Naveed",
      "role": "Staff"
    },
    {
      "id": "staff_5",
      "name": "Baig sb",
      "role": "Doctor / Specialist"
    },
    {
      "id": "staff_6",
      "name": "Bilal MR",
      "role": "Representative"
    },
    {
      "id": "staff_7",
      "name": "Komal",
      "role": "Staff"
    },
    {
      "id": "staff_8",
      "name": "Amir Shah",
      "role": "Staff"
    },
    {
      "id": "staff_9",
      "name": "Adnan",
      "role": "Staff"
    },
    {
      "id": "staff_10",
      "name": "Abu Sufyan",
      "role": "Staff"
    },
    {
      "id": "staff_11",
      "name": "Eisha",
      "role": "Staff"
    },
    {
      "id": "staff_12",
      "name": "Shakila",
      "role": "Staff"
    },
    {
      "id": "staff_13",
      "name": "Driver K",
      "role": "Logistics"
    },
    {
      "id": "staff_14",
      "name": "Abbas (Swp)",
      "role": "Support"
    },
    {
      "id": "staff_15",
      "name": "Latif (Swp)",
      "role": "Support"
    },
    {
      "id": "staff_16",
      "name": "NS LHV",
      "role": "LHV"
    }
  ],
  "days": {
    "10": {
      "day": 10,
      "date": "2026-09-10",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 4890,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 2630,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 1670,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 1150,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 20130,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 200,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Shakila",
          "amount": 3750,
          "isCustom": true
        },
        {
          "name": "Saira",
          "amount": 25000,
          "isCustom": true
        },
        {
          "name": "cash ammar",
          "amount": 25000,
          "isCustom": true
        },
        {
          "name": "Adnan",
          "amount": 10000,
          "isCustom": true
        },
        {
          "name": "Abbas",
          "amount": 1500,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 2900,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 83300,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 12900,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 42450,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 700,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 81100,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 45410,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        }
      ],
      "dispPurchases": [
        {
          "item": "ES",
          "amount": 2630
        }
      ],
      "storePurchases": [
        {
          "vendor": "Decent",
          "tp": 1400,
          "retail": 2500
        },
        {
          "vendor": "Ayeza",
          "tp": 3490,
          "retail": 10700
        }
      ],
      "clinicExpenseDetails": [
        {
          "item": "",
          "amount": 120
        },
        {
          "item": "",
          "amount": 150
        },
        {
          "item": "",
          "amount": 150
        },
        {
          "item": "jharu",
          "amount": 300
        },
        {
          "item": "",
          "amount": 600
        },
        {
          "item": "",
          "amount": 250
        },
        {
          "item": "chokidar",
          "amount": 100
        }
      ],
      "usDetails": [
        71000,
        5800,
        2300,
        2000
      ],
      "cashItems": [
        72000,
        10000,
        1300
      ],
      "homeExpenseDetails": [
        670,
        1000,
        11000,
        3000,
        960,
        1500,
        1000,
        1000
      ],
      "staffPayments": {
        "S.Naeem": 0,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 10000,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 3750,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "Dental 1",
          "amount": 200
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [],
      "clinicBills": [
        36000,
        1000,
        650,
        850,
        600,
        850,
        650,
        500,
        600,
        750
      ],
      "summary": {
        "debitTotal": 182120,
        "creditTotal": 182560,
        "difference": 440,
        "cashTakenAway": 72000,
        "darazCash": 11300,
        "totalCash": 83300
      }
    },
    "11": {
      "day": 11,
      "date": "2026-09-11",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 52230,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 15100,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 100,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Bakhi",
          "amount": 8000,
          "isCustom": true
        },
        {
          "name": "SN pani",
          "amount": 960,
          "isCustom": true
        },
        {
          "name": "Abbas clear for aug",
          "amount": 4500,
          "isCustom": true
        },
        {
          "name": "Noor fatima udhar",
          "amount": 750,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 200,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 68000,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 11000,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 28600,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 1250,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 66300,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 42160,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        }
      ],
      "dispPurchases": [],
      "storePurchases": [],
      "clinicExpenseDetails": [
        {
          "item": "Farnail",
          "amount": 350
        },
        {
          "item": "khana",
          "amount": 600
        },
        {
          "item": "chae",
          "amount": 640
        },
        {
          "item": "chae",
          "amount": 140
        },
        {
          "item": "FBR kharcha",
          "amount": 50000
        },
        {
          "item": "pani baraf",
          "amount": 500
        }
      ],
      "usDetails": [
        55000,
        8800,
        1000,
        1500
      ],
      "cashItems": [
        50000,
        18000
      ],
      "homeExpenseDetails": [
        13630,
        1470
      ],
      "staffPayments": {
        "S.Naeem": 0,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 4500,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [
        {
          "item": "noor Fatima",
          "amount": 750
        }
      ],
      "dentalDetails": [
        {
          "item": "Dental 1",
          "amount": 100
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [],
      "clinicBills": [
        24150,
        750,
        3050,
        650
      ],
      "summary": {
        "debitTotal": 149840,
        "creditTotal": 149310,
        "difference": -530,
        "cashTakenAway": 50000,
        "darazCash": 18000,
        "totalCash": 68000
      }
    },
    "12": {
      "day": 12,
      "date": "2026-09-12",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 34469,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 4880,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 8530,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 15000,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 700,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "warda",
          "amount": 2000,
          "isCustom": true
        },
        {
          "name": "Adnan",
          "amount": 250,
          "isCustom": true
        },
        {
          "name": "Bilal",
          "amount": 15000,
          "isCustom": true
        },
        {
          "name": "kmaiti",
          "amount": 30000,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 200,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 3500,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 90100,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 18000,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 51100,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 1050,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 98500,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 36834,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        }
      ],
      "dispPurchases": [
        {
          "item": "ES",
          "amount": 2430
        },
        {
          "item": "syringes",
          "amount": 800
        },
        {
          "item": "drips",
          "amount": 1650
        }
      ],
      "storePurchases": [
        {
          "vendor": "MR",
          "tp": 5119,
          "retail": 9500
        },
        {
          "vendor": "Madix",
          "tp": 1655,
          "retail": 2050
        },
        {
          "vendor": "GS",
          "tp": 27695,
          "retail": 71200
        }
      ],
      "clinicExpenseDetails": [
        {
          "item": "",
          "amount": 140
        },
        {
          "item": "",
          "amount": 370
        },
        {
          "item": "",
          "amount": 120
        },
        {
          "item": "",
          "amount": 300
        },
        {
          "item": "",
          "amount": 500
        },
        {
          "item": "rikhsaw kiraya",
          "amount": 300
        },
        {
          "item": "saman",
          "amount": 700
        },
        {
          "item": "mistri",
          "amount": 5500
        },
        {
          "item": "khana",
          "amount": 600
        }
      ],
      "usDetails": [
        87000,
        10000,
        1500
      ],
      "cashItems": [
        80000,
        10000,
        100
      ],
      "homeExpenseDetails": [
        1430,
        750,
        6000,
        2000,
        1000,
        3820
      ],
      "staffPayments": {
        "S.Naeem": 0,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "Dental 1",
          "amount": 200
        },
        {
          "item": "Dental 2",
          "amount": 500
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [],
      "clinicBills": [
        35150,
        2000,
        10000,
        1650,
        500,
        1300,
        500
      ],
      "summary": {
        "debitTotal": 204629,
        "creditTotal": 205484,
        "difference": 855,
        "cashTakenAway": 80000,
        "darazCash": 10000,
        "totalCash": 90000
      }
    },
    "13": {
      "day": 13,
      "date": "2026-09-13",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 2780,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 11670,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 7720,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 31200,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 60000,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 200,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Tests",
          "amount": 16500,
          "isCustom": true
        },
        {
          "name": "SN saman",
          "amount": 770,
          "isCustom": true
        },
        {
          "name": "Haji aslam",
          "amount": 800,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 200,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 54650,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 10000,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 31800,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 1350,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 111800,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 32370,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        }
      ],
      "dispPurchases": [
        {
          "item": "Item 1",
          "amount": 3600
        },
        {
          "item": "Item 2",
          "amount": 2100
        },
        {
          "item": "Item 3",
          "amount": 1500
        },
        {
          "item": "Item 4",
          "amount": 950
        },
        {
          "item": "Item 5",
          "amount": 3520
        }
      ],
      "storePurchases": [
        {
          "vendor": "talha",
          "tp": 2780,
          "retail": 3404
        }
      ],
      "clinicExpenseDetails": [
        {
          "item": "Hammad",
          "amount": 5000
        },
        {
          "item": "khana",
          "amount": 600
        },
        {
          "item": "khana raat",
          "amount": 1000
        },
        {
          "item": "chae",
          "amount": 630
        },
        {
          "item": "mug chae",
          "amount": 140
        },
        {
          "item": "filter apni",
          "amount": 200
        },
        {
          "item": "baraf",
          "amount": 150
        }
      ],
      "usDetails": [
        107000,
        4800
      ],
      "cashItems": [
        58000,
        6650
      ],
      "homeExpenseDetails": [
        5000,
        960,
        2400,
        940,
        3000,
        3900,
        15000
      ],
      "staffPayments": {
        "S.Naeem": 0,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "Dental 1",
          "amount": 200
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [
        {
          "item": "Repair",
          "amount": 60000
        }
      ],
      "clinicBills": [
        30000,
        1300,
        500
      ],
      "summary": {
        "debitTotal": 186490,
        "creditTotal": 187320,
        "difference": 830,
        "cashTakenAway": 58000,
        "darazCash": 6650,
        "totalCash": 64650
      }
    },
    "14": {
      "day": 14,
      "date": "2026-09-14",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 115941,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 6500,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 6790,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 26750,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 4800,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 200,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "naseem",
          "amount": 500,
          "isCustom": true
        },
        {
          "name": "less from US",
          "amount": 700,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 500,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 121100,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 6600,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 36000,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 850,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 90500,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 34411,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Salson",
          "amount": 94420,
          "isCustom": true
        },
        {
          "name": "credit dry fruit+gell",
          "amount": 21800,
          "isCustom": true
        }
      ],
      "dispPurchases": [
        {
          "item": "umer",
          "amount": 3100
        },
        {
          "item": "SA",
          "amount": 3400
        }
      ],
      "storePurchases": [
        {
          "vendor": "Salson",
          "tp": 94420,
          "retail": 195766
        },
        {
          "vendor": "Azeem",
          "tp": 661,
          "retail": 1100
        },
        {
          "vendor": "Sameel",
          "tp": 3460,
          "retail": 4200
        },
        {
          "vendor": "bilal",
          "tp": 17400,
          "retail": 37150
        }
      ],
      "clinicExpenseDetails": [
        {
          "item": "chae total",
          "amount": 760
        },
        {
          "item": "baraf",
          "amount": 160
        },
        {
          "item": "pani",
          "amount": 200
        },
        {
          "item": "ramzan wakeel",
          "amount": 4000
        },
        {
          "item": "chae raat",
          "amount": 570
        },
        {
          "item": "khana",
          "amount": 600
        },
        {
          "item": "petrol",
          "amount": 500
        }
      ],
      "usDetails": [
        81000,
        9500
      ],
      "cashItems": [
        98500,
        20000,
        2600
      ],
      "homeExpenseDetails": [
        9750,
        17000
      ],
      "staffPayments": {
        "S.Naeem": 0,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "Dental 1",
          "amount": 200
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [
        {
          "item": "gell",
          "amount": 4800
        }
      ],
      "clinicBills": [
        33000,
        1500,
        650,
        850
      ],
      "summary": {
        "debitTotal": 283781,
        "creditTotal": 284581,
        "difference": 800,
        "cashTakenAway": 118500,
        "darazCash": 2600,
        "totalCash": 121100
      }
    },
    "15": {
      "day": 15,
      "date": "2026-09-15",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 42750,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 1590,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 21110,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 200,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "parcel warda",
          "amount": 6400,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 210,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 2900,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 109500,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 2600,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 33000,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 1050,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 66500,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 40490,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Bilal last month stock",
          "amount": 40300,
          "isCustom": true
        }
      ],
      "dispPurchases": [],
      "storePurchases": [
        {
          "vendor": "Bilal last month",
          "tp": 40300,
          "retail": 94400
        },
        {
          "vendor": "New classic",
          "tp": 2450,
          "retail": 4745
        }
      ],
      "clinicExpenseDetails": [
        {
          "item": "",
          "amount": 190
        },
        {
          "item": "",
          "amount": 140
        },
        {
          "item": "",
          "amount": 600
        },
        {
          "item": "",
          "amount": 160
        },
        {
          "item": "",
          "amount": 500
        }
      ],
      "usDetails": [
        52000,
        14500,
        800
      ],
      "cashItems": [
        107000,
        2500
      ],
      "homeExpenseDetails": [
        10000,
        1880,
        1650,
        1300,
        780,
        2750,
        1500,
        1250
      ],
      "staffPayments": {
        "S.Naeem": 0,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "Dental 1",
          "amount": 200
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [],
      "clinicBills": [
        31850,
        650,
        500
      ],
      "summary": {
        "debitTotal": 184660,
        "creditTotal": 183940,
        "difference": -720,
        "cashTakenAway": 107000,
        "darazCash": 2500,
        "totalCash": 109500
      }
    },
    "16": {
      "day": 16,
      "date": "2026-09-16",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 15696,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 1860,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 2310,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 20170,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 200,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "SN dwai",
          "amount": 900,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 100,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 1000,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 139850,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 2500,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 50900,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 850,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 89000,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 39456,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        }
      ],
      "dispPurchases": [
        {
          "item": "Item 1",
          "amount": 1860
        }
      ],
      "storePurchases": [
        {
          "vendor": "Bismillah",
          "tp": 1130,
          "retail": 3750
        },
        {
          "vendor": "Sm",
          "tp": 1709,
          "retail": 2000
        },
        {
          "vendor": "orient",
          "tp": 7175,
          "retail": 13770
        },
        {
          "vendor": "Azir",
          "tp": 3609,
          "retail": 7066
        },
        {
          "vendor": "AA",
          "tp": 2073,
          "retail": 4065
        }
      ],
      "clinicExpenseDetails": [
        {
          "item": "nashta oper",
          "amount": 200
        },
        {
          "item": "chae oper",
          "amount": 370
        },
        {
          "item": "chae",
          "amount": 140
        },
        {
          "item": "pani baraf",
          "amount": 500
        },
        {
          "item": "khana",
          "amount": 600
        },
        {
          "item": "petrol",
          "amount": 500
        }
      ],
      "usDetails": [
        65000,
        20000,
        2500,
        1500
      ],
      "cashItems": [
        139000,
        850
      ],
      "homeExpenseDetails": [
        650,
        8370,
        150,
        700,
        600,
        6200,
        1400,
        1100,
        1000
      ],
      "staffPayments": {
        "S.Naeem": 900,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "Dental 1",
          "amount": 200
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [],
      "clinicBills": [
        27750,
        15000,
        650,
        600,
        1400,
        2000,
        2500,
        1000
      ],
      "summary": {
        "debitTotal": 182086,
        "creditTotal": 182706,
        "difference": 620,
        "cashTakenAway": 139000,
        "darazCash": 850,
        "totalCash": 139850
      }
    },
    "17": {
      "day": 17,
      "date": "2026-09-17",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 30430,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 790,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 3480,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 9920,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 9670,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 1200,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "A/C",
          "amount": 1500,
          "isCustom": true
        },
        {
          "name": "Sufyan Pay",
          "amount": 15000,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 400,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 4000,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 72850,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 800,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 24300,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 950,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 79000,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 44150,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        }
      ],
      "dispPurchases": [
        {
          "item": "Item 1",
          "amount": 790
        }
      ],
      "storePurchases": [
        {
          "vendor": "lylpur",
          "tp": 3235,
          "retail": 4350
        },
        {
          "vendor": "umar",
          "tp": 6420,
          "retail": 10800
        },
        {
          "vendor": "ayeza",
          "tp": 2070,
          "retail": 7200
        },
        {
          "vendor": "decent",
          "tp": 3925,
          "retail": 6475
        },
        {
          "vendor": "aiman",
          "tp": 11175,
          "retail": 22350
        },
        {
          "vendor": "sales link",
          "tp": 2845,
          "retail": 3330
        },
        {
          "vendor": "flogesic",
          "tp": 760,
          "retail": 0
        }
      ],
      "clinicExpenseDetails": [
        {
          "item": "pani",
          "amount": 200
        },
        {
          "item": "chae",
          "amount": 280
        },
        {
          "item": "baraf",
          "amount": 450
        },
        {
          "item": "basket",
          "amount": 750
        },
        {
          "item": "khana",
          "amount": 600
        },
        {
          "item": "cover pillow",
          "amount": 1200
        }
      ],
      "usDetails": [
        76000,
        1500,
        1500
      ],
      "cashItems": [
        71000,
        1850
      ],
      "homeExpenseDetails": [
        9670
      ],
      "staffPayments": {
        "S.Naeem": 0,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 15000,
        "Eisha": 0,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "khana",
          "amount": 200
        },
        {
          "item": "gloves",
          "amount": 1000
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [],
      "clinicBills": [
        23800,
        500
      ],
      "summary": {
        "debitTotal": 149240,
        "creditTotal": 149200,
        "difference": -40,
        "cashTakenAway": 71000,
        "darazCash": 1850,
        "totalCash": 72850
      }
    },
    "18": {
      "day": 18,
      "date": "2026-09-18",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 2520,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 15360,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 200,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "SN TAX pyment",
          "amount": 37260,
          "isCustom": true
        },
        {
          "name": "SN jaz cash",
          "amount": 3000,
          "isCustom": true
        },
        {
          "name": "kapray SN",
          "amount": 300,
          "isCustom": true
        },
        {
          "name": "Ammar mobile packg",
          "amount": 3000,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 200,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 1000,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 38000,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 1850,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 19750,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 450,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 53000,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 25970,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        }
      ],
      "dispPurchases": [],
      "storePurchases": [],
      "clinicExpenseDetails": [
        {
          "item": "",
          "amount": 600
        },
        {
          "item": "",
          "amount": 140
        },
        {
          "item": "",
          "amount": 280
        },
        {
          "item": "",
          "amount": 1500
        }
      ],
      "usDetails": [
        47000,
        6000
      ],
      "cashItems": [
        34000,
        4000
      ],
      "homeExpenseDetails": [
        750,
        380,
        6000,
        4150,
        1380,
        700,
        2000
      ],
      "staffPayments": {
        "S.Naeem": 40560,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "Dental 1",
          "amount": 200
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [],
      "clinicBills": [
        19000,
        750
      ],
      "summary": {
        "debitTotal": 100840,
        "creditTotal": 101020,
        "difference": 180,
        "cashTakenAway": 34000,
        "darazCash": 3850,
        "totalCash": 37850
      }
    },
    "19": {
      "day": 19,
      "date": "2026-09-19",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 5232,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 2780,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 18780,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 5000,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 200,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "SN Med",
          "amount": 1170,
          "isCustom": true
        },
        {
          "name": "Parcel warda",
          "amount": 4150,
          "isCustom": true
        },
        {
          "name": "Komal Test",
          "amount": 10100,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 11100,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 115000,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 3800,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 29400,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 850,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 79000,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 60472,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        }
      ],
      "dispPurchases": [],
      "storePurchases": [
        {
          "vendor": "AHM",
          "tp": 2605,
          "retail": 5290
        },
        {
          "vendor": "madix",
          "tp": 1877,
          "retail": 2325
        },
        {
          "vendor": "Max",
          "tp": 750,
          "retail": 1540
        }
      ],
      "clinicExpenseDetails": [
        {
          "item": "chae",
          "amount": 540
        },
        {
          "item": "chae",
          "amount": 140
        },
        {
          "item": "pani baraf",
          "amount": 500
        },
        {
          "item": "Safai saman harpic etc",
          "amount": 1000
        },
        {
          "item": "khana",
          "amount": 600
        }
      ],
      "usDetails": [
        74000,
        5000
      ],
      "cashItems": [
        112500,
        2500
      ],
      "homeExpenseDetails": [
        250,
        9680,
        4550,
        500,
        1450,
        1250,
        1100
      ],
      "staffPayments": {
        "S.Naeem": 1170,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "Dental 1",
          "amount": 200
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [
        {
          "item": "khana repir",
          "amount": 5000
        }
      ],
      "clinicBills": [
        24300,
        650,
        850,
        600,
        2500,
        500
      ],
      "summary": {
        "debitTotal": 173512,
        "creditTotal": 173522,
        "difference": 10,
        "cashTakenAway": 112500,
        "darazCash": 2500,
        "totalCash": 115000
      }
    },
    "20": {
      "day": 20,
      "date": "2026-09-20",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 7380,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 2030,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 18980,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 200,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Shakila",
          "amount": 6300,
          "isCustom": true
        },
        {
          "name": "Ammar ( data cable mob)",
          "amount": 1000,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 400,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 1400,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 183750,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 2500,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 43650,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 550,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 124800,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 50150,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        }
      ],
      "dispPurchases": [
        {
          "item": "gloves etc",
          "amount": 570
        },
        {
          "item": "Item 2",
          "amount": 3860
        },
        {
          "item": "Item 3",
          "amount": 2950
        }
      ],
      "storePurchases": [],
      "clinicExpenseDetails": [
        {
          "item": "",
          "amount": 120
        },
        {
          "item": "",
          "amount": 310
        },
        {
          "item": "",
          "amount": 500
        },
        {
          "item": "",
          "amount": 600
        },
        {
          "item": "",
          "amount": 500
        }
      ],
      "usDetails": [
        109000,
        15800
      ],
      "cashItems": [
        178000,
        5750
      ],
      "homeExpenseDetails": [
        3270,
        2000,
        1300,
        1480,
        300,
        1100,
        4700,
        2900,
        1930
      ],
      "staffPayments": {
        "S.Naeem": 0,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 6300,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "Dental 1",
          "amount": 200
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [],
      "clinicBills": [
        31850,
        500,
        1300,
        8000,
        2000
      ],
      "summary": {
        "debitTotal": 221440,
        "creditTotal": 221650,
        "difference": 210,
        "cashTakenAway": 178000,
        "darazCash": 5750,
        "totalCash": 183750
      }
    },
    "21": {
      "day": 21,
      "date": "2026-09-21",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 10414,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 3400,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 4940,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 15575,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 15000,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 200,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Bilal",
          "amount": 10000,
          "isCustom": true
        },
        {
          "name": "kal walay (jo ziayada gye thy)",
          "amount": 10000,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 1000,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 83450,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 5700,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 24850,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 400,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 83500,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 40178,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        }
      ],
      "dispPurchases": [
        {
          "item": "Item 1",
          "amount": 3400
        }
      ],
      "storePurchases": [
        {
          "vendor": "Mushtaq",
          "tp": 1433,
          "retail": 3036
        },
        {
          "vendor": "TF",
          "tp": 4000,
          "retail": 8250
        },
        {
          "vendor": "yeza",
          "tp": 1375,
          "retail": 3740
        },
        {
          "vendor": "Azeem",
          "tp": 3606,
          "retail": 5000
        }
      ],
      "clinicExpenseDetails": [
        {
          "item": "",
          "amount": 600
        },
        {
          "item": "Essai",
          "amount": 1000
        },
        {
          "item": "chae",
          "amount": 140
        },
        {
          "item": "ESG repair",
          "amount": 2000
        },
        {
          "item": "khana",
          "amount": 700
        },
        {
          "item": "Petrol",
          "amount": 500
        }
      ],
      "usDetails": [
        70000,
        13500
      ],
      "cashItems": [
        76000,
        5000,
        1750,
        700
      ],
      "homeExpenseDetails": [
        1220,
        625,
        6900,
        1200,
        120,
        2000,
        2650,
        760,
        100
      ],
      "staffPayments": {
        "S.Naeem": 0,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "Dental 1",
          "amount": 200
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [
        {
          "item": "printer rolls",
          "amount": 15000
        }
      ],
      "clinicBills": [
        21000,
        2500,
        700,
        650
      ],
      "summary": {
        "debitTotal": 153979,
        "creditTotal": 154628,
        "difference": 649,
        "cashTakenAway": 76000,
        "darazCash": 7450,
        "totalCash": 83450
      }
    },
    "22": {
      "day": 22,
      "date": "2026-09-22",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 4675,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 7700,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 8580,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 200,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "parcel",
          "amount": 8520,
          "isCustom": true
        },
        {
          "name": "AC",
          "amount": 8250,
          "isCustom": true
        },
        {
          "name": "abu sufyan drip",
          "amount": 240,
          "isCustom": true
        },
        {
          "name": "SN pani",
          "amount": 1280,
          "isCustom": true
        },
        {
          "name": "Bilal",
          "amount": 50000,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 300,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 71600,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 7450,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 31100,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 650,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 78000,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 44660,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        }
      ],
      "dispPurchases": [],
      "storePurchases": [
        {
          "vendor": "new classic",
          "tp": 2570,
          "retail": 5721
        },
        {
          "vendor": "fair",
          "tp": 730,
          "retail": 855
        },
        {
          "vendor": "SK",
          "tp": 1375,
          "retail": 1800
        }
      ],
      "clinicExpenseDetails": [
        {
          "item": "",
          "amount": 140
        },
        {
          "item": "",
          "amount": 360
        },
        {
          "item": "imran",
          "amount": 6500
        },
        {
          "item": "khana",
          "amount": 600
        },
        {
          "item": "Iqbal Chokidar",
          "amount": 100
        }
      ],
      "usDetails": [
        67000,
        8500,
        1500,
        1000
      ],
      "cashItems": [
        69500,
        2100
      ],
      "homeExpenseDetails": [
        1100,
        1960,
        5520
      ],
      "staffPayments": {
        "S.Naeem": 1280,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [
        {
          "item": "Bilal",
          "amount": 50000
        }
      ],
      "dentalDetails": [
        {
          "item": "Dental 1",
          "amount": 200
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [],
      "clinicBills": [
        31100
      ],
      "summary": {
        "debitTotal": 161345,
        "creditTotal": 161860,
        "difference": 515,
        "cashTakenAway": 69500,
        "darazCash": 2100,
        "totalCash": 71600
      }
    },
    "23": {
      "day": 23,
      "date": "2026-09-23",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 10710,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 930,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 1660,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 14490,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 200,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Parcel",
          "amount": 1900,
          "isCustom": true
        },
        {
          "name": "pal z",
          "amount": 13807,
          "isCustom": true
        },
        {
          "name": "Abbas",
          "amount": 2000,
          "isCustom": true
        },
        {
          "name": "Petrol warda",
          "amount": 10000,
          "isCustom": true
        },
        {
          "name": "Shakila",
          "amount": 2000,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 4700,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 15000,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 56700,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 2000,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 24900,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 850,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 61800,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 44717,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        }
      ],
      "dispPurchases": [
        {
          "item": "930",
          "amount": "es"
        }
      ],
      "storePurchases": [
        {
          "vendor": "oriet",
          "tp": 5295,
          "retail": 12159
        },
        {
          "vendor": "azir",
          "tp": 5415,
          "retail": 11116
        }
      ],
      "clinicExpenseDetails": [
        {
          "item": "chae",
          "amount": 490
        },
        {
          "item": "baraf",
          "amount": 450
        },
        {
          "item": "pani",
          "amount": 120
        },
        {
          "item": "khana",
          "amount": 600
        }
      ],
      "usDetails": [
        57000,
        4000,
        800
      ],
      "cashItems": [
        54000,
        1900,
        800
      ],
      "homeExpenseDetails": [
        1960,
        400,
        9000,
        840,
        1370,
        920
      ],
      "staffPayments": {
        "S.Naeem": 0,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 2000,
        "Driver K": 0,
        "Abbas (Swp)": 2000,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "khana",
          "amount": 200
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [],
      "clinicBills": [
        22900,
        2000
      ],
      "summary": {
        "debitTotal": 134097,
        "creditTotal": 134267,
        "difference": 170,
        "cashTakenAway": 54000,
        "darazCash": 2700,
        "totalCash": 56700
      }
    },
    "24": {
      "day": 24,
      "date": "2026-09-24",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 7355,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 1380,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 1480,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 10290,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 200,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Parcel",
          "amount": 6000,
          "isCustom": true
        },
        {
          "name": "Amir",
          "amount": 23000,
          "isCustom": true
        },
        {
          "name": "Haji Aslam",
          "amount": 1050,
          "isCustom": true
        },
        {
          "name": "Essai pay",
          "amount": 9000,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 2000,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 63600,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 2700,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 28250,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 850,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 60000,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 33675,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        }
      ],
      "dispPurchases": [
        {
          "item": "ES",
          "amount": 1380
        }
      ],
      "storePurchases": [
        {
          "vendor": "decent",
          "tp": 6450,
          "retail": 11950
        },
        {
          "vendor": "umer",
          "tp": 905,
          "retail": 2430
        }
      ],
      "clinicExpenseDetails": [
        {
          "item": "oper chae",
          "amount": 140
        },
        {
          "item": "khana",
          "amount": 600
        },
        {
          "item": "pani baraf",
          "amount": 500
        },
        {
          "item": "chae",
          "amount": 240
        }
      ],
      "usDetails": [
        53000,
        7000
      ],
      "cashItems": [
        55500,
        5000,
        3100
      ],
      "homeExpenseDetails": [
        450,
        1220,
        480,
        1520,
        5400,
        700,
        520
      ],
      "staffPayments": {
        "S.Naeem": 0,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 23000,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 9000,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "khana",
          "amount": 200
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [],
      "clinicBills": [
        17850,
        2000,
        700,
        400,
        5000,
        1300,
        1000
      ],
      "summary": {
        "debitTotal": 125355,
        "creditTotal": 125475,
        "difference": 120,
        "cashTakenAway": 55500,
        "darazCash": 8100,
        "totalCash": 63600
      }
    },
    "25": {
      "day": 25,
      "date": "2026-09-25",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 2790,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 21520,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 200,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "parcel",
          "amount": 5900,
          "isCustom": true
        },
        {
          "name": "driver",
          "amount": 9000,
          "isCustom": true
        },
        {
          "name": "Naveed",
          "amount": 35000,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 32700,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 8000,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 15550,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 850,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 53600,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 29510,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        }
      ],
      "dispPurchases": [],
      "storePurchases": [],
      "clinicExpenseDetails": [
        {
          "item": "chae oper all",
          "amount": 910
        },
        {
          "item": "plumber",
          "amount": 500
        },
        {
          "item": "pani",
          "amount": 280
        },
        {
          "item": "petrol",
          "amount": 500
        },
        {
          "item": "khana",
          "amount": 600
        }
      ],
      "usDetails": [
        46000,
        6000,
        1600
      ],
      "cashItems": [
        25000,
        5000,
        1200,
        1500
      ],
      "homeExpenseDetails": [
        2250,
        220,
        9250,
        3780,
        2440,
        450,
        1280,
        1850
      ],
      "staffPayments": {
        "S.Naeem": 0,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "Dental 1",
          "amount": 200
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [],
      "clinicBills": [
        13400,
        850,
        500,
        800
      ],
      "summary": {
        "debitTotal": 107110,
        "creditTotal": 107510,
        "difference": 400,
        "cashTakenAway": 0,
        "darazCash": 32700,
        "totalCash": 32700
      }
    },
    "26": {
      "day": 26,
      "date": "2026-09-26",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 2785,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 4950,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 13800,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 700,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "parcel",
          "amount": 4600,
          "isCustom": true
        },
        {
          "name": "AC",
          "amount": 500,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 700,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 138500,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 32200,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 25350,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 650,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 75500,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 31855,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 1000,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        }
      ],
      "dispPurchases": [],
      "storePurchases": [
        {
          "vendor": "AHM",
          "tp": 1700,
          "retail": 4190
        },
        {
          "vendor": "Mr chemist",
          "tp": 1085,
          "retail": 2490
        }
      ],
      "clinicExpenseDetails": [
        {
          "item": "chae",
          "amount": 420
        },
        {
          "item": "chae",
          "amount": 280
        },
        {
          "item": "pani baraf",
          "amount": 520
        },
        {
          "item": "petrol",
          "amount": 500
        },
        {
          "item": "bed sheet",
          "amount": 500
        },
        {
          "item": "juice",
          "amount": 250
        },
        {
          "item": "khana",
          "amount": 600
        },
        {
          "item": "mask and kit",
          "amount": 1180
        },
        {
          "item": "imran",
          "amount": 700
        }
      ],
      "usDetails": [
        64000,
        10000,
        1500
      ],
      "cashItems": [
        128000,
        10000,
        500
      ],
      "homeExpenseDetails": [
        1700,
        6800,
        900,
        700,
        300,
        1100,
        1600,
        700
      ],
      "staffPayments": {
        "S.Naeem": 0,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "khana",
          "amount": 200
        },
        {
          "item": "emrgcy kit",
          "amount": 500
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [],
      "clinicBills": [
        21050,
        3000,
        650,
        650
      ],
      "summary": {
        "debitTotal": 166535,
        "creditTotal": 166555,
        "difference": 20,
        "cashTakenAway": 128000,
        "darazCash": 10500,
        "totalCash": 138500
      }
    },
    "27": {
      "day": 27,
      "date": "2026-09-27",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 31998,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 4730,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 1860,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 9900,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 200,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 2120,
          "isAuto": true
        },
        {
          "name": "petrol",
          "amount": 5000,
          "isCustom": true
        },
        {
          "name": "ammar",
          "amount": 2600,
          "isCustom": true
        },
        {
          "name": "Adnan (noman) clear",
          "amount": 10000,
          "isCustom": true
        },
        {
          "name": "A/C",
          "amount": 7500,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 200,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 111250,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 10500,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 30600,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 1250,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 99500,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 41988,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 2000,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        }
      ],
      "dispPurchases": [
        {
          "item": "es",
          "amount": 3230
        },
        {
          "item": "max",
          "amount": 1500
        }
      ],
      "storePurchases": [
        {
          "vendor": "max",
          "tp": 2150,
          "retail": 3225
        },
        {
          "vendor": "talha",
          "tp": 5023,
          "retail": 5760
        },
        {
          "vendor": "sameel",
          "tp": 1175,
          "retail": 1375
        },
        {
          "vendor": "GS",
          "tp": 23650,
          "retail": 47415
        }
      ],
      "clinicExpenseDetails": [
        {
          "item": "chae",
          "amount": 270
        },
        {
          "item": "chae",
          "amount": 140
        },
        {
          "item": "baraf pani",
          "amount": 250
        },
        {
          "item": "khana",
          "amount": 600
        },
        {
          "item": "jharu",
          "amount": 600
        }
      ],
      "usDetails": [
        91000,
        7000,
        1500
      ],
      "cashItems": [
        100000,
        5500,
        5000,
        750
      ],
      "homeExpenseDetails": [
        1200,
        550,
        1000,
        4200,
        850,
        600,
        1500
      ],
      "staffPayments": {
        "S.Naeem": 0,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "khana",
          "amount": 200
        }
      ],
      "storeExpenseDetails": [
        {
          "item": "Shopper etc",
          "amount": 2120
        }
      ],
      "usExpenseDetails": [],
      "clinicBills": [
        29950,
        650
      ],
      "summary": {
        "debitTotal": 187358,
        "creditTotal": 185838,
        "difference": -1520,
        "cashTakenAway": 105500,
        "darazCash": 5750,
        "totalCash": 111250
      }
    },
    "28": {
      "day": 28,
      "date": "2026-09-28",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 9419,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 1700,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 4000,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 11870,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 200,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "parcel",
          "amount": 2150,
          "isCustom": true
        },
        {
          "name": "bilal",
          "amount": 18900,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 2000,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 200,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 79650,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 5750,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 24900,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 1250,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 58700,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 28539,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 1000,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        }
      ],
      "dispPurchases": [
        {
          "item": "SA",
          "amount": 1700
        }
      ],
      "storePurchases": [
        {
          "vendor": "careway",
          "tp": 1495,
          "retail": 3090
        },
        {
          "vendor": "sameel",
          "tp": 5763,
          "retail": 7250
        },
        {
          "vendor": "azeem",
          "tp": 661,
          "retail": 1100
        },
        {
          "vendor": "serene",
          "tp": 1500,
          "retail": 1750
        }
      ],
      "clinicExpenseDetails": [
        {
          "item": "chae",
          "amount": 400
        },
        {
          "item": "moter switch plug",
          "amount": 2000
        },
        {
          "item": "khana",
          "amount": 600
        },
        {
          "item": "pani baraf",
          "amount": 500
        },
        {
          "item": "petrol",
          "amount": 500
        }
      ],
      "usDetails": [
        55000,
        1500,
        1200,
        1000
      ],
      "cashItems": [
        77000,
        2150,
        500
      ],
      "homeExpenseDetails": [
        470,
        300,
        1100,
        8000,
        2000
      ],
      "staffPayments": {
        "S.Naeem": 0,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "khana",
          "amount": 200
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [],
      "clinicBills": [
        20300,
        3500,
        600,
        500
      ],
      "summary": {
        "debitTotal": 130089,
        "creditTotal": 130139,
        "difference": 50,
        "cashTakenAway": 77000,
        "darazCash": 2650,
        "totalCash": 79650
      }
    },
    "29": {
      "day": 29,
      "date": "2026-09-29",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 4180,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 4050,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 2200,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 15910,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 200,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "parcel",
          "amount": 2550,
          "isCustom": true
        },
        {
          "name": "SN dawai",
          "amount": 10200,
          "isCustom": true
        },
        {
          "name": "saira",
          "amount": 25000,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 200,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 67200,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 2600,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 18850,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 1450,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 69000,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 39810,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        }
      ],
      "dispPurchases": [
        {
          "item": "es",
          "amount": 3730
        },
        {
          "item": "new classic",
          "amount": 320
        }
      ],
      "storePurchases": [
        {
          "vendor": "New classic",
          "tp": 2715,
          "retail": 5575
        },
        {
          "vendor": "popular",
          "tp": 1465,
          "retail": 2450
        }
      ],
      "clinicExpenseDetails": [
        {
          "item": "chae",
          "amount": 350
        },
        {
          "item": "chae",
          "amount": 280
        },
        {
          "item": "pani",
          "amount": 120
        },
        {
          "item": "baraf",
          "amount": 250
        },
        {
          "item": "khana",
          "amount": 600
        },
        {
          "item": "kapray safai",
          "amount": 600
        }
      ],
      "usDetails": [
        65000,
        4000
      ],
      "cashItems": [
        64000,
        2700,
        500
      ],
      "homeExpenseDetails": [
        1120,
        1640,
        550,
        12000,
        600
      ],
      "staffPayments": {
        "S.Naeem": 10200,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "khana",
          "amount": 200
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [],
      "clinicBills": [
        18850
      ],
      "summary": {
        "debitTotal": 131690,
        "creditTotal": 131710,
        "difference": 20,
        "cashTakenAway": 64000,
        "darazCash": 3200,
        "totalCash": 67200
      }
    },
    "30": {
      "day": 30,
      "date": "2026-09-30",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 0,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        }
      ],
      "dispPurchases": [],
      "storePurchases": [],
      "clinicExpenseDetails": [],
      "usDetails": [],
      "cashItems": [],
      "homeExpenseDetails": [],
      "staffPayments": {
        "S.Naeem": 0,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [],
      "storeExpenseDetails": [],
      "usExpenseDetails": [],
      "clinicBills": [],
      "summary": {
        "debitTotal": 0,
        "creditTotal": 0,
        "difference": 0,
        "cashTakenAway": 0,
        "darazCash": 0,
        "totalCash": 0
      }
    },
    "01": {
      "day": 1,
      "date": "2026-09-01",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 51233,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 1620,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 16860,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 200,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Warda",
          "amount": 2000,
          "isCustom": true
        },
        {
          "name": "Eisha ( kal wapis kr day gi)",
          "amount": 10500,
          "isCustom": true
        },
        {
          "name": "AC",
          "amount": 8000,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 1000,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 3350,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 91900,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 5800,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 28700,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 450,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 79000,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 36500,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 22496,
          "isAuto": false
        },
        {
          "name": "Noman Jama",
          "amount": 15000,
          "isCustom": true
        }
      ],
      "dispPurchases": [],
      "storePurchases": [
        {
          "vendor": "SK",
          "tp": 2084,
          "retail": 2600
        },
        {
          "vendor": "New classic",
          "tp": 3105,
          "retail": 6147
        },
        {
          "vendor": "popular",
          "tp": 3648,
          "retail": 5400
        },
        {
          "vendor": "aman",
          "tp": 19900,
          "retail": 39800
        },
        {
          "vendor": "darex",
          "tp": 22496,
          "retail": 47482
        }
      ],
      "clinicExpenseDetails": [
        {
          "item": "chae",
          "amount": 280
        },
        {
          "item": "pani",
          "amount": 240
        },
        {
          "item": "baraf",
          "amount": 300
        },
        {
          "item": "SN",
          "amount": 200
        },
        {
          "item": "khana",
          "amount": 600
        }
      ],
      "usDetails": [
        73000,
        6000
      ],
      "cashItems": [
        89000,
        2900
      ],
      "homeExpenseDetails": [
        1060,
        680,
        360,
        3300,
        200,
        9500,
        880,
        580,
        300
      ],
      "staffPayments": {
        "S.Naeem": 0,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 10500,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "Dental 1",
          "amount": 200
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [],
      "clinicBills": [
        26400,
        1300,
        1000
      ],
      "summary": {
        "debitTotal": 186663,
        "creditTotal": 187946,
        "difference": 1283,
        "cashTakenAway": 89000,
        "darazCash": 2900,
        "totalCash": 91900
      }
    },
    "02": {
      "day": 2,
      "date": "2026-09-02",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 7485,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 2190,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 2040,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 17940,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 400,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 200,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Darex",
          "amount": 22500,
          "isCustom": true
        },
        {
          "name": "prcel ( talha + komal)",
          "amount": 6710,
          "isCustom": true
        },
        {
          "name": "SN",
          "amount": 1280,
          "isCustom": true
        },
        {
          "name": "Essai",
          "amount": 200,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 6500,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 1500,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 101700,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 2900,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 38850,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 250,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 92000,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 37865,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 1000,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        }
      ],
      "dispPurchases": [
        {
          "item": "ES",
          "amount": 2190
        }
      ],
      "storePurchases": [
        {
          "vendor": "Izhar",
          "tp": 3090,
          "retail": 6180
        },
        {
          "vendor": "orient",
          "tp": 4395,
          "retail": 7450
        }
      ],
      "clinicExpenseDetails": [
        {
          "item": "chae",
          "amount": 240
        },
        {
          "item": "pani baraf",
          "amount": 500
        },
        {
          "item": "chae oper",
          "amount": 200
        },
        {
          "item": "",
          "amount": 500
        },
        {
          "item": "",
          "amount": 600
        }
      ],
      "usDetails": [
        70000,
        15000,
        2500,
        1500,
        1500,
        1500
      ],
      "cashItems": [
        100000,
        1700
      ],
      "homeExpenseDetails": [
        1200,
        1000,
        2500,
        390,
        6500,
        1400,
        750,
        4200
      ],
      "staffPayments": {
        "S.Naeem": 1280,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 200,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "Dental 1",
          "amount": 200
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [
        {
          "item": "Envelop",
          "amount": 400
        }
      ],
      "clinicBills": [
        37500,
        600,
        750
      ],
      "summary": {
        "debitTotal": 170645,
        "creditTotal": 172865,
        "difference": 2220,
        "cashTakenAway": 100000,
        "darazCash": 1700,
        "totalCash": 101700
      }
    },
    "03": {
      "day": 3,
      "date": "2026-09-03",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 39395,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 1670,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 7280,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 4250,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 134420,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 800,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 200,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "warda",
          "amount": 3800,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 2500,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 6000,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 62700,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 1600,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 25350,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 550,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 80000,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 34680,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 1000,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "From home for bill",
          "amount": 100000,
          "isCustom": true
        }
      ],
      "dispPurchases": [
        {
          "item": "Item 1",
          "amount": 1670
        }
      ],
      "storePurchases": [
        {
          "vendor": "lylpur",
          "tp": 4855,
          "retail": 9250
        },
        {
          "vendor": "umar",
          "tp": 440,
          "retail": 1260
        },
        {
          "vendor": "ayeza",
          "tp": 2655,
          "retail": 8886
        },
        {
          "vendor": "TF",
          "tp": 8000,
          "retail": 16500
        },
        {
          "vendor": "Decent",
          "tp": 2700,
          "retail": 4950
        },
        {
          "vendor": "Sales link",
          "tp": 2845,
          "retail": 3330
        },
        {
          "vendor": "GS",
          "tp": 17900,
          "retail": 38120
        }
      ],
      "clinicExpenseDetails": [
        {
          "item": "chae",
          "amount": 240
        },
        {
          "item": "pani",
          "amount": 120
        },
        {
          "item": "chae  mistri SN",
          "amount": 620
        },
        {
          "item": "baraf",
          "amount": 300
        },
        {
          "item": "Chair repair",
          "amount": 5200
        },
        {
          "item": "khana",
          "amount": 600
        },
        {
          "item": "petrol",
          "amount": 200
        }
      ],
      "usDetails": [
        76000,
        4000
      ],
      "cashItems": [
        60000,
        2700
      ],
      "homeExpenseDetails": [
        5000,
        15000,
        7850,
        1400,
        1050,
        1420,
        100000,
        2500,
        200
      ],
      "staffPayments": {
        "S.Naeem": 0,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "Dental 1",
          "amount": 200
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [
        {
          "item": "Evelop",
          "amount": 800
        }
      ],
      "clinicBills": [
        25350
      ],
      "summary": {
        "debitTotal": 263015,
        "creditTotal": 263180,
        "difference": 165,
        "cashTakenAway": 60000,
        "darazCash": 2700,
        "totalCash": 62700
      }
    },
    "04": {
      "day": 4,
      "date": "2026-09-04",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 1040,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 10760,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 300,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "SN biscuits",
          "amount": 500,
          "isCustom": true
        },
        {
          "name": "Noman (adnan)",
          "amount": 4000,
          "isCustom": true
        },
        {
          "name": "Ammar",
          "amount": 5000,
          "isCustom": true
        },
        {
          "name": "AC",
          "amount": 3000,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 300,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 101270,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 2700,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 22700,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 350,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 71000,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 29490,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        }
      ],
      "dispPurchases": [],
      "storePurchases": [],
      "clinicExpenseDetails": [
        {
          "item": "",
          "amount": 240
        },
        {
          "item": "",
          "amount": 180
        },
        {
          "item": "",
          "amount": 120
        },
        {
          "item": "",
          "amount": 500
        }
      ],
      "usDetails": [],
      "cashItems": [
        96500,
        4770
      ],
      "homeExpenseDetails": [
        4500,
        6260
      ],
      "staffPayments": {
        "S.Naeem": 0,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "Dental 1",
          "amount": 300
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [],
      "clinicBills": [],
      "summary": {
        "debitTotal": 126170,
        "creditTotal": 126240,
        "difference": 70,
        "cashTakenAway": 96500,
        "darazCash": 4770,
        "totalCash": 101270
      }
    },
    "05": {
      "day": 5,
      "date": "2026-09-05",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 4379,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 1150,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 1800,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 24840,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "tail SN",
          "amount": 1100,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 3200,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 136870,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 4770,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 26900,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 1950,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 85300,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 46479,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        }
      ],
      "dispPurchases": [
        {
          "item": "Item 1",
          "amount": 1150
        }
      ],
      "storePurchases": [
        {
          "vendor": "ahm",
          "tp": 1040,
          "retail": 3800
        },
        {
          "vendor": "max",
          "tp": 3339,
          "retail": 8111
        }
      ],
      "clinicExpenseDetails": [
        {
          "item": "",
          "amount": 300
        },
        {
          "item": "",
          "amount": 360
        },
        {
          "item": "",
          "amount": 240
        },
        {
          "item": "",
          "amount": 500
        },
        {
          "item": "",
          "amount": 400
        }
      ],
      "usDetails": [],
      "cashItems": [
        132000,
        4870
      ],
      "homeExpenseDetails": [
        24840
      ],
      "staffPayments": {
        "S.Naeem": 1100,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "Dental 1",
          "amount": 200
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [],
      "clinicBills": [],
      "summary": {
        "debitTotal": 173339,
        "creditTotal": 173399,
        "difference": 60,
        "cashTakenAway": 132000,
        "darazCash": 4870,
        "totalCash": 136870
      }
    },
    "06": {
      "day": 6,
      "date": "2026-09-06",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 860,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 15710,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 1780,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 18548,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 1000,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 200,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Bilal",
          "amount": 20000,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 2200,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 6000,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 8000,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 119310,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 4870,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 32750,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 1250,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 121300,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 33458,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        }
      ],
      "dispPurchases": [
        {
          "item": "Es",
          "amount": 1650
        },
        {
          "item": "ES",
          "amount": 5660
        },
        {
          "item": "Item 3",
          "amount": 8400
        }
      ],
      "storePurchases": [
        {
          "vendor": "Talha",
          "tp": 860,
          "retail": 1000
        }
      ],
      "clinicExpenseDetails": [
        {
          "item": "pani",
          "amount": 120
        },
        {
          "item": "chae",
          "amount": 280
        },
        {
          "item": "chae",
          "amount": 280
        },
        {
          "item": "baraf",
          "amount": 150
        },
        {
          "item": "khana",
          "amount": 600
        },
        {
          "item": "pani bottle",
          "amount": 350
        }
      ],
      "usDetails": [
        94000,
        26300,
        1000
      ],
      "cashItems": [
        103000,
        15000,
        1310
      ],
      "homeExpenseDetails": [
        338,
        6150,
        970,
        2100,
        1520,
        1770,
        700,
        5000
      ],
      "staffPayments": {
        "S.Naeem": 0,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "Dental 1",
          "amount": 200
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [
        {
          "item": "US Exp",
          "amount": 1000
        }
      ],
      "clinicBills": [
        30850,
        850,
        1050
      ],
      "summary": {
        "debitTotal": 193608,
        "creditTotal": 193628,
        "difference": 20,
        "cashTakenAway": 103000,
        "darazCash": 16310,
        "totalCash": 119310
      }
    },
    "07": {
      "day": 7,
      "date": "2026-09-07",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 24208,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 905,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 2770,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 10300,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 1800,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "A/C",
          "amount": 10000,
          "isCustom": true
        },
        {
          "name": "Bilal",
          "amount": 15000,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 200,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 4500,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 93710,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 16300,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 23150,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 1150,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 80000,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 30883,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "bilal",
          "amount": 11900,
          "isCustom": true
        }
      ],
      "dispPurchases": [
        {
          "item": "umar",
          "amount": 905
        }
      ],
      "storePurchases": [
        {
          "vendor": "Mushtaq",
          "tp": 4989,
          "retail": 7802
        },
        {
          "vendor": "umar",
          "tp": 586,
          "retail": 2110
        },
        {
          "vendor": "SA",
          "tp": 2349,
          "retail": 3750
        },
        {
          "vendor": "Almustafa",
          "tp": 2228,
          "retail": 4500
        },
        {
          "vendor": "Azeem",
          "tp": 661,
          "retail": 1100
        },
        {
          "vendor": "Serine",
          "tp": 1495,
          "retail": 1750
        },
        {
          "vendor": "bilal",
          "tp": 11900,
          "retail": 18830
        }
      ],
      "clinicExpenseDetails": [
        {
          "item": "builty",
          "amount": 700
        },
        {
          "item": "khana",
          "amount": 600
        },
        {
          "item": "chae",
          "amount": 280
        },
        {
          "item": "chae",
          "amount": 70
        },
        {
          "item": "chae",
          "amount": 120
        },
        {
          "item": "baraf pani",
          "amount": 500
        },
        {
          "item": "petrol",
          "amount": 500
        }
      ],
      "usDetails": [
        74000,
        6000
      ],
      "cashItems": [
        78000,
        710,
        15000
      ],
      "homeExpenseDetails": [
        5000,
        1250,
        1300,
        1050,
        1100,
        600
      ],
      "staffPayments": {
        "S.Naeem": 0,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "khana",
          "amount": 200
        },
        {
          "item": "saman",
          "amount": 650
        },
        {
          "item": "mask",
          "amount": 950
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [],
      "clinicBills": [
        23150
      ],
      "summary": {
        "debitTotal": 163393,
        "creditTotal": 163383,
        "difference": -10,
        "cashTakenAway": 78000,
        "darazCash": 15700,
        "totalCash": 93700
      }
    },
    "08": {
      "day": 8,
      "date": "2026-09-08",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 6914,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 1700,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 13210,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 15910,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 700,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "SN saman etc",
          "amount": 3500,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 126420,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 15700,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 30100,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 750,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 91900,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 30601,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        }
      ],
      "dispPurchases": [
        {
          "item": "ES",
          "amount": 1700
        }
      ],
      "storePurchases": [
        {
          "vendor": "Fair",
          "tp": 960,
          "retail": 3000
        },
        {
          "vendor": "Popular",
          "tp": 2601,
          "retail": 3900
        },
        {
          "vendor": "New classic",
          "tp": 3353,
          "retail": 6375
        }
      ],
      "clinicExpenseDetails": [
        {
          "item": "chae",
          "amount": 250
        },
        {
          "item": "chae",
          "amount": 120
        },
        {
          "item": "admi court",
          "amount": 500
        },
        {
          "item": "hameed sweet",
          "amount": 1000
        },
        {
          "item": "banch repair",
          "amount": 10000
        },
        {
          "item": "khana",
          "amount": 600
        },
        {
          "item": "pani baraf",
          "amount": 500
        },
        {
          "item": "SN chae raat",
          "amount": 240
        }
      ],
      "usDetails": [
        79000,
        8400,
        4500
      ],
      "cashItems": [
        100000,
        13000,
        10000,
        3420
      ],
      "homeExpenseDetails": [
        2220,
        1500,
        7200,
        950,
        1440,
        1000,
        1100,
        500
      ],
      "staffPayments": {
        "S.Naeem": 3500,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "khana",
          "amount": 200
        },
        {
          "item": "Saman",
          "amount": 500
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [],
      "clinicBills": [
        28800,
        650,
        650
      ],
      "summary": {
        "debitTotal": 168354,
        "creditTotal": 169051,
        "difference": 697,
        "cashTakenAway": 113000,
        "darazCash": 13420,
        "totalCash": 126420
      }
    },
    "09": {
      "day": 9,
      "date": "2026-09-09",
      "debits": [
        {
          "name": "Store Med Purchases",
          "amount": 8709,
          "isAuto": true
        },
        {
          "name": "Dispensary Purchases",
          "amount": 69923,
          "isAuto": true
        },
        {
          "name": "Clinic Expenses",
          "amount": 3540,
          "isAuto": true
        },
        {
          "name": "LB Expenses",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Home Expenses",
          "amount": 10300,
          "isAuto": true
        },
        {
          "name": "US Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Dental Exp",
          "amount": 200,
          "isAuto": true
        },
        {
          "name": "Store Exp",
          "amount": 0,
          "isAuto": true
        },
        {
          "name": "Car oil chage service",
          "amount": 10000,
          "isCustom": true
        },
        {
          "name": "Kam hisab",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "ZK",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "KH",
          "amount": 1000,
          "isPartner": true
        },
        {
          "name": "BP",
          "amount": 0,
          "isPartner": true
        },
        {
          "name": "Total Cash Available",
          "amount": 112900,
          "isCash": true
        }
      ],
      "credits": [
        {
          "name": "Daraz Cash",
          "amount": 13400,
          "isAuto": false
        },
        {
          "name": "Clinic Pt + Dispensary Inc",
          "amount": 26950,
          "isAuto": true
        },
        {
          "name": "LB",
          "amount": 850,
          "isAuto": false
        },
        {
          "name": "US",
          "amount": 72000,
          "isAuto": true
        },
        {
          "name": "St S",
          "amount": 33299,
          "isAuto": false
        },
        {
          "name": "ECG",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Darex credit",
          "amount": 0,
          "isAuto": false
        },
        {
          "name": "Disp med fsd total",
          "amount": 69923,
          "isCustom": true
        }
      ],
      "dispPurchases": [
        {
          "item": "Asif",
          "amount": 23567
        },
        {
          "item": "Item 2",
          "amount": 34974
        },
        {
          "item": "Asif",
          "amount": 11382
        }
      ],
      "storePurchases": [
        {
          "vendor": "izhar",
          "tp": 2475,
          "retail": 6543
        },
        {
          "vendor": "Orient",
          "tp": 4525,
          "retail": 7730
        },
        {
          "vendor": "SM",
          "tp": 1709,
          "retail": 2000
        }
      ],
      "clinicExpenseDetails": [
        {
          "item": "chae",
          "amount": 250
        },
        {
          "item": "pani",
          "amount": 240
        },
        {
          "item": "baraf",
          "amount": 450
        },
        {
          "item": "petrol",
          "amount": 500
        },
        {
          "item": "wakeel and print",
          "amount": 1400
        },
        {
          "item": "khana",
          "amount": 600
        },
        {
          "item": "abaas kharcha",
          "amount": 100
        }
      ],
      "usDetails": [
        69000,
        3000
      ],
      "cashItems": [
        100000,
        10000,
        1400,
        1500
      ],
      "homeExpenseDetails": [
        500,
        300,
        2000,
        6000,
        1500
      ],
      "staffPayments": {
        "S.Naeem": 0,
        "Ammar": 0,
        "Noman": 0,
        "Naveed": 0,
        "Baig sb": 0,
        "Bilal MR": 0,
        "Komal": 0,
        "Amir Shah": 0,
        "Adnan": 0,
        "Abu Sufyan": 0,
        "Eisha": 0,
        "Shakila": 0,
        "Driver K": 0,
        "Abbas (Swp)": 0,
        "Latif (Swp)": 0,
        "NS LHV": 0
      },
      "receivables": [],
      "dentalDetails": [
        {
          "item": "Dental 1",
          "amount": 200
        }
      ],
      "storeExpenseDetails": [],
      "usExpenseDetails": [],
      "clinicBills": [
        26950
      ],
      "summary": {
        "debitTotal": 216572,
        "creditTotal": 216422,
        "difference": -150,
        "cashTakenAway": 100000,
        "darazCash": 12900,
        "totalCash": 112900
      }
    }
  },
  "totalTable": [
    [],
    [
      "Staff & Vendors",
      null,
      null,
      "Dr & Cr Total",
      null,
      null,
      null,
      "Store Data",
      null,
      null,
      null,
      "LB Data",
      null,
      null,
      null,
      "Salaries Total"
    ],
    [
      "S.Naeem",
      null,
      null,
      "Purchase Price Med (St)",
      null,
      null,
      null,
      "Sale Price (TP) Med (St)",
      "-",
      "Purchase Price Med (St)",
      null,
      "LB inc",
      "-",
      "LB Exp"
    ],
    [
      "Ammar",
      null,
      null,
      "Sale Price (TP) Med (St)",
      null,
      null,
      null,
      null,
      "-",
      null,
      null,
      null,
      "-",
      null,
      null,
      "Clinic Exp"
    ],
    [
      "Noman",
      null,
      null,
      "Home Exp",
      null,
      null,
      null,
      "Store Profit"
    ],
    [
      "Naveed",
      null,
      null,
      "Clinic Exp"
    ],
    [
      "Baig sb",
      null,
      null,
      "US",
      null,
      null,
      null,
      "Prev Month Stock TP",
      "+",
      "Purchase This Month TP",
      null,
      "Disp Data",
      null,
      null,
      null,
      "Clinic Gross"
    ],
    [
      "Bilal MR",
      null,
      null,
      "Disp (Clinic) inc",
      null,
      null,
      null,
      null,
      "+",
      null,
      null,
      "Disp inc",
      "-",
      "Disp Purch",
      null,
      "Clinic Inc",
      "-",
      "Total Exp"
    ],
    [
      "Komal",
      null,
      null,
      "St Sales",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "-",
      null,
      null,
      null,
      "-"
    ],
    [
      "Amir Shah",
      null,
      null,
      "LB inc"
    ],
    [
      "Adnan",
      null,
      null,
      "LB Exp",
      null,
      null,
      null,
      "St Sale This Month",
      "+",
      "Present Month Stock TP"
    ],
    [
      "Abu Sufyan",
      null,
      null,
      "KH",
      null,
      null,
      null,
      null,
      "+",
      null,
      null,
      "Total of ZK,KH,BP",
      null,
      null,
      null,
      "US Gross"
    ],
    [
      "Eisha",
      null,
      null,
      "ECG",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "US Total",
      "-",
      "US Exp"
    ],
    [
      "Shakila",
      null,
      null,
      "Csh",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "-"
    ],
    [
      "Driver K",
      null,
      null,
      "Disp (Clinic) purchases",
      null,
      null,
      null,
      "Stock Difference"
    ],
    [
      "Abbas",
      null,
      null,
      " ZK"
    ],
    [
      "Essai",
      null,
      null,
      " BP",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "Clinic + US Gross"
    ],
    [
      "NS LHV",
      null,
      null,
      "Receivables"
    ],
    [
      null,
      null,
      null,
      "Store Exp",
      null,
      null,
      null,
      "Store Gross"
    ],
    [
      null,
      null,
      null,
      "Dental Exp",
      null,
      null,
      null,
      "Store profit - Store Expances"
    ],
    [
      null,
      null,
      null,
      "US Exp"
    ],
    [],
    [],
    [],
    [],
    []
  ],
  "dataHeaders": [
    "Date",
    "Dr",
    "Cr",
    "Purchase Med (St)",
    "Sale Med (St)",
    "Home Exp",
    "Clinic Exp",
    "US",
    "Disp inc",
    "St Sale",
    "LB inc",
    "LB Exp",
    "KH",
    "ECG",
    "CSH",
    "Disp purchase",
    " ZK",
    " BP",
    "Receivables",
    "US Exp",
    "Dental Exp",
    "Store Exp"
  ],
  "dataRows": [
    [
      1,
      186663,
      187946,
      51233,
      101429,
      16860,
      1620,
      79000,
      28700,
      36500,
      450,
      0,
      3350,
      0,
      89000,
      0,
      0,
      0,
      0,
      0,
      200,
      0
    ],
    [
      2,
      170645,
      172865,
      7485,
      13630,
      17940,
      2040,
      92000,
      38850,
      37865,
      250,
      0,
      6500,
      1000,
      100000,
      2190,
      0,
      1500,
      0,
      400,
      200,
      0
    ],
    [
      3,
      263015,
      263180,
      39395,
      82296,
      134420,
      7280,
      80000,
      25350,
      34680,
      550,
      4250,
      2500,
      1000,
      60000,
      1670,
      0,
      6000,
      0,
      800,
      200,
      0
    ],
    [
      4,
      126170,
      126240,
      0,
      0,
      10760,
      1040,
      71000,
      22700,
      29490,
      350,
      0,
      300,
      0,
      96500,
      0,
      0,
      0,
      0,
      0,
      300,
      0
    ],
    [
      5,
      173339,
      173399,
      4379,
      11911,
      24840,
      1800,
      85300,
      26900,
      46479,
      1950,
      0,
      3200,
      0,
      132000,
      1150,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      6,
      193608,
      193628,
      860,
      1000,
      18548,
      1780,
      121300,
      32750,
      33458,
      1250,
      0,
      6000,
      0,
      103000,
      15710,
      2200,
      8000,
      0,
      1000,
      200,
      0
    ],
    [
      7,
      163393,
      163383,
      24208,
      39842,
      10300,
      2770,
      80000,
      23150,
      30883,
      1150,
      0,
      4500,
      0,
      78000,
      905,
      200,
      0,
      0,
      0,
      1800,
      0
    ],
    [
      8,
      168354,
      169051,
      6914,
      13275,
      15910,
      13210,
      91900,
      30100,
      30601,
      750,
      0,
      0,
      0,
      113000,
      1700,
      0,
      0,
      0,
      0,
      700,
      0
    ],
    [
      9,
      216572,
      216422,
      8709,
      16273,
      10300,
      3540,
      72000,
      26950,
      33299,
      850,
      0,
      1000,
      0,
      100000,
      69923,
      0,
      0,
      0,
      0,
      200,
      0
    ],
    [
      10,
      182120,
      182560,
      4890,
      13200,
      20130,
      1670,
      81100,
      42450,
      45410,
      700,
      1150,
      2900,
      0,
      72000,
      2630,
      0,
      0,
      0,
      0,
      200,
      0
    ],
    [
      11,
      149840,
      149310,
      0,
      0,
      15100,
      52230,
      66300,
      28600,
      42160,
      1250,
      0,
      0,
      0,
      50000,
      0,
      200,
      0,
      750,
      0,
      100,
      0
    ],
    [
      12,
      204629,
      205484,
      34469,
      82750,
      15000,
      8530,
      98500,
      51100,
      36834,
      1050,
      0,
      3500,
      0,
      80000,
      4880,
      200,
      0,
      0,
      0,
      700,
      0
    ],
    [
      13,
      186490,
      187320,
      2780,
      3404,
      31200,
      7720,
      111800,
      31800,
      32370,
      1350,
      0,
      200,
      0,
      58000,
      11670,
      0,
      0,
      0,
      60000,
      200,
      0
    ],
    [
      14,
      283781,
      284581,
      115941,
      238216,
      26750,
      6790,
      90500,
      36000,
      34411,
      850,
      0,
      500,
      0,
      118500,
      6500,
      0,
      0,
      0,
      4800,
      200,
      0
    ],
    [
      15,
      184660,
      183940,
      42750,
      99145,
      21110,
      1590,
      66500,
      33000,
      40490,
      1050,
      0,
      2900,
      0,
      107000,
      0,
      210,
      0,
      0,
      0,
      200,
      0
    ],
    [
      16,
      182086,
      182706,
      15696,
      30651,
      20170,
      2310,
      89000,
      50900,
      39456,
      850,
      0,
      1000,
      0,
      139000,
      1860,
      100,
      0,
      0,
      0,
      200,
      0
    ],
    [
      17,
      149240,
      149200,
      30430,
      54505,
      9670,
      3480,
      79000,
      24300,
      44150,
      950,
      9920,
      0,
      0,
      71000,
      790,
      400,
      4000,
      0,
      0,
      1200,
      0
    ],
    [
      18,
      100840,
      101020,
      0,
      0,
      15360,
      2520,
      53000,
      19750,
      25970,
      450,
      0,
      1000,
      0,
      34000,
      0,
      200,
      0,
      0,
      0,
      200,
      0
    ],
    [
      19,
      173512,
      173522,
      5232,
      9155,
      18780,
      2780,
      79000,
      29400,
      60472,
      850,
      0,
      0,
      0,
      112500,
      0,
      0,
      11100,
      0,
      5000,
      200,
      0
    ],
    [
      20,
      221440,
      221650,
      0,
      0,
      18980,
      2030,
      124800,
      43650,
      50150,
      550,
      0,
      1400,
      0,
      178000,
      7380,
      400,
      0,
      0,
      0,
      200,
      0
    ],
    [
      21,
      153979,
      154628,
      10414,
      20026,
      15575,
      4940,
      83500,
      24850,
      40178,
      400,
      0,
      0,
      0,
      76000,
      3400,
      0,
      1000,
      0,
      15000,
      200,
      0
    ],
    [
      22,
      161345,
      161860,
      4675,
      8376,
      8580,
      7700,
      78000,
      31100,
      44660,
      650,
      0,
      300,
      0,
      69500,
      0,
      0,
      0,
      50000,
      0,
      200,
      0
    ],
    [
      23,
      134097,
      134267,
      10710,
      23275,
      14490,
      1660,
      61800,
      24900,
      44717,
      850,
      0,
      0,
      0,
      54000,
      930,
      4700,
      15000,
      0,
      0,
      200,
      0
    ],
    [
      24,
      125355,
      125475,
      7355,
      14380,
      10290,
      1480,
      60000,
      28250,
      33675,
      850,
      0,
      2000,
      0,
      55500,
      1380,
      0,
      0,
      0,
      0,
      200,
      0
    ],
    [
      25,
      107110,
      107510,
      0,
      0,
      21520,
      2790,
      53600,
      15550,
      29510,
      850,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      200,
      0
    ],
    [
      26,
      166535,
      166555,
      2785,
      6680,
      13800,
      4950,
      75500,
      25350,
      31855,
      650,
      0,
      0,
      1000,
      128000,
      0,
      700,
      0,
      0,
      0,
      700,
      0
    ],
    [
      27,
      187358,
      185838,
      31998,
      57775,
      9900,
      1860,
      99500,
      30600,
      41988,
      1250,
      0,
      200,
      2000,
      105500,
      4730,
      0,
      0,
      0,
      0,
      200,
      2120
    ],
    [
      28,
      130089,
      130139,
      9419,
      13190,
      11870,
      4000,
      58700,
      24900,
      28539,
      1250,
      0,
      200,
      1000,
      77000,
      1700,
      2000,
      0,
      0,
      0,
      200,
      0
    ],
    [
      29,
      131690,
      131710,
      4180,
      8025,
      15910,
      2200,
      69000,
      18850,
      39810,
      1450,
      0,
      0,
      0,
      64000,
      4050,
      0,
      200,
      0,
      0,
      200,
      0
    ],
    [
      30,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      31
    ],
    [
      "Total",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      0
    ],
    []
  ],
  "staffHeaders": [
    "Date",
    "S.Naeem",
    "Ammar",
    "Noman",
    "Naveed",
    "Baig sb",
    "Bilal MR",
    "Komal",
    "Amir Shah",
    "Adnan",
    "Abu Sufyan",
    "Eisha",
    "Shakila",
    "Driver K",
    "Abbas",
    "Essai",
    "NS LHV"
  ],
  "staffRows": [
    [
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      10500,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      2,
      1280,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      200,
      0,
      0
    ],
    [
      3,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      4,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      5,
      1100,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      6,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      7,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      8,
      3500,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      9,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      10,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      10000,
      0,
      0,
      3750,
      0,
      0,
      0,
      0,
      0
    ],
    [
      11,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      4500,
      0,
      0,
      0
    ],
    [
      12,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      13,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      14,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      15,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      16,
      900,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      17,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      15000,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      18,
      40560,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      19,
      1170,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      20,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      6300,
      0,
      0,
      0,
      0,
      0
    ],
    [
      21,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      22,
      1280,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      23,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      2000,
      0,
      2000,
      0,
      0,
      0
    ],
    [
      24,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      23000,
      0,
      0,
      0,
      0,
      0,
      0,
      9000,
      0,
      0
    ],
    [
      25,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      26,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      27,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      28,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      29,
      10200,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      30,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    [
      31
    ],
    [
      "Total"
    ],
    [],
    [],
    [],
    []
  ]
};
