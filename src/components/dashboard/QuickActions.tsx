import { MessageSquare, Briefcase, Users, FileText, HelpCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useDashboardAuth } from "@/hooks/useDashboardAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuickAction {
  icon: React.ElementType;
  label: string;
  href: string;
  external?: boolean;
}

const QuickActions = () => {
  const { isStaff, isManagerOrAbove } = useDashboardAuth();

  const clientActions: QuickAction[] = [
    { icon: Briefcase, label: "Browse Services", href: "/solutions" },
    { icon: MessageSquare, label: "Contact Support", href: "/contact" },
    { icon: HelpCircle, label: "Help Center", href: "#" },
  ];

  const staffActions: QuickAction[] = [
    { icon: MessageSquare, label: "View Inquiries", href: "/dashboard/inquiries" },
    { icon: FileText, label: "Manage Leads", href: "/dashboard/leads" },
  ];

  const managerActions: QuickAction[] = [
    { icon: Users, label: "Assign Services", href: "/dashboard/users" },
  ];

  const actions = [
    ...clientActions,
    ...(isStaff() ? staffActions : []),
    ...(isManagerOrAbove() ? managerActions : []),
  ];

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-2">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant="ghost"
              className="w-full justify-start h-auto py-3 px-3 hover:bg-secondary/50"
              asChild
            >
              <Link href={action.href} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <action.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="flex-1 text-left text-sm font-medium">{action.label}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
