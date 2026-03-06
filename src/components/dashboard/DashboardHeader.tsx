import { useDashboardAuth } from "@/hooks/useDashboardAuth";
import { formatRoleName, getHighestRole } from "@/lib/permissions";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DashboardHeader = () => {
  const { user, profile, roles } = useDashboardAuth();
  const highestRole = getHighestRole(roles);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "User";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Welcome Card */}
      <Card className="lg:col-span-2 border border-border shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-foreground">
                  {getGreeting()}, {displayName}
                </h1>
                {highestRole && (
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/30 text-xs"
                  >
                    {formatRoleName(highestRole)}
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground text-sm">
                {format(new Date(), "EEEE, MMMM d, yyyy")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support Card */}
      <Card className="border border-border shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Need help?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Get personalized support from our team
              </p>
              <Button asChild size="sm" variant="outline">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHeader;
