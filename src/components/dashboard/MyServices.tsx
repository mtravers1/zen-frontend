import { useEffect, useState } from "react";
import { Briefcase, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/integrations/supabase/client";
import { useDashboardAuth } from "@/hooks/useDashboardAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface UserService {
  id: string;
  status: string;
  purchased_at: string;
  expires_at: string | null;
  service: {
    id: string;
    name: string;
    short_description: string;
    category: string;
  };
}

const MyServices = () => {
  const { user } = useDashboardAuth();
  const [services, setServices] = useState<UserService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("user_services")
          .select(`
            id,
            status,
            purchased_at,
            expires_at,
            service:services(id, name, short_description, category)
          `)
          .eq("user_id", user.id)
          .order("purchased_at", { ascending: false });

        if (error) throw error;

        // Transform data to match our interface
        const transformedData = (data || []).map((item) => ({
          ...item,
          service: Array.isArray(item.service) ? item.service[0] : item.service,
        })) as UserService[];

        setServices(transformedData);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [user]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-primary/10 text-primary border-primary/30">Active</Badge>;
      case "pending":
        return <Badge className="bg-accent/10 text-accent-foreground border-accent/30">Pending</Badge>;
      case "expired":
        return <Badge variant="secondary">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <Card className="border border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Briefcase className="w-5 h-5 text-primary" />
            My Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-24 rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (services.length === 0) {
    return (
      <Card className="border border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Briefcase className="w-5 h-5 text-primary" />
            My Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              You haven't purchased any services yet.
            </p>
            <Button asChild>
              <Link to="/solutions">Browse Services</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Briefcase className="w-5 h-5 text-primary" />
          My Services
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {services.map((userService) => (
            <div
              key={userService.id}
              className="p-4 rounded-lg bg-secondary/30 border border-border hover:border-primary/30 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-foreground">
                  {userService.service?.name || "Unknown Service"}
                </h4>
                {getStatusBadge(userService.status)}
              </div>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {userService.service?.short_description}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Since {format(new Date(userService.purchased_at), "MMM d, yyyy")}
                </span>
                {userService.expires_at && (
                  <span>
                    Expires {format(new Date(userService.expires_at), "MMM d, yyyy")}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MyServices;
