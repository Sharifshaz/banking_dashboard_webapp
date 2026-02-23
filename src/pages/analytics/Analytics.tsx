import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MONTHLY_DATA, SPENDING_CATEGORIES } from "@/data/mockData";
import { AlertTriangle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("6m");

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Financial Analytics</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">This Month</SelectItem>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="1y">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Row 1: Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Income vs Expense</CardTitle>
            <CardDescription>Monthly comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                  <Tooltip 
                    cursor={{ fill: 'hsl(var(--muted)/0.4)' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="income" name="Income" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expense" name="Expense" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Net Savings Trend</CardTitle>
            <CardDescription>Average savings: ₹52,400</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MONTHLY_DATA.map(d => ({ ...d, savings: d.income - d.expense }))}>
                  <defs>
                    <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                  <Tooltip />
                  <Area type="monotone" dataKey="savings" stroke="#6366F1" fillOpacity={1} fill="url(#colorSavings)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Breakdown */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Where Your Money Went</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {SPENDING_CATEGORIES.map((cat) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{cat.name}</span>
                  <span className="font-medium">₹{cat.value.toLocaleString()}</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ width: `${(cat.value / 32480) * 100}%`, backgroundColor: cat.color }} 
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Top Merchants</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Amazon", amount: 8240, cat: "Shopping" },
              { name: "Swiggy", amount: 4180, cat: "Food" },
              { name: "Uber", amount: 3840, cat: "Travel" },
              { name: "Netflix", amount: 1948, cat: "Entertainment" },
              { name: "BigBasket", amount: 1820, cat: "Groceries" }
            ].map((m, i) => (
              <div key={m.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.cat}</p>
                  </div>
                </div>
                <span className="font-bold text-sm">₹{m.amount.toLocaleString()}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Activity Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }).map((_, i) => {
                const intensity = Math.floor(Math.random() * 5);
                return (
                  <div 
                    key={i} 
                    className={cn(
                      "aspect-square rounded-sm",
                      intensity === 0 ? "bg-muted" :
                      intensity === 1 ? "bg-indigo-100 dark:bg-indigo-900/30" :
                      intensity === 2 ? "bg-indigo-300 dark:bg-indigo-700/50" :
                      intensity === 3 ? "bg-indigo-500" :
                      "bg-indigo-700"
                    )}
                  />
                )
              })}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Less</span>
              <span>More</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800">
          <CardContent className="p-4 flex gap-4 items-start">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-800 dark:text-amber-400">Unusual Spend Alert</h4>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                Shopping spend ₹8,240 is 2.4x higher than your 3-month average of ₹3,400.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-emerald-200 bg-emerald-50 dark:bg-emerald-900/10 dark:border-emerald-800">
          <CardContent className="p-4 flex gap-4 items-start">
            <TrendingUp className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-emerald-800 dark:text-emerald-400">Savings Insight</h4>
              <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
                You saved 61.8% of your income this month. You're on track to reach your Emergency Fund goal early.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
