import { useState } from "react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Building2, Plus, Download } from "lucide-react";
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

const AccountsPage = () => {
  const [activeTab, setActiveTab] = useState("active");

  const accounts = [
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

  const filteredAccounts = accounts.filter((account) => {
    if (activeTab === "active") return account.status === "active";
    if (activeTab === "inactive") return account.status === "inactive";
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
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Account
            </Button>
          </div>
        </div>

        <PageToolbar
          onSearchChange={() => {}}
          searchPlaceholder="Search accounts..."
          showFilter={true}
        />

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
                {filteredAccounts.map((account) => (
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
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
  );
};

export default AccountsPage;
