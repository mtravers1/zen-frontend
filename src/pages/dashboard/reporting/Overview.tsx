import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { BarChart2, Search, Plus, Star, ChevronDown, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

const ReportingOverviewPage = () => {
  const kpiCards = [
    { title: "Weekly Paid Revenue", value: "$12,450" },
    { title: "Tasks completed weekly", value: "156" },
    { title: "Paid Revenue", value: "$84,320" },
  ];

  const sampleReports = [
    {
      name: "Client Engagement Report",
      verified: true,
      tags: ["Weekly", "Clients"],
      author: "John Smith",
      lastViewed: "2 hours ago",
    },
    {
      name: "Revenue by Service",
      verified: true,
      tags: ["Monthly", "Revenue"],
      author: "Jane Doe",
      lastViewed: "Yesterday",
    },
    {
      name: "Team Performance",
      verified: false,
      tags: ["Weekly"],
      author: "Mike Johnson",
      lastViewed: "3 days ago",
    },
  ];

  return (
    <>
      <div className="space-y-6">
        <DashboardPageHeader
          icon={<BarChart2 className="w-5 h-5 text-primary" />}
          title="Overview"
          description="Find and manage your dashboards and reports"
        />

        {/* Search and Dropdown */}
        <div className="flex items-center gap-4">
          <Select defaultValue="workflow">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="workflow">Workflow</SelectItem>
              <SelectItem value="billing">Billing</SelectItem>
              <SelectItem value="clients">Clients</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Find existing Dashboards and Reports"
              className="pl-10"
            />
          </div>
        </div>

        {/* KPI Cards */}
        <div className="flex gap-4 items-stretch">
          {kpiCards.map((kpi) => (
            <Card key={kpi.title} className="flex-1">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{kpi.title}</p>
                <p className="text-2xl font-bold mt-1">{kpi.value}</p>
              </CardContent>
            </Card>
          ))}
          <Card className="flex-1 border-dashed">
            <CardContent className="p-4 flex items-center justify-center h-full">
              <Button variant="ghost" className="text-muted-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Add KPIs to your watchlist
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
              </TabsList>
            </Tabs>
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="All Tags" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="All Authors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Authors</SelectItem>
                <SelectItem value="john">John Smith</SelectItem>
                <SelectItem value="jane">Jane Doe</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="favorites" />
            <label htmlFor="favorites" className="text-sm text-muted-foreground">
              My favorites
            </label>
          </div>
        </div>

        {/* Reports Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead className="w-12"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="w-12">
                  <Star className="w-4 h-4" />
                </TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Last viewed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleReports.map((report) => (
                <TableRow key={report.name}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    {report.verified && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="p-0">
                      <Star className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {report.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs bg-secondary rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{report.author}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {report.lastViewed}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </>
  );
};

export default ReportingOverviewPage;

