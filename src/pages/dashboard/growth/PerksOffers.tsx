import { useState } from "react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { Percent, ExternalLink, Tag, Cloud, PiggyBank, Monitor, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PerksOffersPage = () => {
  const categories = [
    { id: "all", label: "All" },
    { id: "retirement", label: "Retirement" },
    { id: "cloud", label: "Cloud hosting" },
    { id: "software", label: "Software" },
    { id: "security", label: "Security" },
  ];

  const offers = [
    {
      id: 1,
      category: "retirement",
      title: "401(k) for Your Firm",
      provider: "Guideline",
      discount: "First 3 months free",
      description: "Easy 401(k) plans for small businesses with low fees and automatic payroll sync.",
      icon: PiggyBank,
    },
    {
      id: 2,
      category: "cloud",
      title: "Cloud Hosting",
      provider: "Right Networks",
      discount: "20% off first year",
      description: "Secure cloud hosting for accounting applications with 24/7 support.",
      icon: Cloud,
    },
    {
      id: 3,
      category: "software",
      title: "Practice Management",
      provider: "Partner Software",
      discount: "15% lifetime discount",
      description: "Integrated practice management tools to streamline your workflow.",
      icon: Monitor,
    },
    {
      id: 4,
      category: "security",
      title: "Cybersecurity Suite",
      provider: "CyberGuard",
      discount: "25% off annual plan",
      description: "Complete cybersecurity protection for your firm's sensitive data.",
      icon: Shield,
    },
  ];

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredOffers = activeCategory === "all" 
    ? offers 
    : offers.filter(offer => offer.category === activeCategory);

  return (
    <>
      <DashboardPageHeader
        title="Perks & offers"
        description="Exclusive discounts from trusted partners"
        icon={<Percent className="w-5 h-5 text-primary" />}
      />

      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-6">
        <TabsList>
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOffers.map((offer) => (
          <Card key={offer.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <offer.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{offer.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{offer.provider}</p>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {offer.discount}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{offer.description}</p>
              <Button variant="outline" size="sm">
                Learn More
                <ExternalLink className="w-3 h-3 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOffers.length === 0 && (
        <div className="text-center py-12">
          <Percent className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No offers found in this category.</p>
        </div>
      )}
    </>
  );
};

export default PerksOffersPage;

