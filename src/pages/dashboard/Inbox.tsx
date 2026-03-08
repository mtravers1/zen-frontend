import { useState } from "react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Inbox, Mail, Star, Archive, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import ComposeMessageDialog from "@/components/dashboard/dialogs/ComposeMessageDialog";

const initialMessages = [
  { id: 1, from: "John Smith", subject: "Tax Return Documents", preview: "Hi, I've uploaded the remaining documents for my tax return...", time: "10:30 AM", unread: true, starred: true },
  { id: 2, from: "Sarah Johnson", subject: "Question about Invoice #1234", preview: "I noticed a discrepancy in the latest invoice. Could you please...", time: "9:15 AM", unread: true, starred: false },
  { id: 3, from: "Michael Brown", subject: "Meeting Confirmation", preview: "Confirming our meeting scheduled for tomorrow at 2 PM...", time: "Yesterday", unread: false, starred: false },
  { id: 4, from: "Emily Davis", subject: "Quarterly Report Ready", preview: "The quarterly financial report is ready for your review...", time: "Yesterday", unread: false, starred: true },
  { id: 5, from: "Robert Wilson", subject: "New Client Referral", preview: "I'd like to refer a colleague who needs accounting services...", time: "2 days ago", unread: false, starred: false },
];

const InboxPage = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [composeOpen, setComposeOpen] = useState(false);
  const [inboxFilter, setInboxFilter] = useState("all");

  const toggleStar = (id: number) => setMessages(prev => prev.map(m => m.id === id ? { ...m, starred: !m.starred } : m));
  const toggleSelect = (id: number) => setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const archiveSelected = () => { setMessages(prev => prev.filter(m => !selected.includes(m.id))); toast.success(`${selected.length} message(s) archived`); setSelected([]); };
  const deleteSelected = () => { setMessages(prev => prev.filter(m => !selected.includes(m.id))); toast.success(`${selected.length} message(s) deleted`); setSelected([]); };

  const filtered = messages.filter(m => {
    const matchesSearch = !searchValue || m.from.toLowerCase().includes(searchValue.toLowerCase()) || m.subject.toLowerCase().includes(searchValue.toLowerCase());
    const matchesFilter = inboxFilter === "all" || (inboxFilter === "unread" && m.unread) || (inboxFilter === "starred" && m.starred) || (inboxFilter === "read" && !m.unread);
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <div className="space-y-6">
        <DashboardPageHeader icon={<Inbox className="w-5 h-5 text-primary" />} title="Inbox+" description="Unified inbox for all client communications" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setComposeOpen(true)}><Mail className="w-4 h-4 mr-2" />Compose</Button>
            <Button variant="ghost" size="sm" onClick={archiveSelected} disabled={selected.length === 0}><Archive className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm" onClick={deleteSelected} disabled={selected.length === 0}><Trash2 className="w-4 h-4" /></Button>
          </div>
          <PageToolbar
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            searchPlaceholder="Search messages..."
            showFilter
            filterContent={
              <Select value={inboxFilter} onValueChange={setInboxFilter}>
                <SelectTrigger className="w-[140px] h-8 bg-background"><SelectValue placeholder="Filter" /></SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  <SelectItem value="all">All Messages</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="starred">Starred</SelectItem>
                </SelectContent>
              </Select>
            }
          />
        </div>
        <Card><CardContent className="p-0"><div className="divide-y divide-border">
          {filtered.map(msg => (
            <div key={msg.id} className={`flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer transition-colors ${msg.unread ? "bg-primary/5" : ""}`} onClick={() => { setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, unread: false } : m)); toast.info(`Opening: ${msg.subject}`); }}>
              <Checkbox checked={selected.includes(msg.id)} onCheckedChange={() => toggleSelect(msg.id)} onClick={e => e.stopPropagation()} />
              <button className="p-1 hover:text-yellow-500 transition-colors" onClick={e => { e.stopPropagation(); toggleStar(msg.id); }}><Star className={`w-4 h-4 ${msg.starred ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"}`} /></button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2"><span className={`font-medium ${msg.unread ? "text-foreground" : "text-muted-foreground"}`}>{msg.from}</span>{msg.unread && <Badge variant="default" className="text-[10px] px-1.5 py-0">New</Badge>}</div>
                <div className={`text-sm ${msg.unread ? "font-medium" : ""}`}>{msg.subject}</div>
                <div className="text-sm text-muted-foreground truncate">{msg.preview}</div>
              </div>
              <div className="text-sm text-muted-foreground whitespace-nowrap">{msg.time}</div>
            </div>
          ))}
          {filtered.length === 0 && <div className="p-8 text-center text-muted-foreground">No messages found</div>}
        </div></CardContent></Card>
      </div>
      <ComposeMessageDialog open={composeOpen} onOpenChange={setComposeOpen} onSubmit={(data) => {
        setMessages(prev => [{ id: Date.now(), from: "You", subject: data.subject, preview: data.body.slice(0, 80), time: "Just now", unread: false, starred: false }, ...prev]);
        toast.success(`Message sent to ${data.to}`);
      }} />
    </>
  );
};

export default InboxPage;
