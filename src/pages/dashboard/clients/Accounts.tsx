import { useState } from "react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import NewClientForm from "@/components/dashboard/forms/NewClientForm";
import ClientFilterPanel from "@/components/dashboard/forms/ClientFilterPanel";
import { Building2, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NewClientFormValues, ClientFilterValues } from "@/lib/dashboard-schemas";

interface Account {
  id: number;
  name: string;
  type: string;
  assignee: string;
  email: string;
  phone: string;
  status: string;
  balance: string;
}

const INITIAL_ACCOUNTS: Account[] = [
  {
    id: 1,
    name: "Smith Corporation",
    type: "Business",
    assignee: "John Doe",
    email: "contact@smithcorp.com",
    phone: "(555) 123-4567",
    status: "active",
    balance: "$5,250.00",
  },
  {
    id: 2,
    name: "Johnson LLC",
    type: "Business",
    assignee: "Jane Smith",
    email: "info@johnsonllc.com",
    phone: "(555) 234-5678",
    status: "active",
    balance: "$0.00",
  },
  {
    id: 3,
    name: "Brown & Associates",
    type: "Business",
    assignee: "Mike Johnson",
    email: "hello@brownassoc.com",
    phone: "(555) 345-6789",
    status: "active",
    balance: "$1,200.00",
  },
  {
    id: 4,
    name: "Emily Davis",
    type: "Individual",
    assignee: "Sarah Wilson",
    email: "emily@email.com",
    phone: "(555) 456-7890",
    status: "inactive",
    balance: "$0.00",
  },
  {
    id: 5,
    name: "Wilson Group",
    type: "Business",
    assignee: "John Doe",
    email: "contact@wilsongroup.com",
    phone: "(555) 567-8901",
    status: "active",
    balance: "$3,500.00",
  },
];

const AccountsPage = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [accounts, setAccounts] = useState<Account[]>(INITIAL_ACCOUNTS);
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState<ClientFilterValues>({});
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  const handleNewClient = (values: NewClientFormValues) => {
    const newAccount: Account = {
      id: accounts.length + 1,
      name: values.name,
      type: values.type,
      assignee: values.assignee,
      email: values.email,
      phone: values.phone,
      status: values.status,
      balance: "$0.00",
    };
    setAccounts((prev) => [newAccount, ...prev]);
  };

  const handleFilterApply = (newFilters: ClientFilterValues) => {
    setFilters(newFilters);
    const count = Object.values(newFilters).filter(
      (v) => v && v !== "all" && v !== ""
    ).length;
    setActiveFilterCount(count);
  };

  const handleFilterReset = () => {
    setFilters({});
    setActiveFilterCount(0);
  };

  const filteredAccounts = accounts.filter((account) => {
    if (activeTab === "active" && account.status !== "active") return false;
    if (activeTab === "inactive" && account.status !== "inactive") return false;

    if (searchValue) {
      const q = searchValue.toLowerCase();
      const matchesSearch =
        account.name.toLowerCase().includes(q) ||
        account.email.toLowerCase().includes(q) ||
        account.assignee.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    if (filters.type && filters.type !== "all" && account.type !== filters.type) return false;
    if (filters.status && filters.status !== "all" && account.status !== filters.status)
      return false;
    if (filters.assignee && filters.assignee !== "all" && account.assignee !== filters.assignee)
      return false;

    return true;
  });

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={<Building2 className="w-5 h-5 text-primary" />}
        title="Accounts"
        description="Manage client accounts and organizations"
      />

      <div className="flex items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="active">
              Active ({accounts.filter((a) => a.status === "active").length})
            </TabsTrigger>
            <TabsTrigger value="inactive">
              Inactive ({accounts.filter((a) => a.status === "inactive").length})
            </TabsTrigger>
            <TabsTrigger value="all">All ({accounts.length})</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <NewClientForm onSubmit={handleNewClient} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1">
          <PageToolbar
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            searchPlaceholder="Search accounts by name, email, or manager..."
          />
        </div>
        <ClientFilterPanel
          onApply={handleFilterApply}
          onReset={handleFilterReset}
          activeFilterCount={activeFilterCount}
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Account Manager</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccounts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    No accounts found. Try adjusting your search or filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredAccounts.map((account) => (
                  <TableRow key={account.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium text-primary hover:underline">
                      {account.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{account.type}</Badge>
                    </TableCell>
                    <TableCell>{account.assignee}</TableCell>
                    <TableCell className="text-muted-foreground">{account.email}</TableCell>
                    <TableCell className="text-muted-foreground">{account.phone}</TableCell>
                    <TableCell className="font-medium">{account.balance}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          account.status === "active"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-gray-500/10 text-gray-500"
                        }
                      >
                        {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
