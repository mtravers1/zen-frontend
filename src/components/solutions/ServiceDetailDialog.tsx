import { Check, Smartphone, Users, Building2, Receipt } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import type { Tables } from "@/integrations/supabase/types";

type Service = Tables<"services">;

interface ServiceDetailDialogProps {
  service: Service | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categoryIcons: Record<string, typeof Smartphone> = {
  digital: Smartphone,
  cfo: Users,
  formation: Building2,
  tax: Receipt,
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

const ServiceDetailDialog = ({ service, open, onOpenChange }: ServiceDetailDialogProps) => {
  const { user } = useAuth();

  if (!service) return null;

  const Icon = categoryIcons[service.category] || Receipt;
  const features = (service.features as string[]) || [];
  const isQuote = service.price_type === "quote" || service.price === null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-accent/10 text-accent">
              <Icon className="w-5 h-5" />
            </div>
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
          <DialogTitle className="text-2xl">{service.name}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {service.description}
          </DialogDescription>
        </DialogHeader>

        {/* Features List */}
        {features.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-foreground mb-3">What's included:</h4>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <div className="mt-6 pt-4 border-t border-border">
          {user ? (
            <Link href={`/#contact`}>
              <Button className="w-full" onClick={() => onOpenChange(false)}>
                {isQuote ? "Request Quote" : "Get Started"}
              </Button>
            </Link>
          ) : (
            <div className="space-y-2">
              <Link href="/auth">
                <Button className="w-full" onClick={() => onOpenChange(false)}>
                  {isQuote ? "Sign in to Request Quote" : "Sign in to Get Started"}
                </Button>
              </Link>
              <p className="text-xs text-center text-muted-foreground">
                Already have an account? <Link href="/auth" className="text-accent hover:underline">Sign in</Link>
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailDialog;
