import { useEffect, useState } from "react";
import { Briefcase, MessageSquare, FileText, Users, CheckCircle } from "lucide-react";
import { supabase, isSupabaseReady } from "@/integrations/supabase/client";
import { useDashboardAuth } from "@/hooks/useDashboardAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  description?: string;
  loading?: boolean;
  color?: string;
}

const StatCard = ({ title, value, icon: Icon, description, loading, color = "text-primary" }: StatCardProps) => (
  <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
    <CardContent className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {loading ? (
            <Skeleton className="h-8 w-16 mt-1" />
          ) : (
            <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
          )}
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
      </div>
    </CardContent>
  </Card>
);

const StatsCards = () => {
  const { user, isStaff, isDirectorOrAbove } = useDashboardAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeServices: 0,
    pendingInquiries: 0,
    newLeads: 0,
    totalClients: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!user || !isSupabaseReady) {
        setLoading(false);
        return;
      }

      try {
        // Fetch user's active services
        const { count: servicesCount } = await supabase
          .from("user_services")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("status", "active");

        let inquiriesCount = 0;
        let leadsCount = 0;
        let clientsCount = 0;

        // Staff-only stats
        if (isStaff()) {
          const { count: pendingInquiries } = await supabase
            .from("service_inquiries")
            .select("*", { count: "exact", head: true })
            .eq("status", "new");

          const { count: newLeads } = await supabase
            .from("leads")
            .select("*", { count: "exact", head: true })
            .eq("status", "new");

          inquiriesCount = pendingInquiries || 0;
          leadsCount = newLeads || 0;
        }

        // Director-only stats
        if (isDirectorOrAbove()) {
          const { count: totalClients } = await supabase
            .from("profiles")
            .select("*", { count: "exact", head: true });

          clientsCount = totalClients || 0;
        }

        setStats({
          activeServices: servicesCount || 0,
          pendingInquiries: inquiriesCount,
          newLeads: leadsCount,
          totalClients: clientsCount,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, isStaff, isDirectorOrAbove]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Active Services"
        value={stats.activeServices}
        icon={Briefcase}
        description="Currently subscribed"
        loading={loading}
      />
      <StatCard
        title="Account Status"
        value="Active"
        icon={CheckCircle}
        description="All systems operational"
        loading={false}
        color="text-primary"
      />

      {isStaff() && (
        <>
          <StatCard
            title="Pending Inquiries"
            value={stats.pendingInquiries}
            icon={MessageSquare}
            description="Awaiting response"
            loading={loading}
            color="text-accent-foreground"
          />
          <StatCard
            title="New Leads"
            value={stats.newLeads}
            icon={FileText}
            description="This week"
            loading={loading}
          />
        </>
      )}

      {isDirectorOrAbove() && (
        <StatCard
          title="Total Clients"
          value={stats.totalClients}
          icon={Users}
          description="Registered users"
          loading={loading}
        />
      )}
    </div>
  );
};

export default StatsCards;
