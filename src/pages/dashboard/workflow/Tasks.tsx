import { useState } from "react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import NewTaskForm from "@/components/dashboard/forms/NewTaskForm";
import TaskFilterPanel from "@/components/dashboard/forms/TaskFilterPanel";
import { CheckSquare, Download } from "lucide-react";
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
import { NewTaskFormValues, TaskFilterValues } from "@/lib/dashboard-schemas";

interface Task {
  id: number;
  name: string;
  account: string;
  assignee: string;
  priority: string;
  status: string;
  dueDate: string;
  description?: string;
}

const INITIAL_TASKS: Task[] = [
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

const TasksPage = () => {
  const [activeTab, setActiveTab] = useState("open");
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState<TaskFilterValues>({});
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  const handleNewTask = (values: NewTaskFormValues) => {
    const newTask: Task = {
      id: tasks.length + 1,
      name: values.name,
      account: values.account,
      assignee: values.assignee,
      priority: values.priority,
      status: values.status,
      dueDate: values.dueDate,
      description: values.description,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleComplete = (taskId: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, status: t.status === "completed" ? "open" : "completed" }
          : t
      )
    );
  };

  const handleFilterApply = (newFilters: TaskFilterValues) => {
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

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "open" && task.status === "completed") return false;
    if (activeTab === "completed" && task.status !== "completed") return false;

    if (searchValue) {
      const q = searchValue.toLowerCase();
      const matchesSearch =
        task.name.toLowerCase().includes(q) ||
        task.account.toLowerCase().includes(q) ||
        task.assignee.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    if (filters.priority && filters.priority !== "all" && task.priority !== filters.priority)
      return false;
    if (filters.assignee && filters.assignee !== "all" && task.assignee !== filters.assignee)
      return false;
    if (filters.account && filters.account !== "all" && task.account !== filters.account)
      return false;

    return true;
  });

  const openCount = tasks.filter((t) => t.status !== "completed").length;
  const completedCount = tasks.filter((t) => t.status === "completed").length;

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
            <TabsTrigger value="open">Open ({openCount})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedCount})</TabsTrigger>
            <TabsTrigger value="all">All ({tasks.length})</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <NewTaskForm onSubmit={handleNewTask} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1">
          <PageToolbar
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            searchPlaceholder="Search tasks by name, account, or assignee..."
          />
        </div>
        <TaskFilterPanel
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
              {filteredTasks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    No tasks found. Try adjusting your search or filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTasks.map((task) => (
                  <TableRow key={task.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <Checkbox
                        checked={task.status === "completed"}
                        onCheckedChange={() => handleToggleComplete(task.id)}
                      />
                    </TableCell>
                    <TableCell
                      className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}
                    >
                      {task.name}
                    </TableCell>
                    <TableCell className="text-primary hover:underline cursor-pointer">
                      {task.account}
                    </TableCell>
                    <TableCell>{task.assignee}</TableCell>
                    <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                    <TableCell>{getStatusBadge(task.status)}</TableCell>
                    <TableCell className="text-muted-foreground">{task.dueDate}</TableCell>
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

export default TasksPage;
