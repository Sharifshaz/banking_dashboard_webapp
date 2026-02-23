import { Shield, Copy, Edit2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { USER } from "@/data/mockData";

export default function Profile() {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Left Column: ID Card */}
      <div className="space-y-6">
        <Card className="text-center overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600" />
          <div className="relative px-6 pb-6">
            <Avatar className="h-24 w-24 border-4 border-background mx-auto -mt-12">
              <AvatarImage src={USER.avatarUrl} />
              <AvatarFallback className="text-2xl font-bold bg-indigo-100 text-indigo-700">
                {USER.initials}
              </AvatarFallback>
            </Avatar>
            <div className="mt-4">
              <h2 className="text-xl font-bold">{USER.name}</h2>
              <p className="text-sm text-muted-foreground">{USER.customerId}</p>
              <Badge className="mt-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">
                <Shield className="w-3 h-3 mr-1" /> KYC Verified
              </Badge>
            </div>
          </div>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold mb-2">Referral Code</p>
              <div className="flex gap-2">
                <div className="bg-muted p-2 rounded font-mono text-sm flex-1 text-center border border-dashed border-primary/50 text-primary font-bold">
                  {USER.referralCode}
                </div>
                <Button size="icon" variant="outline">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Friends Referred</span>
              <span className="font-bold">3</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Earned</span>
              <span className="font-bold text-emerald-600">₹1,500</span>
            </div>
            <Button className="w-full" variant="secondary">
              <Share2 className="mr-2 h-4 w-4" /> Refer a Friend
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Details */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Personal Information</CardTitle>
            <Button variant="outline" size="sm">
              <Edit2 className="mr-2 h-3 w-3" /> Edit Profile
            </Button>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={USER.name} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Input value={USER.dob} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <div className="relative">
                <Input value={USER.email} readOnly />
                <Badge className="absolute right-2 top-2.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none text-[10px]">Verified</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input value={USER.phone} readOnly />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label>Address</Label>
              <Input value={USER.address} readOnly />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Identity Documents</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>PAN Card</Label>
              <div className="relative">
                <Input value={USER.pan} type="password" readOnly />
                <Shield className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Aadhaar Card</Label>
              <div className="relative">
                <Input value={USER.aadhaar} type="password" readOnly />
                <Shield className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
