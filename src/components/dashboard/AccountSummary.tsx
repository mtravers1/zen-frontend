import { User, Mail, Building, Phone, Calendar, Edit2 } from "lucide-react";
import Link from "next/link";
import { useDashboardAuth } from "@/hooks/useDashboardAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const AccountSummary = () => {
  const { user, profile } = useDashboardAuth();

  if (!user) return null;

  const infoItems = [
    {
      icon: Mail,
      label: "Email",
      value: user.email || "Not set",
    },
    {
      icon: Phone,
      label: "Phone",
      value: profile?.phone || "Not set",
    },
    {
      icon: Building,
      label: "Company",
      value: profile?.company_name || "Not set",
    },
    {
      icon: Calendar,
      label: "Member Since",
      value: profile?.created_at
        ? format(new Date(profile.created_at), "MMMM yyyy")
        : "Unknown",
    },
  ];

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="w-5 h-5 text-primary" />
          Account Summary
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/account" className="flex items-center gap-1">
            <Edit2 className="w-4 h-4" />
            <span className="hidden sm:inline">Edit</span>
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {infoItems.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm text-foreground truncate">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSummary;
