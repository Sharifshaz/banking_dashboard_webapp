import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight, 
  CreditCard, 
  Send, 
  Zap, 
  Plus, 
  MoreHorizontal,
  Wallet
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { 
  KPI_DATA, 
  MONTHLY_DATA, 
  SPENDING_CATEGORIES, 
  RECENT_TRANSACTIONS, 
  UPCOMING_BILLS, 
  ACCOUNTS,
  USER
} from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Good morning, {USER.name.split(' ')[0]} 👋</h2>
          <p className="text-muted-foreground">Here's what's happening with your money today.</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Money
          </Button>
          <Button variant="outline">
            <Send className="mr-2 h-4 w-4" /> Send
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard 
          title="Total Balance" 
          value={KPI_DATA.totalBalance} 
          change={2.3} 
          icon={Wallet}
          color="text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400"
        />
        <KpiCard 
          title="Monthly Income" 
          value={KPI_DATA.monthlyIncome} 
          change={5.0} 
          icon={TrendingUp}
          color="text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"
        />
        <KpiCard 
          title="Monthly Spend" 
          value={KPI_DATA.monthlySpend} 
          change={-8.2} 
          inverse
          icon={TrendingDown}
          color="text-sky-600 bg-sky-100 dark:bg-sky-900/30 dark:text-sky-400"
        />
        <KpiCard 
          title="Savings Rate" 
          value={KPI_DATA.savingsRate} 
          isPercent 
          change={3.2} 
          icon={Zap}
          color="text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Income vs Expense</CardTitle>
            <CardDescription>Last 6 months activity</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={MONTHLY_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `₹${value/1000}k`} 
                />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--muted)/0.4)' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="income" name="Income" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="expense" name="Expense" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Spending Breakdown</CardTitle>
            <CardDescription>Where your money went this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={SPENDING_CATEGORIES}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {SPENDING_CATEGORIES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => formatCurrency(value)} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {["Send", "Receive", "Pay Bills", "Add Money", "Exchange", "More"].map((action, i) => (
          <Button key={i} variant="outline" className="h-20 flex flex-col gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all">
            <div className="h-8 w-8 rounded-full bg-indigo-50 dark:bg-indigo-900/50 flex items-center justify-center text-primary">
              {i === 0 ? <Send className="h-4 w-4" /> : 
               i === 1 ? <ArrowDownRight className="h-4 w-4" /> :
               i === 2 ? <CreditCard className="h-4 w-4" /> :
               i === 3 ? <Plus className="h-4 w-4" /> :
               i === 4 ? <ArrowUpRight className="h-4 w-4" /> :
               <MoreHorizontal className="h-4 w-4" />}
            </div>
            <span className="text-xs font-medium">{action}</span>
          </Button>
        ))}
      </div>

      {/* Bottom Grid */}
      <div className="grid gap-4 md:grid-cols-12">
        {/* My Accounts */}
        <Card className="md:col-span-4 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Accounts</CardTitle>
            <Button variant="link" className="h-auto p-0">View All</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {ACCOUNTS.slice(0, 2).map((acc) => (
              <div key={acc.id} className="p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <Wallet className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{acc.type}</p>
                      <p className="text-xs text-muted-foreground">•••• {acc.number}</p>
                    </div>
                  </div>
                  {acc.isPrimary && <Badge variant="secondary" className="text-[10px]">Primary</Badge>}
                </div>
                <p className="text-xl font-bold">{formatCurrency(acc.balance)}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="md:col-span-5 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <Button variant="link" className="h-auto p-0">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {RECENT_TRANSACTIONS.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between group cursor-pointer hover:bg-muted/50 p-2 rounded-lg -mx-2 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={cn("h-10 w-10 rounded-full flex items-center justify-center", txn.color)}>
                      <txn.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm group-hover:text-primary transition-colors">{txn.merchant}</p>
                      <p className="text-xs text-muted-foreground">{txn.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn("font-bold text-sm", txn.amount > 0 ? "text-emerald-600" : "text-foreground")}>
                      {txn.amount > 0 ? "+" : ""}{formatCurrency(txn.amount)}
                    </p>
                    <Badge variant="outline" className="text-[10px] h-5 px-1.5">{txn.category}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Bills */}
        <Card className="md:col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle>Upcoming Bills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {UPCOMING_BILLS.map((bill) => (
              <div key={bill.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20">
                <div>
                  <p className="font-medium text-sm">{bill.biller}</p>
                  <p className="text-xs text-muted-foreground">Due {bill.dueDate}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">₹{bill.amount}</p>
                  <Badge 
                    variant={bill.urgency === 'high' ? 'destructive' : bill.urgency === 'medium' ? 'secondary' : 'outline'} 
                    className="text-[10px] h-5"
                  >
                    {bill.daysLeft} days
                  </Badge>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full text-xs">View All Bills</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function KpiCard({ title, value, change, isPercent, inverse, icon: Icon, color }: any) {
  const isPositive = change > 0;
  // If inverse (like spending), positive change is bad (red), negative is good (green)
  const isGood = inverse ? !isPositive : isPositive;
  
  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={cn("p-2 rounded-lg", color)}>
            <Icon className="h-5 w-5" />
          </div>
          {change && (
            <Badge variant="outline" className={cn("flex items-center gap-1", isGood ? "text-emerald-600 border-emerald-200 bg-emerald-50" : "text-red-600 border-red-200 bg-red-50")}>
              {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {Math.abs(change)}%
            </Badge>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold tracking-tight mt-1">
            {isPercent ? `${value}%` : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)}
          </h3>
        </div>
      </CardContent>
    </Card>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {[1,2,3,4].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)}
      </div>
      <div className="grid gap-4 md:grid-cols-7">
        <Skeleton className="col-span-4 h-[350px] rounded-xl" />
        <Skeleton className="col-span-3 h-[350px] rounded-xl" />
      </div>
    </div>
  )
}
