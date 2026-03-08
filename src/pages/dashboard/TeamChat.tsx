import { useState } from "react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { MessageCircle, Send, Paperclip, Smile, Search, Video, Plus, X, Monitor, PhoneCall } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const channelsList = [
  { id: 1, name: "General", unread: 3 },
  { id: 2, name: "Tax Team", unread: 0 },
  { id: 3, name: "Audit Team", unread: 1 },
  { id: 4, name: "Client Support", unread: 0 },
  { id: 5, name: "Management", unread: 5 },
];

const directMessages = [
  { id: 101, name: "Sarah Johnson", initials: "SJ", online: true, unread: 2 },
  { id: 102, name: "Michael Brown", initials: "MB", online: true, unread: 0 },
  { id: 103, name: "Emily Davis", initials: "ED", online: false, unread: 0 },
  { id: 104, name: "John Smith", initials: "JS", online: true, unread: 0 },
];

const initialMessages = [
  { id: 1, user: "Sarah Johnson", initials: "SJ", message: "Good morning team! Don't forget we have a client meeting at 2 PM.", time: "9:00 AM" },
  { id: 2, user: "Michael Brown", initials: "MB", message: "Thanks for the reminder. I'll prepare the quarterly reports.", time: "9:15 AM" },
  { id: 3, user: "Emily Davis", initials: "ED", message: "Has anyone reviewed the new tax guidelines that were released yesterday?", time: "9:30 AM" },
  { id: 4, user: "John Smith", initials: "JS", message: "Yes, I went through them. I can share my notes during the team standup.", time: "9:45 AM" },
];

const VIDEO_PLATFORMS = [
  { id: "zoom", name: "Zoom", icon: "🎥" },
  { id: "meet", name: "Google Meet", icon: "📹" },
  { id: "teams", name: "Microsoft Teams", icon: "💻" },
];

const generateMeetingLink = (platform: string) => {
  const id = Math.random().toString(36).substring(2, 10);
  switch (platform) {
    case "zoom": return `https://zoom.us/j/${Math.floor(Math.random() * 9000000000 + 1000000000)}`;
    case "meet": return `https://meet.google.com/${id.slice(0, 3)}-${id.slice(3, 7)}-${id.slice(7)}`;
    case "teams": return `https://teams.microsoft.com/l/meetup-join/${id}`;
    default: return "";
  }
};

const TeamChatPage = () => {
  const [activeChannel, setActiveChannel] = useState(1);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [channels, setChannels] = useState(channelsList);
  const [newChannelOpen, setNewChannelOpen] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeMeeting, setActiveMeeting] = useState<{ platform: string; url: string } | null>(null);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now(), user: "You", initials: "YO",
      message: newMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }]);
    setNewMessage("");
  };

  const handleChannelClick = (id: number) => {
    setActiveChannel(id);
    setChannels(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c));
    if (id <= 100) setMessages(initialMessages);
    else setMessages([]);
  };

  const handleCreateChannel = () => {
    if (!newChannelName.trim()) return;
    const newId = Math.max(...channels.map(c => c.id)) + 1;
    setChannels(prev => [...prev, { id: newId, name: newChannelName.trim(), unread: 0 }]);
    setNewChannelName("");
    setNewChannelOpen(false);
    toast.success(`Channel #${newChannelName.trim()} created`);
  };

  const handleStartVideoCall = (platformId: string) => {
    const url = generateMeetingLink(platformId);
    const platform = VIDEO_PLATFORMS.find(p => p.id === platformId)!;
    setActiveMeeting({ platform: platform.name, url });
    setVideoOpen(false);
    setMessages(prev => [...prev, {
      id: Date.now(), user: "You", initials: "YO",
      message: `📹 Started a ${platform.name} meeting: ${url}`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }]);
    toast.success(`${platform.name} meeting started — link posted to channel`);
  };

  const activeChannelName = channels.find(c => c.id === activeChannel)?.name;
  const activeDM = directMessages.find(d => d.id === activeChannel);
  const totalUnread = channels.reduce((sum, c) => sum + c.unread, 0) + directMessages.reduce((sum, d) => sum + d.unread, 0);

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <DashboardPageHeader
            icon={<MessageCircle className="w-5 h-5 text-primary" />}
            title="Team Chat"
            description="Internal messaging, video conferencing, and team collaboration"
          />
          {totalUnread > 0 && <Badge>{totalUnread} unread</Badge>}
        </div>

        {activeMeeting && (
          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-green-600 shrink-0" />
              <span className="text-sm font-medium text-green-700 dark:text-green-400">
                {activeMeeting.platform} meeting in progress
              </span>
              <span className="text-xs text-green-600 dark:text-green-500 truncate max-w-[200px] hidden sm:block">{activeMeeting.url}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => window.open(activeMeeting.url, "_blank", "noopener,noreferrer")}>
                <PhoneCall className="w-3 h-3 mr-1" />Join
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setActiveMeeting(null)}><X className="w-4 h-4" /></Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-280px)]">
          <Card className="md:col-span-1 flex flex-col">
            <CardHeader className="py-3 shrink-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Channels</CardTitle>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setNewChannelOpen(true)}>
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-2 flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="space-y-0.5">
                  {channels.map(ch => (
                    <button
                      key={ch.id}
                      onClick={() => handleChannelClick(ch.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left ${ch.id === activeChannel ? "bg-primary/10 text-primary" : ""}`}
                    >
                      <span className="text-sm"># {ch.name}</span>
                      {ch.unread > 0 && (
                        <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">{ch.unread}</span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-4 mb-1 px-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Direct Messages</span>
                </div>
                <div className="space-y-0.5">
                  {directMessages.map(dm => (
                    <button
                      key={dm.id}
                      onClick={() => handleChannelClick(dm.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left ${activeChannel === dm.id ? "bg-primary/10 text-primary" : ""}`}
                    >
                      <div className="relative shrink-0">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-[10px]">{dm.initials}</AvatarFallback>
                        </Avatar>
                        <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-card ${dm.online ? "bg-green-500" : "bg-muted-foreground"}`} />
                      </div>
                      <span className="text-sm flex-1">{dm.name}</span>
                      {dm.unread > 0 && (
                        <span className="flex items-center justify-center min-w-[18px] h-4 px-1 text-[10px] font-medium bg-primary text-primary-foreground rounded-full">{dm.unread}</span>
                      )}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="md:col-span-3 flex flex-col">
            <CardHeader className="py-3 border-b shrink-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">
                  {activeDM ? activeDM.name : `# ${activeChannelName}`}
                </CardTitle>
                <Button variant="outline" size="sm" className="gap-1.5 h-8" onClick={() => setVideoOpen(true)}>
                  <Video className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Start Video Call</span>
                  <span className="sm:hidden">Video</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map(msg => (
                    <div key={msg.id} className={`flex items-start gap-3 ${msg.user === "You" ? "flex-row-reverse" : ""}`}>
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="text-xs">{msg.initials}</AvatarFallback>
                      </Avatar>
                      <div className={`flex-1 flex flex-col ${msg.user === "You" ? "items-end" : "items-start"}`}>
                        <div className={`flex items-center gap-2 ${msg.user === "You" ? "flex-row-reverse" : ""}`}>
                          <span className="font-medium text-sm">{msg.user}</span>
                          <span className="text-xs text-muted-foreground">{msg.time}</span>
                        </div>
                        <div className={`mt-1 px-3 py-2 rounded-lg text-sm max-w-[80%] break-words ${msg.user === "You" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                          {msg.message}
                        </div>
                      </div>
                    </div>
                  ))}
                  {messages.length === 0 && (
                    <div className="text-center text-muted-foreground py-8 text-sm">No messages yet. Start the conversation!</div>
                  )}
                </div>
              </ScrollArea>
              <div className="p-4 border-t shrink-0">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost" size="icon" className="shrink-0"
                    onClick={() => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) {
                          setMessages(prev => [...prev, { id: Date.now(), user: "You", initials: "YO", message: `📎 Attached: ${file.name}`, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
                          toast.success(`File "${file.name}" attached`);
                        }
                      };
                      input.click();
                    }}
                  ><Paperclip className="h-4 w-4" /></Button>
                  <Input
                    placeholder="Type a message..."
                    className="flex-1"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSend()}
                  />
                  <Button
                    variant="ghost" size="icon" className="shrink-0"
                    onClick={() => {
                      const emojis = ["😊", "👍", "🎉", "❤️", "🔥", "✅", "💡", "📊"];
                      setNewMessage(prev => prev + emojis[Math.floor(Math.random() * emojis.length)]);
                    }}
                  ><Smile className="h-4 w-4" /></Button>
                  <Button size="icon" className="shrink-0" onClick={handleSend} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={newChannelOpen} onOpenChange={setNewChannelOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader><DialogTitle>Create New Channel</DialogTitle></DialogHeader>
          <div className="space-y-2 py-2">
            <Label>Channel Name</Label>
            <Input
              placeholder="e.g. bookkeeping-team"
              value={newChannelName}
              onChange={e => setNewChannelName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleCreateChannel()}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewChannelOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateChannel} disabled={!newChannelName.trim()}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Video className="w-5 h-5 text-primary" />
              Start Video Call
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <p className="text-sm text-muted-foreground">Choose a platform. A meeting link will be generated and posted to the channel.</p>
            {VIDEO_PLATFORMS.map(platform => (
              <button
                key={platform.id}
                onClick={() => handleStartVideoCall(platform.id)}
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors text-left"
              >
                <span className="text-2xl">{platform.icon}</span>
                <div>
                  <div className="font-medium text-sm">{platform.name}</div>
                  <div className="text-xs text-muted-foreground">Generate instant meeting link</div>
                </div>
              </button>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setVideoOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TeamChatPage;
