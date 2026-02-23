import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  Share2, 
  AlertCircle, 
  MapPin, 
  Smartphone, 
  Calendar,
  Copy
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TransactionDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: any; // Using any for mock flexibility
}

export function TransactionDrawer({ open, onOpenChange, transaction }: TransactionDrawerProps) {
  if (!transaction) return null;

  const isDebit = transaction.amount < 0;
  const amount = Math.abs(transaction.amount);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-[480px] overflow-y-auto p-0 gap-0">
        <div className="p-6 pb-0">
          <SheetHeader className="mb-6 text-left">
            <SheetTitle>Transaction Details</SheetTitle>
            <SheetDescription>
              View details for this transaction.
            </SheetDescription>
          </SheetHeader>

          {/* Amount Header */}
          <div className="flex flex-col items-center justify-center py-8 bg-muted/30 rounded-xl mb-6 border border-border/50">
            <div className={cn(
              "h-16 w-16 rounded-full flex items-center justify-center mb-4 shadow-sm",
              transaction.color || "bg-gray-100"
            )}>
              {transaction.icon && <transaction.icon className="h-8 w-8" />}
            </div>
            <h2 className={cn(
              "text-3xl font-bold tracking-tight mb-1",
              isDebit ? "text-foreground" : "text-emerald-600"
            )}>
              {isDebit ? "-" : "+"}{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount)}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-medium text-muted-foreground">{transaction.merchant}</span>
              <Badge variant={transaction.status === "Success" ? "secondary" : "outline"} className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">
                {transaction.status}
              </Badge>
            </div>
          </div>

          {/* Flow Visualization */}
          <div className="flex items-center justify-between px-4 py-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg mb-8 border border-indigo-100 dark:border-indigo-900">
            <div className="text-xs font-medium text-muted-foreground">
              <p className="mb-1">From</p>
              <p className="text-foreground font-semibold">Savings ••4821</p>
            </div>
            <div className="flex-1 px-4 flex items-center">
              <div className="h-[2px] flex-1 bg-indigo-200 dark:bg-indigo-700 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-indigo-500" />
              </div>
            </div>
            <div className="text-xs font-medium text-muted-foreground text-right">
              <p className="mb-1">To</p>
              <p className="text-foreground font-semibold truncate max-w-[120px]">{transaction.merchant}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="p-6 space-y-6">
          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-y-6 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Transaction ID</p>
              <div className="flex items-center gap-2 font-mono font-medium">
                {transaction.id.toUpperCase()}
                <Copy className="h-3 w-3 text-muted-foreground cursor-pointer hover:text-primary" />
              </div>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Date & Time</p>
              <div className="flex items-center gap-2 font-medium">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                {transaction.date}
              </div>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Category</p>
              <p className="font-medium">{transaction.category}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Payment Mode</p>
              <p className="font-medium">UPI</p>
            </div>
          </div>

          <Separator />

          {/* Breakdown */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Payment Breakdown</h4>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount</span>
              <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Convenience Fee</span>
              <span>₹0.00</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Total Debited</span>
              <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount)}</span>
            </div>
          </div>

          <Separator />

          {/* Meta Info */}
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div className="text-xs">
                <p className="font-medium">Location</p>
                <p className="text-muted-foreground">Bengaluru, Karnataka</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Smartphone className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div className="text-xs">
                <p className="font-medium">Device</p>
                <p className="text-muted-foreground">iPhone 14 Pro • iOS 18.2</p>
              </div>
            </div>
          </div>
        </div>

        <SheetFooter className="p-6 pt-2 gap-2 sm:flex-col">
          <Button className="w-full" variant="outline">
            <Download className="mr-2 h-4 w-4" /> Download Receipt
          </Button>
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button variant="ghost" className="w-full text-muted-foreground">
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
            <Button variant="ghost" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10">
              <AlertCircle className="mr-2 h-4 w-4" /> Report Issue
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
