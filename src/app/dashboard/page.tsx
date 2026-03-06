'use client'

import { useDashboardAuth } from "@/hooks/useDashboardAuth";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCards from "@/components/dashboard/StatsCards";
import MyServices from "@/components/dashboard/MyServices";
import AccountSummary from "@/components/dashboard/AccountSummary";
import QuickActions from "@/components/dashboard/QuickActions";
import ServiceInquiriesTable from "@/components/dashboard/ServiceInquiriesTable";
import LeadsTable from "@/components/dashboard/LeadsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock } from "lucide-react";

function ClientDashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Coming Soon</h1>
      <p className="text-muted-foreground max-w-md">
        The user dashboard is under construction.
      </p>
    </div>
  );
}

export default function Dashboard() {
  const { isStaff } = useDashboardAuth();

  if (!isStaff()) {
    return <ClientDashboard />;
  }

  return (
    <>
      <DashboardHeader />
      <StatsCards />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MyServices />
            </div>
            <div className="space-y-6">
              <AccountSummary />
              <QuickActions />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="inquiries">
          <ServiceInquiriesTable />
        </TabsContent>

        <TabsContent value="leads">
          <LeadsTable />
        </TabsContent>
      </Tabs>
    </>
  );
}