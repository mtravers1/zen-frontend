import { useState } from "react";
import { Settings, Bell, Puzzle, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Settings className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        <p className="text-muted-foreground">
          Configure application settings and preferences
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList variant="pills" className="mb-6">
          <TabsTrigger variant="pills" value="general">General</TabsTrigger>
          <TabsTrigger variant="pills" value="notifications">Notifications</TabsTrigger>
          <TabsTrigger variant="pills" value="integrations">Integrations</TabsTrigger>
          <TabsTrigger variant="pills" value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable dark mode for the dashboard
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Compact View</Label>
                  <p className="text-sm text-muted-foreground">
                    Use compact spacing throughout the interface
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-save</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically save changes as you type
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="w-5 h-5 text-primary" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Lead Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when new leads come in
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Inquiry Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications for service inquiry status changes
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive promotional and marketing updates
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card className="border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Puzzle className="w-5 h-5 text-primary" />
                Integrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Integration settings coming soon. This will include:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
                <li>CRM integrations</li>
                <li>Email service providers</li>
                <li>Calendar sync</li>
                <li>Third-party analytics</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card className="border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CreditCard className="w-5 h-5 text-primary" />
                Billing Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Billing settings coming soon. This will include:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
                <li>Payment methods</li>
                <li>Invoice history</li>
                <li>Subscription management</li>
                <li>Tax information</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
  );
};

export default SettingsPage;
