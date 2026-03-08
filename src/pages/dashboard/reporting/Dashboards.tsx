import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { LayoutTemplate, Search, Plus, Star, CheckCircle, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

const DashboardsPage = () => {
  const dashboards = [
    {
      name: "Time Utilization",
      verified: true,
      tags: ["Team", "Performance"],
      author: "System",
      lastViewed: "Today",
    },
    {
      name: "Revenue Monitor",
      verified: true,
      tags: ["Revenue", "Weekly"],
      author: "System",
      lastViewed: "Yesterday",
    },
    {
      name: "Team Capacity",
      verified: true,
      tags: ["Team"],
      author: "System",
      lastViewed: "3 days ago",
    },
    {
      name: "Tasks and Jobs Assignments",
      verified: true,
      tags: ["Workflow"],
      author: "System",
      lastViewed: "1 week ago",
    },
  ];

  return (
    <>
      <div className="space-y-6">
        <DashboardPageHeader
          icon={<LayoutTemplate className="w-5 h-5 text-primary" />}
          title="Dashboards"
          description="View and manage your custom dashboards"
        />

        {/* Tabs and Actions */}
        <div className="flex items-center justify-between">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="yours">Yours</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search dashboards..." className="pl-10" />
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Dashboard
            </Button>
          </div>
        </div>

        {/* Dashboards Table */}
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
                <TableHead>Last viewed by you</TableHead>
                <TableHead className="w-12">Share</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dashboards.map((dashboard) => (
                <TableRow key={dashboard.name}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    {dashboard.verified && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{dashboard.name}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="p-0">
                      <Star className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {dashboard.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs bg-secondary rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{dashboard.author}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {dashboard.lastViewed}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="p-0">
                      <Share2 className="w-4 h-4 text-muted-foreground" />
                    </Button>
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

export default DashboardsPage;

