import { useState } from "react";
import { CreditCard, Plus, Download, PauseCircle, PlayCircle, XCircle, Search } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type SubscriptionStatus = "active" | "trial" | "cancelled" | "paused";

interface Subscription {
  id: string;
  client: string;
  service: string;
  status: SubscriptionStatus;
  startDate: string;
  nextBilling: string;
  amount: number;
  assignee: string;
}

const initialSubscriptions: Subscription[] = [
  {
    id: "1",
    client: "Smith & Associates LLC",
    service: "CFO Services",
    status: "active",
    startDate: "2024-01-15",
    nextBilling: "2024-05-15",
    amount: 2500,
    assignee: "Emily Carter",
  },
  {
    id: "2",
    client: "Johnson Family Trust",
    service: "Tax Return",
    status: "active",
    startDate: "2024-02-01",
    nextBilling: "2025-02-01",
    amount: 1200,
    assignee: "Marcus Thompson",
  },
  {
    id: "3",
    client: "Rivera Consulting",
    service: "Bookkeeping",
    status: "trial",
    startDate: "2024-04-01",
    nextBilling: "2024-05-01",
    amount: 800,
    assignee: "Ava Williams",
  },
  {
    id: "4",
    client: "Chen Enterprises",
    service: "Payroll Processing",
    status: "paused",
    startDate: "2023-11-10",
    nextBilling: "—",
    amount: 950,
    assignee: "Marcus Thompson",
  },
  {
    id: "5",
    client: "Patel & Sons",
    service: "Advisory Services",
    status: "cancelled",
    startDate: "2023-06-01",
    nextBilling: "—",
    amount: 3000,
    assignee: "Emily Carter",
  },
  {
    id: "6",
    client: "Nguyen Holdings",
    service: "Bookkeeping",
    status: "active",
    startDate: "2024-03-01",
    nextBilling: "2024-05-01",
    amount: 750,
    assignee: "Ava Williams",
  },
];

const statusConfig: Record<SubscriptionStatus, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" },
  trial: { label: "Trial", className: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" },
  cancelled: { label: "Cancelled", className: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
  paused: { label: "Paused", className: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" },
};

const SERVICES = ["CFO Services", "Tax Return", "Bookkeeping", "Payroll Processing", "Advisory Services"];
const CLIENTS = [
  "Smith & Associates LLC",
  "Johnson Family Trust",
  "Rivera Consulting",
  "Chen Enterprises",
  "Patel & Sons",
  "Nguyen Holdings",
];

const SubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);
  const [activeTab, setActiveTab] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  // New subscription form state
  const [newClient, setNewClient] = useState("");
  const [newService, setNewService] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const filtered = subscriptions.filter((sub) => {
    const matchesTab = activeTab === "all" || sub.status === activeTab;
    const matchesSearch =
      !searchValue ||
      sub.client.toLowerCase().includes(searchValue.toLowerCase()) ||
      sub.service.toLowerCase().includes(searchValue.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const tabCounts = {
    all: subscriptions.length,
    active: subscriptions.filter((s) => s.status === "active").length,
    trial: subscriptions.filter((s) => s.status === "trial").length,
    cancelled: subscriptions.filter((s) => s.status === "cancelled").length,
  };

  const togglePause = (id: string) => {
    setSubscriptions((prev) =>
      prev.map((sub) => {
        if (sub.id !== id) return sub;
        const next: SubscriptionStatus = sub.status === "paused" ? "active" : "paused";
        toast.success(`Subscription ${next === "paused" ? "paused" : "resumed"}`);
        return { ...sub, status: next, nextBilling: next === "paused" ? "—" : new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0] };
      })
    );
  };

  const cancelSubscription = (id: string) => {
    setSubscriptions((prev) =>
      prev.map((sub) => {
        if (sub.id !== id) return sub;
        toast.success("Subscription cancelled");
        return { ...sub, status: "cancelled", nextBilling: "—" };
      })
    );
  };

  const handleCreateSubscription = () => {
    if (!newClient || !newService || !newAmount) return;
    const today = new Date().toISOString().split("T")[0];
    const next = new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0];
    setSubscriptions((prev) => [
      {
        id: Date.now().toString(),
        client: newClient,
        service: newService,
        status: "trial",
        startDate: today,
        nextBilling: next,
        amount: parseFloat(newAmount),
        assignee: "Unassigned",
      },
      ...prev,
    ]);
    toast.success("New subscription created");
    setNewClient("");
    setNewService("");
    setNewAmount("");
    setDialogOpen(false);
  };

  const handleExport = () => {
    toast.success("Subscriptions exported");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <DashboardPageHeader
          title="Service Subscriptions"
          description="Track and manage client service subscriptions"
          icon={<CreditCard className="w-6 h-6" />}
        />
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />Export
          </Button>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />New Subscription
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All ({tabCounts.all})</TabsTrigger>
            <TabsTrigger value="active">Active ({tabCounts.active})</TabsTrigger>
            <TabsTrigger value="trial">Trial ({tabCounts.trial})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({tabCounts.cancelled})</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search subscriptions..."
            className="pl-9 h-9"
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Started</TableHead>
                <TableHead>Next Billing</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                    No subscriptions found
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((sub) => {
                  const sc = statusConfig[sub.status];
                  return (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">{sub.client}</TableCell>
                      <TableCell>{sub.service}</TableCell>
                      <TableCell>
                        <Badge className={`text-xs ${sc.className}`} variant="outline">
                          {sc.label}
                        </Badge>
                      </TableCell>
                      <TableCell>{sub.assignee}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{sub.startDate}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{sub.nextBilling}</TableCell>
                      <TableCell className="text-right font-medium">
                        ${sub.amount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {sub.status !== "cancelled" && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                title={sub.status === "paused" ? "Resume" : "Pause"}
                                onClick={() => togglePause(sub.id)}
                              >
                                {sub.status === "paused" ? (
                                  <PlayCircle className="w-4 h-4 text-green-600" />
                                ) : (
                                  <PauseCircle className="w-4 h-4 text-amber-500" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                title="Cancel"
                                onClick={() => cancelSubscription(sub.id)}
                              >
                                <XCircle className="w-4 h-4 text-destructive" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Subscription</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Client *</Label>
              <Select value={newClient} onValueChange={setNewClient}>
                <SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
                <SelectContent>
                  {CLIENTS.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Service *</Label>
              <Select value={newService} onValueChange={setNewService}>
                <SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger>
                <SelectContent>
                  {SERVICES.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Monthly Amount ($) *</Label>
              <Input
                type="number"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                placeholder="e.g. 1000"
                min="0"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleCreateSubscription}
              disabled={!newClient || !newService || !newAmount}
            >
              Create Subscription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscriptionsPage;
