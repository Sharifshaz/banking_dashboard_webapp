import { Plus, Eye, EyeOff, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ACCOUNTS } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";

export default function AccountsOverview() {
  const navigate = useNavigate();
  const [showBalances, setShowBalances] = useState<Record<string, boolean>>({});
  const { theme } = useTheme();

  const toggleBalance = (id: string) => {
    setShowBalances(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const totalBalance = ACCOUNTS.reduce((sum, acc) => sum + (acc.balance || 0), 0);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-indigo-100 font-medium mb-1">Total Net Worth</p>
            <h1 className="text-4xl font-bold">
              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalBalance)}
            </h1>
            <p className="text-sm text-indigo-200 mt-2">Across {ACCOUNTS.length} accounts</p>
          </div>
          <Button variant="secondary" className="bg-white text-indigo-600 hover:bg-indigo-50" onClick={() => {}}>
            <Plus className="mr-2 h-4 w-4" /> Open New Account
          </Button>
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {ACCOUNTS.map((acc) => (
          <Card key={acc.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/accounts/${acc.id}`)}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
               <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                   <Wallet className="h-5 w-5 text-primary" />
                 </div>
                 <div>
                   <CardTitle className="text-base">{acc.type}</CardTitle>
                   <CardDescription>•••• {acc.number}</CardDescription>
                 </div>
               </div>
               {acc.isPrimary && <Badge>Primary</Badge>}
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Available Balance</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">
                      {showBalances[acc.id] 
                        ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(acc.balance) 
                        : "••••••••"}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={(e) => { e.stopPropagation(); toggleBalance(acc.id); }}
                    >
                      {showBalances[acc.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>
                {acc.type === "Fixed Deposit" && (
                   <div className="text-right">
                     <p className="text-xs text-muted-foreground">Maturity</p>
                     <p className="font-medium">{acc.maturityDate}</p>
                   </div>
                )}
              </div>

              {acc.type === "Fixed Deposit" ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{acc.progress}%</span>
                  </div>
                  <Progress value={acc.progress} className="h-2" />
                </div>
              ) : (
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1" onClick={(e) => e.stopPropagation()}>
                    Statement
                  </Button>
                  <Button size="sm" className="flex-1" onClick={(e) => e.stopPropagation()}>
                    Transfer
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Heatmap</CardTitle>
          <CardDescription>Transaction intensity for February 2026</CardDescription>
        </CardHeader>
        <CardContent>
          <ActivityHeatmap theme={theme} />
        </CardContent>
      </Card>
    </div>
  );
}

function ActivityHeatmap({ theme }: { theme: string }) {
  // Hardcoded data for Feb 2026 (28 days)
  const txnCounts = [
    2, 8, 11, 7, 9, 13, 3,  // Week 1 (Feb 1-7)
    1, 6, 9, 12, 8, 14, 4,  // Week 2 (Feb 8-14)
    0, 7, 10, 5, 11, 9, 2,  // Week 3 (Feb 15-21)
    1, 13, 8, 6, 10, 12, 3  // Week 4 (Feb 22-28)
  ];

  const getColor = (count: number) => {
    if (count === 0) return theme === 'dark' ? '#1E1E2E' : '#EEEEF5'; // Level 0
    if (count <= 2) return '#C5C6F0'; // Level 1
    if (count <= 5) return '#9091E0'; // Level 2
    if (count <= 10) return '#5C5DD8'; // Level 3
    return '#3A3ABF'; // Level 4
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-3xl overflow-x-auto">
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {/* Header Row */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-xs text-muted-foreground text-center font-medium py-2">
              {day}
            </div>
          ))}

          {/* Data Cells */}
          {txnCounts.map((count, i) => {
            const date = `Feb ${i + 1}`;
            return (
              <TooltipProvider key={i}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div 
                      className="aspect-square w-full rounded-[4px] transition-all hover:ring-2 ring-offset-1 ring-primary/50 cursor-pointer"
                      style={{ backgroundColor: getColor(count) }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-medium">{date} — {count} transactions</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-4">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 2, 5, 8, 12].map((level, i) => (
            <div 
              key={i} 
              className="w-5 h-5 rounded-[3px]" 
              style={{ backgroundColor: getColor(level) }} 
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
