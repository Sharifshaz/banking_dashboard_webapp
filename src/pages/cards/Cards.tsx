import { useState } from "react";
import { 
  Plus, 
  Shield, 
  Globe, 
  ShoppingCart, 
  Banknote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CARDS, RECENT_TRANSACTIONS } from "@/data/mockData";
import { CardVisual } from "@/components/cards/CardVisual";
import { cn } from "@/lib/utils";

export default function Cards() {
  const [selectedCardId, setSelectedCardId] = useState(CARDS[0].id);
  const selectedCard = CARDS.find(c => c.id === selectedCardId) || CARDS[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Cards</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Card
        </Button>
      </div>

      {/* Card Carousel */}
      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
        {CARDS.map((card) => (
          <div 
            key={card.id} 
            className={cn(
              "min-w-[300px] md:min-w-[380px] cursor-pointer transition-all duration-300 snap-center",
              selectedCardId === card.id ? "scale-100 opacity-100" : "scale-95 opacity-70 hover:opacity-90"
            )}
            onClick={() => setSelectedCardId(card.id)}
          >
            <CardVisual card={card} />
            <div className="text-center mt-3">
              <p className="font-medium">{card.type} Card</p>
              <p className="text-xs text-muted-foreground">{card.linkedAccount}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Card Details */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Details & Limits */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Controls</CardTitle>
              <CardDescription>Manage how your card is used</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium">Freeze Card</p>
                    <p className="text-sm text-muted-foreground">Temporarily disable all transactions</p>
                  </div>
                </div>
                <Switch checked={selectedCard.status === "Frozen"} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <p className="font-medium">International Payments</p>
                    <p className="text-sm text-muted-foreground">Enable transactions outside India</p>
                  </div>
                </div>
                <Switch defaultChecked={selectedCard.controls.international} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium">Online Transactions</p>
                    <p className="text-sm text-muted-foreground">E-commerce and digital payments</p>
                  </div>
                </div>
                <Switch defaultChecked={selectedCard.controls.online} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Spending Limits</CardTitle>
              <CardDescription>Set daily transaction limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Banknote className="h-4 w-4" /> ATM Withdrawal
                  </label>
                  <span className="text-sm font-bold">₹{selectedCard.limits.atm.toLocaleString()}</span>
                </div>
                <Slider defaultValue={[selectedCard.limits.atm]} max={100000} step={1000} />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" /> Online Spend
                  </label>
                  <span className="text-sm font-bold">₹{selectedCard.limits.online.toLocaleString()}</span>
                </div>
                <Slider defaultValue={[selectedCard.limits.online]} max={500000} step={5000} />
              </div>

              <div className="flex justify-end">
                <Button>Save Limits</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Transactions */}
        <div className="space-y-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableBody>
                  {RECENT_TRANSACTIONS.slice(0, 6).map((txn, i) => (
                    <TableRow key={i}>
                      <TableCell className="py-3">
                        <div className="flex items-center gap-3">
                          <div className={cn("h-8 w-8 rounded-full flex items-center justify-center", txn.color)}>
                            <txn.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{txn.merchant}</p>
                            <p className="text-xs text-muted-foreground">{txn.date}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {txn.amount > 0 ? "+" : ""}₹{Math.abs(txn.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="p-4 border-t">
                <Button variant="ghost" className="w-full text-sm">View All Transactions</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
