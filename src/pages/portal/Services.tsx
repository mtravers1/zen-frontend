import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ClientPortalLayout from "@/components/portal/ClientPortalLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, ExternalLink } from "lucide-react";
import Link from "next/link";

interface UserService {
  id: string;
  status: string;
  purchased_at: string;
  expires_at: string | null;
  service: { name: string; category: string; short_description: string; price: number | null; price_type: string } | null;
}

const PortalServices = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<UserService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("user_services")
      .select("id, status, purchased_at, expires_at, service:services(name, category, short_description, price, price_type)")
      .eq("user_id", user.id)
      .then(({ data }) => {
        const transformed = (data || []).map((item) => ({
          ...item,
          service: Array.isArray(item.service) ? item.service[0] : item.service,
        })) as UserService[];
        setServices(transformed);
        setLoading(false);
      });
  }, [user]);

  const getStatusBadge = (s: string) => {
    switch (s) {
      case "active": return <Badge className="bg-green-500/10 text-green-500">Active</Badge>;
      case "pending": return <Badge className="bg-yellow-500/10 text-yellow-600">Pending</Badge>;
      case "expired": return <Badge className="bg-muted text-muted-foreground">Expired</Badge>;
      default: return <Badge variant="outline">{s}</Badge>;
    }
  };

  return (
    <ClientPortalLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3"><Briefcase className="w-6 h-6 text-primary" />My Services</h1>
            <p className="text-muted-foreground">View and manage your active services and subscriptions.</p>
          </div>
          <Button asChild><Link href="/portal/shop">Browse Services</Link></Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1,2].map(i => <Card key={i} className="border border-border"><CardContent className="p-6"><div className="h-24 bg-muted animate-pulse rounded" /></CardContent></Card>)}
          </div>
        ) : services.length === 0 ? (
          <Card className="border border-border">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 bg-muted rounded-full mb-4"><Briefcase className="w-12 h-12 text-muted-foreground" /></div>
              <h3 className="text-lg font-medium mb-2">No active services</h3>
              <p className="text-muted-foreground max-w-md mb-4">You haven't purchased any services yet. Browse our catalog to get started.</p>
              <Button asChild><Link href="/portal/shop">Browse Services</Link></Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map(s => (
              <Card key={s.id} className="border border-border hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{s.service?.name || "Service"}</CardTitle>
                    {getStatusBadge(s.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{s.service?.short_description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <Badge variant="outline" className="mr-2">{s.service?.category}</Badge>
                      {s.service?.price && <span className="font-medium">${s.service.price}/{s.service.price_type === "monthly" ? "mo" : s.service.price_type}</span>}
                    </div>
                    <span className="text-muted-foreground">Since {new Date(s.purchased_at).toLocaleDateString()}</span>
                  </div>
                  {s.expires_at && (
                    <p className="text-xs text-muted-foreground mt-2">Renewal: {new Date(s.expires_at).toLocaleDateString()}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ClientPortalLayout>
  );
};

export default PortalServices;
