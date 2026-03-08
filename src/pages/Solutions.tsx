import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SolutionsHero from "@/components/solutions/SolutionsHero";
import CategoryTabs from "@/components/solutions/CategoryTabs";
import ServiceCard from "@/components/solutions/ServiceCard";
import ServiceDetailDialog from "@/components/solutions/ServiceDetailDialog";
import SolutionsCTA from "@/components/solutions/SolutionsCTA";
import { Skeleton } from "@/components/ui/skeleton";
import type { Tables } from "@/integrations/supabase/types";

type Service = Tables<"services">;

const Solutions = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: services, isLoading, error } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data as Service[];
    },
  });

  const filteredServices = useMemo(() => {
    if (!services) return [];
    if (activeCategory === "all") return services;
    return services.filter((service) => service.category === activeCategory);
  }, [services, activeCategory]);

  const handleLearnMore = (service: Service) => {
    setSelectedService(service);
    setDialogOpen(true);
  };

  return (
    <>
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <SolutionsHero />

        {/* Category Filters */}
        <section className="py-8 border-b border-border/50">
          <div className="container mx-auto px-4 lg:px-8">
            <CategoryTabs 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory} 
            />
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-4 p-6 rounded-lg border border-border/50 bg-card/50">
                    <Skeleton className="h-12 w-12 rounded-xl" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="pt-4 space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                    <Skeleton className="h-10 w-full mt-4" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Unable to load services. Please try again later.
                </p>
              </div>
            ) : filteredServices.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No services available in this category yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onLearnMore={handleLearnMore}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <SolutionsCTA />
      </main>

      <Footer />

      <ServiceDetailDialog
        service={selectedService}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
    </>
  );
};

export default Solutions;
