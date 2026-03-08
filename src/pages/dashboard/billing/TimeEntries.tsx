import { useState } from "react";
import { Clock, Plus } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageStatsBar from "@/components/dashboard/PageStatsBar";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { exportToCSV } from "@/lib/export";
import NewTimeEntryDialog from "@/components/dashboard/dialogs/NewTimeEntryDialog";

const initialEntries = [
  { id: 1, name: "Project Research", timerStatus: "stopped", date: "2024-01-22", type: "Billable", assignee: "John D.", service: "Consulting", duration: "2:30", billed: false },
  { id: 2, name: "Client Meeting", timerStatus: "stopped", date: "2024-01-22", type: "Billable", assignee: "Sarah M.", service: "Advisory", duration: "1:00", billed: true },
  { id: 3, name: "Documentation", timerStatus: "running", date: "2024-01-22", type: "Non-billable", assignee: "Mike R.", service: "Internal", duration: "0:45", billed: false },
  { id: 4, name: "Code Review", timerStatus: "stopped", date: "2024-01-21", type: "Billable", assignee: "John D.", service: "Development", duration: "3:15", billed: false },
  { id: 5, name: "Strategy Session", timerStatus: "stopped", date: "2024-01-21", type: "Billable", assignee: "Sarah M.", service: "Consulting", duration: "2:00", billed: true },
];

const presetOptions = [
  { value: "all", label: "All Entries" }, { value: "today", label: "Today" }, { value: "this-week", label: "This Week" }, { value: "unbilled", label: "Unbilled Only" },
];

const TimeEntriesPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("all");
  const [entries, setEntries] = useState(initialEntries);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = entries.filter(e => {
    const matchesSearch = !searchValue || e.name.toLowerCase().includes(searchValue.toLowerCase()) || e.assignee.toLowerCase().includes(searchValue.toLowerCase());
    const matchesPreset = selectedPreset === "all" || (selectedPreset === "unbilled" && !e.billed);
    const matchesType = typeFilter === "all" || e.type === typeFilter;
    return matchesSearch && matchesPreset && matchesType;
  });

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <DashboardPageHeader title="Time Entries" description="Track and manage time spent on client work" icon={<Clock className="w-6 h-6" />} />
          <Button onClick={() => setDialogOpen(true)}><Plus className="w-4 h-4 mr-2" />New Entry</Button>
        </div>
        <PageStatsBar stats={[{ label: "Total Duration", value: "9:30" }, { label: "Unbilled", value: "6:30", variant: "warning" }, { label: "Billed", value: "3:00", variant: "success" }]} />
        <PageToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Search time entries..."
          presets={presetOptions}
          selectedPreset={selectedPreset}
          onPresetChange={setSelectedPreset}
          showFilter
          filterContent={
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[160px] h-8 bg-background"><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent className="bg-background border border-border z-50">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Billable">Billable</SelectItem>
                <SelectItem value="Non-billable">Non-billable</SelectItem>
              </SelectContent>
            </Select>
          }
          showExport
          onExportClick={() => { exportToCSV(filtered.map(e => ({ Name: e.name, Date: e.date, Type: e.type, Assignee: e.assignee, Service: e.service, Duration: e.duration, Billed: e.billed ? "Yes" : "No" })), "time-entries"); toast.success("Time entries exported"); }}
        />
        <div className="border rounded-lg bg-card">
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Timer</TableHead><TableHead>Date</TableHead><TableHead>Type</TableHead><TableHead>Assignee</TableHead><TableHead>Service</TableHead><TableHead>Duration</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
              {filtered.map(entry => (
                <TableRow key={entry.id} className="cursor-pointer hover:bg-muted/50"><TableCell className="font-medium">{entry.name}</TableCell><TableCell><Badge variant={entry.timerStatus === "running" ? "default" : "secondary"}>{entry.timerStatus}</Badge></TableCell><TableCell>{entry.date}</TableCell><TableCell><Badge variant={entry.type === "Billable" ? "default" : "outline"}>{entry.type}</Badge></TableCell><TableCell>{entry.assignee}</TableCell><TableCell>{entry.service}</TableCell><TableCell className="font-mono">{entry.duration}</TableCell><TableCell><Badge variant={entry.billed ? "default" : "secondary"}>{entry.billed ? "Billed" : "Unbilled"}</Badge></TableCell></TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <NewTimeEntryDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={(data) => {
        setEntries(prev => [...prev, { id: Date.now(), name: data.name, timerStatus: "stopped", date: data.date, type: data.billable ? "Billable" : "Non-billable", assignee: data.assignee, service: data.service, duration: data.duration, billed: false }]);
        toast.success("Time entry added");
      }} />
    </>
  );
};

export default TimeEntriesPage;
