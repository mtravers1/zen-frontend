import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PhoneShowcase from "@/components/PhoneShowcase";
import FeaturesSection from "@/components/FeaturesSection";
import AISection from "@/components/AISection";
import DashboardSection from "@/components/DashboardSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Add padding for fixed header (two rows: ~80px + ~48px = ~128px) */}
      <main className="pt-[128px]">
        <HeroSection />
        <PhoneShowcase />
        <FeaturesSection />
        <AISection />
        <DashboardSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
