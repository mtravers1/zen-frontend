import { useState } from "react";
import { Store, ExternalLink, Gift } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import PageToolbar from "@/components/dashboard/PageToolbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const mockIntegrations = [
  { id: 1, name: "QuickBooks Online", description: "Sync accounting data with QuickBooks", category: "Accounting", connected: true },
  { id: 2, name: "Stripe", description: "Accept payments via Stripe", category: "Payments", connected: true },
  { id: 3, name: "Zapier", description: "Automate workflows with 5000+ apps", category: "Automation", connected: false },
  { id: 4, name: "Google Drive", description: "Store and share documents", category: "Storage", connected: false },
  { id: 5, name: "Slack", description: "Team communication and notifications", category: "Communication", connected: true },
  { id: 6, name: "Calendly", description: "Schedule client meetings", category: "Scheduling", connected: false },
];

const mockPerks = [
  { id: 1, name: "50% off AWS Credits", description: "Get $5,000 in AWS credits for your first year", category: "Cloud" },
  { id: 2, name: "Free Zoom Pro", description: "3 months of Zoom Pro subscription", category: "Communication" },
  { id: 3, name: "HubSpot Discount", description: "25% off HubSpot CRM Pro", category: "CRM" },
];

const MarketplacePage = () => {
  const [activeTab, setActiveTab] = useState("integrations");
  const [searchValue, setSearchValue] = useState("");
  const [integrations, setIntegrations] = useState(mockIntegrations);

  const filteredIntegrations = integrations.filter((i) =>
    i.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    i.description.toLowerCase().includes(searchValue.toLowerCase())
  );

  const filteredPerks = mockPerks.filter((p) =>
    p.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    p.description.toLowerCase().includes(searchValue.toLowerCase())
  );

  const toggleConnect = (id: number, name: string) => {
    setIntegrations(prev => prev.map(i => i.id === id ? { ...i, connected: !i.connected } : i));
    const integration = integrations.find(i => i.id === id);
    toast.success(integration?.connected ? `${name} disconnected` : `${name} connected`);
  };

  return (
      <div className="space-y-6">
        <DashboardPageHeader
          title="Marketplace"
          description="Discover integrations and exclusive partner offers"
          icon={<Store className="w-6 h-6" />}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList variant="underline">
            <TabsTrigger value="integrations" variant="underline">Integrations</TabsTrigger>
            <TabsTrigger value="perks" variant="underline">
              <Gift className="w-4 h-4 mr-2" />
              Perks & Offers
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <PageToolbar
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              searchPlaceholder={activeTab === "integrations" ? "Search integrations..." : "Search perks..."}
            />
          </div>

          <TabsContent value="integrations" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredIntegrations.map((integration) => (
                <Card key={integration.id} className="hover:bg-muted/30 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{integration.name}</CardTitle>
                        <Badge variant="outline" className="mt-1">{integration.category}</Badge>
                      </div>
                      {integration.connected && (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Connected</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="mb-4">{integration.description}</CardDescription>
                    <Button variant={integration.connected ? "outline" : "default"} size="sm" className="w-full" onClick={() => toggleConnect(integration.id, integration.name)}>
                      {integration.connected ? "Disconnect" : "Connect"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="perks" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPerks.map((perk) => (
                <Card key={perk.id} className="hover:bg-muted/30 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{perk.name}</CardTitle>
                        <Badge variant="outline" className="mt-1">{perk.category}</Badge>
                      </div>
                      <Gift className="w-5 h-5 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="mb-4">{perk.description}</CardDescription>
                    <Button variant="default" size="sm" className="w-full" onClick={() => toast.success(`Claiming ${perk.name}...`)}>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Claim Offer
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
  );
};

export default MarketplacePage;
