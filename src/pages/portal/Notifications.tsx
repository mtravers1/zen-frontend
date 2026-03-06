'use client'

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, CreditCard, FolderOpen, GitBranch, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const initialNotifications = [
  { id: 1, title: "Tax Return moved to 'In Review'", description: "Your 2024 Tax Return has progressed to the review stage.", type: "workflow", time: "2 hours ago", read: false },
  { id: 2, title: "New invoice generated", description: "Invoice INV-042 for $2,500 has been created for Monthly CFO Service.", type: "billing", time: "1 day ago", read: false },
  { id: 3, title: "Document uploaded by your team", description: "John D. uploaded 'W-2 Form 2024.pdf' to your file cabinet.", type: "document", time: "2 days ago", read: false },
  { id: 4, title: "New message from John D.", description: "Your account manager sent you a message about the Q4 review.", type: "message", time: "2 days ago", read: true },
  { id: 5, title: "Quarterly Bookkeeping completed", description: "Q3 bookkeeping has been finalized and reports are available.", type: "workflow", time: "1 week ago", read: true },
];

const PortalNotifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const markRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "workflow": return <GitBranch className="w-5 h-5 text-purple-500" />;
      case "billing": return <CreditCard className="w-5 h-5 text-blue-500" />;
      case "document": return <FolderOpen className="w-5 h-5 text-green-500" />;
      case "message": return <MessageCircle className="w-5 h-5 text-orange-500" />;
      default: return <Bell className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Bell className="w-6 h-6 text-primary" />Notifications
            {unreadCount > 0 && <Badge className="bg-primary text-primary-foreground">{unreadCount} new</Badge>}
          </h1>
          <p className="text-muted-foreground">Stay updated on your account activity.</p>
        </div>
        {unreadCount > 0 && <Button variant="outline" onClick={markAllRead}>Mark all as read</Button>}
      </div>

      <Card className="border border-border">
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {notifications.map(n => (
              <div key={n.id} className={`flex items-start gap-4 p-4 transition-colors cursor-pointer hover:bg-muted/50 ${!n.read ? "bg-primary/5" : ""}`} onClick={() => markRead(n.id)}>
                <div className="p-2 rounded-lg bg-muted shrink-0">{getIcon(n.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm ${!n.read ? "font-semibold" : "font-medium"}`}>{n.title}</p>
                    {!n.read && <span className="w-2 h-2 bg-primary rounded-full shrink-0" />}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{n.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortalNotifications;
