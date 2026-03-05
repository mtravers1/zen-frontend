import { useState } from "react";
import { RefreshCw, Plus } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data
const mockRecurringInvoices = [
  { id: 1, account: "Acme Corp", name: "Monthly Retainer", status: "active", paymentMethod: "Credit Card", amount: 2500, balance: 0, nextBilling: "2024-02-01" },
  { id: 2, account: "Tech Solutions", name: "Support Plan", status: "active", paymentMethod: "ACH", amount: 1500, balance: 500, nextBilling: "2024-02-15" },
  { id: 3, account: "Global Industries", name: "Enterprise License", status: "inactive", paymentMethod: "Invoice", amount: 5000, balance: 0, nextBilling: "-" },
  { id: 4, account: "StartUp Inc", name: "Starter Package", status: "active", paymentMethod: "Credit Card", amount: 500, balance: 0, nextBilling: "2024-02-01" },
];

const RecurringInvoicesPage = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [searchValue, setSearchValue] = useState("");

  const filteredInvoices = mockRecurringInvoices.filter((invoice) => {
    const matchesTab = activeTab === "all" || invoice.status === activeTab;
    const matchesSearch = invoice.account.toLowerCase().includes(searchValue.toLowerCase()) ||
      invoice.name.toLowerCase().includes(searchValue.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const activeCount = mockRecurringInvoices.filter(i => i.status === "active").length;
  const inactiveCount = mockRecurringInvoices.filter(i => i.status === "inactive").length;

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <DashboardPageHeader
            title="Recurring Invoices"
            description="Manage automated recurring billing"
            icon={<RefreshCw className="w-6 h-6" />}
          />
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Invoice
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList variant="pills">
              <TabsTrigger value="active" variant="pills">
                Active ({activeCount})
              </TabsTrigger>
              <TabsTrigger value="inactive" variant="pills">
                Inactive ({inactiveCount})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <PageToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Search recurring invoices..."
          showFilter
        />

        <div className="border rounded-lg bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead>Next Billing</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{invoice.account}</TableCell>
                  <TableCell>{invoice.name}</TableCell>
                  <TableCell>
                    <Badge variant={invoice.status === "active" ? "default" : "secondary"}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">${invoice.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${invoice.balance.toLocaleString()}</TableCell>
                  <TableCell>{invoice.nextBilling}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
  );
};

export default RecurringInvoicesPage;
