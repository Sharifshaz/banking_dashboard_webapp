import { Search, Filter, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { HOLDINGS } from "@/data/mockData";

export default function MutualFunds() {
  const funds = HOLDINGS.filter(h => h.type === "MF");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mutual Funds</h1>
        <Button>Start New SIP</Button>
      </div>

      {/* SIP Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase">Active SIPs</p>
            <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase">Monthly Investment</p>
            <p className="text-2xl font-bold">₹15,000</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase">Total Invested</p>
            <p className="text-2xl font-bold">₹1.80L</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase">Current Value</p>
            <p className="text-2xl font-bold text-emerald-600">₹2.14L</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="my-funds" className="space-y-6">
        <TabsList>
          <TabsTrigger value="my-funds">My Funds</TabsTrigger>
          <TabsTrigger value="explore">Explore Funds</TabsTrigger>
          <TabsTrigger value="sip">SIP Manager</TabsTrigger>
        </TabsList>

        <TabsContent value="my-funds">
          <div className="grid md:grid-cols-2 gap-4">
            {funds.map((fund) => (
              <Card key={fund.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{fund.name}</h3>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary">Equity</Badge>
                        <Badge variant="outline">High Risk</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Current Value</p>
                      <p className="text-xl font-bold">₹{(fund.units * fund.currPrice).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm mb-6">
                    <div>
                      <span className="text-muted-foreground">Invested: </span>
                      <span className="font-medium">₹{(fund.units * fund.avgPrice).toLocaleString()}</span>
                    </div>
                    <div className="text-emerald-600 font-medium">
                      +{fund.pnlPercent}% Returns
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1" variant="outline">Redeem</Button>
                    <Button className="flex-1">Invest More</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="explore">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search funds..." className="pl-9" />
            </div>
            <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Mock Explore Cards */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="hover:border-primary/50 transition-colors">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="h-10 w-10 bg-indigo-50 rounded-lg flex items-center justify-center font-bold text-indigo-700">
                      MF
                    </div>
                    <div className="flex items-center bg-amber-50 text-amber-700 px-2 py-1 rounded text-xs font-medium">
                      4.5 <Star className="h-3 w-3 ml-1 fill-amber-700" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold">HDFC Mid-Cap Opportunities</h3>
                    <p className="text-sm text-muted-foreground">Equity • Mid Cap</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">1Y</p>
                      <p className="text-emerald-600 font-medium">28.2%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">3Y</p>
                      <p className="text-emerald-600 font-medium">24.8%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">5Y</p>
                      <p className="text-emerald-600 font-medium">19.2%</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 text-xs">Lumpsum</Button>
                    <Button className="flex-1 text-xs">Start SIP</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="sip">
           <Card>
             <CardContent className="p-6 text-center text-muted-foreground">
               SIP Manager content would go here.
             </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
