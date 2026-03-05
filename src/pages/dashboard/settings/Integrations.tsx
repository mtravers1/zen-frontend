import { useState } from "react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { Link2, CreditCard, Database, Zap, ExternalLink, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const IntegrationsPage = () => {
  const [activeTab, setActiveTab] = useState("payments");

  const integrations = {
    payments: [
      {
        name: "Stripe",
        description: "Accept credit cards and ACH payments with industry-leading security.",
        connected: true,
        logo: "💳",
      },
      {
        name: "CPACharge",
        description: "Payment processing designed specifically for accounting professionals.",
        connected: false,
        logo: "💰",
      },
      {
        name: "PayPal",
        description: "Let clients pay with PayPal balance, cards, or bank accounts.",
        connected: false,
        logo: "🅿️",
      },
    ],
    accounting: [
      {
        name: "QuickBooks Online",
        description: "Sync invoices, payments, and client data with QuickBooks.",
        connected: false,
        logo: "📊",
      },
      {
        name: "Xero",
        description: "Two-way sync with Xero for seamless accounting integration.",
        connected: false,
        logo: "📈",
      },
    ],
    automation: [
      {
        name: "Zapier",
        description: "Connect to 5,000+ apps and automate your workflows.",
        connected: true,
        logo: "⚡",
      },
      {
        name: "Make (Integromat)",
        description: "Build complex automations with visual workflow builder.",
        connected: false,
        logo: "🔗",
      },
    ],
    storage: [
      {
        name: "Google Drive",
        description: "Store and sync client documents with Google Drive.",
        connected: true,
        logo: "📁",
      },
      {
        name: "Dropbox",
        description: "Connect Dropbox for seamless file management.",
        connected: false,
        logo: "📦",
      },
      {
        name: "OneDrive",
        description: "Microsoft OneDrive integration for document storage.",
        connected: false,
        logo: "☁️",
      },
    ],
  };

  const tabs = [
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "accounting", label: "Accounting", icon: Database },
    { id: "automation", label: "Automation", icon: Zap },
    { id: "storage", label: "Storage", icon: Link2 },
  ];

  return (
      <DashboardPageHeader
        title="Integrations"
        description="Connect your favorite tools and services"
        icon={<Link2 className="w-5 h-5 text-primary" />}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(integrations).map(([category, items]) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((integration) => (
                <Card key={integration.name} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{integration.logo}</span>
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          {integration.connected && (
                            <Badge variant="secondary" className="mt-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              <Check className="w-3 h-3 mr-1" />
                              Connected
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {integration.description}
                    </p>
                    {integration.connected ? (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Settings
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                          <X className="w-3 h-3 mr-1" />
                          Disconnect
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm">
                        Connect
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
  );
};

export default IntegrationsPage;
