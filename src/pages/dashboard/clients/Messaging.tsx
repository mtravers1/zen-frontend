import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, User, Search } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: "staff" | "client";
  senderName: string;
  content: string;
  timestamp: string;
  isInternalNote?: boolean;
}

interface Conversation {
  id: string;
  client: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  messages: Message[];
}

const initialConversations: Conversation[] = [
  {
    id: "1",
    client: "John Smith",
    lastMessage: "Can you send me the updated tax return?",
    timestamp: "10:32 AM",
    unread: 2,
    messages: [
      { id: "m1", sender: "staff", senderName: "You", content: "Hi John, your Q1 documents are ready for review.", timestamp: "9:00 AM" },
      { id: "m2", sender: "client", senderName: "John Smith", content: "Thanks! I'll take a look.", timestamp: "9:15 AM" },
      { id: "m3", sender: "client", senderName: "John Smith", content: "Can you send me the updated tax return?", timestamp: "10:32 AM" },
    ],
  },
  {
    id: "2",
    client: "Sarah Johnson",
    lastMessage: "When is my next billing date?",
    timestamp: "Yesterday",
    unread: 1,
    messages: [
      { id: "m4", sender: "client", senderName: "Sarah Johnson", content: "Hello, I have a question about my invoice.", timestamp: "Yesterday 2:00 PM" },
      { id: "m5", sender: "staff", senderName: "You", content: "Of course, what would you like to know?", timestamp: "Yesterday 2:10 PM" },
      { id: "m6", sender: "client", senderName: "Sarah Johnson", content: "When is my next billing date?", timestamp: "Yesterday 2:12 PM" },
    ],
  },
  {
    id: "3",
    client: "Rivera Consulting",
    lastMessage: "Perfect, thank you for the update.",
    timestamp: "Mon",
    unread: 0,
    messages: [
      { id: "m7", sender: "staff", senderName: "You", content: "Your bookkeeping report for March is attached.", timestamp: "Mon 11:00 AM" },
      { id: "m8", sender: "client", senderName: "Rivera Consulting", content: "Perfect, thank you for the update.", timestamp: "Mon 11:30 AM" },
    ],
  },
  {
    id: "4",
    client: "Chen Enterprises",
    lastMessage: "We'd like to discuss our service plan.",
    timestamp: "Mar 3",
    unread: 0,
    messages: [
      { id: "m9", sender: "client", senderName: "Chen Enterprises", content: "We'd like to discuss our service plan.", timestamp: "Mar 3" },
    ],
  },
];

const formatInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const MessagingPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [activeId, setActiveId] = useState<string>(initialConversations[0].id);
  const [searchValue, setSearchValue] = useState("");
  const [compose, setCompose] = useState("");
  const [isInternalNote, setIsInternalNote] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find((c) => c.id === activeId)!;

  const filteredConversations = conversations.filter(
    (c) =>
      !searchValue || c.client.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeId, activeConversation?.messages.length]);

  const selectConversation = (id: string) => {
    setActiveId(id);
    // Mark as read
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    );
  };

  const sendMessage = () => {
    const text = compose.trim();
    if (!text) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "staff",
      senderName: "You",
      content: text,
      timestamp: now,
      isInternalNote,
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              messages: [...c.messages, newMsg],
              lastMessage: isInternalNote ? `[Note] ${text}` : text,
              timestamp: "Just now",
            }
          : c
      )
    );
    setCompose("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <DashboardPageHeader
        title="Customer Messaging"
        description="Secure messaging between staff and clients"
        icon={<MessageSquare className="w-6 h-6" />}
      />

      <div className="flex flex-1 gap-0 rounded-lg border border-border overflow-hidden" style={{ minHeight: 560 }}>
        {/* Left: Conversation List */}
        <div className="w-72 shrink-0 border-r border-border flex flex-col bg-card">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search conversations..."
                className="pl-9 h-9 text-sm"
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                type="button"
                onClick={() => selectConversation(conv.id)}
                className={cn(
                  "w-full text-left px-4 py-3 border-b border-border hover:bg-muted/50 transition-colors",
                  activeId === conv.id && "bg-primary/5 border-l-2 border-l-primary"
                )}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 shrink-0">
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {formatInitials(conv.client)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium truncate">{conv.client}</span>
                      <span className="text-xs text-muted-foreground ml-2 shrink-0">{conv.timestamp}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                      {conv.unread > 0 && (
                        <Badge className="ml-2 h-5 min-w-[20px] flex items-center justify-center text-[10px] shrink-0 px-1.5">
                          {conv.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </ScrollArea>
        </div>

        {/* Right: Active Conversation */}
        <div className="flex-1 flex flex-col bg-background">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-border bg-card">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                {formatInitials(activeConversation.client)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{activeConversation.client}</p>
              <p className="text-xs text-muted-foreground">Client</p>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-5">
            <div className="space-y-4">
              {activeConversation.messages.map((msg) => {
                const isStaff = msg.sender === "staff";
                if (msg.isInternalNote) {
                  return (
                    <div key={msg.id} className="flex justify-center">
                      <div className="max-w-md w-full rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 px-4 py-2">
                        <p className="text-xs font-medium text-amber-700 dark:text-amber-300 mb-1">
                          Internal Note — {msg.senderName}
                        </p>
                        <p className="text-sm text-amber-900 dark:text-amber-100">{msg.content}</p>
                        <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 text-right">{msg.timestamp}</p>
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={msg.id} className={cn("flex gap-2", isStaff ? "flex-row-reverse" : "flex-row")}>
                    <Avatar className="h-8 w-8 shrink-0 mt-1">
                      {isStaff ? (
                        <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      ) : (
                        <AvatarFallback className="text-xs bg-muted text-muted-foreground">
                          {formatInitials(msg.senderName)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className={cn("max-w-sm", isStaff ? "items-end" : "items-start", "flex flex-col")}>
                      <div
                        className={cn(
                          "rounded-2xl px-4 py-2.5 text-sm",
                          isStaff
                            ? "bg-primary text-primary-foreground rounded-tr-sm"
                            : "bg-muted text-foreground rounded-tl-sm"
                        )}
                      >
                        {msg.content}
                      </div>
                      <span className="text-xs text-muted-foreground mt-1 px-1">{msg.timestamp}</span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Compose */}
          <div className="border-t border-border p-4 bg-card">
            <div className="flex items-center gap-3 mb-2">
              <Switch
                id="internal-note"
                checked={isInternalNote}
                onCheckedChange={setIsInternalNote}
              />
              <Label htmlFor="internal-note" className="text-sm text-muted-foreground cursor-pointer">
                Internal Note
              </Label>
              {isInternalNote && (
                <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                  Only visible to staff
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              <Input
                value={compose}
                onChange={(e) => setCompose(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isInternalNote ? "Add an internal note..." : "Type a message..."}
                className={cn(
                  "flex-1",
                  isInternalNote && "border-amber-300 focus-visible:ring-amber-300"
                )}
              />
              <Button onClick={sendMessage} disabled={!compose.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;
