import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LayoutDashboard, 
  Wallet, 
  CreditCard, 
  Send, 
  Landmark, 
  TrendingUp, 
  Target, 
  PieChart, 
  FileText, 
  User, 
  Settings, 
  LifeBuoy, 
  ChevronLeft, 
  ChevronRight, 
  LogOut,
  Infinity as InfinityIcon
} from "lucide-react";
import { USER } from "@/data/mockData";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

const NAV_ITEMS = [
  {
    group: "MAIN",
    items: [
      { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
      { label: "Accounts", icon: Wallet, href: "/accounts" },
      { label: "Transactions", icon: FileText, href: "/transactions" },
    ]
  },
  {
    group: "MONEY",
    items: [
      { label: "Send & Pay", icon: Send, href: "/pay/send" },
      { label: "Cards", icon: CreditCard, href: "/cards" },
    ]
  },
  {
    group: "GROW",
    items: [
      { label: "Loans", icon: Landmark, href: "/loans" },
      { label: "Investments", icon: TrendingUp, href: "/investments" },
      { label: "Savings Goals", icon: Target, href: "/goals" },
    ]
  },
  {
    group: "INSIGHTS",
    items: [
      { label: "Analytics", icon: PieChart, href: "/analytics" },
      { label: "Statements", icon: FileText, href: "/statements" },
    ]
  },
  {
    group: "ACCOUNT",
    items: [
      { label: "Profile", icon: User, href: "/profile" },
      { label: "Settings", icon: Settings, href: "/settings/security" },
      { label: "Help & Support", icon: LifeBuoy, href: "/support" },
    ]
  }
];

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ isMobileOpen, onMobileClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("novapay-sidebar-collapsed") === "true";
  });

  const toggleCollapse = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem("novapay-sidebar-collapsed", String(newState));
  };

  const handleLogout = () => {
    localStorage.removeItem("novapay-auth");
    toast({
      title: "Signed out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  // Close mobile sidebar on route change
  useEffect(() => {
    onMobileClose?.();
  }, [location.pathname]);

  const sidebarWidth = collapsed ? "w-[64px]" : "w-[240px]";

  return (
    <TooltipProvider delayDuration={0}>
      <div 
        className={cn(
          "fixed left-0 top-0 h-full bg-background border-r border-border transition-all duration-300 z-40 flex flex-col",
          sidebarWidth,
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          // Mobile override: always 240px when open
          isMobileOpen && "w-[280px]" 
        )}
      >
        {/* Logo Area */}
        <div className={cn("h-[60px] flex items-center px-4 border-b border-border", collapsed && !isMobileOpen ? "justify-center" : "justify-between")}>
          <div className="flex items-center gap-2 text-primary font-bold text-xl">
            <InfinityIcon className="h-8 w-8" />
            {(!collapsed || isMobileOpen) && <span className="tracking-tight">NovaPay</span>}
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <div className="space-y-6 px-2">
            {NAV_ITEMS.map((group, idx) => (
              <div key={idx}>
                {(!collapsed || isMobileOpen) && (
                  <h4 className="mb-2 px-4 text-xs font-semibold text-muted-foreground tracking-wider">
                    {group.group}
                  </h4>
                )}
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = location.pathname.startsWith(item.href);
                    return (
                      <Tooltip key={item.href}>
                        <TooltipTrigger asChild>
                          <Link
                            to={item.href}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                              isActive 
                                ? "bg-indigo-50 text-primary dark:bg-indigo-950/50" 
                                : "text-muted-foreground hover:bg-muted hover:text-foreground",
                              isActive && "border-l-[3px] border-primary rounded-l-none",
                              collapsed && !isMobileOpen && "justify-center px-2"
                            )}
                          >
                            <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
                            {(!collapsed || isMobileOpen) && <span>{item.label}</span>}
                          </Link>
                        </TooltipTrigger>
                        {collapsed && !isMobileOpen && (
                          <TooltipContent side="right">{item.label}</TooltipContent>
                        )}
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* User Footer */}
        <div className="p-4 border-t border-border">
          <div className={cn("flex items-center gap-3", collapsed && !isMobileOpen ? "justify-center" : "")}>
            <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-primary font-bold text-sm">
              {USER.initials}
            </div>
            {(!collapsed || isMobileOpen) && (
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">{USER.name}</p>
                <button onClick={handleLogout} className="text-xs text-muted-foreground truncate hover:text-destructive text-left w-full">Sign out</button>
              </div>
            )}
            {(!collapsed || isMobileOpen) && (
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Collapse Toggle (Desktop Only) */}
        <div className="hidden lg:flex absolute -right-3 bottom-20">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 rounded-full shadow-md bg-background border-border"
            onClick={toggleCollapse}
          >
            {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
}
