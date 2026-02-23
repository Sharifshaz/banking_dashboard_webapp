import { useState } from "react";
import { 
  Check, 
  Trash2, 
  Bell,
  Wallet,
  Shield,
  TrendingUp,
  CreditCard,
  Target,
  FileText,
  Gift
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

// Enhanced Mock Data
const NOTIFICATIONS_DATA = [
  { id: 1, title: "Salary Credited", desc: "₹85,000 credited to Savings ••4821", time: "6:02 PM", group: "Today", read: false, type: "money", icon: Wallet, color: "bg-emerald-100 text-emerald-600", link: "/accounts" },
  { id: 2, title: "New Login", desc: "Chrome on Windows, Bengaluru", time: "5:48 PM", group: "Today", read: false, type: "security", icon: Shield, color: "bg-amber-100 text-amber-600", link: "/settings/security" },
  { id: 3, title: "SIP Executed", desc: "Mirae Asset ₹5,000, 2.42 units at ₹78.45", time: "10:00 AM", group: "Today", read: false, type: "invest", icon: TrendingUp, color: "bg-indigo-100 text-indigo-600", link: "/investments/mutual-funds" },
  { id: 4, title: "Card Transaction", desc: "₹348 at Swiggy via ••4821", time: "7:42 PM", group: "Yesterday", read: true, type: "money", icon: CreditCard, color: "bg-sky-100 text-sky-600", link: "/transactions" },
  { id: 5, title: "Goal Milestone", desc: "Emergency Fund reached 95%", time: "9:15 AM", group: "Yesterday", read: true, type: "goal", icon: Target, color: "bg-purple-100 text-purple-600", link: "/goals" },
  { id: 6, title: "Statement Ready", desc: "January 2026 statement is now available", time: "Feb 20", group: "Earlier", read: true, type: "doc", icon: FileText, color: "bg-blue-100 text-blue-600", link: "/statements" },
  { id: 7, title: "Offer", desc: "5% cashback on Swiggy this weekend", time: "Feb 18", group: "Earlier", read: true, type: "promo", icon: Gift, color: "bg-pink-100 text-pink-600", link: "/cards" },
];

export default function NotificationsCenter() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const [filter, setFilter] = useState("All");

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    if(confirm("Are you sure you want to clear all notifications?")) {
      setNotifications([]);
    }
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const toggleRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  const filteredNotifications = filter === "All" 
    ? notifications 
    : notifications.filter(n => n.type === filter.toLowerCase());

  const groups = ["Today", "Yesterday", "Earlier"];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
              {unreadCount} unread
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={markAllRead} disabled={unreadCount === 0}>
            <Check className="mr-2 h-4 w-4" /> Mark all read
          </Button>
          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={clearAll} disabled={notifications.length === 0}>
            Clear all
          </Button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {["All", "Money", "Security", "Invest", "Goal", "Promo"].map(f => (
          <Badge 
            key={f} 
            variant={filter === f ? "default" : "outline"}
            className="cursor-pointer px-3 py-1"
            onClick={() => setFilter(f)}
          >
            {f}
          </Badge>
        ))}
      </div>

      <div className="space-y-8">
        {groups.map(group => {
          const groupItems = filteredNotifications.filter(n => n.group === group);
          if (groupItems.length === 0) return null;

          return (
            <div key={group} className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pl-1">{group}</h3>
              {groupItems.map((notif) => (
                <Card 
                  key={notif.id} 
                  className={cn(
                    "transition-all hover:shadow-md group relative overflow-hidden",
                    !notif.read && "border-l-[3px] border-l-indigo-500 bg-indigo-50/10"
                  )}
                >
                  <CardContent className="p-4 flex gap-4 items-start">
                    <div className={cn("h-10 w-10 rounded-full flex items-center justify-center shrink-0 mt-1", notif.color)}>
                      <notif.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0" onClick={() => notif.link && navigate(notif.link)}>
                      <div className="flex justify-between items-start">
                        <h4 className={cn("text-sm truncate pr-8", !notif.read ? "font-bold text-foreground" : "font-medium text-foreground/80")}>
                          {notif.title}
                        </h4>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{notif.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{notif.desc}</p>
                      {notif.link && (
                        <span className="text-xs font-medium text-primary mt-2 inline-block hover:underline cursor-pointer">
                          View Details
                        </span>
                      )}
                    </div>
                    
                    {/* Hover Actions */}
                    <div className="absolute right-2 top-10 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm rounded-md p-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => toggleRead(notif.id)} title={notif.read ? "Mark unread" : "Mark read"}>
                        <div className={cn("h-2 w-2 rounded-full", notif.read ? "bg-indigo-500" : "border border-muted-foreground")} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => deleteNotification(notif.id)} title="Delete">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          );
        })}
        
        {filteredNotifications.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>No notifications found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
