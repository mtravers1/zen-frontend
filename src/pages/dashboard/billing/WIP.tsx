import { useState } from "react";
import { BarChart3, FileText } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageStatsBar from "@/components/dashboard/PageStatsBar";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data
const mockWipEntries = [
  { id: "WIP-001", name: "Acme Corp", unbilledEntries: 5, unbilledTime: "8:30", billable: 2125 },
  { id: "WIP-002", name: "Tech Solutions", unbilledEntries: 3, unbilledTime: "4:15", billable: 1062 },
  { id: "WIP-003", name: "Global Industries", unbilledEntries: 8, unbilledTime: "12:00", billable: 3000 },
  { id: "WIP-004", name: "StartUp Inc", unbilledEntries: 2, unbilledTime: "2:30", billable: 625 },
];

const presetOptions = [
  { value: "all", label: "All Accounts" },
  { value: "high-value", label: "High Value (>$2000)" },
  { value: "pending", label: "Pending Review" },
];

const WIPPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("all");

  const totalUnbilledTime = "27:15";
  const totalBillable = mockWipEntries.reduce((sum, entry) => sum + entry.billable, 0);

  const filteredEntries = mockWipEntries.filter((entry) =>
    entry.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    entry.id.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
      <div className="space-y-6">
        <DashboardPageHeader
          title="Work in Progress (WIP)"
          description="View unbilled work across all accounts"
          icon={<BarChart3 className="w-6 h-6" />}
        />

        <PageStatsBar
          stats={[
            { label: "Total Unbilled Time", value: totalUnbilledTime },
            { label: "Total Billable", value: `$${totalBillable.toLocaleString()}`, variant: "warning" },
            { label: "Accounts with WIP", value: mockWipEntries.length },
          ]}
        />

        <PageToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Search accounts..."
          presets={presetOptions}
          selectedPreset={selectedPreset}
          onPresetChange={setSelectedPreset}
          showFilter
        />

        <div className="border rounded-lg bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Account Name</TableHead>
                <TableHead className="text-center">Unbilled Entries</TableHead>
                <TableHead>Unbilled Time</TableHead>
                <TableHead className="text-right">Billable Amount</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{entry.id}</TableCell>
                  <TableCell>{entry.name}</TableCell>
                  <TableCell className="text-center">{entry.unbilledEntries}</TableCell>
                  <TableCell className="font-mono">{entry.unbilledTime}</TableCell>
                  <TableCell className="text-right font-medium">${entry.billable.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Create Invoice
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
  );
};

export default WIPPage;
