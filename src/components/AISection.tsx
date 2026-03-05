import { Bot, Brain, Users } from "lucide-react";
import aiImage from "@/assets/ai-background.jpg";

const PieChart = () => (
  <div className="flex items-center gap-8">
    {/* SVG Pie Chart */}
    <div className="relative">
      <svg viewBox="0 0 100 100" className="w-40 h-40 md:w-48 md:h-48 transform -rotate-90">
        {/* 70% slice - Primary (dark green) */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          className="stroke-primary"
          strokeWidth="20"
          strokeDasharray="175.93 251.33"
        />
        {/* 30% slice - Accent (lime) */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          className="stroke-accent"
          strokeWidth="20"
          strokeDasharray="75.4 251.33"
          strokeDashoffset="-175.93"
        />
      </svg>
    </div>

    {/* Legend */}
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="text-3xl md:text-4xl font-black text-primary">70%</div>
        <div>
          <p className="font-semibold text-foreground flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" />
            Artificial Intelligence
          </p>
          <p className="text-sm text-muted-foreground">Data and Technology</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-3xl md:text-4xl font-black text-accent">30%</div>
        <div>
          <p className="font-semibold text-foreground flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" />
            Human Intelligence
          </p>
          <p className="text-sm text-muted-foreground">Customer Service and Advice</p>
        </div>
      </div>
    </div>
  </div>
);

const AISection = () => {
  return (
    <section className="relative py-20 lg:py-32 bg-card overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-accent/20 rounded-full scale-75" />
            <img
              src={aiImage}
              alt="AI Technology"
              className="relative w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
            />
          </div>

          {/* Right Content */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Bot className="w-8 h-8 text-primary" />
              <h3 className="text-primary font-semibold text-lg">AI Automation</h3>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-foreground">Data entry automation and </span>
              <span className="gradient-text">AI predictions</span>
              <span className="text-foreground"> and projections.</span>
            </h2>
            <span className="badge-coming-soon text-sm mb-8 inline-block">Coming Soon</span>
            
            {/* Pie Chart */}
            <div className="mt-8">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
