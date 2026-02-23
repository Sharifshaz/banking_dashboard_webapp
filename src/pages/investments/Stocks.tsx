import { 
  Plus,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { WATCHLIST, MARKET_RATES } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function Stocks() {
  return (
    <div className="space-y-6">
      {/* Ticker Tape */}
      <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide border-b border-border">
        {MARKET_RATES.map((rate, i) => (
          <div key={i} className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-bold text-sm">{rate.pair}</span>
            <span className="text-sm">{rate.rate}</span>
            <span className={cn("text-xs font-medium", rate.trend === "up" ? "text-emerald-600" : "text-red-600")}>
              {rate.change}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-bold text-sm">NIFTY 50</span>
            <span className="text-sm">22,840.35</span>
            <span className="text-xs font-medium text-emerald-600">+0.82%</span>
        </div>
      </div>

      <Tabs defaultValue="watchlist" className="space-y-6">
        <TabsList>
          <TabsTrigger value="watchlist">My Watchlist</TabsTrigger>
          <TabsTrigger value="holdings">My Holdings</TabsTrigger>
          <TabsTrigger value="market">Market Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="watchlist" className="space-y-4">
          <div className="flex justify-between">
            <Input placeholder="Search stocks to add..." className="max-w-sm" />
            <Button><Plus className="mr-2 h-4 w-4" /> Add to Watchlist</Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Change</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {WATCHLIST.map((stock) => (
                    <TableRow key={stock.id} className="group">
                      <TableCell>
                        <div>
                          <p className="font-bold">{stock.ticker}</p>
                          <p className="text-xs text-muted-foreground">{stock.name}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">₹{stock.price}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className={cn("border-none", stock.change > 0 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600")}>
                          {stock.change > 0 ? "+" : ""}{stock.change}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="outline" className="h-8">Buy</Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="holdings">
           <Card>
             <CardContent className="p-6 text-center text-muted-foreground">
               Holdings view same as Investments Overview.
             </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
