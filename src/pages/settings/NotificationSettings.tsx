import { useState } from "react";
import { 
  Lock, 
  CreditCard, 
  TrendingUp, 
  FileText, 
  Tag, 
  Calendar,
  Clock,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const NOTIFICATION_TYPES = [
  { id: "txn", label: "Transaction Alerts", icon: CreditCard, desc: "Money sent, received, or failed", push: true, email: true, sms: true },
  { id: "sec", label: "Security Alerts", icon: Lock, desc: "New logins, password changes", push: true, email: true, sms: true, locked: true },
  { id: "bill", label: "Bill Reminders", icon: FileText, desc: "Upcoming bill due dates", push: true, email: false, sms: false },
  { id: "inv", label: "Investment Updates", icon: TrendingUp, desc: "SIP execution, market alerts", push: true, email: true, sms: false },
  { id: "goal", label: "Goal Updates", icon: Calendar, desc: "Milestones reached, reminders", push: true, email: false, sms: false },
  { id: "promo", label: "Offers & Promotions", icon: Tag, desc: "Discounts, rewards, new features", push: false, email: false, sms: false },
];

export default function NotificationSettings() {
  const [allEnabled, setAllEnabled] = useState(true);

  return (
    <div className="max-w-4xl space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Notification Settings</h1>
          <p className="text-muted-foreground">Manage how and when you want to be notified.</p>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="all-notifs" className="font-medium">Enable All Notifications</Label>
          <Switch id="all-notifs" checked={allEnabled} onCheckedChange={setAllEnabled} />
        </div>
      </div>

      <div className={cn("space-y-8 transition-opacity duration-300", !allEnabled && "opacity-50 pointer-events-none")}>
        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Categories</CardTitle>
            <CardDescription>Customize alerts by category and channel.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {NOTIFICATION_TYPES.map((type, i) => (
              <div key={type.id}>
                <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <type.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{type.label}</p>
                        {type.locked && <Lock className="h-3 w-3 text-muted-foreground" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{type.desc}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center gap-1">
                      <Label className="text-xs text-muted-foreground">Push</Label>
                      <Switch defaultChecked={type.push} disabled={type.locked} />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Label className="text-xs text-muted-foreground">Email</Label>
                      <Switch defaultChecked={type.email} disabled={type.locked} />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Label className="text-xs text-muted-foreground">SMS</Label>
                      <Switch defaultChecked={type.sms} disabled={type.locked} />
                    </div>
                  </div>
                </div>
                {i < NOTIFICATION_TYPES.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Thresholds */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Thresholds</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label>Minimum amount for alerts</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">₹</span>
                  <Input type="number" placeholder="0" className="pl-7" />
                </div>
                <p className="text-xs text-muted-foreground">You will only be notified for transactions above this amount.</p>
              </div>
              
              <div className="space-y-3">
                <Label>Notify me for</Label>
                <RadioGroup defaultValue="all">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="r1" />
                    <Label htmlFor="r1">All Transactions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="debit" id="r2" />
                    <Label htmlFor="r2">Debits Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit" id="r3" />
                    <Label htmlFor="r3">Credits Only</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quiet Hours */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-indigo-600" />
                <CardTitle>Quiet Hours</CardTitle>
              </div>
              <Switch />
            </div>
            <CardDescription>Pause notifications during specific times.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="space-y-2">
                <Label>From</Label>
                <Input type="time" defaultValue="23:00" />
              </div>
              <div className="space-y-2">
                <Label>To</Label>
                <Input type="time" defaultValue="07:00" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md border border-amber-200 dark:border-amber-800">
              <AlertTriangle className="h-4 w-4" />
              Security alerts will still be delivered during quiet hours.
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t flex justify-end gap-4 z-50 md:pl-[240px]">
        <Button variant="ghost">Reset to Default</Button>
        <Button>Save Preferences</Button>
      </div>
    </div>
  );
}
