import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { Settings, Building2, Phone, Mail, MapPin, Globe, Facebook, Twitter, Linkedin, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const FirmSettingsPage = () => {
  return (
      <DashboardPageHeader
        title="Firm settings"
        description="Configure your firm's profile and contact information"
        icon={<Settings className="w-5 h-5 text-primary" />}
      />

      <div className="space-y-6">
        {/* Contact Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Contact Details
            </CardTitle>
            <CardDescription>
              This information will be displayed on your client portal and communications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firmName">Firm Name</Label>
                <Input id="firmName" placeholder="Your Firm Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="phone" placeholder="+1 (555) 000-0000" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="contact@yourfirm.com" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="website" placeholder="https://yourfirm.com" className="pl-10" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Textarea id="address" placeholder="Enter your firm's address" className="pl-10 min-h-[80px]" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About Us */}
        <Card>
          <CardHeader>
            <CardTitle>About Us</CardTitle>
            <CardDescription>
              Tell clients about your firm and services.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="Describe your firm, expertise, and what makes you different..."
              className="min-h-[120px]"
            />
          </CardContent>
        </Card>

        {/* Social Media Links */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
            <CardDescription>
              Connect your social media profiles.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <div className="relative">
                  <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="facebook" placeholder="facebook.com/yourfirm" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter / X</Label>
                <div className="relative">
                  <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="twitter" placeholder="twitter.com/yourfirm" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="linkedin" placeholder="linkedin.com/company/yourfirm" className="pl-10" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Zentavos AI Settings
            </CardTitle>
            <CardDescription>
              Configure AI-powered features for your firm.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable AI Assistant</p>
                <p className="text-sm text-muted-foreground">
                  Allow AI to help draft emails and documents.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Smart Suggestions</p>
                <p className="text-sm text-muted-foreground">
                  Get AI-powered workflow recommendations.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </div>
  );
};

export default FirmSettingsPage;

