import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Inbox, Mail, Star, Archive, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

const InboxPage = () => {
  const messages = [
    {
      id: 1,
      from: "John Smith",
      subject: "Tax Return Documents",
      preview: "Hi, I've uploaded the remaining documents for my tax return...",
      time: "10:30 AM",
      unread: true,
      starred: true,
    },
    {
      id: 2,
      from: "Sarah Johnson",
      subject: "Question about Invoice #1234",
      preview: "I noticed a discrepancy in the latest invoice. Could you please...",
      time: "9:15 AM",
      unread: true,
      starred: false,
    },
    {
      id: 3,
      from: "Michael Brown",
      subject: "Meeting Confirmation",
      preview: "Confirming our meeting scheduled for tomorrow at 2 PM...",
      time: "Yesterday",
      unread: false,
      starred: false,
    },
    {
      id: 4,
      from: "Emily Davis",
      subject: "Quarterly Report Ready",
      preview: "The quarterly financial report is ready for your review...",
      time: "Yesterday",
      unread: false,
      starred: true,
    },
    {
      id: 5,
      from: "Robert Wilson",
      subject: "New Client Referral",
      preview: "I'd like to refer a colleague who needs accounting services...",
      time: "2 days ago",
      unread: false,
      starred: false,
    },
  ];

  return (
      <div className="space-y-6">
        <DashboardPageHeader
          icon={<Inbox className="w-5 h-5 text-primary" />}
          title="Inbox+"
          description="Unified inbox for all client communications"
        />

        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Mail className="w-4 h-4 mr-2" />
              Compose
            </Button>
            <Button variant="ghost" size="sm">
              <Archive className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <PageToolbar
            onSearchChange={() => {}}
            searchPlaceholder="Search messages..."
            showFilter={true}
          />
        </div>

        {/* Message List */}
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                    message.unread ? "bg-primary/5" : ""
                  }`}
                >
                  <Checkbox />
                  <button className="p-1 hover:text-yellow-500 transition-colors">
                    <Star
                      className={`w-4 h-4 ${
                        message.starred ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                      }`}
                    />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${message.unread ? "text-foreground" : "text-muted-foreground"}`}>
                        {message.from}
                      </span>
                      {message.unread && (
                        <Badge variant="default" className="text-[10px] px-1.5 py-0">
                          New
                        </Badge>
                      )}
                    </div>
                    <div className={`text-sm ${message.unread ? "font-medium" : ""}`}>
                      {message.subject}
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {message.preview}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground whitespace-nowrap">
                    {message.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  );
};

export default InboxPage;
