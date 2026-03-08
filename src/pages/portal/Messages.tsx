import { useState } from "react";
import ClientPortalLayout from "@/components/portal/ClientPortalLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Send, Paperclip } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const initialMessages = [
  { id: 1, from: "John D.", fromClient: false, initials: "JD", text: "Hi! Your Q4 review is almost done. We just need the last bank statement for December.", time: "Today, 10:30 AM" },
  { id: 2, from: "You", fromClient: true, initials: "YO", text: "Thanks John! I'll upload it this afternoon.", time: "Today, 11:15 AM" },
  { id: 3, from: "John D.", fromClient: false, initials: "JD", text: "Perfect, once we have that we can finalize everything. Should be done by end of week.", time: "Today, 11:20 AM" },
];

const PortalMessages = () => {
  const { profile } = useAuth();
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now(),
      from: "You",
      fromClient: true,
      initials: profile?.full_name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "YO",
      text: newMessage.trim(),
      time: `Today, ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
    }]);
    setNewMessage("");
    toast.success("Message sent");
  };

  return (
    <>
    <ClientPortalLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3"><MessageCircle className="w-6 h-6 text-primary" />Messages</h1>
          <p className="text-muted-foreground">Secure messaging with your assigned team.</p>
        </div>

        <Card className="border border-border">
          <CardHeader className="border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8"><AvatarFallback className="bg-primary/10 text-primary text-sm">JD</AvatarFallback></Avatar>
              <div>
                <CardTitle className="text-base">John D.</CardTitle>
                <p className="text-xs text-muted-foreground">Your Account Manager • <span className="text-green-500">Online</span></p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex gap-3 ${msg.fromClient ? "flex-row-reverse" : ""}`}>
                  <Avatar className="h-8 w-8 shrink-0"><AvatarFallback className={`text-xs ${msg.fromClient ? "bg-primary text-primary-foreground" : "bg-muted"}`}>{msg.initials}</AvatarFallback></Avatar>
                  <div className={`max-w-[70%] ${msg.fromClient ? "text-right" : ""}`}>
                    <div className={`inline-block p-3 rounded-lg text-sm ${msg.fromClient ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-muted rounded-tl-none"}`}>
                      {msg.text}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border p-4">
              <div className="flex items-end gap-2">
                <Button variant="ghost" size="icon" onClick={() => toast.info("File attachment coming soon")}><Paperclip className="w-4 h-4" /></Button>
                <Textarea
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="min-h-[40px] max-h-[120px] resize-none"
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                />
                <Button onClick={handleSend} disabled={!newMessage.trim()} size="icon"><Send className="w-4 h-4" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientPortalLayout>
    </>
  );
};

export default PortalMessages;
