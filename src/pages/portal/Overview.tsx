'use client'

import { useEffect, useState } from "react";
import { useDashboardAuth } from "@/hooks/useDashboardAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import {
  Briefcase, FolderOpen, MessageCircle, Bell, ShoppingCart,
  GitBranch, CreditCard, ArrowRight, CheckCircle2, Clock, AlertCircle,
} from "lucide-react";

const PortalOverview = () => {
  const { user, profile } = useDashboardAuth();
  const [serviceCount, setServiceCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    supabase.from("user_services").select("*", { count: "exact", head: true }).eq("user_id", user.id).then(({ count }) => setServiceCount(count || 0));
  }, [user]);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const quickLinks = [
    { title: "My Services", description: "View active subscriptions", icon: Briefcase, href: "/portal/services", color: "text-blue-500" },
    { title: "Workflow Status", description: "Track your job progress", icon: GitBranch, href: "/portal/workflow", color: "text-purple-500" },
    { title: "Documents", description: "Upload & download files", icon: FolderOpen, href: "/portal/documents", color: "text-green-500" },
    { title: "Messages", description: "Contact your team", icon: MessageCircle, href: "/portal/messages", color: "text-orange-500" },
    { title: "Invoices", description: "View billing history", icon: CreditCard, href: "/portal/billing", color: "text-emerald-500" },
    { title: "Purchase Services", description: "Upgrade or add services", icon: ShoppingCart, href: "/portal/shop", color: "text-pink-500" },
  ];

  const recentActivity = [
    { text: "Tax Return 2024 moved to 'In Review'", time: "2 hours ago", icon: CheckCircle2, color: "text-green-500" },
    { text: "New invoice INV-042 generated — $2,500", time: "1 day ago", icon: CreditCard, color: "text-blue-500" },
    { text: "Document 'W-2 Form' uploaded by your team", time: "2 days ago", icon: FolderOpen, color: "text-purple-500" },
    { text: "Quarterly bookkeeping completed", time: "3 days ago", icon: CheckCircle2, color: "text-green-500" },
  ];

  const pendingActions = [
    { text: "Upload remaining tax documents", type: "action" as const },
    { text: "Review and approve proposal #12", type: "review" as const },
    { text: "Confirm financial data sync", type: "action" as const },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold">{greeting()}, {profile?.full_name?.split(" ")[0] || "there"}!</h1>
        <p className="text-muted-foreground">Here's what's happening with your account.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-muted-foreground">Active Services</p><p className="text-2xl font-bold">{serviceCount}</p></div>
              <div className="p-2 rounded-lg bg-blue-500/10"><Briefcase className="w-5 h-5 text-blue-500" /></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-muted-foreground">Pending Actions</p><p className="text-2xl font-bold">{pendingActions.length}</p></div>
              <div className="p-2 rounded-lg bg-orange-500/10"><AlertCircle className="w-5 h-5 text-orange-500" /></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-muted-foreground">Unread Messages</p><p className="text-2xl font-bold">2</p></div>
              <div className="p-2 rounded-lg bg-green-500/10"><MessageCircle className="w-5 h-5 text-green-500" /></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-muted-foreground">Notifications</p><p className="text-2xl font-bold">5</p></div>
              <div className="p-2 rounded-lg bg-purple-500/10"><Bell className="w-5 h-5 text-purple-500" /></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Actions */}
        <Card className="border border-border lg:col-span-2">
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><AlertCircle className="w-5 h-5 text-orange-500" />Action Required</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {pendingActions.map((action, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-orange-500/5 border border-orange-500/10">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">{action.text}</span>
                </div>
                <Button variant="outline" size="sm">Take Action</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Workflow Progress */}
        <Card className="border border-border">
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><GitBranch className="w-5 h-5 text-purple-500" />Active Workflows</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1"><span className="text-sm font-medium">2024 Tax Return</span><span className="text-xs text-muted-foreground">75%</span></div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">Stage: In Review</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1"><span className="text-sm font-medium">Quarterly Bookkeeping</span><span className="text-xs text-muted-foreground">40%</span></div>
              <Progress value={40} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">Stage: Processing</p>
            </div>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/portal/workflow">View All <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickLinks.map((link) => (
            <Link key={link.title} href={link.href}>
              <Card className="border border-border hover:border-primary/30 hover:shadow-md transition-all cursor-pointer h-full">
                <CardContent className="p-4 text-center">
                  <div className={`mx-auto p-2 rounded-lg bg-muted w-fit mb-2`}><link.icon className={`w-5 h-5 ${link.color}`} /></div>
                  <p className="text-sm font-medium">{link.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{link.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="border border-border">
        <CardHeader><CardTitle className="text-lg">Recent Activity</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <item.icon className={`w-4 h-4 ${item.color} shrink-0`} />
              <span className="text-sm flex-1">{item.text}</span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default PortalOverview;
