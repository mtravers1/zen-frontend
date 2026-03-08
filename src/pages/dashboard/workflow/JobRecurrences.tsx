import { useState } from "react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Repeat, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const JobRecurrencesPage = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [searchValue, setSearchValue] = useState("");
  const [newOpen, setNewOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newTemplate, setNewTemplate] = useState("");
  const [newFrequency, setNewFrequency] = useState("Monthly");
  const [recurrences, setRecurrences] = useState([
    { id: 1, name: "Monthly Bookkeeping", template: "Bookkeeping Template", frequency: "Monthly", accounts: 15, nextRun: "2024-02-01", status: "active" },
    { id: 2, name: "Quarterly Tax Estimates", template: "Tax Estimate Template", frequency: "Quarterly", accounts: 42, nextRun: "2024-04-01", status: "active" },
    { id: 3, name: "Annual Tax Returns", template: "Tax Return Template", frequency: "Yearly", accounts: 156, nextRun: "2024-01-01", status: "active" },
    { id: 4, name: "Bi-weekly Payroll", template: "Payroll Template", frequency: "Bi-weekly", accounts: 23, nextRun: "2024-01-15", status: "active" },
    { id: 5, name: "Annual Audit", template: "Audit Template", frequency: "Yearly", accounts: 8, nextRun: "2024-06-01", status: "paused" },
  ]);

  const handleCreate = () => {
    if (!newName.trim()) return;
    const id = Math.max(0, ...recurrences.map(r => r.id)) + 1;
    const nextRun = new Date(); nextRun.setMonth(nextRun.getMonth() + 1);
    setRecurrences(prev => [...prev, { id, name: newName.trim(), template: newTemplate.trim() || "Custom Template", frequency: newFrequency, accounts: 0, nextRun: nextRun.toISOString().split("T")[0], status: "active" }]);
    toast.success(`Recurrence "${newName.trim()}" created`);
    setNewName(""); setNewTemplate(""); setNewFrequency("Monthly");
    setNewOpen(false);
  };

  const filteredRecurrences = recurrences.filter((rec) => {
    const matchesTab = activeTab === "all" || rec.status === activeTab;
    const matchesSearch = !searchValue || rec.name.toLowerCase().includes(searchValue.toLowerCase()) || rec.template.toLowerCase().includes(searchValue.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <>
      <div className="space-y-6">
        <DashboardPageHeader
          icon={<Repeat className="w-5 h-5 text-primary" />}
          title="Job Recurrences"
          description="Manage recurring job templates and schedules"
        />

        <div className="flex items-center justify-between">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="paused">Paused</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button onClick={() => setNewOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Recurrence
          </Button>
        </div>

        <PageToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Search recurrences..."
          showFilter
        />

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Template</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Accounts</TableHead>
                  <TableHead>Next Run</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecurrences.map((rec) => (
                  <TableRow key={rec.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{rec.name}</TableCell>
                    <TableCell>{rec.template}</TableCell>
                    <TableCell><Badge variant="outline">{rec.frequency}</Badge></TableCell>
                    <TableCell>{rec.accounts}</TableCell>
                    <TableCell className="text-muted-foreground">{rec.nextRun}</TableCell>
                    <TableCell>
                      <Badge className={rec.status === "active" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-600"}>
                        {rec.status.charAt(0).toUpperCase() + rec.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredRecurrences.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No recurrences found</TableCell></TableRow>}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={newOpen} onOpenChange={setNewOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>New Recurrence</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Monthly Bookkeeping" />
            </div>
            <div className="space-y-2">
              <Label>Template</Label>
              <Input value={newTemplate} onChange={e => setNewTemplate(e.target.value)} placeholder="e.g. Bookkeeping Template" />
            </div>
            <div className="space-y-2">
              <Label>Frequency</Label>
              <Select value={newFrequency} onValueChange={setNewFrequency}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  {["Daily", "Weekly", "Bi-weekly", "Monthly", "Quarterly", "Yearly"].map(f => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={!newName.trim()}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobRecurrencesPage;
