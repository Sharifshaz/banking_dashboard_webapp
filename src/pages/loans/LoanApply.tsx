import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Check, 
  User, 
  Home, 
  Car, 
  GraduationCap, 
  Upload, 
  ArrowRight,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const LOAN_TYPES = [
  { id: "personal", label: "Personal", icon: User, rate: "10.5%" },
  { id: "home", label: "Home", icon: Home, rate: "8.5%" },
  { id: "car", label: "Car", icon: Car, rate: "9.2%" },
  { id: "education", label: "Education", icon: GraduationCap, rate: "9.0%" },
];

export default function LoanApply() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [amount, setAmount] = useState(500000);
  const [tenure, setTenure] = useState(24);
  const [isLoading, setIsLoading] = useState(false);

  const emi = Math.round((amount * (10.5 / 1200) * Math.pow(1 + 10.5 / 1200, tenure)) / (Math.pow(1 + 10.5 / 1200, tenure) - 1));

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(4);
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Stepper */}
      <div className="flex items-center justify-between mb-12 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-muted -z-10" />
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-primary -z-10 transition-all duration-500"
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        />
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors bg-background border-2",
            step >= s ? "border-primary text-primary" : "border-muted text-muted-foreground",
            step > s && "bg-primary text-primary-foreground border-primary"
          )}>
            {step > s ? <Check className="h-4 w-4" /> : s}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">What type of loan do you need?</h2>
            <div className="grid grid-cols-2 gap-4">
              {LOAN_TYPES.map((type) => (
                <Card 
                  key={type.id} 
                  className={cn(
                    "cursor-pointer hover:border-primary transition-all",
                    selectedType === type.id && "border-primary ring-1 ring-primary bg-primary/5"
                  )}
                  onClick={() => setSelectedType(type.id)}
                >
                  <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                    <div className={cn(
                      "h-12 w-12 rounded-full flex items-center justify-center bg-muted",
                      selectedType === type.id && "bg-primary text-primary-foreground"
                    )}>
                      <type.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold">{type.label} Loan</h3>
                      <p className="text-sm text-muted-foreground">Starts @ {type.rate}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <Button disabled={!selectedType} onClick={() => setStep(2)}>
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-center">Customize your plan</h2>
            
            <Card>
              <CardContent className="p-8 space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <label className="font-medium">Loan Amount</label>
                    <span className="font-bold text-xl">₹{amount.toLocaleString()}</span>
                  </div>
                  <Slider 
                    value={[amount]} 
                    onValueChange={(val) => setAmount(val[0])} 
                    min={50000} 
                    max={1000000} 
                    step={10000} 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹50K</span>
                    <span>₹10L</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="font-medium">Tenure</label>
                  <div className="flex gap-2">
                    {[12, 24, 36, 48, 60].map((m) => (
                      <Button 
                        key={m} 
                        variant={tenure === m ? "default" : "outline"}
                        onClick={() => setTenure(m)}
                        className="flex-1"
                      >
                        {m}M
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly EMI</p>
                    <p className="text-3xl font-bold text-indigo-600">₹{emi.toLocaleString()}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p>Rate: 10.5% p.a.</p>
                    <p>Total Interest: ₹{(emi * tenure - amount).toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)}>Continue</Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-center">Verify Details</h2>
            
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">Arjun Sharma</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">PAN Number</p>
                    <p className="font-medium">ABCPS1234H</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Upload Documents</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 cursor-pointer">
                      <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm">Salary Slips (Last 3 months)</p>
                    </div>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 cursor-pointer">
                      <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm">Bank Statement (Last 6 months)</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">I agree to the Terms & Conditions and authorize NovaPay to fetch my credit report.</Label>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Application
              </Button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-12"
          >
            <div className="h-24 w-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-12 w-12 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Application Submitted!</h2>
              <p className="text-muted-foreground mt-2">Ref: LOAN-2026-04821</p>
              <p className="text-muted-foreground">We will review your application and update you within 24 hours.</p>
            </div>
            <Button onClick={() => navigate("/dashboard")} className="w-40">
              Go to Dashboard
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
