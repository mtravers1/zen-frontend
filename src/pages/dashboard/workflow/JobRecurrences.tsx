import { useState } from "react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Repeat, Plus } from "lucide-react";
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

const JobRecurrencesPage = () => {
  const [activeTab, setActiveTab] = useState("active");

  const recurrences = [
    {
      id: 1,
      name: "Monthly Bookkeeping",
      template: "Bookkeeping Template",
      frequency: "Monthly",
      accounts: 15,
      nextRun: "2024-02-01",
      status: "active",
    },
    {
      id: 2,
      name: "Quarterly Tax Estimates",
      template: "Tax Estimate Template",
      frequency: "Quarterly",
      accounts: 42,
      nextRun: "2024-04-01",
      status: "active",
    },
    {
      id: 3,
      name: "Annual Tax Returns",
      template: "Tax Return Template",
      frequency: "Yearly",
      accounts: 156,
      nextRun: "2024-01-01",
      status: "active",
    },
    {
      id: 4,
      name: "Bi-weekly Payroll",
      template: "Payroll Template",
      frequency: "Bi-weekly",
      accounts: 23,
      nextRun: "2024-01-15",
      status: "active",
    },
    {
      id: 5,
      name: "Annual Audit",
      template: "Audit Template",
      frequency: "Yearly",
      accounts: 8,
      nextRun: "2024-06-01",
      status: "paused",
    },
  ];

  const filteredRecurrences = recurrences.filter((rec) => {
    if (activeTab === "active") return rec.status === "active";
    if (activeTab === "paused") return rec.status === "paused";
    return true;
  });

  return (
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

          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Recurrence
          </Button>
        </div>

        <PageToolbar
          onSearchChange={() => {}}
          searchPlaceholder="Search recurrences..."
          showFilter={true}
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
                    <TableCell>
                      <Badge variant="outline">{rec.frequency}</Badge>
                    </TableCell>
                    <TableCell>{rec.accounts}</TableCell>
                    <TableCell className="text-muted-foreground">{rec.nextRun}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          rec.status === "active"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-yellow-500/10 text-yellow-600"
                        }
                      >
                        {rec.status.charAt(0).toUpperCase() + rec.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
  );
};

export default JobRecurrencesPage;
