import { useState, useEffect } from "react";
import { 
  Home, 
  Briefcase, 
  Users, 
  FileText, 
  MessageSquare, 
  Settings, 
  User, 
  ChevronDown,
  Receipt,
  RefreshCw,
  Clock,
  BarChart3,
  FileCheck,
  CreditCard,
  FolderOpen,
  ClipboardList,
  Activity,
  LayoutTemplate,
  GitBranch,
  FormInput,
  Tag,
  Store,
  BarChart2,
  Inbox,
  Building2,
  Contact,
  FileBarChart,
  TrendingUp,
  MessageCircle,
  Mail,
  CheckSquare,
  Repeat,
  Calendar,
  Gift,
  ShieldCheck,
  Percent,
  Link2,
  Wallet,
  Globe,
  UserPlus,
  Bell,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "@/components/NavLink";
import { useDashboardAuth } from "@/hooks/useDashboardAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ThemeToggle } from "@/components/ThemeToggle";
import zentavosLogo from "@/assets/zentavos-logo.png";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ElementType;
  badge?: number;
  isNew?: boolean;
}

const DashboardSidebar = () => {
  const { isStaff, isDirectorOrAbove } = useDashboardAuth();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = usePathname();

  // Badge counts state
  const [badgeCounts, setBadgeCounts] = useState({
    inquiries: 0,
    leads: 0,
    inbox: 35,
    communications: 15,
    tasks: 22,
  });

  // Collapsible states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    clients: false,
    reporting: false,
    workflow: false,
    documents: false,
    billing: false,
    templates: false,
    growth: false,
    settings: false,
  });

  // Fetch badge counts
  useEffect(() => {
    const fetchBadgeCounts = async () => {
      if (!isStaff()) return;

      const [inquiriesResult, leadsResult] = await Promise.all([
        supabase
          .from("service_inquiries")
          .select("*", { count: "exact", head: true })
          .eq("status", "new"),
        supabase
          .from("leads")
          .select("*", { count: "exact", head: true })
          .eq("status", "new"),
      ]);

      setBadgeCounts((prev) => ({
        ...prev,
        inquiries: inquiriesResult.count || 0,
        leads: leadsResult.count || 0,
      }));
    };

    fetchBadgeCounts();
  }, [isStaff]);

  // Check if a path is active
  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(path);
  };

  // Check if any item in a section is active
  const isSectionActive = (items: MenuItem[]) => {
    return items.some((item) => isActive(item.url));
  };

  // Toggle section
  const toggleSection = (sectionKey: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  // Menu items - TaxDome structure

  // Standalone items for authenticated users
  const insightsItem: MenuItem = { title: "Insights", url: "/dashboard/insights", icon: BarChart2 };
  const inboxItem: MenuItem = { title: "Inbox+", url: "/dashboard/inbox", icon: Inbox, badge: badgeCounts.inbox };
  const teamChatItem: MenuItem = { title: "Team chat", url: "/dashboard/team-chat", icon: MessageCircle };
  const communicationsItem: MenuItem = { title: "Communications", url: "/dashboard/communications", icon: Mail, badge: badgeCounts.communications };

  // Clients section
  const clientsItems: MenuItem[] = [
    { title: "Accounts", url: "/dashboard/clients/accounts", icon: Building2 },
    { title: "Contacts", url: "/dashboard/clients/contacts", icon: Contact },
  ];

  // Reporting section
  const reportingItems: MenuItem[] = [
    { title: "Overview", url: "/dashboard/reporting/overview", icon: BarChart2 },
    { title: "Reports", url: "/dashboard/reporting/reports", icon: FileBarChart },
    { title: "Dashboards", url: "/dashboard/reporting/dashboards", icon: LayoutTemplate },
    { title: "Report designer", url: "/dashboard/reporting/designer", icon: FormInput },
    { title: "Alerts", url: "/dashboard/reporting/alerts", icon: Bell },
    { title: "How it works", url: "/dashboard/reporting/how-it-works", icon: HelpCircle },
  ];

  // Workflow section
  const workflowItems: MenuItem[] = [
    { title: "Tasks", url: "/dashboard/workflow/tasks", icon: CheckSquare, badge: badgeCounts.tasks },
    { title: "Jobs", url: "/dashboard/workflow/jobs", icon: Briefcase },
    { title: "Job recurrences", url: "/dashboard/workflow/recurrences", icon: Repeat },
    { title: "Pipelines", url: "/dashboard/workflow/pipelines", icon: GitBranch },
    { title: "Calendar", url: "/dashboard/workflow/calendar", icon: Calendar },
  ];

  // Documents section
  const documentsItems: MenuItem[] = [
    { title: "Client Documents", url: "/dashboard/documents/clients", icon: FolderOpen },
  ];

  // Organizers standalone
  const organizersItem: MenuItem = { title: "Organizers", url: "/dashboard/documents/organizers", icon: ClipboardList };

  // Billing section
  const billingItems: MenuItem[] = [
    { title: "Invoices", url: "/dashboard/billing/invoices", icon: Receipt },
    { title: "Recurring invoices", url: "/dashboard/billing/recurring", icon: RefreshCw },
    { title: "Time entries", url: "/dashboard/billing/time-entries", icon: Clock },
    { title: "WIP", url: "/dashboard/billing/wip", icon: BarChart3 },
    { title: "Proposals & ELs", url: "/dashboard/billing/proposals", icon: FileCheck },
    { title: "Payments", url: "/dashboard/billing/payments", icon: CreditCard },
  ];

  // Activity Feed standalone
  const activityFeedItem: MenuItem = { title: "Activity feed", url: "/dashboard/activity", icon: Activity };

  // Templates section
  const templatesItems: MenuItem[] = [
    { title: "Firm templates", url: "/dashboard/templates/firm", icon: LayoutTemplate },
    { title: "Pipelines", url: "/dashboard/templates/pipelines", icon: GitBranch },
    { title: "Custom fields", url: "/dashboard/templates/custom-fields", icon: FormInput },
    { title: "Tags", url: "/dashboard/templates/tags", icon: Tag },
    { title: "Services", url: "/dashboard/templates/services", icon: Briefcase },
    { title: "Marketplace", url: "/dashboard/templates/marketplace", icon: Store },
  ];

  // Growth solutions section
  const growthItems: MenuItem[] = [
    { title: "Support plans", url: "/dashboard/growth/support-plans", icon: ShieldCheck, isNew: true },
    { title: "Insurance", url: "/dashboard/growth/insurance", icon: ShieldCheck, isNew: true },
    { title: "Perks & offers", url: "/dashboard/growth/perks", icon: Percent },
    { title: "Refer & earn", url: "/dashboard/growth/refer", icon: Gift },
  ];

  // Settings section
  const settingsItems: MenuItem[] = [
    { title: "Firm settings", url: "/dashboard/settings/firm", icon: Settings },
    { title: "Integrations", url: "/dashboard/settings/integrations", icon: Link2 },
    { title: "Team & plans", url: "/dashboard/settings/team", icon: Users },
    { title: "Firm balance", url: "/dashboard/settings/balance", icon: Wallet },
    { title: "Billing", url: "/dashboard/settings/billing", icon: CreditCard },
    { title: "Site builder", url: "/dashboard/settings/site-builder", icon: Globe },
    { title: "Client signup", url: "/dashboard/settings/client-signup", icon: UserPlus },
  ];


  // Open sections with active items
  useEffect(() => {
    const newOpenSections = { ...openSections };
    
    if (clientsItems.some((item) => isActive(item.url))) {
      newOpenSections.clients = true;
    }
    if (reportingItems.some((item) => isActive(item.url))) {
      newOpenSections.reporting = true;
    }
    if (workflowItems.some((item) => isActive(item.url))) {
      newOpenSections.workflow = true;
    }
    if (documentsItems.some((item) => isActive(item.url))) {
      newOpenSections.documents = true;
    }
    if (billingItems.some((item) => isActive(item.url))) {
      newOpenSections.billing = true;
    }
    if (templatesItems.some((item) => isActive(item.url))) {
      newOpenSections.templates = true;
    }
    if (growthItems.some((item) => isActive(item.url))) {
      newOpenSections.growth = true;
    }
    if (settingsItems.some((item) => isActive(item.url))) {
      newOpenSections.settings = true;
    }

    setOpenSections(newOpenSections);
  }, [pathname]);

  const renderMenuItem = (item: MenuItem) => (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild>
        <NavLink
          href={item.url}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors relative ${
            isActive(item.url)
              ? "bg-primary/10 text-primary font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0.5 before:h-6 before:bg-primary before:rounded-r"
              : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
          }`}
          activeClassName=""
        >
          <item.icon className="w-5 h-5 shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1">{item.title}</span>
              {item.isNew && (
                <span className="px-1.5 py-0.5 text-[10px] font-medium bg-green-500 text-white rounded">
                  New
                </span>
              )}
              {item.badge && item.badge > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              )}
            </>
          )}
          {collapsed && item.badge && item.badge > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-medium bg-primary text-primary-foreground rounded-full">
              {item.badge > 99 ? "99+" : item.badge}
            </span>
          )}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  const renderCollapsibleSection = (
    sectionKey: string,
    title: string,
    icon: React.ElementType,
    items: MenuItem[],
    sectionBadge?: number
  ) => {
    const Icon = icon;
    const isOpen = openSections[sectionKey];
    const hasActiveItem = isSectionActive(items);

    return (
      <Collapsible open={isOpen} onOpenChange={() => toggleSection(sectionKey)}>
        <CollapsibleTrigger className="w-full">
          <div
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
              hasActiveItem
                ? "text-primary font-medium"
                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
            }`}
          >
            <Icon className="w-5 h-5 shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left text-sm">{title}</span>
                {sectionBadge && sectionBadge > 0 && (
                  <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-full mr-1">
                    {sectionBadge > 99 ? "99+" : sectionBadge}
                  </span>
                )}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </>
            )}
          </div>
        </CollapsibleTrigger>
        {!collapsed && (
          <CollapsibleContent>
            <SidebarMenu className="ml-4 mt-1 border-l border-border pl-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      href={item.url}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                        isActive(item.url)
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                      }`}
                      activeClassName=""
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      <span className="flex-1">{item.title}</span>
                      {item.isNew && (
                        <span className="px-1.5 py-0.5 text-[10px] font-medium bg-green-500 text-white rounded">
                          New
                        </span>
                      )}
                      {item.badge && item.badge > 0 && (
                        <span className="flex items-center justify-center min-w-[18px] h-4 px-1 text-[10px] font-medium bg-primary text-primary-foreground rounded-full">
                          {item.badge > 99 ? "99+" : item.badge}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </CollapsibleContent>
        )}
      </Collapsible>
    );
  };

  return (
    <Sidebar
      className={`${collapsed ? "w-14" : "w-60"} border-r border-border bg-card transition-all duration-300`}
      collapsible="icon"
    >
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <img
            src={zentavosLogo}
            alt="Zentavos"
            className={`h-8 object-contain logo-dark-mode ${collapsed ? "mx-auto" : ""}`}
          />
          {!collapsed && (
            <span className="font-semibold text-lg text-foreground">Zentavos</span>
          )}
        </Link>
      </div>

      <SidebarContent className="px-2 py-4">

        {/* Insights - All authenticated users */}
        <SidebarGroup className="mt-2">
          <SidebarGroupContent>
            <SidebarMenu>
              {renderMenuItem(insightsItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Inbox+ - All authenticated users */}
        <SidebarGroup className="mt-1">
          <SidebarGroupContent>
            <SidebarMenu>
              {renderMenuItem(inboxItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Clients - Staff+ */}
        {isStaff() && (
          <SidebarGroup className="mt-1">
            <SidebarGroupContent>
              {renderCollapsibleSection("clients", "Clients", Building2, clientsItems)}
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Reporting - Staff+ */}
        {isStaff() && (
          <SidebarGroup className="mt-1">
            <SidebarGroupContent>
              {renderCollapsibleSection("reporting", "Reporting", FileBarChart, reportingItems)}
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Team chat - All authenticated users */}
        <SidebarGroup className="mt-1">
          <SidebarGroupContent>
            <SidebarMenu>
              {renderMenuItem(teamChatItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Communications - Staff+ */}
        {isStaff() && (
          <SidebarGroup className="mt-1">
            <SidebarGroupContent>
              <SidebarMenu>
                {renderMenuItem(communicationsItem)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Workflow - Staff+ */}
        {isStaff() && (
          <SidebarGroup className="mt-1">
            <SidebarGroupContent>
              {renderCollapsibleSection("workflow", "Workflow", CheckSquare, workflowItems, badgeCounts.tasks)}
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Documents - Staff+ */}
        {isStaff() && (
          <SidebarGroup className="mt-1">
            <SidebarGroupContent>
              {renderCollapsibleSection("documents", "Documents", FolderOpen, documentsItems)}
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Organizers standalone - Staff+ */}
        {isStaff() && (
          <SidebarGroup className="mt-1">
            <SidebarGroupContent>
              <SidebarMenu>
                {renderMenuItem(organizersItem)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Billing - Staff+ */}
        {isStaff() && (
          <SidebarGroup className="mt-1">
            <SidebarGroupContent>
              {renderCollapsibleSection("billing", "Billing", Receipt, billingItems)}
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Activity Feed - Staff+ */}
        {isStaff() && (
          <SidebarGroup className="mt-1">
            <SidebarGroupContent>
              <SidebarMenu>
                {renderMenuItem(activityFeedItem)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}


        {/* Templates - Director+ */}
        {isDirectorOrAbove() && (
          <SidebarGroup className="mt-1">
            <SidebarGroupContent>
              {renderCollapsibleSection("templates", "Templates", LayoutTemplate, templatesItems)}
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Growth Solutions - Director+ */}
        {isDirectorOrAbove() && (
          <SidebarGroup className="mt-1">
            <SidebarGroupContent>
              {renderCollapsibleSection("growth", "Growth solutions", Gift, growthItems)}
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Settings - Director+ */}
        {isDirectorOrAbove() && (
          <SidebarGroup className="mt-1">
            <SidebarGroupContent>
              {renderCollapsibleSection("settings", "Settings", Settings, settingsItems)}
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Account for non-directors */}
        {!isDirectorOrAbove() && (
          <SidebarGroup className="mt-4">
            {!collapsed && (
              <p className="px-3 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Account
              </p>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {renderMenuItem({ title: "Account", url: "/dashboard/account", icon: User })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border">
        <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
          <ThemeToggle />
          {!collapsed && <span className="text-sm text-muted-foreground">Theme</span>}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
