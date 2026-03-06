'use client'

import { useState } from "react";
import { useDashboardAuth } from "@/hooks/useDashboardAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Shield, Bell } from "lucide-react";
import { toast } from "sonner";

const PortalAccount = () => {
  const { user, profile } = useDashboardAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  const getInitials = () => {
    if (profile?.full_name) return profile.full_name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    return "U";
  };

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) { toast.error("Passwords don't match"); return; }
    if (newPassword.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) { toast.error(error.message); return; }
    toast.success("Password updated successfully");
    setNewPassword(""); setConfirmPassword("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-3"><User className="w-6 h-6 text-primary" />My Account</h1>
        <p className="text-muted-foreground">Manage your profile and security settings.</p>
      </div>

      {/* Profile */}
      <Card className="border border-border">
        <CardHeader><CardTitle className="text-lg">Profile Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16"><AvatarImage src={profile?.avatar_url || undefined} /><AvatarFallback className="bg-primary/10 text-primary text-xl">{getInitials()}</AvatarFallback></Avatar>
            <div>
              <p className="font-medium text-lg">{profile?.full_name || "User"}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              {profile?.company_name && <p className="text-sm text-muted-foreground">{profile.company_name}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="space-y-2"><Label>Full Name</Label><Input defaultValue={profile?.full_name || ""} /></div>
            <div className="space-y-2"><Label>Phone</Label><Input defaultValue={profile?.phone || ""} /></div>
            <div className="space-y-2"><Label>Company</Label><Input defaultValue={profile?.company_name || ""} /></div>
            <div className="space-y-2"><Label>Email</Label><Input value={user?.email || ""} disabled /></div>
          </div>
          <Button onClick={() => toast.success("Profile updated")}>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="border border-border">
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Shield className="w-5 h-5 text-primary" />Security</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>New Password</Label><Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Enter new password" /></div>
            <div className="space-y-2"><Label>Confirm Password</Label><Input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm new password" /></div>
          </div>
          <Button onClick={handlePasswordUpdate} disabled={!newPassword}>Update Password</Button>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card className="border border-border">
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Bell className="w-5 h-5 text-primary" />Notification Preferences</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div><Label>Email Notifications</Label><p className="text-sm text-muted-foreground">Receive updates about your services and documents</p></div>
            <Switch checked={emailNotif} onCheckedChange={(v) => { setEmailNotif(v); toast.success(`Email notifications ${v ? "enabled" : "disabled"}`); }} />
          </div>
          <div className="flex items-center justify-between">
            <div><Label>SMS Notifications</Label><p className="text-sm text-muted-foreground">Receive text alerts for urgent updates</p></div>
            <Switch checked={smsNotif} onCheckedChange={(v) => { setSmsNotif(v); toast.success(`SMS notifications ${v ? "enabled" : "disabled"}`); }} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortalAccount;
