import { Shield, Smartphone, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function SecuritySettings() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Security Settings</h1>
        <p className="text-muted-foreground">Manage your account security and access methods.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Last changed 45 days ago</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 max-w-md">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input type="password" />
            </div>
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" />
            </div>
            <Button className="w-fit">Update Password</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-600" />
            <CardTitle>Two-Factor Authentication</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">SMS OTP</p>
              <p className="text-sm text-muted-foreground">Receive codes via SMS to +91 98*** **210</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Authenticator App</p>
              <p className="text-sm text-muted-foreground">Use Google Authenticator or Authy</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="font-medium">Chrome on Windows</p>
                <p className="text-xs text-muted-foreground">Bengaluru • This device</p>
              </div>
            </div>
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="font-medium">iPhone 14 Pro</p>
                <p className="text-xs text-muted-foreground">Mumbai • 2 hours ago</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Revoke</Button>
          </div>

          <Button variant="outline" className="w-full text-destructive hover:text-destructive border-destructive/20 hover:bg-destructive/10">
            <LogOut className="mr-2 h-4 w-4" /> Sign Out of All Other Devices
          </Button>
        </CardContent>
      </Card>
      
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Freeze Account</p>
              <p className="text-sm text-muted-foreground">Temporarily disable all access</p>
            </div>
            <Button variant="outline" className="border-amber-500 text-amber-600 hover:bg-amber-50">Freeze</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Close Account</p>
              <p className="text-sm text-muted-foreground">Permanently delete your account and data</p>
            </div>
            <Button variant="destructive">Close Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
