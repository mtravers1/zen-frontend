import { useState } from "react";
import { Receipt, Download } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageStatsBar from "@/components/dashboard/PageStatsBar";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { exportToCSV } from "@/lib/export";
import NewInvoiceDialog from "@/components/dashboard/dialogs/NewInvoiceDialog";
import { useDashboardData } from "@/contexts/DashboardDataContext";

const presetOptions = [
  { value: "all", label: "All Invoices" }, { value: "paid", label: "Paid" }, { value: "unpaid", label: "Unpaid Only" }, { value: "overdue", label: "Overdue" },
];

const InvoicesPage = () => {
  const { invoices, addInvoice } = useDashboardData();
  const [searchValue, setSearchValue] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [assigneeFilter, setAssigneeFilter] = useState("all");

  const uniqueAssignees = [...new Set(invoices.map(i => i.assignee))];

  const getStatusBadge = (s: string) => { switch(s) { case "paid": return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Paid</Badge>; case "unpaid": return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Unpaid</Badge>; case "overdue": return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Overdue</Badge>; default: return <Badge variant="secondary">{s}</Badge>; } };

  const filtered = invoices.filter(i => {
    const matchesPreset = selectedPreset === "all" || i.status === selectedPreset;
    const matchesSearch = !searchValue || i.account.toLowerCase().includes(searchValue.toLowerCase()) || i.id.toLowerCase().includes(searchValue.toLowerCase());
    const matchesAssignee = assigneeFilter === "all" || i.assignee === assigneeFilter;
    return matchesPreset && matchesSearch && matchesAssignee;
  });

  const totalPaid = invoices.filter(i => i.status === "paid").reduce((s, i) => s + i.total, 0);
  const totalUnpaid = invoices.filter(i => i.status !== "paid").reduce((s, i) => s + i.total, 0);

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <DashboardPageHeader title="Invoices" description="Manage and track all client invoices" icon={<Receipt className="w-6 h-6" />} />
          <Button onClick={() => setDialogOpen(true)}><Receipt className="w-4 h-4 mr-2" />New Invoice</Button>
        </div>
        <PageStatsBar stats={[{ label: "Total Invoices", value: invoices.length }, { label: "Paid", value: `$${totalPaid.toLocaleString()}`, variant: "success" }, { label: "Unpaid", value: `$${totalUnpaid.toLocaleString()}`, variant: "warning" }]} />
        <PageToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Search invoices..."
          presets={presetOptions}
          selectedPreset={selectedPreset}
          onPresetChange={setSelectedPreset}
          showFilter
          filterContent={
            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
              <SelectTrigger className="w-[160px] h-8 bg-background"><SelectValue placeholder="Assignee" /></SelectTrigger>
              <SelectContent className="bg-background border border-border z-50">
                <SelectItem value="all">All Assignees</SelectItem>
                {uniqueAssignees.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
              </SelectContent>
            </Select>
          }
          showExport
          onExportClick={() => { exportToCSV(filtered.map(i => ({ ID: i.id, Account: i.account, Status: i.status, Assignee: i.assignee, Posted: i.posted, Total: i.total })), "invoices"); toast.success("Invoices exported"); }}
        />
        <div className="border rounded-lg bg-card">
          <Table>
            <TableHeader><TableRow><TableHead>Invoice #</TableHead><TableHead>Account</TableHead><TableHead>Status</TableHead><TableHead>Assignee</TableHead><TableHead>Posted</TableHead><TableHead className="text-right">Total</TableHead></TableRow></TableHeader>
            <TableBody>
              {filtered.map(inv => (
                <TableRow key={inv.id} className="cursor-pointer hover:bg-muted/50"><TableCell className="font-medium">{inv.id}</TableCell><TableCell>{inv.account}</TableCell><TableCell>{getStatusBadge(inv.status)}</TableCell><TableCell>{inv.assignee}</TableCell><TableCell>{inv.posted}</TableCell><TableCell className="text-right font-medium">${inv.total.toLocaleString()}</TableCell></TableRow>
              ))}
              {filtered.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No invoices found</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </div>
      <NewInvoiceDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={(data) => {
        addInvoice(data);
        toast.success(`Invoice created for ${data.account}`);
      }} />
    </>
  );
};

export default InvoicesPage;
