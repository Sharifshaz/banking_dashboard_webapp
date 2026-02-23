import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export function DashboardLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("novapay-sidebar-collapsed") === "true";
  });
  const location = useLocation();

  // Sync collapsed state reading
  useEffect(() => {
    const handleStorage = () => {
      setCollapsed(localStorage.getItem("novapay-sidebar-collapsed") === "true");
    };
    window.addEventListener('storage', handleStorage);
    // Also listen for custom event if we dispatch one from Sidebar
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Update collapsed state when it changes in localStorage (simulated via Sidebar click)
  // In a real app, we'd use a Context, but here we'll pass a callback or rely on the shared storage pattern
  // For smoother UI, we'll pass the setter to Sidebar if we refactor, but current Sidebar uses internal state + storage.
  // Let's add a listener for the click in Sidebar by checking storage interval or just passing a prop if we could.
  // To fix the sync issue properly without Context refactor:
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("novapay-sidebar-collapsed") === "true";
      if (stored !== collapsed) setCollapsed(stored);
    }, 100);
    return () => clearInterval(interval);
  }, [collapsed]);


  return (
    <div className="min-h-screen bg-muted/30 dark:bg-background">
      {/* Sidebar - Fixed Left, High Z-Index */}
      <Sidebar 
        isMobileOpen={isMobileOpen} 
        onMobileClose={() => setIsMobileOpen(false)} 
      />

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[9990] lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Top Navbar - Fixed Top, Width adjusted by collapsed state */}
      <TopNavbar 
        onMobileMenuClick={() => setIsMobileOpen(true)} 
        collapsed={collapsed}
      />

      {/* Main Content Wrapper */}
      <div 
        className={cn(
          "transition-all duration-300 min-h-screen flex flex-col pt-[60px]", // Add padding top for fixed navbar
          collapsed ? "lg:pl-[64px]" : "lg:pl-[240px]" // Add padding left for fixed sidebar
        )}
      >
        <main className="flex-1 p-4 md:p-8 max-w-[1440px] mx-auto w-full overflow-x-hidden">
           <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
