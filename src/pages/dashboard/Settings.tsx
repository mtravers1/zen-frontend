import { useState } from "react";
import { Settings, Bell, Puzzle, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [darkMode, setDarkMode] = useState(false);
  const [compactView, setCompactView] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [leadAlerts, setLeadAlerts] = useState(true);
  const [inquiryUpdates, setInquiryUpdates] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const toggle = (setter: (v: boolean) => void, label: string) => (checked: boolean) => {
    setter(checked);
    toast.success(`${label} ${checked ? "enabled" : "disabled"}`);
  };

  return (
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10"><Settings className="w-6 h-6 text-primary" /></div>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        <p className="text-muted-foreground">Configure application settings and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList variant="pills" className="mb-6">
          <TabsTrigger variant="pills" value="general">General</TabsTrigger>
          <TabsTrigger variant="pills" value="notifications">Notifications</TabsTrigger>
          <TabsTrigger variant="pills" value="integrations">Integrations</TabsTrigger>
          <TabsTrigger variant="pills" value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="border border-border shadow-sm"><CardHeader><CardTitle className="text-lg">General Settings</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between"><div className="space-y-0.5"><Label>Dark Mode</Label><p className="text-sm text-muted-foreground">Enable dark mode for the dashboard</p></div><Switch checked={darkMode} onCheckedChange={toggle(setDarkMode, "Dark mode")} /></div>
              <div className="flex items-center justify-between"><div className="space-y-0.5"><Label>Compact View</Label><p className="text-sm text-muted-foreground">Use compact spacing throughout the interface</p></div><Switch checked={compactView} onCheckedChange={toggle(setCompactView, "Compact view")} /></div>
              <div className="flex items-center justify-between"><div className="space-y-0.5"><Label>Auto-save</Label><p className="text-sm text-muted-foreground">Automatically save changes as you type</p></div><Switch checked={autoSave} onCheckedChange={toggle(setAutoSave, "Auto-save")} /></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border border-border shadow-sm"><CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Bell className="w-5 h-5 text-primary" />Notification Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between"><div className="space-y-0.5"><Label>Email Notifications</Label><p className="text-sm text-muted-foreground">Receive notifications via email</p></div><Switch checked={emailNotif} onCheckedChange={toggle(setEmailNotif, "Email notifications")} /></div>
              <div className="flex items-center justify-between"><div className="space-y-0.5"><Label>New Lead Alerts</Label><p className="text-sm text-muted-foreground">Get notified when new leads come in</p></div><Switch checked={leadAlerts} onCheckedChange={toggle(setLeadAlerts, "Lead alerts")} /></div>
              <div className="flex items-center justify-between"><div className="space-y-0.5"><Label>Inquiry Updates</Label><p className="text-sm text-muted-foreground">Notifications for service inquiry status changes</p></div><Switch checked={inquiryUpdates} onCheckedChange={toggle(setInquiryUpdates, "Inquiry updates")} /></div>
              <div className="flex items-center justify-between"><div className="space-y-0.5"><Label>Marketing Emails</Label><p className="text-sm text-muted-foreground">Receive promotional and marketing updates</p></div><Switch checked={marketingEmails} onCheckedChange={toggle(setMarketingEmails, "Marketing emails")} /></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card className="border border-border shadow-sm"><CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Puzzle className="w-5 h-5 text-primary" />Integrations</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Manage your connected integrations and third-party services.</p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center justify-between p-3 border rounded-lg"><div className="flex items-center gap-2"><Puzzle className="w-4 h-4 text-primary" /><span>CRM Integration</span></div><span className="text-xs text-green-600 font-medium">Connected</span></li>
                <li className="flex items-center justify-between p-3 border rounded-lg"><div className="flex items-center gap-2"><Puzzle className="w-4 h-4 text-primary" /><span>Email Service Provider</span></div><span className="text-xs text-green-600 font-medium">Connected</span></li>
                <li className="flex items-center justify-between p-3 border rounded-lg"><div className="flex items-center gap-2"><Puzzle className="w-4 h-4 text-muted-foreground" /><span>Calendar Sync</span></div><span className="text-xs text-muted-foreground">Not connected</span></li>
                <li className="flex items-center justify-between p-3 border rounded-lg"><div className="flex items-center gap-2"><Puzzle className="w-4 h-4 text-muted-foreground" /><span>Third-party Analytics</span></div><span className="text-xs text-muted-foreground">Not connected</span></li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card className="border border-border shadow-sm"><CardHeader><CardTitle className="flex items-center gap-2 text-lg"><CreditCard className="w-5 h-5 text-primary" />Billing Settings</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">View and manage your billing information and subscription.</p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center justify-between p-3 border rounded-lg"><div><span className="font-medium">Professional Plan</span><p className="text-xs text-muted-foreground">6 seats • $294/mo</p></div><span className="text-xs text-green-600 font-medium">Active</span></li>
                <li className="flex items-center justify-between p-3 border rounded-lg"><div><span>Visa •••• 4242</span><p className="text-xs text-muted-foreground">Expires 12/26</p></div><span className="text-xs text-muted-foreground">Default</span></li>
                <li className="flex items-center justify-between p-3 border rounded-lg"><div><span>Next billing</span><p className="text-xs text-muted-foreground">February 1, 2024</p></div><span className="font-medium">$294.00</span></li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
  );
};

export default SettingsPage;
