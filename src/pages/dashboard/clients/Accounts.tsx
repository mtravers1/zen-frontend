import { useState } from "react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Building2, Plus, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { exportToCSV } from "@/lib/export";
import NewAccountDialog from "@/components/dashboard/dialogs/NewAccountDialog";

const initialAccounts = [
  { id: 1, name: "Smith Corporation", type: "Business", assignee: "John Doe", email: "contact@smithcorp.com", phone: "(555) 123-4567", status: "active", balance: "$5,250.00" },
  { id: 2, name: "Johnson LLC", type: "Business", assignee: "Jane Smith", email: "info@johnsonllc.com", phone: "(555) 234-5678", status: "active", balance: "$0.00" },
  { id: 3, name: "Brown & Associates", type: "Business", assignee: "Mike Johnson", email: "hello@brownassoc.com", phone: "(555) 345-6789", status: "active", balance: "$1,200.00" },
  { id: 4, name: "Emily Davis", type: "Individual", assignee: "Sarah Wilson", email: "emily@email.com", phone: "(555) 456-7890", status: "inactive", balance: "$0.00" },
  { id: 5, name: "Wilson Group", type: "Business", assignee: "John Doe", email: "contact@wilsongroup.com", phone: "(555) 567-8901", status: "active", balance: "$3,500.00" },
];

const AccountsPage = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [searchValue, setSearchValue] = useState("");
  const [accounts, setAccounts] = useState(initialAccounts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredAccounts = accounts.filter((account) => {
    const matchesTab = activeTab === "all" || account.status === activeTab;
    const matchesSearch = !searchValue || account.name.toLowerCase().includes(searchValue.toLowerCase()) || account.email.toLowerCase().includes(searchValue.toLowerCase());
    const matchesType = typeFilter === "all" || account.type === typeFilter;
    return matchesTab && matchesSearch && matchesType;
  });

  return (
      <div className="space-y-6">
        <DashboardPageHeader icon={<Building2 className="w-5 h-5 text-primary" />} title="Accounts" description="Manage client accounts and organizations" />
        <div className="flex items-center justify-between">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList><TabsTrigger value="active">Active</TabsTrigger><TabsTrigger value="inactive">Inactive</TabsTrigger><TabsTrigger value="all">All</TabsTrigger></TabsList>
          </Tabs>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => { exportToCSV(filteredAccounts.map(a => ({ Name: a.name, Type: a.type, Manager: a.assignee, Email: a.email, Phone: a.phone, Status: a.status, Balance: a.balance })), "accounts"); toast.success("Accounts exported"); }}>
              <Download className="w-4 h-4 mr-2" />Export
            </Button>
            <Button onClick={() => setDialogOpen(true)}><Plus className="w-4 h-4 mr-2" />New Account</Button>
          </div>
        </div>
        <PageToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Search accounts..."
          showFilter
          filterContent={
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[160px] h-8 bg-background"><SelectValue placeholder="Account Type" /></SelectTrigger>
              <SelectContent className="bg-background border border-border z-50">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Individual">Individual</SelectItem>
              </SelectContent>
            </Select>
          }
        />
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader><TableRow><TableHead>Account Name</TableHead><TableHead>Type</TableHead><TableHead>Account Manager</TableHead><TableHead>Email</TableHead><TableHead>Phone</TableHead><TableHead>Balance</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
              <TableBody>
                {filteredAccounts.map((account) => (
                  <TableRow key={account.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium text-primary hover:underline">{account.name}</TableCell>
                    <TableCell><Badge variant="outline">{account.type}</Badge></TableCell>
                    <TableCell>{account.assignee}</TableCell>
                    <TableCell className="text-muted-foreground">{account.email}</TableCell>
                    <TableCell className="text-muted-foreground">{account.phone}</TableCell>
                    <TableCell className="font-medium">{account.balance}</TableCell>
                    <TableCell><Badge className={account.status === "active" ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"}>{account.status.charAt(0).toUpperCase() + account.status.slice(1)}</Badge></TableCell>
                  </TableRow>
                ))}
                {filteredAccounts.length === 0 && <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">No accounts found</TableCell></TableRow>}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <NewAccountDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={(data) => {
        setAccounts(prev => [...prev, { id: Date.now(), ...data, status: "active", balance: "$0.00" }]);
        toast.success(`Account "${data.name}" created`);
      }} />
  );
};

export default AccountsPage;
