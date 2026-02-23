import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Infinity as InfinityIcon, Loader2, Mail, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log(values);
      localStorage.setItem("novapay-auth", "true");
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
        className: "border-l-4 border-l-emerald-500",
      });
      navigate("/dashboard");
    }, 1500);
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* Left: Form */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center p-8 md:p-12 lg:p-24 bg-background z-10">
        <div className="w-full max-w-md mx-auto space-y-8">
          <div className="flex items-center gap-2 text-primary font-bold text-2xl mb-8">
            <InfinityIcon className="h-8 w-8" />
            <span className="tracking-tight">NovaPay</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground">Enter your credentials to access your account.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="name@example.com" className="pl-9" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type="password" 
                          {...field} 
                          className="pl-9 pr-9" 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-9 w-9 px-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-normal text-muted-foreground">
                          Remember me
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <Link 
                  to="/forgot-password" 
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </form>
          </Form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" type="button" disabled={isLoading}>
              Google
            </Button>
            <Button variant="outline" type="button" disabled={isLoading}>
              Apple
            </Button>
          </div>

          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-medium text-primary hover:underline">
              Create account
            </Link>
          </div>
        </div>
      </div>

      {/* Right: Branding - Redesigned */}
      <div className="hidden lg:flex w-[45%] animated-panel-bg relative overflow-hidden flex-col items-center justify-center gap-12 px-10 py-12 h-screen">
        
        {/* Task 2: Floating Glowing Blobs (Kept for premium feel, z-index 0) */}
        <motion.div 
          className="absolute top-[10%] right-[10%] w-96 h-96 rounded-full bg-indigo-400/30 blur-[100px] pointer-events-none"
          animate={{ 
            y: [0, -40, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-[40%] left-[5%] w-64 h-64 rounded-full bg-purple-400/25 blur-[80px] pointer-events-none"
          animate={{ 
            y: [0, 60, 0],
            x: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute bottom-[10%] right-[20%] w-72 h-72 rounded-full bg-violet-500/30 blur-[90px] pointer-events-none"
          animate={{ 
            y: [0, -30, 0],
            x: [0, -20, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay pointer-events-none" />

        {/* Center Visual: Floating Card - Relative Positioning */}
        <div className="animate-float-card-custom z-10">
          <div className="w-[320px] h-[200px] rounded-2xl bg-gradient-to-br from-[#1E1B4B] to-[#312E81] p-6 text-white shadow-2xl shadow-indigo-500/30 border border-white/10 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
             
             <div className="flex justify-between items-start">
               <div className="flex items-center gap-2">
                 <InfinityIcon className="h-6 w-6" />
                 <span className="font-bold tracking-tight">NovaPay</span>
               </div>
               <div className="h-5 w-5 rotate-90 opacity-70">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wifi"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" x2="12.01" y1="20" y2="20"/></svg>
               </div>
             </div>

             <div className="space-y-1">
               <p className="font-mono text-lg tracking-widest opacity-90">•••• •••• •••• 4291</p>
             </div>

             <div className="flex justify-between items-end">
               <div>
                 <p className="text-[10px] uppercase opacity-70">Current Balance</p>
                 <p className="font-bold text-lg">₹1,24,500</p>
               </div>
               <div className="h-8 w-12 bg-white/20 rounded-md"></div>
             </div>
          </div>
        </div>

        {/* Task 3: Centered Quote Section - In Flow */}
        <div className="relative z-10 flex flex-col items-center text-center gap-3.5 max-w-[380px] animate-fade-in-up">
          <blockquote className="space-y-2">
            <p className="text-[22px] font-bold leading-tight text-white">
              &quot;Your money, fully in control.&quot;
            </p>
          </blockquote>
          
          <ul className="flex flex-col gap-2 w-full">
            {[
              "Zero balance savings account",
              "Instant virtual cards",
              "Global investments made easy"
            ].map((item, i) => (
              <li 
                key={i} 
                className={cn(
                  "flex items-center justify-center gap-2 text-white/85 text-sm font-medium animate-fade-in-up opacity-0 fill-mode-forwards",
                  i === 0 ? "delay-300" : i === 1 ? "delay-600" : "delay-900"
                )}
              >
                <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
