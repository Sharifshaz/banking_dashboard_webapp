import { FileText, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function Statements() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Statements & Reports</h1>
      </div>

      <Tabs defaultValue="monthly" className="space-y-6">
        <TabsList>
          <TabsTrigger value="monthly">Monthly Statements</TabsTrigger>
          <TabsTrigger value="tax">Tax Summary</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {['Feb 2026', 'Jan 2026', 'Dec 2025', 'Nov 2025', 'Oct 2025', 'Sep 2025'].map((month, i) => (
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
                      <span>Txn Count</span>
                      <span className="font-medium">47</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Closing Balance</span>
                      <span className="font-medium">₹3,12,480</span>
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

        <TabsContent value="tax">
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Interest Earned", val: "₹9,483" },
              { label: "TDS Deducted", val: "₹948" },
              { label: "Net Received", val: "₹8,535" },
              { label: "80C Investments", val: "₹1.02L" }
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground uppercase">{stat.label}</p>
                  <p className="text-xl font-bold mt-1">{stat.val}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
             <CardContent className="p-6">
               <h3 className="font-bold mb-4">Tax Breakdown (FY 2025-26)</h3>
               <div className="space-y-4">
                 <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                   <span>Savings Interest</span>
                   <span className="font-mono">₹1,240</span>
                 </div>
                 <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                   <span>FD Interest</span>
                   <span className="font-mono">₹8,243</span>
                 </div>
               </div>
             </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom">
          <Card className="max-w-xl mx-auto">
            <CardContent className="p-8 space-y-6">
               <div className="space-y-2">
                 <Label>Report Type</Label>
                 <Select>
                   <SelectTrigger>
                     <SelectValue placeholder="Select Type" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="txn">Transaction History</SelectItem>
                     <SelectItem value="pl">P&L Statement</SelectItem>
                     <SelectItem value="spend">Spending Analysis</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
               
               <div className="space-y-2">
                 <Label>Date Range</Label>
                 <div className="flex gap-2">
                   <Button variant="outline" className="flex-1 justify-start font-normal">
                     <Calendar className="mr-2 h-4 w-4" /> Start Date
                   </Button>
                   <Button variant="outline" className="flex-1 justify-start font-normal">
                     <Calendar className="mr-2 h-4 w-4" /> End Date
                   </Button>
                 </div>
               </div>

               <div className="space-y-2">
                 <Label>Format</Label>
                 <div className="flex gap-2">
                   {['PDF', 'Excel', 'CSV'].map(fmt => (
                     <Button key={fmt} variant="outline" className="flex-1">{fmt}</Button>
                   ))}
                 </div>
               </div>
               
               <div className="space-y-3 pt-2">
                 <div className="flex items-center space-x-2">
                   <Checkbox id="details" />
                   <Label htmlFor="details">Include Transaction Details</Label>
                 </div>
                 <div className="flex items-center space-x-2">
                   <Checkbox id="charts" />
                   <Label htmlFor="charts">Include Charts</Label>
                 </div>
               </div>

               <Button className="w-full">Generate Report</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
