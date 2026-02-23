import { useNavigate } from "react-router-dom";
import { 
  ArrowRight,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HOLDINGS } from "@/data/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, AreaChart, Area, LineChart, Line } from "recharts";
import { cn } from "@/lib/utils";

export default function InvestmentsOverview() {
  const navigate = useNavigate();
  
  const totalValue = 842310;
  const investedValue = 750000;
  const totalPnL = totalValue - investedValue;
  const totalPnLPercent = (totalPnL / investedValue) * 100;

  const allocationData = [
    { name: 'Mutual Funds', value: 48, color: '#6366F1' },
    { name: 'Stocks', value: 28, color: '#0EA5E9' },
    { name: 'Fixed Deposit', value: 16, color: '#F59E0B' },
    { name: 'Gold', value: 8, color: '#EAB308' },
  ];

  // Mock Sparkline Data
  const mfSparkline = [
    { v: 100 }, { v: 102 }, { v: 105 }, { v: 103 }, { v: 108 }, { v: 112 }, { v: 115 }
  ];
  const stockSparkline = [
    { v: 200 }, { v: 198 }, { v: 205 }, { v: 210 }, { v: 208 }, { v: 215 }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Card */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-indigo-200 font-medium mb-1">Total Portfolio Value</p>
            <h1 className="text-4xl font-bold mb-4">
              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalValue)}
            </h1>
            <div className="flex gap-4">
              <div>
                <p className="text-xs text-indigo-300">Invested</p>
                <p className="font-semibold">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(investedValue)}</p>
              </div>
              <div>
                <p className="text-xs text-indigo-300">Overall P&L</p>
                <p className="font-semibold text-emerald-400">+{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(totalPnL)} ({totalPnLPercent.toFixed(2)}%)</p>
              </div>
              <div>
                <p className="text-xs text-indigo-300">Today's Change</p>
                <p className="font-semibold text-emerald-400">+₹4,210 (0.50%)</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
             <Button 
               variant="outline" 
               className="border-[1.5px] border-white bg-transparent text-white hover:bg-white/10 hover:text-white" 
               onClick={() => navigate("/investments/mutual-funds")}
             >
               Explore Funds
             </Button>
             <Button 
               className="bg-[#6C47FF] text-white hover:bg-[#5a3bd6] border-none"
             >
               <Plus className="mr-2 h-4 w-4" /> Invest
             </Button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Allocation Chart */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    className="dark:filter dark:drop-shadow-[0_0_6px_rgba(108,71,255,0.4)]"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Center Label */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-center pointer-events-none">
                <p className="text-base font-bold text-primary">₹7,50,000</p>
                <p className="text-[11px] text-muted-foreground">Invested</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer overflow-hidden" onClick={() => navigate("/investments/mutual-funds")}>
            <CardContent className="p-6 flex flex-col justify-between h-full relative">
              {/* Sparkline */}
              <div className="h-[80px] w-full mb-4 -mt-2 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mfSparkline}>
                    <defs>
                      <linearGradient id="colorMf" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6C47FF" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#6C47FF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="v" stroke="#6C47FF" strokeWidth={2} fill="url(#colorMf)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex gap-2 mb-4">
                <Badge variant="secondary" className="font-normal">Total SIPs: 3 Active</Badge>
                <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20">XIRR: +14.2%</Badge>
              </div>

              <div className="mt-auto">
                <h3 className="font-bold text-lg">Mutual Funds</h3>
                <p className="text-sm text-muted-foreground mb-4">SIPs, ELSS, & more</p>
                <div className="flex items-center text-sm font-medium text-primary">
                  View Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors cursor-pointer overflow-hidden" onClick={() => navigate("/investments/stocks")}>
            <CardContent className="p-6 flex flex-col justify-between h-full">
              {/* Sparkline */}
              <div className="h-[80px] w-full mb-4 -mt-2 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stockSparkline}>
                    <Line type="monotone" dataKey="v" stroke="#0EA5E9" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="flex gap-2 mb-4">
                <Badge variant="secondary" className="font-normal">Holdings: 6 Stocks</Badge>
                <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20">Today: +₹4,210</Badge>
              </div>

              <div className="mt-auto">
                <h3 className="font-bold text-lg">Stocks & ETFs</h3>
                <p className="text-sm text-muted-foreground mb-4">Equity market holdings</p>
                <div className="flex items-center text-sm font-medium text-primary">
                  View Watchlist <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Holdings Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Holdings</CardTitle>
          <CardDescription>Current value of your investments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Units</TableHead>
                <TableHead className="text-right">Current Price</TableHead>
                <TableHead className="text-right">Current Value</TableHead>
                <TableHead className="text-right">P&L</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {HOLDINGS.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.type}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{item.units}</TableCell>
                  <TableCell className="text-right">₹{item.currPrice}</TableCell>
                  <TableCell className="text-right font-bold">₹{(item.units * item.currPrice).toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end">
                      <span className={cn("font-medium", item.pnl > 0 ? "text-emerald-600" : "text-red-600")}>
                        {item.pnl > 0 ? "+" : ""}₹{item.pnl.toLocaleString()}
                      </span>
                      <span 
                        className={cn(
                          "text-[12px] px-2 py-[2px] rounded-[6px] mt-1 inline-block",
                          item.pnl > 0 
                            ? "bg-[rgba(34,197,94,0.12)] text-[#16A34A]" 
                            : "bg-[rgba(239,68,68,0.12)] text-[#DC2626]"
                        )}
                      >
                        {item.pnl > 0 ? "+" : ""}{item.pnlPercent}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
