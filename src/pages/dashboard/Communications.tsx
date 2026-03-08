import { useState } from "react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Mail, Send, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import ComposeMessageDialog from "@/components/dashboard/dialogs/ComposeMessageDialog";

const initialComms = [
  { id: 1, type: "Email", subject: "Tax Return Reminder", recipient: "John Smith", status: "sent", date: "2024-01-15" },
  { id: 2, type: "SMS", subject: "Appointment Confirmation", recipient: "Sarah Johnson", status: "delivered", date: "2024-01-15" },
  { id: 3, type: "Email", subject: "Invoice #1234", recipient: "Michael Brown", status: "pending", date: "2024-01-14" },
  { id: 4, type: "Email", subject: "Document Request", recipient: "Emily Davis", status: "failed", date: "2024-01-14" },
  { id: 5, type: "SMS", subject: "Payment Received", recipient: "Robert Wilson", status: "delivered", date: "2024-01-13" },
];

const CommunicationsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [comms, setComms] = useState(initialComms);
  const [composeOpen, setComposeOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusBadge = (s: string) => { switch(s) { case "sent": return <Badge variant="secondary" className="flex items-center gap-1"><Send className="w-3 h-3" />Sent</Badge>; case "delivered": return <Badge className="bg-green-500/10 text-green-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />Delivered</Badge>; case "pending": return <Badge variant="outline" className="flex items-center gap-1"><Clock className="w-3 h-3" />Pending</Badge>; case "failed": return <Badge variant="destructive" className="flex items-center gap-1"><AlertCircle className="w-3 h-3" />Failed</Badge>; default: return <Badge variant="outline">{s}</Badge>; } };

  const filtered = comms.filter(c => {
    const matchesTab = activeTab === "all" || c.type.toLowerCase() === activeTab;
    const matchesSearch = !searchValue || c.subject.toLowerCase().includes(searchValue.toLowerCase()) || c.recipient.toLowerCase().includes(searchValue.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesTab && matchesSearch && matchesStatus;
  });

  return (
      <div className="space-y-6">
        <DashboardPageHeader icon={<Mail className="w-5 h-5 text-primary" />} title="Communications" description="Manage client emails, SMS, and notifications" />
        <div className="flex items-center justify-between">
          <Tabs value={activeTab} onValueChange={setActiveTab}><TabsList><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="email">Email</TabsTrigger><TabsTrigger value="sms">SMS</TabsTrigger></TabsList></Tabs>
          <Button onClick={() => setComposeOpen(true)}><Send className="w-4 h-4 mr-2" />New Message</Button>
        </div>
        <PageToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Search communications..."
          showFilter
          filterContent={
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] h-8 bg-background"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent className="bg-background border border-border z-50">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          }
        />
        <Card><CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Type</TableHead><TableHead>Subject</TableHead><TableHead>Recipient</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead></TableRow></TableHeader>
            <TableBody>
              {filtered.map(c => (
                <TableRow key={c.id} className="cursor-pointer hover:bg-muted/50"><TableCell><Badge variant="outline">{c.type}</Badge></TableCell><TableCell className="font-medium">{c.subject}</TableCell><TableCell>{c.recipient}</TableCell><TableCell>{getStatusBadge(c.status)}</TableCell><TableCell className="text-muted-foreground">{c.date}</TableCell></TableRow>
              ))}
              {filtered.length === 0 && <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No communications found</TableCell></TableRow>}
            </TableBody>
          </Table>
        </CardContent></Card>
      </div>
      <ComposeMessageDialog open={composeOpen} onOpenChange={setComposeOpen} onSubmit={(data) => {
        setComms(prev => [{ id: Date.now(), type: "Email", subject: data.subject, recipient: data.to, status: "sent", date: new Date().toISOString().split("T")[0] }, ...prev]);
        toast.success(`Message sent to ${data.to}`);
      }} />
  );
};

export default CommunicationsPage;
