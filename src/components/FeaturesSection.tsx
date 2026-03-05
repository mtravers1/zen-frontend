import {
  Wallet,
  Calculator,
  TrendingUp,
  FileText,
  Receipt,
  Users,
  Briefcase,
  DollarSign,
} from "lucide-react";
import phoneMockup from "@/assets/phone-mockup.png";

const features = [
  { icon: Wallet, title: "Digital Wallet", comingSoon: false },
  { icon: Calculator, title: "Bookkeeping, Accounting, & Taxes", comingSoon: true },
  { icon: TrendingUp, title: "Real-time Cash Flow Insights", comingSoon: false },
  { icon: FileText, title: "Real-time Financial Reports", comingSoon: false },
  { icon: Receipt, title: "Tax Liability", comingSoon: true },
  { icon: Receipt, title: "Invoicing", comingSoon: true },
  { icon: Users, title: "On-Call CFO", comingSoon: true },
  { icon: Briefcase, title: "Full Back-Office Support", comingSoon: false },
];

const FeaturesSection = () => {
  return (
    <section id="solutions" className="relative py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            The Complete{" "}
            <span className="gradient-text">Financial Tool</span>
            <br />
            You Need!
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything a Small Business Owner needs at the push of a button.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Phone Mockups */}
          <div className="flex justify-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-primary/10 rounded-full" />
              <img
                src={phoneMockup}
                alt="Zentavos Transaction List"
                className="relative w-48 md:w-56 drop-shadow-xl transform -rotate-6"
              />
            </div>
            <div className="relative mt-12">
              <div className="absolute inset-0 blur-3xl bg-accent/10 rounded-full" />
              <img
                src={phoneMockup}
                alt="Zentavos Charts"
                className="relative w-48 md:w-56 drop-shadow-xl transform rotate-6"
              />
            </div>
          </div>

          {/* Right - Features Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, comingSoon }, index) => (
              <div
                key={title}
                className="feature-card group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 text-sm">
                      {title}
                    </h3>
                    {comingSoon && (
                      <span className="badge-coming-soon">Coming Soon</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
