import { Smartphone, Users, Building2, Receipt, Check } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Tables } from "@/integrations/supabase/types";

type Service = Tables<"services">;

interface ServiceCardProps {
  service: Service;
  onLearnMore: (service: Service) => void;
}

const categoryIcons: Record<string, typeof Smartphone> = {
  digital: Smartphone,
  cfo: Users,
  formation: Building2,
  tax: Receipt,
};

const categoryLabels: Record<string, string> = {
  digital: "Digital Tools",
  cfo: "CFO Services",
  formation: "Business Formation",
  tax: "Tax Services",
};

const formatPrice = (price: number | null, priceType: string): string => {
  if (priceType === "quote" || price === null) {
    return "Custom Quote";
  }
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
  
  if (priceType === "monthly") {
    return `${formatted}/month`;
  }
  return formatted;
};

const ServiceCard = ({ service, onLearnMore }: ServiceCardProps) => {
  const Icon = categoryIcons[service.category] || Receipt;
  const features = (service.features as string[]) || [];
  const displayFeatures = features.slice(0, 3);
  const remainingCount = features.length - 3;
  const isQuote = service.price_type === "quote" || service.price === null;

  return (
    <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 flex flex-col h-full">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-xl bg-accent/10 text-accent">
            <Icon className="w-6 h-6" />
          </div>
          <Badge 
            variant="secondary" 
            className="text-xs bg-muted/50"
          >
            {categoryLabels[service.category] || service.category}
          </Badge>
        </div>
        <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
          {service.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {service.short_description}
        </p>
      </CardHeader>

      <CardContent className="flex-grow pb-4">
        {/* Price */}
        <div className="mb-4">
          <Badge 
            variant={isQuote ? "outline" : "default"}
            className={isQuote 
              ? "border-amber-500/50 text-amber-400 bg-amber-500/10" 
              : "bg-accent/20 text-accent border-accent/30"
            }
          >
            {formatPrice(service.price, service.price_type)}
          </Badge>
        </div>

        {/* Features */}
        {displayFeatures.length > 0 && (
          <ul className="space-y-2">
            {displayFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
            {remainingCount > 0 && (
              <li className="text-sm text-accent/80 pl-6">
                + {remainingCount} more feature{remainingCount > 1 ? "s" : ""}
              </li>
            )}
          </ul>
        )}
      </CardContent>

      <CardFooter className="pt-4 border-t border-border/50">
        <Button 
          onClick={() => onLearnMore(service)}
          className="w-full"
          variant={isQuote ? "outline" : "default"}
        >
          {isQuote ? "Get Quote" : "Learn More"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
