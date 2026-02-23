import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
  ArrowLeft, 
  Download, 
  Settings, 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal,
  FileText,
  PieChart as PieChartIcon,
  List,
  Eye,
  EyeOff,
  Copy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { ACCOUNTS, RECENT_TRANSACTIONS, MONTHLY_DATA } from "@/data/mockData";
import { TransactionDrawer } from "@/components/transactions/TransactionDrawer";
import { cn } from "@/lib/utils";

export default function AccountDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  const [selectedTxn, setSelectedTxn] = useState<any>(null);

  const account = ACCOUNTS.find(a => a.id === id) || ACCOUNTS[0];

  // Mock data for charts
  const balanceHistory = [
    { date: 'Feb 1', balance: 285000 },
    { date: 'Feb 5', balance: 292000 },
    { date: 'Feb 10', balance: 278000 },
    { date: 'Feb 15', balance: 305000 },
    { date: 'Feb 20', balance: 312480 },
    { date: 'Feb 25', balance: 310000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/accounts")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{account.type} Account</h1>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>•••• {account.number}</span>
            <Badge variant="outline" className="text-xs font-normal">
              {account.ifsc}
            </Badge>
            <Copy className="h-3 w-3 cursor-pointer hover:text-primary" />
          </div>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Statement
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Account Hero Card */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none shadow-xl">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-sm font-medium">Available Balance</span>
                <button onClick={() => setShowBalance(!showBalance)} className="hover:text-white transition-colors">
                  {showBalance ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                </button>
              </div>
              <h2 className="text-4xl font-bold tracking-tight">
                {showBalance 
                  ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(account.balance || 0)
                  : "••••••••"}
              </h2>
              {account.interestRate && (
                <Badge className="bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border-none">
                  {account.interestRate}% p.a. Interest
                </Badge>
              )}
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Button className="flex-1 md:flex-none bg-indigo-500 hover:bg-indigo-600 text-white border-none">
                <ArrowUpRight className="mr-2 h-4 w-4" /> Transfer
              </Button>
              <Button className="flex-1 md:flex-none bg-white/10 hover:bg-white/20 text-white border-none backdrop-blur-sm">
                <ArrowDownRight className="mr-2 h-4 w-4" /> Add Money
              </Button>
              <Button className="flex-1 md:flex-none bg-white/10 hover:bg-white/20 text-white border-none backdrop-blur-sm px-3">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Content */}
      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="transactions" className="gap-2">
            <List className="h-4 w-4" /> Transactions
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <PieChartIcon className="h-4 w-4" /> Analytics
          </TabsTrigger>
          <TabsTrigger value="statements" className="gap-2">
            <FileText className="h-4 w-4" /> Statements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {RECENT_TRANSACTIONS.map((txn, i) => (
                    <TableRow 
                      key={i} 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedTxn({...txn, id: `txn-${i}`})}
                    >
                      <TableCell className="font-medium text-xs text-muted-foreground">{txn.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={cn("h-8 w-8 rounded-full flex items-center justify-center", txn.color)}>
                            <txn.icon className="h-4 w-4" />
                          </div>
                          <span className="font-medium">{txn.merchant}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal">{txn.category}</Badge>
                      </TableCell>
                      <TableCell className={cn("text-right font-bold", txn.amount > 0 ? "text-emerald-600" : "text-foreground")}>
                        {txn.amount > 0 ? "+" : ""}{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(txn.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none">
                          {txn.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Balance Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={balanceHistory}>
                      <defs>
                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        formatter={(value: any) => [new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value), 'Balance']}
                      />
                      <Area type="monotone" dataKey="balance" stroke="#6366F1" strokeWidth={2} fillOpacity={1} fill="url(#colorBalance)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Flow</CardTitle>
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
                      <Bar dataKey="income" name="Credits" fill="#10B981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expense" name="Debits" fill="#EF4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="statements">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {['Jan 2026', 'Dec 2025', 'Nov 2025', 'Oct 2025', 'Sep 2025', 'Aug 2025'].map((month, i) => (
              <Card key={month} className={cn("hover:border-primary/50 transition-colors", i === 0 && "border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/10")}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{month}</h3>
                      {i === 0 && <Badge variant="secondary" className="mt-1">Current</Badge>}
                    </div>
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground mb-6">
                    <div className="flex justify-between">
                      <span>Credits</span>
                      <span className="text-emerald-600 font-medium">+₹85,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Debits</span>
                      <span className="text-red-600 font-medium">-₹32,480</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-3 w-3" /> PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-3 w-3" /> CSV
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <TransactionDrawer 
        open={!!selectedTxn} 
        onOpenChange={(open) => !open && setSelectedTxn(null)} 
        transaction={selectedTxn} 
      />
    </div>
  );
}
