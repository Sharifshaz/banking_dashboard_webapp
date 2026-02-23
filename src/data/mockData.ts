import { 
  CreditCard, 
  Wallet, 
  ShoppingBag, 
  Utensils, 
  Plane, 
  Film, 
  Home,
  Car,
  User,
  TrendingUp,
  Shield,
  Target
} from "lucide-react";

export const USER = {
  name: "Arjun Sharma",
  email: "arjun.sharma@gmail.com",
  initials: "AS",
  phone: "+91 98765 43210",
  dob: "1995-08-14",
  memberSince: "Aug 2024",
  customerId: "NOVA-2024-08214",
  kycVerified: true,
  avatarUrl: "https://github.com/shadcn.png",
  referralCode: "ARJUN2024",
  address: "42, 3rd Cross, Koramangala, 8th Block, Bengaluru, KA 560095",
  pan: "ABCPS1234H",
  aadhaar: "XXXX-XXXX-3456"
};

export const ACCOUNTS = [
  {
    id: "acc_savings",
    type: "Savings",
    number: "4821",
    balance: 312480.00,
    isPrimary: true,
    ifsc: "NOVA0001234",
    interestRate: 4.0
  },
  {
    id: "acc_current",
    type: "Current",
    number: "9203",
    balance: 169830.50,
    isPrimary: false,
    ifsc: "NOVA0001234"
  },
  {
    id: "acc_fd",
    type: "Fixed Deposit",
    number: "FD-8821",
    balance: 108243.00, // Maturity value
    principal: 100000.00,
    maturityDate: "2026-06-15",
    interestRate: 7.8,
    progress: 68
  },
  {
    id: "acc_wallet",
    type: "Wallet",
    number: "W-4821",
    balance: 2480.00
  }
];

export const CARDS = [
  {
    id: "card_1",
    type: "Debit",
    network: "Visa",
    number: "4821",
    expiry: "08/28",
    cvv: "123",
    holder: "ARJUN SHARMA",
    balance: 312480.00,
    linkedAccount: "Savings ••4821",
    status: "Active",
    theme: "from-indigo-600 to-purple-600",
    controls: {
      international: false,
      online: true,
      contactless: true,
      atm: true
    },
    limits: {
      atm: 20000,
      online: 100000,
      pos: 50000
    }
  },
  {
    id: "card_2",
    type: "Credit",
    network: "Mastercard",
    number: "9203",
    expiry: "11/27",
    cvv: "456",
    holder: "ARJUN SHARMA",
    limit: 200000,
    outstanding: 14200,
    minDue: 4200,
    dueDate: "Feb 25",
    linkedAccount: "Current ••9203",
    status: "Active",
    theme: "from-slate-700 to-slate-900",
    controls: {
      international: true,
      online: true,
      contactless: true,
      atm: true
    },
    limits: {
      atm: 50000,
      online: 200000,
      pos: 100000
    }
  }
];

export const LOANS = [
  {
    id: "loan_personal",
    type: "Personal Loan",
    lender: "NovaPay",
    amount: 500000,
    outstanding: 342300,
    emi: 12480,
    rate: 12.5,
    tenure: 48,
    paidTenure: 24,
    nextDue: "Mar 03, 2026",
    status: "Active",
    icon: User,
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    id: "loan_home",
    type: "Home Loan",
    lender: "SBI",
    amount: 3500000,
    outstanding: 2840000,
    emi: 28600,
    rate: 8.75,
    tenure: 240,
    paidTenure: 36,
    nextDue: "Mar 01, 2026",
    status: "Active",
    autoDebit: true,
    icon: Home,
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    id: "loan_car",
    type: "Car Loan",
    lender: "NovaPay",
    amount: 800000,
    outstanding: 460000,
    emi: 12480,
    rate: 9.5,
    tenure: 60,
    paidTenure: 27,
    nextDue: "Mar 03, 2026",
    status: "Active",
    icon: Car,
    color: "bg-sky-100 text-sky-600"
  }
];

export const KPI_DATA = {
  totalBalance: 482310.50,
  monthlyIncome: 85000,
  monthlySpend: 32480,
  savingsRate: 61.8
};

export const RECENT_TRANSACTIONS = [
  {
    id: "txn_1",
    merchant: "Swiggy Food Pvt Ltd",
    amount: -348.00,
    date: "Today, 7:42 PM",
    status: "Success",
    category: "Food",
    icon: Utensils,
    color: "bg-orange-100 text-orange-600"
  },
  {
    id: "txn_2",
    merchant: "Amazon India",
    amount: -2499.00,
    date: "Yesterday, 3:14 PM",
    status: "Success",
    category: "Shopping",
    icon: ShoppingBag,
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: "txn_3",
    merchant: "Salary Credited",
    amount: 85000.00,
    date: "Feb 01, 9:00 AM",
    status: "Success",
    category: "Income",
    icon: Wallet,
    color: "bg-green-100 text-green-600"
  },
  {
    id: "txn_4",
    merchant: "Uber Rides",
    amount: -452.00,
    date: "Jan 30, 8:22 PM",
    status: "Success",
    category: "Travel",
    icon: Plane,
    color: "bg-sky-100 text-sky-600"
  },
  {
    id: "txn_5",
    merchant: "Netflix Subscription",
    amount: -649.00,
    date: "Jan 28, 10:00 AM",
    status: "Success",
    category: "Entertainment",
    icon: Film,
    color: "bg-red-100 text-red-600"
  }
];

export const UPCOMING_BILLS = [
  {
    id: "bill_1",
    biller: "BESCOM Electricity",
    amount: 1240,
    dueDate: "Feb 22",
    daysLeft: 2,
    urgency: "high" // amber
  },
  {
    id: "bill_2",
    biller: "Jio Fiber",
    amount: 999,
    dueDate: "Feb 25",
    daysLeft: 5,
    urgency: "medium" // yellow
  },
  {
    id: "bill_3",
    biller: "HDFC Credit Card",
    amount: 14200,
    dueDate: "Feb 28",
    daysLeft: 8,
    urgency: "low" // gray
  }
];

export const SAVINGS_GOALS = [
  {
    id: "goal_1",
    name: "Goa Trip",
    emoji: "🏖️",
    target: 25000,
    saved: 18000,
    color: "bg-amber-500",
    bg: "bg-amber-100",
    deadline: "Apr 30, 2026",
    status: "Active"
  },
  {
    id: "goal_2",
    name: "Emergency Fund",
    emoji: "🛡️",
    target: 100000,
    saved: 95000,
    color: "bg-emerald-500",
    bg: "bg-emerald-100",
    deadline: "Open",
    status: "Active"
  },
  {
    id: "goal_3",
    name: "MacBook Pro",
    emoji: "💻",
    target: 150000,
    saved: 35000,
    color: "bg-indigo-500",
    bg: "bg-indigo-100",
    deadline: "Dec 31, 2026",
    status: "Active"
  },
  {
    id: "goal_4",
    name: "Car Down Payment",
    emoji: "🚗",
    target: 200000,
    saved: 0,
    color: "bg-sky-500",
    bg: "bg-sky-100",
    deadline: "Jun 2027",
    status: "Active"
  }
];

export const MONTHLY_DATA = [
  { name: 'Sep', income: 80000, expense: 34200 },
  { name: 'Oct', income: 80000, expense: 38400 },
  { name: 'Nov', income: 80000, expense: 41200 },
  { name: 'Dec', income: 92000, expense: 58400 },
  { name: 'Jan', income: 85000, expense: 29800 },
  { name: 'Feb', income: 97000, expense: 32500 },
];

export const SPENDING_CATEGORIES = [
  { name: 'Shopping', value: 8240, color: '#6366F1' }, // Indigo
  { name: 'Food', value: 4180, color: '#F59E0B' }, // Amber
  { name: 'Travel', value: 3840, color: '#0EA5E9' }, // Sky
  { name: 'Bills', value: 3480, color: '#10B981' }, // Emerald
  { name: 'Others', value: 12740, color: '#9CA3AF' }, // Gray
];

export const MARKET_RATES = [
  { pair: "USD/INR", rate: "86.42", change: "+0.18%", trend: "up" },
  { pair: "EUR/INR", rate: "90.15", change: "-0.32%", trend: "down" },
  { pair: "BTC/USD", rate: "$96,240", change: "+1.84%", trend: "up" },
  { pair: "Gold/10g", rate: "₹68,450", change: "+0.44%", trend: "up" }
];

export const HOLDINGS = [
  { id: 1, name: "Mirae Asset Large Cap", type: "MF", units: 284.32, avgPrice: 68.20, currPrice: 78.45, pnl: 2912, pnlPercent: 15.0 },
  { id: 2, name: "HDFC Mid-Cap Opp", type: "MF", units: 142.10, avgPrice: 95.40, currPrice: 108.20, pnl: 1819, pnlPercent: 13.4 },
  { id: 3, name: "Reliance Industries", type: "Stock", units: 25, avgPrice: 2840, currPrice: 3120, pnl: 7000, pnlPercent: 9.8 },
  { id: 4, name: "Infosys", type: "Stock", units: 40, avgPrice: 1620, currPrice: 1890, pnl: 10800, pnlPercent: 16.7 },
  { id: 5, name: "Digital Gold", type: "Gold", units: 12.5, avgPrice: 5200, currPrice: 5391, pnl: 2385, pnlPercent: 3.7 }
];

export const WATCHLIST = [
  { id: 1, name: "Reliance", ticker: "RELIANCE", price: 3120, change: 0.91 },
  { id: 2, name: "Infosys", ticker: "INFY", price: 1890, change: 2.27 },
  { id: 3, name: "HDFC Bank", ticker: "HDFCBANK", price: 1680, change: -0.71 },
  { id: 4, name: "TCS", ticker: "TCS", price: 4210, change: 2.06 },
  { id: 5, name: "Zomato", ticker: "ZOMATO", price: 248, change: 2.65 },
];

export const NOTIFICATIONS = [
  { id: 1, title: "Salary Credited", desc: "₹85,000 credited to Savings ••4821", time: "2h ago", read: false, type: "money", icon: Wallet, color: "bg-emerald-100 text-emerald-600" },
  { id: 2, title: "New Login", desc: "Chrome on Windows, Bengaluru", time: "5h ago", read: false, type: "security", icon: Shield, color: "bg-amber-100 text-amber-600" },
  { id: 3, title: "SIP Executed", desc: "Mirae Asset ₹5,000", time: "10h ago", read: false, type: "invest", icon: TrendingUp, color: "bg-indigo-100 text-indigo-600" },
  { id: 4, title: "Card Transaction", desc: "₹348 at Swiggy", time: "Yesterday", read: true, type: "money", icon: CreditCard, color: "bg-sky-100 text-sky-600" },
  { id: 5, title: "Goal Milestone", desc: "Emergency Fund reached 95%", time: "Yesterday", read: true, type: "goal", icon: Target, color: "bg-purple-100 text-purple-600" },
];

export const SUPPORT_TICKETS = [
  { id: "TKT-2026-0482", subject: "Transaction not reflecting", category: "Payments", priority: "Medium", date: "Feb 18", status: "In Progress" },
  { id: "TKT-2026-0391", subject: "Card declined abroad", category: "Cards", priority: "High", date: "Feb 10", status: "Resolved" },
  { id: "TKT-2026-0284", subject: "FD premature closure", category: "Accounts", priority: "Low", date: "Jan 28", status: "Closed" },
];
