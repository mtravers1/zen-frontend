import { BarChart3, Target } from "lucide-react";
import laptopImage from "@/assets/laptop-mockup.png";

const DashboardSection = () => {
  const features = [
    "Cash Flow Analysis: Up-to-date Financial Reports, KPI's, Net Worth",
    "Actionable data to achieve your financial goals",
  ];

  return (
    <section className="relative py-20 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-6 h-6 text-primary" />
              <span className="text-primary font-medium">Specialized Reporting</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="gradient-text">Financial Dashboard</span>
            </h2>
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Target className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Laptop Image */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-primary/10 rounded-full" />
              <img
                src={laptopImage}
                alt="Financial Dashboard on Laptop"
                className="relative w-full max-w-lg drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
