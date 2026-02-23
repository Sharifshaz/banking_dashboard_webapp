import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  User, 
  ArrowRight, 
  Check, 
  Building2, 
  History,
  ShieldAlert,
  Download,
  RotateCcw,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ACCOUNTS } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";

const RECENT_PAYEES = [
  { id: 1, name: "Swiggy", type: "Merchant", avatar: "S" },
  { id: 2, name: "Rahul K.", type: "Friend", avatar: "R" },
  { id: 3, name: "Mom", type: "Family", avatar: "M" },
  { id: 4, name: "Landlord", type: "Rent", avatar: "L" },
  { id: 5, name: "BESCOM", type: "Bill", avatar: "B" },
];

export default function SendMoney() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [recipient, setRecipient] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [mpin, setMpin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRecipientSelect = (payee: any) => {
    setRecipient(payee);
    setStep(2);
  };

  const handleAmountContinue = () => {
    if (!amount || Number(amount) <= 0) return;
    setStep(3);
  };

  const handleTransfer = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(4);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Stepper Header */}
      <div className="flex items-center justify-between mb-8 px-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex flex-col items-center gap-2 relative z-10">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
              ${step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}
            `}>
              {step > s ? <Check className="h-4 w-4" /> : s}
            </div>
            <span className="text-xs font-medium text-muted-foreground hidden sm:block">
              {s === 1 ? "Recipient" : s === 2 ? "Amount" : s === 3 ? "Review" : "Success"}
            </span>
          </div>
        ))}
        {/* Progress Line */}
        <div className="absolute left-0 right-0 top-4 h-[2px] bg-muted -z-0 mx-auto w-[60%] max-w-lg">
          <div 
            className="h-full bg-primary transition-all duration-500" 
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Select Recipient</CardTitle>
                <CardDescription>Who are you sending money to?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search name, UPI ID or mobile number" className="pl-9 h-12" />
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                    <History className="h-4 w-4" /> Recent
                  </h4>
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {RECENT_PAYEES.map((payee) => (
                      <button 
                        key={payee.id}
                        onClick={() => handleRecipientSelect(payee)}
                        className="flex flex-col items-center gap-2 min-w-[70px] group"
                      >
                        <Avatar className="h-14 w-14 border-2 border-transparent group-hover:border-primary transition-all">
                          <AvatarFallback className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold">
                            {payee.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium truncate w-full text-center">{payee.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">New Transfer</h4>
                  <Button variant="outline" className="w-full justify-start h-14" onClick={() => handleRecipientSelect({ name: "New Bank Transfer", type: "Bank" })}>
                    <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                      <Building2 className="h-4 w-4 text-emerald-700" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">To Bank Account</div>
                      <div className="text-xs text-muted-foreground">Transfer using Account No. & IFSC</div>
                    </div>
                    <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-14" onClick={() => handleRecipientSelect({ name: "New UPI ID", type: "UPI" })}>
                    <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                      <User className="h-4 w-4 text-orange-700" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">To UPI ID</div>
                      <div className="text-xs text-muted-foreground">Pay to any UPI app</div>
                    </div>
                    <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">{recipient?.avatar || "N"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Paying {recipient?.name}</CardTitle>
                    <CardDescription>+91 98765 43210</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="relative w-full max-w-[200px]">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl font-bold text-muted-foreground">₹</span>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      className="text-4xl font-bold h-16 pl-8 text-center border-none shadow-none focus-visible:ring-0 p-0"
                      autoFocus
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <Badge variant="outline" className="mt-2 bg-muted/50">
                    Available: {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(ACCOUNTS[0].balance)}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">From Account</label>
                    <Select defaultValue={ACCOUNTS[0].id}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ACCOUNTS.map(acc => (
                          <SelectItem key={acc.id} value={acc.id}>
                            {acc.type} - •••• {acc.number}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Add a note (Optional)</label>
                    <Textarea 
                      placeholder="Rent, Dinner, etc." 
                      className="resize-none" 
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                  <Button className="flex-1" onClick={handleAmountContinue} disabled={!amount}>Continue</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Review Transfer</CardTitle>
                <CardDescription>Please verify the details before proceeding.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/30 rounded-lg p-4 space-y-3 border border-border/50">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">To</span>
                    <span className="font-semibold">{recipient?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Amount</span>
                    <span className="font-bold text-lg">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(amount))}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">From</span>
                    <span className="font-medium">Savings •••• 4821</span>
                  </div>
                  {note && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Note</span>
                      <span className="text-sm italic">"{note}"</span>
                    </div>
                  )}
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900 rounded-lg p-3 flex gap-3">
                  <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0" />
                  <p className="text-xs text-amber-800 dark:text-amber-300">
                    Never share your MPIN, OTP, or Password with anyone. NovaPay staff will never ask for these details.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium block text-center">Enter 6-digit MPIN to confirm</label>
                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={mpin} onChange={setMpin}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(2)} disabled={isLoading}>Back</Button>
                  <Button 
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white" 
                    onClick={handleTransfer}
                    disabled={mpin.length !== 6 || isLoading}
                  >
                    {isLoading ? "Processing..." : "Pay Securely"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Card className="border-emerald-100 dark:border-emerald-900 bg-emerald-50/30 dark:bg-emerald-900/10">
              <CardContent className="py-12 px-6 space-y-6">
                <div className="h-20 w-20 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Payment Successful!</h2>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(amount))}</span> sent to {recipient?.name}
                  </p>
                </div>

                <div className="bg-background rounded-lg border p-4 max-w-sm mx-auto text-left space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction ID</span>
                    <span className="font-mono">TXN-8293-2938</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date & Time</span>
                    <span>{new Date().toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 max-w-sm mx-auto">
                  <Button className="w-full" onClick={() => navigate("/dashboard")}>
                    <Home className="mr-2 h-4 w-4" /> Go to Dashboard
                  </Button>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={() => {
                      setStep(1);
                      setAmount("");
                      setMpin("");
                      setRecipient(null);
                    }}>
                      <RotateCcw className="mr-2 h-4 w-4" /> Pay Again
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="mr-2 h-4 w-4" /> Receipt
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
