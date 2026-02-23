import { useNavigate } from "react-router-dom";
import { Check, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function OnboardingSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-8">
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="h-24 w-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto"
        >
          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Check className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
          </motion.div>
        </motion.div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">You're all set, Arjun!</h1>
          <p className="text-muted-foreground">Your NovaPay savings account is active.</p>
        </div>

        <Card className="border-indigo-100 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-950/10">
          <CardContent className="p-6 space-y-4 text-left">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Account Number</p>
                <p className="text-lg font-mono font-bold text-primary">4821 9203 8821</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">IFSC</p>
                <p className="font-mono font-medium">NOVA0001234</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-indigo-200 dark:border-indigo-900">
              <div>
                <p className="text-xs text-muted-foreground">Account Type</p>
                <p className="font-medium">Savings Pro</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Card Status</p>
                <div className="inline-flex items-center text-emerald-600 text-sm font-medium">
                  <Check className="h-3 w-3 mr-1" /> Issued
                </div>
              </div>
            </div>
            
            <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded text-xs text-amber-800 dark:text-amber-300 text-center">
              Please save these details for future reference.
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button className="w-full" size="lg" onClick={() => navigate("/dashboard")}>
            Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" className="w-full">
            <Download className="mr-2 h-4 w-4" /> Download Account Details
          </Button>
        </div>
      </div>
    </div>
  );
}
