import { useState } from "react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { CheckSquare, Plus, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TasksPage = () => {
  const [activeTab, setActiveTab] = useState("open");

  const tasks = [
    {
      id: 1,
      name: "Review Q4 Tax Return",
      account: "Smith Corporation",
      assignee: "John Doe",
      priority: "high",
      status: "in_progress",
      dueDate: "2024-01-20",
    },
    {
      id: 2,
      name: "Complete Audit Checklist",
      account: "Johnson LLC",
      assignee: "Jane Smith",
      priority: "medium",
      status: "open",
      dueDate: "2024-01-22",
    },
    {
      id: 3,
      name: "Send Invoice Reminder",
      account: "Brown & Associates",
      assignee: "Mike Johnson",
      priority: "low",
      status: "open",
      dueDate: "2024-01-18",
    },
    {
      id: 4,
      name: "Prepare Financial Statements",
      account: "Davis Industries",
      assignee: "Sarah Wilson",
      priority: "high",
      status: "open",
      dueDate: "2024-01-25",
    },
    {
      id: 5,
      name: "Client Meeting Follow-up",
      account: "Wilson Group",
      assignee: "John Doe",
      priority: "medium",
      status: "completed",
      dueDate: "2024-01-15",
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="outline">Open</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-500/10 text-blue-500">In Progress</Badge>;
      case "completed":
        return <Badge className="bg-green-500/10 text-green-500">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "open") return task.status !== "completed";
    if (activeTab === "completed") return task.status === "completed";
    return true;
  });

  return (
      <div className="space-y-6">
        <DashboardPageHeader
          icon={<CheckSquare className="w-5 h-5 text-primary" />}
          title="Tasks"
          description="Manage and track team tasks and assignments"
        />

        <div className="flex items-center justify-between">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
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
              New Task
            </Button>
          </div>
        </div>

        <PageToolbar
          onSearchChange={() => {}}
          searchPlaceholder="Search tasks..."
          showFilter={true}
        />

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"></TableHead>
                  <TableHead>Task Name</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => (
                  <TableRow key={task.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <Checkbox checked={task.status === "completed"} />
                    </TableCell>
                    <TableCell className="font-medium">{task.name}</TableCell>
                    <TableCell className="text-primary hover:underline cursor-pointer">
                      {task.account}
                    </TableCell>
                    <TableCell>{task.assignee}</TableCell>
                    <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                    <TableCell>{getStatusBadge(task.status)}</TableCell>
                    <TableCell className="text-muted-foreground">{task.dueDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
  );
};

export default TasksPage;
