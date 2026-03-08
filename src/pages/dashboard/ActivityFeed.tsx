import { useState } from "react";
import { Activity, HelpCircle, Star } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { exportToCSV } from "@/lib/export";
import { toast } from "sonner";

const mockActivities = [
  { id: 1, date: "2024-01-22 14:30", account: "Acme Corp", type: "Invoice", item: "INV-001", action: "Created", user: { name: "John D.", avatar: "" } },
  { id: 2, date: "2024-01-22 13:15", account: "Tech Solutions", type: "Document", item: "Tax Return 2024", action: "Uploaded", user: { name: "Sarah M.", avatar: "" } },
  { id: 3, date: "2024-01-22 12:00", account: "Global Industries", type: "Proposal", item: "Q1 Package", action: "Signed", user: { name: "Client", avatar: "" } },
  { id: 4, date: "2024-01-22 11:30", account: "StartUp Inc", type: "Payment", item: "PAY-004", action: "Received", user: { name: "System", avatar: "" } },
  { id: 5, date: "2024-01-22 10:45", account: "Enterprise Ltd", type: "Lead", item: "New Inquiry", action: "Created", user: { name: "Mike R.", avatar: "" } },
  { id: 6, date: "2024-01-21 16:20", account: "Acme Corp", type: "Time Entry", item: "Project Research", action: "Logged", user: { name: "John D.", avatar: "" } },
];

const typeOptions = [
  { value: "all", label: "All Types" }, { value: "invoice", label: "Invoice" }, { value: "document", label: "Document" }, { value: "proposal", label: "Proposal" }, { value: "payment", label: "Payment" }, { value: "lead", label: "Lead" },
];

const ActivityFeedPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [favorites, setFavorites] = useState<number[]>([]);

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = { Invoice: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400", Document: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400", Proposal: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400", Payment: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400", Lead: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400", "Time Entry": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400" };
    return <Badge className={colors[type] || ""}>{type}</Badge>;
  };

  const toggleFavorite = (id: number) => setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);

  const filteredActivities = mockActivities.filter((a) => {
    const matchesType = selectedType === "all" || a.type.toLowerCase() === selectedType;
    const matchesSearch = a.account.toLowerCase().includes(searchValue.toLowerCase()) || a.item.toLowerCase().includes(searchValue.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleExport = () => { exportToCSV(filteredActivities.map((a) => ({ date: a.date, account: a.account, type: a.type, item: a.item, action: a.action, user: a.user.name })), "activity-feed"); toast.success("Activity feed exported"); };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <DashboardPageHeader title="Activity Feed" description="Track all actions and events across accounts" icon={<Activity className="w-6 h-6" />} />
          <Button variant="link" className="text-muted-foreground"><HelpCircle className="w-4 h-4 mr-2" />What events are tracked?</Button>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px] bg-background"><SelectValue placeholder="Filter by type" /></SelectTrigger>
            <SelectContent className="bg-background border border-border z-50">{typeOptions.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <PageToolbar searchValue={searchValue} onSearchChange={setSearchValue} searchPlaceholder="Search activities..." showExport onExportClick={handleExport} />
        <div className="border rounded-lg bg-card">
          <Table>
            <TableHeader><TableRow><TableHead className="w-10"></TableHead><TableHead>Date</TableHead><TableHead>Account</TableHead><TableHead>Type</TableHead><TableHead>Item</TableHead><TableHead>Action</TableHead><TableHead>User</TableHead></TableRow></TableHeader>
            <TableBody>
              {filteredActivities.map((activity) => (
                <TableRow key={activity.id} className="hover:bg-muted/50">
                  <TableCell><Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleFavorite(activity.id)}><Star className={`w-4 h-4 ${favorites.includes(activity.id) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} /></Button></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{activity.date}</TableCell>
                  <TableCell className="font-medium">{activity.account}</TableCell>
                  <TableCell>{getTypeBadge(activity.type)}</TableCell>
                  <TableCell>{activity.item}</TableCell>
                  <TableCell>{activity.action}</TableCell>
                  <TableCell><div className="flex items-center gap-2"><Avatar className="h-6 w-6"><AvatarImage src={activity.user.avatar} /><AvatarFallback className="text-xs">{activity.user.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback></Avatar><span className="text-sm">{activity.user.name}</span></div></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ActivityFeedPage;
