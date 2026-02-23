import { useState } from "react";
import { 
  Download, 
  Filter, 
  Search,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { RECENT_TRANSACTIONS } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function TransactionsList() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock expanding the recent transactions to a larger list
  const transactions = [...RECENT_TRANSACTIONS, ...RECENT_TRANSACTIONS, ...RECENT_TRANSACTIONS].map((t, i) => ({
    ...t,
    id: `txn_${i}`
  }));

  return (
    <div className="space-y-8">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground">Total Debits</p>
            <h3 className="text-2xl font-bold mt-1 text-red-600">₹32,480</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground">Total Credits</p>
            <h3 className="text-2xl font-bold mt-1 text-emerald-600">₹85,000</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground">Net Flow</p>
            <h3 className="text-2xl font-bold mt-1 text-primary">+₹52,520</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground">Count</p>
            <h3 className="text-2xl font-bold mt-1">47</h3>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center border-b">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by merchant or ID..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"><Checkbox /></TableHead>
              <TableHead>Date/Time</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((txn) => (
              <TableRow key={txn.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell><Checkbox /></TableCell>
                <TableCell className="font-medium text-xs text-muted-foreground">{txn.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className={cn("h-8 w-8 rounded-full flex items-center justify-center", txn.color)}>
                      <txn.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{txn.merchant}</p>
                      <p className="text-xs text-muted-foreground">{txn.category}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">
                    {txn.amount > 0 ? "Credit" : "Debit"}
                  </Badge>
                </TableCell>
                <TableCell className={cn("text-right font-bold", txn.amount > 0 ? "text-emerald-600" : "text-foreground")}>
                  {txn.amount > 0 ? "+" : ""}{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(txn.amount)}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none">
                    {txn.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Report Issue</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="p-4 border-t flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing 1-10 of 47</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
