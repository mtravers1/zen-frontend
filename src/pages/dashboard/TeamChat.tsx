import { useState } from "react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { MessageCircle, Send, Paperclip, Smile, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

const channelsList = [
  { id: 1, name: "General", unread: 3 },
  { id: 2, name: "Tax Team", unread: 0 },
  { id: 3, name: "Audit Team", unread: 1 },
  { id: 4, name: "Client Support", unread: 0 },
  { id: 5, name: "Management", unread: 5 },
];

const initialMessages = [
  { id: 1, user: "Sarah Johnson", initials: "SJ", message: "Good morning team! Don't forget we have a client meeting at 2 PM.", time: "9:00 AM" },
  { id: 2, user: "Michael Brown", initials: "MB", message: "Thanks for the reminder. I'll prepare the quarterly reports.", time: "9:15 AM" },
  { id: 3, user: "Emily Davis", initials: "ED", message: "Has anyone reviewed the new tax guidelines that were released yesterday?", time: "9:30 AM" },
  { id: 4, user: "John Smith", initials: "JS", message: "Yes, I went through them. I can share my notes during the team standup.", time: "9:45 AM" },
];

const TeamChatPage = () => {
  const [activeChannel, setActiveChannel] = useState(1);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [channels, setChannels] = useState(channelsList);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), user: "You", initials: "YO", message: newMessage.trim(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setNewMessage("");
  };

  const handleChannelClick = (id: number) => {
    setActiveChannel(id);
    setChannels(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c));
  };

  const activeChannelName = channels.find(c => c.id === activeChannel)?.name || "General";

  return (
      <div className="space-y-6">
        <DashboardPageHeader icon={<MessageCircle className="w-5 h-5 text-primary" />} title="Team Chat" description="Internal team communication and collaboration" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-250px)]">
          <Card className="md:col-span-1">
            <CardHeader className="py-3"><div className="flex items-center justify-between"><CardTitle className="text-sm">Channels</CardTitle><Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Search className="h-4 w-4" /></Button></div></CardHeader>
            <CardContent className="p-2"><ScrollArea className="h-[400px]">
              {channels.map(ch => (
                <button key={ch.id} onClick={() => handleChannelClick(ch.id)} className={`w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left ${ch.id === activeChannel ? "bg-primary/10 text-primary" : ""}`}>
                  <span className="text-sm"># {ch.name}</span>
                  {ch.unread > 0 && <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">{ch.unread}</span>}
                </button>
              ))}
            </ScrollArea></CardContent>
          </Card>
          <Card className="md:col-span-3 flex flex-col">
            <CardHeader className="py-3 border-b"><CardTitle className="text-sm"># {activeChannelName}</CardTitle></CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4"><div className="space-y-4">
                {messages.map(msg => (
                  <div key={msg.id} className="flex items-start gap-3">
                    <Avatar className="h-8 w-8"><AvatarFallback className="text-xs">{msg.initials}</AvatarFallback></Avatar>
                    <div className="flex-1"><div className="flex items-center gap-2"><span className="font-medium text-sm">{msg.user}</span><span className="text-xs text-muted-foreground">{msg.time}</span></div><p className="text-sm text-muted-foreground mt-1">{msg.message}</p></div>
                  </div>
                ))}
              </div></ScrollArea>
              <div className="p-4 border-t"><div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="shrink-0" onClick={() => { const input = document.createElement("input"); input.type = "file"; input.onchange = (e) => { const file = (e.target as HTMLInputElement).files?.[0]; if (file) { setMessages(prev => [...prev, { id: Date.now(), user: "You", initials: "YO", message: `📎 Attached: ${file.name}`, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]); toast.success(`File "${file.name}" attached`); } }; input.click(); }}><Paperclip className="h-4 w-4" /></Button>
                <Input placeholder="Type a message..." className="flex-1" value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()} />
                <Button variant="ghost" size="icon" className="shrink-0" onClick={() => { const emojis = ["😊", "👍", "🎉", "❤️", "🔥", "✅", "💡", "📊"]; const emoji = emojis[Math.floor(Math.random() * emojis.length)]; setNewMessage(prev => prev + emoji); }}><Smile className="h-4 w-4" /></Button>
                <Button size="icon" className="shrink-0" onClick={handleSend} disabled={!newMessage.trim()}><Send className="h-4 w-4" /></Button>
              </div></div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
};

export default TeamChatPage;
