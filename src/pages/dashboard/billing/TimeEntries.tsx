import { useState } from "react";
import { Clock, Plus } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageStatsBar from "@/components/dashboard/PageStatsBar";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data
const mockTimeEntries = [
  { id: 1, name: "Project Research", timerStatus: "stopped", date: "2024-01-22", type: "Billable", assignee: "John D.", service: "Consulting", duration: "2:30", billed: false },
  { id: 2, name: "Client Meeting", timerStatus: "stopped", date: "2024-01-22", type: "Billable", assignee: "Sarah M.", service: "Advisory", duration: "1:00", billed: true },
  { id: 3, name: "Documentation", timerStatus: "running", date: "2024-01-22", type: "Non-billable", assignee: "Mike R.", service: "Internal", duration: "0:45", billed: false },
  { id: 4, name: "Code Review", timerStatus: "stopped", date: "2024-01-21", type: "Billable", assignee: "John D.", service: "Development", duration: "3:15", billed: false },
  { id: 5, name: "Strategy Session", timerStatus: "stopped", date: "2024-01-21", type: "Billable", assignee: "Sarah M.", service: "Consulting", duration: "2:00", billed: true },
];

const presetOptions = [
  { value: "all", label: "All Entries" },
  { value: "today", label: "Today" },
  { value: "this-week", label: "This Week" },
  { value: "unbilled", label: "Unbilled Only" },
];

const TimeEntriesPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("all");

  const filteredEntries = mockTimeEntries.filter((entry) =>
    entry.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    entry.assignee.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <DashboardPageHeader
            title="Time Entries"
            description="Track and manage time spent on client work"
            icon={<Clock className="w-6 h-6" />}
          />
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Entry
          </Button>
        </div>

        <PageStatsBar
          stats={[
            { label: "Total Duration", value: "9:30" },
            { label: "Unbilled", value: "6:30", variant: "warning" },
            { label: "Billed", value: "3:00", variant: "success" },
          ]}
        />

        <PageToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Search time entries..."
          presets={presetOptions}
          selectedPreset={selectedPreset}
          onPresetChange={setSelectedPreset}
          showFilter
          showExport
        />

        <div className="border rounded-lg bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Timer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{entry.name}</TableCell>
                  <TableCell>
                    <Badge variant={entry.timerStatus === "running" ? "default" : "secondary"}>
                      {entry.timerStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>
                    <Badge variant={entry.type === "Billable" ? "default" : "outline"}>
                      {entry.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{entry.assignee}</TableCell>
                  <TableCell>{entry.service}</TableCell>
                  <TableCell className="font-mono">{entry.duration}</TableCell>
                  <TableCell>
                    <Badge variant={entry.billed ? "default" : "secondary"}>
                      {entry.billed ? "Billed" : "Unbilled"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
  );
};

export default TimeEntriesPage;
