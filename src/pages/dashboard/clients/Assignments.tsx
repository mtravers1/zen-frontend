import { useState } from "react";
import { UserCheck, ArrowRightLeft, Search, Download, Filter } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { exportToCSV } from "@/lib/export";

const TEAM_MEMBERS = [
  { id: "1", name: "John Doe", initials: "JD", role: "Director" },
  { id: "2", name: "Jane Smith", initials: "JS", role: "Account Manager" },
  { id: "3", name: "Mike Johnson", initials: "MJ", role: "Account Manager" },
  { id: "4", name: "Sarah Wilson", initials: "SW", role: "Executive Manager" },
  { id: "5", name: "Emily Chen", initials: "EC", role: "Relationship Manager" },
];

type Priority = "high" | "medium" | "low";

interface Assignment {
  id: number;
  client: string;
  clientType: string;
  assignee: string;
  assigneeId: string;
  service: string;
  status: "active" | "inactive";
  priority: Priority;
  since: string;
  lastContact: string;
}

const initialAssignments: Assignment[] = [
  { id: 1, client: "Smith Corporation", clientType: "Business", assignee: "John Doe", assigneeId: "1", service: "CFO Services", status: "active", priority: "high", since: "2023-06-01", lastContact: "2024-01-15" },
  { id: 2, client: "Johnson LLC", clientType: "Business", assignee: "Jane Smith", assigneeId: "2", service: "Tax Return", status: "active", priority: "medium", since: "2023-08-15", lastContact: "2024-01-10" },
  { id: 3, client: "Brown & Associates", clientType: "Business", assignee: "Mike Johnson", assigneeId: "3", service: "Bookkeeping", status: "active", priority: "low", since: "2023-09-01", lastContact: "2024-01-12" },
  { id: 4, client: "Emily Davis", clientType: "Individual", assignee: "Sarah Wilson", assigneeId: "4", service: "Tax Return", status: "inactive", priority: "low", since: "2023-03-20", lastContact: "2023-11-05" },
  { id: 5, client: "Wilson Group", clientType: "Business", assignee: "John Doe", assigneeId: "1", service: "Advisory Services", status: "active", priority: "high", since: "2022-12-01", lastContact: "2024-01-18" },
  { id: 6, client: "Tech Solutions Inc", clientType: "Business", assignee: "Emily Chen", assigneeId: "5", service: "Payroll Processing", status: "active", priority: "medium", since: "2023-07-15", lastContact: "2024-01-14" },
  { id: 7, client: "Global Industries", clientType: "Business", assignee: "Jane Smith", assigneeId: "2", service: "Audit", status: "active", priority: "high", since: "2023-01-10", lastContact: "2024-01-16" },
  { id: 8, client: "StartUp Inc", clientType: "Business", assignee: "Mike Johnson", assigneeId: "3", service: "Bookkeeping", status: "active", priority: "low", since: "2024-01-01", lastContact: "2024-01-19" },
];

const getPriorityBadge = (p: Priority) => {
  switch (p) {
    case "high": return <Badge variant="destructive">High</Badge>;
    case "medium": return <Badge className="bg-yellow-500/10 text-yellow-600">Medium</Badge>;
    default: return <Badge variant="secondary">Low</Badge>;
  }
};

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [reassignTarget, setReassignTarget] = useState<Assignment | null>(null);
  const [newAssigneeId, setNewAssigneeId] = useState("");

  const filtered = assignments.filter(a => {
    const matchesTab = activeTab === "all" || a.status === activeTab;
    const matchesSearch = !searchValue || a.client.toLowerCase().includes(searchValue.toLowerCase()) || a.service.toLowerCase().includes(searchValue.toLowerCase());
    const matchesAssignee = assigneeFilter === "all" || a.assigneeId === assigneeFilter;
    return matchesTab && matchesSearch && matchesAssignee;
  });

  const workloadByMember = TEAM_MEMBERS.map(m => ({
    ...m,
    count: assignments.filter(a => a.assigneeId === m.id && a.status === "active").length,
  }));

  const handleReassign = () => {
    if (!reassignTarget || !newAssigneeId) return;
    const newMember = TEAM_MEMBERS.find(m => m.id === newAssigneeId)!;
    setAssignments(prev => prev.map(a =>
      a.id === reassignTarget.id ? { ...a, assignee: newMember.name, assigneeId: newAssigneeId } : a
    ));
    toast.success(`${reassignTarget.client} reassigned to ${newMember.name}`);
    setReassignTarget(null);
    setNewAssigneeId("");
  };

  return (
    <>
      <div className="space-y-6">
        <DashboardPageHeader
          icon={<UserCheck className="w-5 h-5 text-primary" />}
          title="Customer Assignment"
          description="Track client ownership, workload, and reassign accounts"
        />

        {/* Workload overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {workloadByMember.map(m => (
            <Card key={m.id} className="cursor-pointer hover:border-primary transition-colors" onClick={() => setAssigneeFilter(assigneeFilter === m.id ? "all" : m.id)}>
              <CardContent className="p-3 text-center">
                <Avatar className={`h-10 w-10 mx-auto mb-2 ${assigneeFilter === m.id ? "ring-2 ring-primary" : ""}`}>
                  <AvatarFallback className="text-xs">{m.initials}</AvatarFallback>
                </Avatar>
                <div className="text-xs font-medium truncate">{m.name.split(" ")[0]}</div>
                <div className="text-xs text-muted-foreground truncate">{m.role}</div>
                <div className="mt-1 text-lg font-bold text-primary">{m.count}</div>
                <div className="text-xs text-muted-foreground">clients</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search clients..."
                className="pl-8 h-8 w-48"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
              />
            </div>
            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
              <SelectTrigger className="w-[160px] h-8 bg-background"><SelectValue placeholder="Team Member" /></SelectTrigger>
              <SelectContent className="bg-background border border-border z-50">
                <SelectItem value="all">All Members</SelectItem>
                {TEAM_MEMBERS.map(m => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={() => {
              exportToCSV(filtered.map(a => ({ Client: a.client, Assignee: a.assignee, Service: a.service, Status: a.status, Priority: a.priority, Since: a.since, LastContact: a.lastContact })), "assignments");
              toast.success("Assignments exported");
            }}>
              <Download className="w-4 h-4 mr-1" />Export
            </Button>
          </div>
        </div>

        {/* Assignments table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned Since</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(a => (
                  <TableRow key={a.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <div className="font-medium">{a.client}</div>
                        <div className="text-xs text-muted-foreground">{a.clientType}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-xs">
                            {TEAM_MEMBERS.find(m => m.id === a.assigneeId)?.initials || "??"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{a.assignee}</div>
                          <div className="text-xs text-muted-foreground">{TEAM_MEMBERS.find(m => m.id === a.assigneeId)?.role}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{a.service}</TableCell>
                    <TableCell>{getPriorityBadge(a.priority)}</TableCell>
                    <TableCell>
                      <Badge className={a.status === "active" ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"}>
                        {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{a.since}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{a.lastContact}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost" size="sm" className="h-8 gap-1"
                        onClick={() => { setReassignTarget(a); setNewAssigneeId(a.assigneeId); }}
                      >
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline text-xs">Reassign</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">No assignments found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Reassign Dialog */}
      <Dialog open={!!reassignTarget} onOpenChange={o => { if (!o) setReassignTarget(null); }}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5" />
              Reassign Client
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-muted-foreground text-xs">Client</Label>
              <p className="font-medium">{reassignTarget?.client}</p>
            </div>
            <div className="space-y-2">
              <Label>Assign to</Label>
              <Select value={newAssigneeId} onValueChange={setNewAssigneeId}>
                <SelectTrigger className="bg-background"><SelectValue placeholder="Select team member" /></SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  {TEAM_MEMBERS.map(m => (
                    <SelectItem key={m.id} value={m.id}>
                      <div className="flex items-center gap-2">
                        <span>{m.name}</span>
                        <span className="text-muted-foreground text-xs">({m.role})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReassignTarget(null)}>Cancel</Button>
            <Button onClick={handleReassign} disabled={!newAssigneeId || newAssigneeId === reassignTarget?.assigneeId}>
              Reassign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AssignmentsPage;
