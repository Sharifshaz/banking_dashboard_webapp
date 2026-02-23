import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Download, 
  Settings, 
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { LOANS } from "@/data/mockData";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend
} from "recharts";

export default function LoanDetail() {
  const { loanId } = useParams();
  const navigate = useNavigate();
  const loan = LOANS.find(l => l.id === loanId) || LOANS[0];

  const principalPaid = loan.amount - loan.outstanding;
  // Mock interest calculation
  const totalInterest = loan.amount * (loan.rate / 100) * (loan.tenure / 12);
  const interestPaid = totalInterest * (loan.paidTenure / loan.tenure);

  const pieData = [
    { name: 'Principal Paid', value: principalPaid, color: '#10B981' },
    { name: 'Interest Paid', value: interestPaid, color: '#F59E0B' },
    { name: 'Outstanding', value: loan.outstanding, color: '#6366F1' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/loans")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{loan.type}</h1>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>{loan.lender}</span>
            <span>•</span>
            <span>ID: {loan.id.toUpperCase()}</span>
            <Badge className="ml-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">Active</Badge>
          </div>
        </div>
        <div className="ml-auto flex gap-2">
          <Button>Pay EMI Now</Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="amortization">Amortization</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Key Stats */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Loan Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Loan Amount</p>
                    <p className="text-lg font-bold">₹{loan.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Outstanding</p>
                    <p className="text-lg font-bold text-indigo-600">₹{loan.outstanding.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">EMI Amount</p>
                    <p className="text-lg font-bold">₹{loan.emi.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Interest Rate</p>
                    <p className="text-lg font-bold">{loan.rate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tenure</p>
                    <p className="text-lg font-bold">{loan.tenure} Months</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">EMIs Paid</p>
                    <p className="text-lg font-bold">{loan.paidTenure}</p>
                  </div>
                </div>
                
                <div className="mt-8 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Repayment Progress</span>
                    <span>{Math.round((loan.paidTenure / loan.tenure) * 100)}%</span>
                  </div>
                  <Progress value={(loan.paidTenure / loan.tenure) * 100} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Breakdown Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: any) => `₹${value.toLocaleString()}`} />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="amortization">
          <Card>
            <CardHeader>
              <CardTitle>Repayment Schedule</CardTitle>
              <CardDescription>Upcoming and past EMI payments</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>EMI</TableHead>
                    <TableHead>Principal</TableHead>
                    <TableHead>Interest</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 12 }).map((_, i) => {
                    const monthNum = loan.paidTenure - 5 + i;
                    if (monthNum <= 0) return null;
                    const isPaid = monthNum <= loan.paidTenure;
                    const isNext = monthNum === loan.paidTenure + 1;
                    
                    return (
                      <TableRow key={i} className={isNext ? "bg-muted/50" : ""}>
                        <TableCell className="font-medium">{monthNum}</TableCell>
                        <TableCell>Mar {monthNum}, 2026</TableCell>
                        <TableCell>₹{loan.emi.toLocaleString()}</TableCell>
                        <TableCell>₹{(loan.emi * 0.7).toFixed(0)}</TableCell>
                        <TableCell>₹{(loan.emi * 0.3).toFixed(0)}</TableCell>
                        <TableCell>
                          {isPaid ? (
                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">Paid</Badge>
                          ) : isNext ? (
                            <Badge variant="outline" className="border-amber-500 text-amber-600">Due Soon</Badge>
                          ) : (
                            <span className="text-muted-foreground text-sm">Upcoming</span>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <div className="grid md:grid-cols-2 gap-4">
            {["Sanction Letter", "Loan Agreement", "Interest Cert FY25", "Repayment Schedule"].map((doc) => (
              <Card key={doc} className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-indigo-50 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium">{doc}</p>
                      <p className="text-xs text-muted-foreground">PDF • 1.2 MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
