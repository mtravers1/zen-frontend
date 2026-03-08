import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import ClientPortalLayout from "@/components/portal/ClientPortalLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Smartphone, TrendingUp, Building2, FileText, Check } from "lucide-react";
import { toast } from "sonner";

interface Service {
  id: string; name: string; category: string; short_description: string; description: string; price: number | null; price_type: string; features: any;
}

const categoryIcons: Record<string, React.ElementType> = {
  "Mobile": Smartphone, "CFO Services": TrendingUp, "Formation": Building2, "Tax": FileText,
};

const PortalShop = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("services").select("*").eq("is_active", true).order("display_order");
      setServices(data || []);

      if (user) {
        const { data: userServices } = await supabase.from("user_services").select("service_id").eq("user_id", user.id);
        setPurchasedIds((userServices || []).map(s => s.service_id));
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const categories = ["all", ...new Set(services.map(s => s.category))];

  const filtered = services.filter(s => activeTab === "all" || s.category === activeTab);

  const handlePurchase = async (service: Service) => {
    if (!user) { toast.error("Please sign in to purchase"); return; }
    const { error } = await supabase.from("service_inquiries").insert({
      name: user.email || "", email: user.email || "",
      service_id: service.id, message: `Purchase request for ${service.name}`, user_id: user.id,
    });
    if (error) { toast.error("Failed to submit request"); return; }
    toast.success(`Purchase request submitted for "${service.name}". Our team will reach out shortly!`);
  };

  return (
    <>
    <ClientPortalLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3"><ShoppingCart className="w-6 h-6 text-primary" />Purchase Services</h1>
          <p className="text-muted-foreground">Upgrade your plan or add new services to your account.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            {categories.map(c => <TabsTrigger key={c} value={c}>{c === "all" ? "All Services" : c}</TabsTrigger>)}
          </TabsList>
        </Tabs>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3].map(i => <Card key={i} className="border border-border"><CardContent className="p-6"><div className="h-40 bg-muted animate-pulse rounded" /></CardContent></Card>)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(service => {
              const Icon = categoryIcons[service.category] || FileText;
              const isPurchased = purchasedIds.includes(service.id);
              const features = Array.isArray(service.features) ? service.features : [];

              return (
                <Card key={service.id} className={`border transition-all hover:shadow-md ${isPurchased ? "border-green-500/30 bg-green-500/5" : "border-border"}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-primary/10"><Icon className="w-5 h-5 text-primary" /></div>
                      {isPurchased && <Badge className="bg-green-500/10 text-green-500"><Check className="w-3 h-3 mr-1" />Active</Badge>}
                    </div>
                    <CardTitle className="text-base mt-3">{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{service.short_description}</p>
                    {features.length > 0 && (
                      <ul className="space-y-1 mb-4">
                        {(features as string[]).slice(0, 4).map((f, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-center gap-2"><Check className="w-3 h-3 text-green-500" />{f}</li>
                        ))}
                      </ul>
                    )}
                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        {service.price ? (
                          <span className="text-lg font-bold">${service.price}<span className="text-sm font-normal text-muted-foreground">/{service.price_type === "monthly" ? "mo" : service.price_type}</span></span>
                        ) : (
                          <span className="text-sm font-medium text-muted-foreground">Custom Quote</span>
                        )}
                      </div>
                      {isPurchased ? (
                        <Button variant="outline" size="sm" disabled>Purchased</Button>
                      ) : (
                        <Button size="sm" onClick={() => handlePurchase(service)}>
                          {service.price ? "Purchase" : "Request Quote"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </ClientPortalLayout>
    </>
  );
};

export default PortalShop;
