import { useNavigate } from "react-router-dom";
import { ArrowRight, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { OnboardingStepper } from "@/components/shared/OnboardingStepper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function KycAddress() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-5xl space-y-8">
        <OnboardingStepper currentStep={3} />

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-none shadow-lg">
            <CardHeader>
              <CardTitle>Address Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="same" />
                  <Label htmlFor="same">Same as Aadhaar address</Label>
                </div>
                
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Address Line 1</Label>
                    <Input placeholder="House No, Building Name" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Address Line 2</Label>
                    <Input placeholder="Street, Area" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>City</Label>
                      <Input />
                    </div>
                    <div className="grid gap-2">
                      <Label>State</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ka">Karnataka</SelectItem>
                          <SelectItem value="mh">Maharashtra</SelectItem>
                          <SelectItem value="dl">Delhi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>PIN Code</Label>
                      <Input placeholder="560001" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Country</Label>
                      <Input value="India" disabled />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t">
                 <div className="grid gap-2">
                    <Label>Annual Income</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Below 5L</SelectItem>
                        <SelectItem value="2">5L - 10L</SelectItem>
                        <SelectItem value="3">10L - 25L</SelectItem>
                        <SelectItem value="4">Above 25L</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Employment Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="salaried">Salaried</SelectItem>
                        <SelectItem value="self">Self Employed</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
             <Card className="border-none shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Your Details</CardTitle>
                <Edit2 className="h-4 w-4 text-muted-foreground cursor-pointer" />
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Full Name</p>
                  <p className="font-medium">Arjun Sharma</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium">arjun.sharma@gmail.com</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p className="font-medium">+91 98765 43210</p>
                </div>
                <div>
                  <p className="text-muted-foreground">ID Proof</p>
                  <p className="font-medium">Aadhaar •••• 3456</p>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" size="lg" onClick={() => navigate("/onboarding/success")}>
              Complete Setup <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
