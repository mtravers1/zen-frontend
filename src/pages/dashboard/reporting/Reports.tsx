import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { FileBarChart, Plus, Download, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ReportsPage = () => {
  const reportCategories = [
    {
      title: "Billing Reports",
      reports: [
        { name: "Revenue Summary", lastRun: "2024-01-14", scheduled: true },
        { name: "Accounts Receivable Aging", lastRun: "2024-01-13", scheduled: true },
        { name: "Invoice Details", lastRun: "2024-01-12", scheduled: false },
        { name: "Payment History", lastRun: "2024-01-10", scheduled: false },
      ],
    },
    {
      title: "Client Reports",
      reports: [
        { name: "Client List", lastRun: "2024-01-14", scheduled: true },
        { name: "Client Activity", lastRun: "2024-01-11", scheduled: false },
        { name: "New Clients", lastRun: "2024-01-09", scheduled: true },
      ],
    },
    {
      title: "Productivity Reports",
      reports: [
        { name: "Time by Team Member", lastRun: "2024-01-14", scheduled: true },
        { name: "Utilization Report", lastRun: "2024-01-13", scheduled: true },
        { name: "Job Progress", lastRun: "2024-01-12", scheduled: false },
      ],
    },
    {
      title: "Tax Reports",
      reports: [
        { name: "Tax Return Status", lastRun: "2024-01-14", scheduled: true },
        { name: "Extension Tracking", lastRun: "2024-01-10", scheduled: false },
        { name: "E-file Status", lastRun: "2024-01-08", scheduled: false },
      ],
    },
  ];

  return (
      <div className="space-y-6">
        <DashboardPageHeader
          icon={<FileBarChart className="w-5 h-5 text-primary" />}
          title="Reports"
          description="Generate and manage business reports"
        />

        <div className="flex items-center justify-end gap-2">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Report
          </Button>
        </div>

        <div className="grid gap-6">
          {reportCategories.map((category) => (
            <Card key={category.title}>
              <CardHeader>
                <CardTitle className="text-base">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {category.reports.map((report) => (
                    <div
                      key={report.name}
                      className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileBarChart className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{report.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Last run: {report.lastRun}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {report.scheduled && (
                          <Badge variant="outline" className="text-xs">
                            Scheduled
                          </Badge>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
  );
};

export default ReportsPage;
