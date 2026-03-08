import { useState } from "react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { FileBarChart, Plus, Download, Play, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import NewReportDialog from "@/components/dashboard/dialogs/NewReportDialog";
import { exportToCSV } from "@/lib/export";

const initialCategories = [
  { title: "Billing Reports", reports: [
    { name: "Revenue Summary", lastRun: "2024-01-14", scheduled: true },
    { name: "Accounts Receivable Aging", lastRun: "2024-01-13", scheduled: true },
    { name: "Invoice Details", lastRun: "2024-01-12", scheduled: false },
    { name: "Payment History", lastRun: "2024-01-10", scheduled: false },
  ]},
  { title: "Client Reports", reports: [
    { name: "Client List", lastRun: "2024-01-14", scheduled: true },
    { name: "Client Activity", lastRun: "2024-01-11", scheduled: false },
    { name: "New Clients", lastRun: "2024-01-09", scheduled: true },
  ]},
  { title: "Productivity Reports", reports: [
    { name: "Time by Team Member", lastRun: "2024-01-14", scheduled: true },
    { name: "Utilization Report", lastRun: "2024-01-13", scheduled: true },
    { name: "Job Progress", lastRun: "2024-01-12", scheduled: false },
  ]},
  { title: "Tax Reports", reports: [
    { name: "Tax Return Status", lastRun: "2024-01-14", scheduled: true },
    { name: "Extension Tracking", lastRun: "2024-01-10", scheduled: false },
    { name: "E-file Status", lastRun: "2024-01-08", scheduled: false },
  ]},
];

const ReportsPage = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const filteredCategories = categories.map(cat => ({
    ...cat,
    reports: cat.reports.filter(r => !searchValue || r.name.toLowerCase().includes(searchValue.toLowerCase())),
  })).filter(cat => cat.reports.length > 0);

  const handleExport = () => {
    const allReports = categories.flatMap(cat => cat.reports.map(r => ({ Category: cat.title, Name: r.name, "Last Run": r.lastRun, Scheduled: r.scheduled ? "Yes" : "No" })));
    exportToCSV(allReports, "reports-export");
  };

  return (
      <div className="space-y-6">
        <DashboardPageHeader icon={<FileBarChart className="w-5 h-5 text-primary" />} title="Reports" description="Generate and manage business reports" />
        <div className="flex items-center justify-between gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search reports..." className="pl-10" value={searchValue} onChange={e => setSearchValue(e.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleExport}><Download className="w-4 h-4 mr-2" />Export</Button>
            <Button onClick={() => setDialogOpen(true)}><Plus className="w-4 h-4 mr-2" />Create Report</Button>
          </div>
        </div>
        <div className="grid gap-6">
          {filteredCategories.length === 0 ? (
            <Card><CardContent className="py-12 text-center text-muted-foreground">No reports match your search.</CardContent></Card>
          ) : filteredCategories.map(cat => (
            <Card key={cat.title}>
              <CardHeader><CardTitle className="text-base">{cat.title}</CardTitle></CardHeader>
              <CardContent className="p-0"><div className="divide-y divide-border">
                {cat.reports.map(report => (
                  <div key={report.name} className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3"><FileBarChart className="w-5 h-5 text-muted-foreground" /><div><div className="font-medium">{report.name}</div><div className="text-sm text-muted-foreground">Last run: {report.lastRun}</div></div></div>
                    <div className="flex items-center gap-2">
                      {report.scheduled && <Badge variant="outline" className="text-xs">Scheduled</Badge>}
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast.success(`Running "${report.name}"...`)}><Play className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast.success(`Downloading "${report.name}"...`)}><Download className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </div></CardContent>
            </Card>
          ))}
        </div>
      </div>
      <NewReportDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={(data) => {
        setCategories(prev => prev.map(cat => cat.title === data.category ? { ...cat, reports: [...cat.reports, { name: data.name, lastRun: "-", scheduled: data.scheduled }] } : cat));
        toast.success(`Report "${data.name}" created`);
      }} />
  );
};

export default ReportsPage;
