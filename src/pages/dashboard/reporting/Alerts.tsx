import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { Bell, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AlertsPage = () => {
  return (
      <div className="space-y-6">
        <DashboardPageHeader
          icon={<Bell className="w-5 h-5 text-primary" />}
          title="Monitor subscriptions"
          description="Manage your alert subscriptions for KPIs and reports"
        />

        {/* Tabs and Search */}
        <div className="flex items-center justify-between">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="yours">Yours</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search subscriptions..." className="pl-10" />
          </div>
        </div>

        {/* Empty State */}
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="p-4 rounded-full bg-muted mb-4">
              <Bell className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No monitor subscriptions yet</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              Click the bell icon in any KPI to subscribe to alerts. 
              You'll receive notifications when the KPI reaches certain thresholds.
            </p>
          </CardContent>
        </Card>
      </div>
  );
};

export default AlertsPage;
