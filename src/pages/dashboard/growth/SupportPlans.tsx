import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { ShieldCheck, CheckCircle, Phone, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SupportPlansPage = () => {
  const steps = [
    {
      icon: Phone,
      title: "Schedule a call",
      description: "Book a free consultation with our support team to discuss your needs.",
    },
    {
      icon: FileText,
      title: "Choose your plan",
      description: "Select from our range of support plans tailored to your firm's size.",
    },
    {
      icon: CheckCircle,
      title: "Get started",
      description: "Enjoy priority support, training sessions, and dedicated assistance.",
    },
  ];

  return (
      <DashboardPageHeader
        title="Support plans"
        description="Get dedicated support and training for your team"
        icon={<ShieldCheck className="w-5 h-5 text-primary" />}
      />

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Premium Support for Your Firm</h2>
              <p className="text-muted-foreground max-w-2xl">
                Unlock priority access to our support team, personalized training sessions, 
                and dedicated account management. Our support plans are designed to help 
                your firm maximize efficiency and get the most out of the platform.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {steps.map((step, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {index + 1}
                </div>
                <step.icon className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-lg mt-2">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button size="lg">
          <Phone className="w-4 h-4 mr-2" />
          Schedule a Call
        </Button>
      </div>
  );
};

export default SupportPlansPage;
