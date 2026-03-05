import { useState } from "react";
import { CreditCard } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageStatsBar from "@/components/dashboard/PageStatsBar";
import PageToolbar from "@/components/dashboard/PageToolbar";
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
const mockPayments = [
  { id: "PAY-001", account: "Acme Corp", date: "2024-01-22", status: "completed", amount: 5000, method: "Credit Card" },
  { id: "PAY-002", account: "Tech Solutions", date: "2024-01-21", status: "completed", amount: 3500, method: "ACH" },
  { id: "PAY-003", account: "Global Industries", date: "2024-01-20", status: "refunded", amount: -1200, method: "Credit Card" },
  { id: "PAY-004", account: "StartUp Inc", date: "2024-01-19", status: "completed", amount: 2100, method: "Credit Card" },
  { id: "PAY-005", account: "Enterprise Ltd", date: "2024-01-18", status: "pending", amount: 6800, method: "Wire" },
];

const presetOptions = [
  { value: "all", label: "All Payments" },
  { value: "this-month", label: "This Month" },
  { value: "last-month", label: "Last Month" },
  { value: "refunds", label: "Refunds Only" },
];

const PaymentsPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Completed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Pending</Badge>;
      case "refunded":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Refunded</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredPayments = mockPayments.filter((payment) =>
    payment.account.toLowerCase().includes(searchValue.toLowerCase()) ||
    payment.id.toLowerCase().includes(searchValue.toLowerCase())
  );

  const totalPayments = mockPayments.filter(p => p.status === "completed").reduce((sum, p) => sum + p.amount, 0);
  const totalRefunds = Math.abs(mockPayments.filter(p => p.status === "refunded").reduce((sum, p) => sum + p.amount, 0));
  const revenue = totalPayments - totalRefunds;

  return (
      <div className="space-y-6">
        <DashboardPageHeader
          title="Payments"
          description="Track all incoming payments and refunds"
          icon={<CreditCard className="w-6 h-6" />}
        />

        <PageStatsBar
          stats={[
            { label: "Payments", value: mockPayments.filter(p => p.amount > 0).length },
            { label: "Total", value: `$${totalPayments.toLocaleString()}`, variant: "success" },
            { label: "Refunds", value: `$${totalRefunds.toLocaleString()}`, variant: "danger" },
            { label: "Net Revenue", value: `$${revenue.toLocaleString()}` },
          ]}
        />

        <PageToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Search payments..."
          presets={presetOptions}
          selectedPreset={selectedPreset}
          onPresetChange={setSelectedPreset}
          showFilter
          showExport
          showPrint
        />

        <div className="border rounded-lg bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment #</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Payment Method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.account}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell className={`text-right font-medium ${payment.amount < 0 ? "text-red-600" : ""}`}>
                    {payment.amount < 0 ? "-" : ""}${Math.abs(payment.amount).toLocaleString()}
                  </TableCell>
                  <TableCell>{payment.method}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
  );
};

export default PaymentsPage;
