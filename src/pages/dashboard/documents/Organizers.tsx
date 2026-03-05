import { useState } from "react";
import { ClipboardList, Plus } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data
const mockOrganizers = [
  { id: 1, name: "2024 Tax Organizer", account: "Acme Corp", status: "active", progress: 75, checklist: "8/12", dateCreated: "2024-01-15" },
  { id: 2, name: "Quarterly Review", account: "Tech Solutions", status: "active", progress: 30, checklist: "3/10", dateCreated: "2024-01-18" },
  { id: 3, name: "Onboarding Checklist", account: "Global Industries", status: "active", progress: 100, checklist: "5/5", dateCreated: "2024-01-10" },
  { id: 4, name: "Year-End Docs", account: "StartUp Inc", status: "archived", progress: 100, checklist: "15/15", dateCreated: "2023-12-01" },
  { id: 5, name: "Audit Preparation", account: "Enterprise Ltd", status: "active", progress: 50, checklist: "6/12", dateCreated: "2024-01-20" },
];

const presetOptions = [
  { value: "all", label: "All Organizers" },
  { value: "incomplete", label: "Incomplete" },
  { value: "complete", label: "Complete" },
];

const OrganizersPage = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [searchValue, setSearchValue] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("all");

  const filteredOrganizers = mockOrganizers.filter((organizer) => {
    const matchesTab = organizer.status === activeTab;
    const matchesSearch = organizer.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      organizer.account.toLowerCase().includes(searchValue.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const activeCount = mockOrganizers.filter(o => o.status === "active").length;
  const archivedCount = mockOrganizers.filter(o => o.status === "archived").length;

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <DashboardPageHeader
            title="Organizers"
            description="Manage client organizers and checklists"
            icon={<ClipboardList className="w-6 h-6" />}
          />
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Organizer
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList variant="pills">
              <TabsTrigger value="active" variant="pills">
                Active ({activeCount})
              </TabsTrigger>
              <TabsTrigger value="archived" variant="pills">
                Archived ({archivedCount})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <PageToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Search organizers..."
          presets={presetOptions}
          selectedPreset={selectedPreset}
          onPresetChange={setSelectedPreset}
          showFilter
        />

        <div className="border rounded-lg bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organizer Name</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Checklist</TableHead>
                <TableHead>Date Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrganizers.map((organizer) => (
                <TableRow key={organizer.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{organizer.name}</TableCell>
                  <TableCell>{organizer.account}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={organizer.progress} className="w-20 h-2" />
                      <span className="text-sm text-muted-foreground">{organizer.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={organizer.progress === 100 ? "default" : "secondary"}>
                      {organizer.checklist}
                    </Badge>
                  </TableCell>
                  <TableCell>{organizer.dateCreated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
  );
};

export default OrganizersPage;
