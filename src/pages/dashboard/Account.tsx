import { useState } from "react";
import { User, Shield, SlidersHorizontal } from "lucide-react";
import AccountSummary from "@/components/dashboard/AccountSummary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <User className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Account Settings</h1>
        </div>
        <p className="text-muted-foreground">
          Manage your profile and account preferences
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList variant="pills" className="mb-6">
          <TabsTrigger variant="pills" value="profile">Profile</TabsTrigger>
          <TabsTrigger variant="pills" value="security">Security</TabsTrigger>
          <TabsTrigger variant="pills" value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="max-w-xl">
            <AccountSummary />
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="max-w-xl space-y-6">
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="w-5 h-5 text-primary" />
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button className="w-full">Update Password</Button>
              </CardContent>
            </Card>

            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Two-Factor Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable 2FA</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch />
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Two-factor authentication is not yet enabled. Enable it to add an extra layer of security.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preferences">
          <div className="max-w-xl">
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <SlidersHorizontal className="w-5 h-5 text-primary" />
                  Display Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Use System Theme</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically switch between light and dark mode
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Compact Sidebar</Label>
                    <p className="text-sm text-muted-foreground">
                      Show only icons in the sidebar by default
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Welcome Message</Label>
                    <p className="text-sm text-muted-foreground">
                      Display personalized greeting on dashboard
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
  );
};

export default AccountPage;
