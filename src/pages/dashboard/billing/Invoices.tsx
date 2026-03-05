import { useState } from "react";
import { Receipt, Download } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageStatsBar from "@/components/dashboard/PageStatsBar";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data
const mockInvoices = [
  { id: "INV-001", account: "Acme Corp", status: "paid", assignee: "John D.", posted: "2024-01-15", total: 5000 },
  { id: "INV-002", account: "Tech Solutions", status: "unpaid", assignee: "Sarah M.", posted: "2024-01-18", total: 3500 },
  { id: "INV-003", account: "Global Industries", status: "overdue", assignee: "Mike R.", posted: "2024-01-10", total: 8200 },
  { id: "INV-004", account: "StartUp Inc", status: "paid", assignee: "John D.", posted: "2024-01-20", total: 2100 },
  { id: "INV-005", account: "Enterprise Ltd", status: "unpaid", assignee: "Sarah M.", posted: "2024-01-22", total: 6800 },
];

const presetOptions = [
  { value: "all", label: "All Invoices" },
  { value: "this-month", label: "This Month" },
  { value: "last-month", label: "Last Month" },
  { value: "unpaid", label: "Unpaid Only" },
];

const InvoicesPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Paid</Badge>;
      case "unpaid":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Unpaid</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredInvoices = mockInvoices.filter((invoice) =>
    invoice.account.toLowerCase().includes(searchValue.toLowerCase()) ||
    invoice.id.toLowerCase().includes(searchValue.toLowerCase())
  );

  const totalPaid = mockInvoices.filter(i => i.status === "paid").reduce((sum, i) => sum + i.total, 0);
  const totalUnpaid = mockInvoices.filter(i => i.status === "unpaid" || i.status === "overdue").reduce((sum, i) => sum + i.total, 0);

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <DashboardPageHeader
            title="Invoices"
            description="Manage and track all client invoices"
            icon={<Receipt className="w-6 h-6" />}
          />
          <Button>
            <Receipt className="w-4 h-4 mr-2" />
            New Invoice
          </Button>
        </div>

        <PageStatsBar
          stats={[
            { label: "Total Invoices", value: mockInvoices.length },
            { label: "Paid", value: `$${totalPaid.toLocaleString()}`, variant: "success" },
            { label: "Unpaid", value: `$${totalUnpaid.toLocaleString()}`, variant: "warning" },
          ]}
        />

        <PageToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Search invoices..."
          presets={presetOptions}
          selectedPreset={selectedPreset}
          onPresetChange={setSelectedPreset}
          showFilter
          showExport
        />

        <div className="border rounded-lg bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Posted</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.account}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell>{invoice.assignee}</TableCell>
                  <TableCell>{invoice.posted}</TableCell>
                  <TableCell className="text-right font-medium">${invoice.total.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
  );
};

export default InvoicesPage;
