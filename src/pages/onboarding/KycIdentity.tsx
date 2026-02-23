import { useNavigate } from "react-router-dom";
import { Camera, Upload, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OnboardingStepper } from "@/components/shared/OnboardingStepper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function KycIdentity() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-5xl space-y-8">
        <OnboardingStepper currentStep={2} />

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-none shadow-lg">
            <CardHeader>
              <CardTitle>Identity Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Select ID Type</Label>
                <RadioGroup defaultValue="aadhaar" className="grid grid-cols-2 gap-4">
                  {["Aadhaar", "PAN Card", "Passport", "Driving License"].map((id) => (
                    <div key={id}>
                      <RadioGroupItem value={id.toLowerCase().replace(' ', '-')} id={id} className="peer sr-only" />
                      <Label
                        htmlFor={id}
                        className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-indigo-50 dark:peer-data-[state=checked]:bg-indigo-900/20 [&:has([data-state=checked])]:border-primary"
                      >
                        {id}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>ID Number</Label>
                <Input placeholder="XXXX-XXXX-XXXX" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">Upload Front Side</p>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 5MB</p>
                </div>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">Upload Back Side</p>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 5MB</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6 text-center space-y-4">
                <div className="h-48 w-full bg-muted rounded-lg flex items-center justify-center mb-4">
                  <Camera className="h-12 w-12 text-muted-foreground/50" />
                </div>
                <Button className="w-full">
                  <Camera className="mr-2 h-4 w-4" /> Take Selfie
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800">
              <CardContent className="p-4">
                <h4 className="font-semibold text-amber-800 dark:text-amber-400 mb-2">Photo Tips</h4>
                <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1 list-disc list-inside">
                  <li>Ensure good lighting</li>
                  <li>Keep face visible & straight</li>
                  <li>No glasses or hats</li>
                </ul>
              </CardContent>
            </Card>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3 w-3" />
              Documents are 256-bit encrypted
            </div>
            
            <Button className="w-full" size="lg" onClick={() => navigate("/onboarding/kyc-address")}>
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
