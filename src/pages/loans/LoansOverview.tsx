import { useNavigate } from "react-router-dom";
import { 
  Landmark, 
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LOANS } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function LoansOverview() {
  const navigate = useNavigate();

  const totalOutstanding = LOANS.reduce((acc, loan) => acc + loan.outstanding, 0);
  const totalEMI = LOANS.reduce((acc, loan) => acc + loan.emi, 0);

  return (
    <div className="space-y-8">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground">Total Outstanding</p>
            <h3 className="text-2xl font-bold mt-1">₹{(totalOutstanding/100000).toFixed(2)}L</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground">Monthly EMI</p>
            <h3 className="text-2xl font-bold mt-1">₹{totalEMI.toLocaleString()}</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground">Next EMI Date</p>
            <h3 className="text-2xl font-bold mt-1">Mar 01</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground">Active Loans</p>
            <h3 className="text-2xl font-bold mt-1">{LOANS.length}</h3>
          </CardContent>
        </Card>
      </div>

      {/* Active Loans List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Your Loans</h2>
          <Button onClick={() => navigate("/loans/apply")}>Apply for Loan</Button>
        </div>
        
        <div className="grid gap-4">
          {LOANS.map((loan) => (
            <Card key={loan.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/loans/${loan.id}`)}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  {/* Icon & Basic Info */}
                  <div className="flex items-center gap-4 min-w-[200px]">
                    <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center", loan.color)}>
                      <loan.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{loan.type}</h3>
                      <p className="text-sm text-muted-foreground">{loan.lender}</p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                    <div>
                      <p className="text-xs text-muted-foreground">Outstanding</p>
                      <p className="font-bold">₹{loan.outstanding.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">EMI Amount</p>
                      <p className="font-bold">₹{loan.emi.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Interest Rate</p>
                      <p className="font-bold">{loan.rate}% p.a.</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Next Due</p>
                      <Badge variant="outline" className="mt-0.5">{loan.nextDue}</Badge>
                    </div>
                  </div>

                  {/* Progress & Action */}
                  <div className="w-full md:w-[200px] space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{Math.round((loan.paidTenure / loan.tenure) * 100)}%</span>
                    </div>
                    <Progress value={(loan.paidTenure / loan.tenure) * 100} className="h-2" />
                    <div className="text-xs text-muted-foreground text-right">
                      {loan.paidTenure}/{loan.tenure} EMIs paid
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <h2 className="text-2xl font-bold mb-2">Need funds for your next big step?</h2>
          <p className="text-indigo-100 mb-6">Get instant personal loans up to ₹10 Lakhs with minimal documentation and quick disbursal.</p>
          <Button variant="secondary" className="bg-white text-indigo-600 hover:bg-indigo-50" onClick={() => navigate("/loans/apply")}>
            Check Eligibility <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="absolute right-0 bottom-0 opacity-20">
          <Landmark className="h-64 w-64 -mb-12 -mr-12" />
        </div>
      </div>
    </div>
  );
}
