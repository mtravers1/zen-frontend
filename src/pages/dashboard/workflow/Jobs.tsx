import { useState } from "react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Briefcase, Plus, Download } from "lucide-react";
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

const JobsPage = () => {
  const [activeTab, setActiveTab] = useState("in_progress");

  const jobs = [
    {
      id: 1,
      name: "2023 Tax Return",
      account: "Smith Corporation",
      assignee: "John Doe",
      pipeline: "Tax Returns",
      stage: "In Review",
      priority: "high",
      status: "in_progress",
      clientStatus: "Awaiting Info",
      startDate: "2024-01-01",
      dueDate: "2024-04-15",
    },
    {
      id: 2,
      name: "Annual Audit 2023",
      account: "Johnson LLC",
      assignee: "Jane Smith",
      pipeline: "Audits",
      stage: "Planning",
      priority: "medium",
      status: "in_progress",
      clientStatus: "In Progress",
      startDate: "2024-01-10",
      dueDate: "2024-03-31",
    },
    {
      id: 3,
      name: "Quarterly Bookkeeping",
      account: "Brown & Associates",
      assignee: "Mike Johnson",
      pipeline: "Bookkeeping",
      stage: "Processing",
      priority: "low",
      status: "in_progress",
      clientStatus: "On Track",
      startDate: "2024-01-15",
      dueDate: "2024-01-31",
    },
    {
      id: 4,
      name: "Payroll Setup",
      account: "Davis Industries",
      assignee: "Sarah Wilson",
      pipeline: "Payroll",
      stage: "Completed",
      priority: "medium",
      status: "archived",
      clientStatus: "Completed",
      startDate: "2023-12-01",
      dueDate: "2024-01-05",
    },
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500/10 text-yellow-600">Medium</Badge>;
      case "low":
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getClientStatusBadge = (status: string) => {
    switch (status) {
      case "Awaiting Info":
        return <Badge variant="outline" className="text-orange-500 border-orange-500">Awaiting Info</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-500/10 text-blue-500">In Progress</Badge>;
      case "On Track":
        return <Badge className="bg-green-500/10 text-green-500">On Track</Badge>;
      case "Completed":
        return <Badge className="bg-green-500/10 text-green-500">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredJobs = jobs.filter((job) => {
    if (activeTab === "in_progress") return job.status === "in_progress";
    if (activeTab === "archived") return job.status === "archived";
    return true;
  });

  return (
      <div className="space-y-6">
        <DashboardPageHeader
          icon={<Briefcase className="w-5 h-5 text-primary" />}
          title="Jobs"
          description="Track and manage client jobs and projects"
        />

        <div className="flex items-center justify-between">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="in_progress">In progress</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export jobs
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New job
            </Button>
          </div>
        </div>

        <PageToolbar
          onSearchChange={() => {}}
          searchPlaceholder="Search jobs..."
          showFilter={true}
        />

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Job assignee</TableHead>
                  <TableHead>Pipeline</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Client-facing status</TableHead>
                  <TableHead>Start date</TableHead>
                  <TableHead>Due date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{job.name}</TableCell>
                    <TableCell className="text-primary hover:underline cursor-pointer">
                      {job.account}
                    </TableCell>
                    <TableCell>{job.assignee}</TableCell>
                    <TableCell>{job.pipeline}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{job.stage}</Badge>
                    </TableCell>
                    <TableCell>{getPriorityBadge(job.priority)}</TableCell>
                    <TableCell>{getClientStatusBadge(job.clientStatus)}</TableCell>
                    <TableCell className="text-muted-foreground">{job.startDate}</TableCell>
                    <TableCell className="text-muted-foreground">{job.dueDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
  );
};

export default JobsPage;
