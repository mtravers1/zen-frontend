import { useState, useEffect } from "react";
import { RefreshCw, Plus } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import NewRecurringInvoiceDialog from "@/components/dashboard/dialogs/NewRecurringInvoiceDialog";
import { useBackendFetch } from "@/hooks/useBackendFetch";

const fallbackInvoices = [
  { id: 1, account: "Acme Corp", name: "Monthly Retainer", status: "active", paymentMethod: "Credit Card", amount: 2500, balance: 0, nextBilling: "2024-02-01" },
  { id: 2, account: "Tech Solutions", name: "Support Plan", status: "active", paymentMethod: "ACH", amount: 1500, balance: 500, nextBilling: "2024-02-15" },
  { id: 3, account: "Global Industries", name: "Enterprise License", status: "inactive", paymentMethod: "Invoice", amount: 5000, balance: 0, nextBilling: "-" },
  { id: 4, account: "StartUp Inc", name: "Starter Package", status: "active", paymentMethod: "Credit Card", amount: 500, balance: 0, nextBilling: "2024-02-01" },
];

const RecurringInvoicesPage = () => {
  const fetchBackend = useBackendFetch();
  const [activeTab, setActiveTab] = useState("active");
  const [searchValue, setSearchValue] = useState("");
  const [invoices, setInvoices] = useState(fallbackInvoices);

  useEffect(() => {
    fetchBackend<{ data: Array<{ _id: string; clientName?: string; name?: string; status?: string; paymentMethod?: string; amount?: number; balance?: number; nextBilling?: string }> }>("/recurring-invoices")
      .then(res => {
        if (res?.data?.length) {
          setInvoices(res.data.map((r, i) => ({
            id: i + 1,
            account: r.clientName ?? "",
            name: r.name ?? "",
            status: r.status ?? "active",
            paymentMethod: r.paymentMethod ?? "-",
            amount: r.amount ?? 0,
            balance: r.balance ?? 0,
            nextBilling: r.nextBilling ? new Date(r.nextBilling).toISOString().split("T")[0] : "-",
          })));
        }
      })
      .catch(() => {});
  }, [fetchBackend]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [methodFilter, setMethodFilter] = useState("all");

  const uniqueMethods = [...new Set(invoices.map(i => i.paymentMethod))];

  const filtered = invoices.filter(i => {
    const matchesTab = activeTab === "all" || i.status === activeTab;
    const matchesSearch = !searchValue || i.account.toLowerCase().includes(searchValue.toLowerCase()) || i.name.toLowerCase().includes(searchValue.toLowerCase());
    const matchesMethod = methodFilter === "all" || i.paymentMethod === methodFilter;
    return matchesTab && matchesSearch && matchesMethod;
  });

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <DashboardPageHeader title="Recurring Invoices" description="Manage automated recurring billing" icon={<RefreshCw className="w-6 h-6" />} />
          <Button onClick={() => setDialogOpen(true)}><Plus className="w-4 h-4 mr-2" />New Invoice</Button>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}><TabsList variant="pills"><TabsTrigger value="active" variant="pills">Active ({invoices.filter(i => i.status === "active").length})</TabsTrigger><TabsTrigger value="inactive" variant="pills">Inactive ({invoices.filter(i => i.status === "inactive").length})</TabsTrigger></TabsList></Tabs>
        <PageToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Search recurring invoices..."
          showFilter
          filterContent={
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-[170px] h-8 bg-background"><SelectValue placeholder="Payment Method" /></SelectTrigger>
              <SelectContent className="bg-background border border-border z-50">
                <SelectItem value="all">All Methods</SelectItem>
                {uniqueMethods.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
          }
        />
        <div className="border rounded-lg bg-card">
          <Table>
            <TableHeader><TableRow><TableHead>Account</TableHead><TableHead>Name</TableHead><TableHead>Status</TableHead><TableHead>Payment Method</TableHead><TableHead className="text-right">Amount</TableHead><TableHead className="text-right">Balance</TableHead><TableHead>Next Billing</TableHead></TableRow></TableHeader>
            <TableBody>
              {filtered.map(inv => (
                <TableRow key={inv.id} className="cursor-pointer hover:bg-muted/50"><TableCell className="font-medium">{inv.account}</TableCell><TableCell>{inv.name}</TableCell><TableCell><Badge variant={inv.status === "active" ? "default" : "secondary"}>{inv.status}</Badge></TableCell><TableCell>{inv.paymentMethod}</TableCell><TableCell className="text-right">${inv.amount.toLocaleString()}</TableCell><TableCell className="text-right">${inv.balance.toLocaleString()}</TableCell><TableCell>{inv.nextBilling}</TableCell></TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <NewRecurringInvoiceDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={(data) => {
        setInvoices(prev => [...prev, { id: Date.now(), account: data.account, name: data.name, status: "active", paymentMethod: data.paymentMethod, amount: data.amount, balance: 0, nextBilling: "-" }]);
        toast.success(`Recurring invoice "${data.name}" created`);
      }} />
    </>
  );
};

export default RecurringInvoicesPage;
