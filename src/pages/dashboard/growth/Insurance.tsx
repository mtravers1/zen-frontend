import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { ShieldCheck, Building2, Users, Briefcase, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const InsurancePage = () => {
  const insuranceTypes = [
    {
      icon: Building2,
      title: "Professional Liability",
      description: "Protect your firm against claims of negligence, errors, and omissions.",
    },
    {
      icon: Users,
      title: "Cyber Liability",
      description: "Coverage for data breaches, cyber attacks, and digital threats.",
    },
    {
      icon: Briefcase,
      title: "Business Owner's Policy",
      description: "Comprehensive coverage combining property and liability protection.",
    },
  ];

  const audiences = [
    "Accounting firms",
    "Tax professionals",
    "Bookkeepers",
    "Financial advisors",
    "Consultants",
  ];

  return (
      <DashboardPageHeader
        title="Insurance services"
        description="Fast-track your business insurance needs"
        icon={<ShieldCheck className="w-5 h-5 text-primary" />}
      />

      <Card className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-3">
                Protect Your Firm with the Right Coverage
              </h2>
              <p className="text-muted-foreground mb-4">
                Get customized insurance solutions designed specifically for accounting 
                and tax professionals. Our partners offer competitive rates and 
                streamlined application processes.
              </p>
              <Button>
                Get a Quote
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="hidden md:block">
              <ShieldCheck className="w-24 h-24 text-primary/30" />
            </div>
          </div>
        </CardContent>
      </Card>

      <h3 className="text-lg font-semibold mb-4">Available Coverage Types</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {insuranceTypes.map((type, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="p-2 w-fit rounded-lg bg-primary/10 mb-2">
                <type.icon className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-lg">{type.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{type.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Who is this for?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {audiences.map((audience, index) => (
              <span
                key={index}
                className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-full"
              >
                {audience}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
  );
};

export default InsurancePage;
