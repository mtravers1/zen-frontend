import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { MessageCircle, Send, Paperclip, Smile, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const TeamChatPage = () => {
  const channels = [
    { id: 1, name: "General", unread: 3 },
    { id: 2, name: "Tax Team", unread: 0 },
    { id: 3, name: "Audit Team", unread: 1 },
    { id: 4, name: "Client Support", unread: 0 },
    { id: 5, name: "Management", unread: 5 },
  ];

  const messages = [
    {
      id: 1,
      user: "Sarah Johnson",
      initials: "SJ",
      message: "Good morning team! Don't forget we have a client meeting at 2 PM.",
      time: "9:00 AM",
    },
    {
      id: 2,
      user: "Michael Brown",
      initials: "MB",
      message: "Thanks for the reminder. I'll prepare the quarterly reports.",
      time: "9:15 AM",
    },
    {
      id: 3,
      user: "Emily Davis",
      initials: "ED",
      message: "Has anyone reviewed the new tax guidelines that were released yesterday?",
      time: "9:30 AM",
    },
    {
      id: 4,
      user: "John Smith",
      initials: "JS",
      message: "Yes, I went through them. I can share my notes during the team standup.",
      time: "9:45 AM",
    },
  ];

  return (
      <div className="space-y-6">
        <DashboardPageHeader
          icon={<MessageCircle className="w-5 h-5 text-primary" />}
          title="Team Chat"
          description="Internal team communication and collaboration"
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-250px)]">
          {/* Channels Sidebar */}
          <Card className="md:col-span-1">
            <CardHeader className="py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Channels</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <ScrollArea className="h-[400px]">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left ${
                      channel.id === 1 ? "bg-primary/10 text-primary" : ""
                    }`}
                  >
                    <span className="text-sm"># {channel.name}</span>
                    {channel.unread > 0 && (
                      <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                        {channel.unread}
                      </span>
                    )}
                  </button>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="md:col-span-3 flex flex-col">
            <CardHeader className="py-3 border-b">
              <CardTitle className="text-sm"># General</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">{msg.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{msg.user}</span>
                          <span className="text-xs text-muted-foreground">{msg.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input placeholder="Type a message..." className="flex-1" />
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button size="icon" className="shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
};

export default TeamChatPage;
