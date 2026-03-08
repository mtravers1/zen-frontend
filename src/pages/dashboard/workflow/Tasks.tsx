import { useState } from "react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { CheckSquare, Plus, Download, Trash2, Circle, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { exportToCSV } from "@/lib/export";
import NewTaskDialog from "@/components/dashboard/dialogs/NewTaskDialog";
import { useDashboardData } from "@/contexts/DashboardDataContext";

const TasksPage = () => {
  const { tasks, addTask, setTasks } = useDashboardData();
  const [activeTab, setActiveTab] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");

  const uniqueAssignees = [...new Set(tasks.map(t => t.assignee))];

  const getPriorityBadge = (p: string) => { switch(p) { case "high": return <Badge variant="destructive">High</Badge>; case "medium": return <Badge className="bg-yellow-500/10 text-yellow-600">Medium</Badge>; default: return <Badge variant="secondary">Low</Badge>; } };
  const getStatusBadge = (s: string) => { switch(s) { case "open": return <Badge variant="outline">Open</Badge>; case "in_progress": return <Badge className="bg-blue-500/10 text-blue-500">In Progress</Badge>; case "completed": return <Badge className="bg-green-500/10 text-green-500">Completed</Badge>; default: return <Badge variant="outline">{s}</Badge>; } };

  const filtered = tasks.filter(t => {
    const matchesTab = activeTab === "all" || (activeTab === "open" ? t.status !== "completed" : t.status === "completed");
    const matchesSearch = !searchValue || t.name.toLowerCase().includes(searchValue.toLowerCase()) || t.account.toLowerCase().includes(searchValue.toLowerCase());
    const matchesPriority = priorityFilter === "all" || t.priority === priorityFilter;
    const matchesAssignee = assigneeFilter === "all" || t.assignee === assigneeFilter;
    return matchesTab && matchesSearch && matchesPriority && matchesAssignee;
  });

  const toggleTask = (id: number, markComplete: boolean) => {
    setTasks((prev) => prev.map(t => t.id === id ? { ...t, status: markComplete ? "completed" : "open" } : t));
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter(t => t.id !== id));
    toast.success("Task deleted");
  };

  return (
    <>
      <div className="space-y-6">
        <DashboardPageHeader icon={<CheckSquare className="w-5 h-5 text-primary" />} title="Tasks" description="Manage and track team tasks and assignments" />
        <div className="flex items-center justify-between">
          <Tabs value={activeTab} onValueChange={setActiveTab}><TabsList><TabsTrigger value="open">Open</TabsTrigger><TabsTrigger value="completed">Completed</TabsTrigger><TabsTrigger value="all">All</TabsTrigger></TabsList></Tabs>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => { exportToCSV(filtered.map(t => ({ Name: t.name, Account: t.account, Assignee: t.assignee, Priority: t.priority, Status: t.status, DueDate: t.dueDate })), "tasks"); toast.success("Tasks exported"); }}><Download className="w-4 h-4 mr-2" />Export</Button>
            <Button onClick={() => setDialogOpen(true)}><Plus className="w-4 h-4 mr-2" />New Task</Button>
          </div>
        </div>
        <PageToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Search tasks..."
          showFilter
          filterContent={
            <>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[140px] h-8 bg-background"><SelectValue placeholder="Priority" /></SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
                <SelectTrigger className="w-[160px] h-8 bg-background"><SelectValue placeholder="Assignee" /></SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  <SelectItem value="all">All Assignees</SelectItem>
                  {uniqueAssignees.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                </SelectContent>
              </Select>
            </>
          }
        />
        <Card><CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead className="w-10"></TableHead><TableHead>Task Name</TableHead><TableHead>Account</TableHead><TableHead>Assignee</TableHead><TableHead>Priority</TableHead><TableHead>Status</TableHead><TableHead>Due Date</TableHead><TableHead className="w-10"></TableHead></TableRow></TableHeader>
            <TableBody>
              {filtered.map(task => (
                <TableRow key={task.id} className="hover:bg-muted/50 group">
                  <TableCell>
                    <button
                      type="button"
                      onClick={e => { e.stopPropagation(); toggleTask(task.id, task.status !== "completed"); }}
                      className="flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                    >
                      {task.status === "completed"
                        ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                        : <Circle className="w-5 h-5" />}
                    </button>
                  </TableCell>
                  <TableCell className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}>{task.name}</TableCell>
                  <TableCell className="text-primary hover:underline cursor-pointer">{task.account}</TableCell>
                  <TableCell>{task.assignee}</TableCell>
                  <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell className="text-muted-foreground">{task.dueDate}</TableCell>
                  <TableCell onClick={e => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => deleteTask(task.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-8">No tasks found</TableCell></TableRow>}
            </TableBody>
          </Table>
        </CardContent></Card>
      </div>
      <NewTaskDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={(data) => {
        addTask(data);
        toast.success(`Task "${data.name}" created`);
      }} />
    </>
  );
};

export default TasksPage;
