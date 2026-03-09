import { useState, useEffect } from "react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Briefcase, Plus, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { exportToCSV } from "@/lib/export";
import NewJobDialog from "@/components/dashboard/dialogs/NewJobDialog";
import { useBackendFetch } from "@/hooks/useBackendFetch";

const fallbackJobs = [
  { id: 1, name: "2023 Tax Return", account: "Smith Corporation", assignee: "John Doe", pipeline: "Tax Returns", stage: "In Review", priority: "high", status: "in_progress", clientStatus: "Awaiting Info", startDate: "2024-01-01", dueDate: "2024-04-15" },
  { id: 2, name: "Annual Audit 2023", account: "Johnson LLC", assignee: "Jane Smith", pipeline: "Audits", stage: "Planning", priority: "medium", status: "in_progress", clientStatus: "In Progress", startDate: "2024-01-10", dueDate: "2024-03-31" },
  { id: 3, name: "Quarterly Bookkeeping", account: "Brown & Associates", assignee: "Mike Johnson", pipeline: "Bookkeeping", stage: "Processing", priority: "low", status: "in_progress", clientStatus: "On Track", startDate: "2024-01-15", dueDate: "2024-01-31" },
  { id: 4, name: "Payroll Setup", account: "Davis Industries", assignee: "Sarah Wilson", pipeline: "Payroll", stage: "Completed", priority: "medium", status: "archived", clientStatus: "Completed", startDate: "2023-12-01", dueDate: "2024-01-05" },
];

const JobsPage = () => {
  const fetchBackend = useBackendFetch();
  const [activeTab, setActiveTab] = useState("in_progress");
  const [searchValue, setSearchValue] = useState("");
  const [jobs, setJobs] = useState(fallbackJobs);

  useEffect(() => {
    fetchBackend<{ data: Array<{ _id: string; name?: string; clientName?: string; assignee?: string; pipelineId?: string | { name?: string }; stage?: string; priority?: string; status?: string; clientStatus?: string; startDate?: string; dueDate?: string }> }>("/jobs")
      .then(res => {
        if (res?.data?.length) {
          setJobs(res.data.map((j, i) => ({
            id: i + 1,
            name: j.name ?? "",
            account: j.clientName ?? "",
            assignee: j.assignee ?? "",
            pipeline: typeof j.pipelineId === "object" ? (j.pipelineId?.name ?? "") : "",
            stage: j.stage ?? "",
            priority: j.priority ?? "medium",
            status: j.status ?? "in_progress",
            clientStatus: j.clientStatus ?? "In Progress",
            startDate: j.startDate ? new Date(j.startDate).toISOString().split("T")[0] : "",
            dueDate: j.dueDate ? new Date(j.dueDate).toISOString().split("T")[0] : "",
          })));
        }
      })
      .catch(() => {});
  }, [fetchBackend]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pipelineFilter, setPipelineFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const uniquePipelines = [...new Set(jobs.map(j => j.pipeline))];

  const getPriorityBadge = (p: string) => { switch(p) { case "high": return <Badge variant="destructive">High</Badge>; case "medium": return <Badge className="bg-yellow-500/10 text-yellow-600">Medium</Badge>; default: return <Badge variant="secondary">Low</Badge>; } };
  const getClientStatusBadge = (s: string) => { switch(s) { case "Awaiting Info": return <Badge variant="outline" className="text-orange-500 border-orange-500">Awaiting Info</Badge>; case "In Progress": return <Badge className="bg-blue-500/10 text-blue-500">In Progress</Badge>; default: return <Badge className="bg-green-500/10 text-green-500">{s}</Badge>; } };

  const filtered = jobs.filter(j => {
    const matchesTab = activeTab === "all" || j.status === activeTab;
    const matchesSearch = !searchValue || j.name.toLowerCase().includes(searchValue.toLowerCase()) || j.account.toLowerCase().includes(searchValue.toLowerCase());
    const matchesPipeline = pipelineFilter === "all" || j.pipeline === pipelineFilter;
    const matchesPriority = priorityFilter === "all" || j.priority === priorityFilter;
    return matchesTab && matchesSearch && matchesPipeline && matchesPriority;
  });

  return (
    <>
      <div className="space-y-6">
        <DashboardPageHeader icon={<Briefcase className="w-5 h-5 text-primary" />} title="Jobs" description="Track and manage client jobs and projects" />
        <div className="flex items-center justify-between">
          <Tabs value={activeTab} onValueChange={setActiveTab}><TabsList><TabsTrigger value="in_progress">In progress</TabsTrigger><TabsTrigger value="archived">Archived</TabsTrigger><TabsTrigger value="all">All</TabsTrigger></TabsList></Tabs>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => { exportToCSV(filtered.map(j => ({ Name: j.name, Account: j.account, Assignee: j.assignee, Pipeline: j.pipeline, Priority: j.priority, Status: j.clientStatus })), "jobs"); toast.success("Jobs exported"); }}><Download className="w-4 h-4 mr-2" />Export jobs</Button>
            <Button onClick={() => setDialogOpen(true)}><Plus className="w-4 h-4 mr-2" />New job</Button>
          </div>
        </div>
        <PageToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Search jobs..."
          showFilter
          filterContent={
            <>
              <Select value={pipelineFilter} onValueChange={setPipelineFilter}>
                <SelectTrigger className="w-[160px] h-8 bg-background"><SelectValue placeholder="Pipeline" /></SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  <SelectItem value="all">All Pipelines</SelectItem>
                  {uniquePipelines.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[140px] h-8 bg-background"><SelectValue placeholder="Priority" /></SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </>
          }
        />
        <Card><CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Account</TableHead><TableHead>Job assignee</TableHead><TableHead>Pipeline</TableHead><TableHead>Stage</TableHead><TableHead>Priority</TableHead><TableHead>Client-facing status</TableHead><TableHead>Start date</TableHead><TableHead>Due date</TableHead></TableRow></TableHeader>
            <TableBody>
              {filtered.map(job => (
                <TableRow key={job.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{job.name}</TableCell>
                  <TableCell className="text-primary hover:underline cursor-pointer">{job.account}</TableCell>
                  <TableCell>{job.assignee}</TableCell>
                  <TableCell>{job.pipeline}</TableCell>
                  <TableCell><Badge variant="secondary">{job.stage}</Badge></TableCell>
                  <TableCell>{getPriorityBadge(job.priority)}</TableCell>
                  <TableCell>{getClientStatusBadge(job.clientStatus)}</TableCell>
                  <TableCell className="text-muted-foreground">{job.startDate}</TableCell>
                  <TableCell className="text-muted-foreground">{job.dueDate}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && <TableRow><TableCell colSpan={9} className="text-center text-muted-foreground py-8">No jobs found</TableCell></TableRow>}
            </TableBody>
          </Table>
        </CardContent></Card>
      </div>
      <NewJobDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={(data) => {
        setJobs(prev => [...prev, { id: Date.now(), ...data, stage: "New", status: "in_progress", clientStatus: "In Progress" }]);
        toast.success(`Job "${data.name}" created`);
      }} />
    </>
  );
};

export default JobsPage;
