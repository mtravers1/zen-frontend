import { useState, useEffect } from "react";
import { Plus, ChevronDown, Clock, HelpCircle, Users, Gift, Sparkles, LogOut, User, Settings, Search,
  BarChart2, Inbox, MessageCircle, Mail, Building2, Contact, FileBarChart, LayoutTemplate, FormInput,
  CheckSquare, Briefcase, Repeat, GitBranch, Calendar, FolderOpen, ClipboardList, Receipt, RefreshCw,
  BarChart3, FileCheck, CreditCard, Activity, Tag, Store, Link2, Wallet, Globe,
  UserPlus, Bell,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDashboardAuth } from "@/hooks/useDashboardAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { toast } from "sonner";
import NewAccountDialog from "@/components/dashboard/dialogs/NewAccountDialog";
import NewInvoiceDialog from "@/components/dashboard/dialogs/NewInvoiceDialog";
import NewTaskDialog from "@/components/dashboard/dialogs/NewTaskDialog";
import UploadDocumentDialog from "@/components/dashboard/dialogs/UploadDocumentDialog";
import { useDashboardData } from "@/contexts/DashboardDataContext";

const navGroups = [
  {
    heading: "Main",
    items: [
      { label: "Insights", href: "/dashboard/insights", icon: BarChart2 },
      { label: "Inbox+", href: "/dashboard/inbox", icon: Inbox },
      { label: "Team Chat", href: "/dashboard/team-chat", icon: MessageCircle },
      { label: "Communications", href: "/dashboard/communications", icon: Mail },
      { label: "Activity Feed", href: "/dashboard/activity", icon: Activity },
    ],
  },
  {
    heading: "Clients",
    items: [
      { label: "Accounts", href: "/dashboard/clients/accounts", icon: Building2 },
      { label: "Contacts", href: "/dashboard/clients/contacts", icon: Contact },
    ],
  },
  {
    heading: "Reporting",
    items: [
      { label: "Overview", href: "/dashboard/reporting/overview", icon: BarChart2 },
      { label: "Reports", href: "/dashboard/reporting/reports", icon: FileBarChart },
      { label: "Dashboards", href: "/dashboard/reporting/dashboards", icon: LayoutTemplate },
      { label: "Report Designer", href: "/dashboard/reporting/designer", icon: FormInput },
      { label: "Alerts", href: "/dashboard/reporting/alerts", icon: Bell },
    ],
  },
  {
    heading: "Workflow",
    items: [
      { label: "Tasks", href: "/dashboard/workflow/tasks", icon: CheckSquare },
      { label: "Jobs", href: "/dashboard/workflow/jobs", icon: Briefcase },
      { label: "Job Recurrences", href: "/dashboard/workflow/recurrences", icon: Repeat },
      { label: "Pipelines", href: "/dashboard/workflow/pipelines", icon: GitBranch },
      { label: "Calendar", href: "/dashboard/workflow/calendar", icon: Calendar },
    ],
  },
  {
    heading: "Documents",
    items: [
      { label: "Client Documents", href: "/dashboard/documents/clients", icon: FolderOpen },
      { label: "Organizers", href: "/dashboard/documents/organizers", icon: ClipboardList },
    ],
  },
  {
    heading: "Billing",
    items: [
      { label: "Invoices", href: "/dashboard/billing/invoices", icon: Receipt },
      { label: "Recurring Invoices", href: "/dashboard/billing/recurring", icon: RefreshCw },
      { label: "Time Entries", href: "/dashboard/billing/time-entries", icon: Clock },
      { label: "WIP", href: "/dashboard/billing/wip", icon: BarChart3 },
      { label: "Proposals & ELs", href: "/dashboard/billing/proposals", icon: FileCheck },
      { label: "Payments", href: "/dashboard/billing/payments", icon: CreditCard },
    ],
  },
  {
    heading: "Templates",
    items: [
      { label: "Firm Templates", href: "/dashboard/templates/firm", icon: LayoutTemplate },
      { label: "Pipelines", href: "/dashboard/templates/pipelines", icon: GitBranch },
      { label: "Custom Fields", href: "/dashboard/templates/custom-fields", icon: FormInput },
      { label: "Tags", href: "/dashboard/templates/tags", icon: Tag },
      { label: "Services", href: "/dashboard/templates/services", icon: Briefcase },
      { label: "Marketplace", href: "/dashboard/templates/marketplace", icon: Store },
    ],
  },
  {
    heading: "Settings",
    items: [
      { label: "Firm Settings", href: "/dashboard/settings/firm", icon: Settings },
      { label: "Integrations", href: "/dashboard/settings/integrations", icon: Link2 },
      { label: "Team & Plans", href: "/dashboard/settings/team", icon: Users },
      { label: "Firm Balance", href: "/dashboard/settings/balance", icon: Wallet },
      { label: "Billing Settings", href: "/dashboard/settings/billing", icon: CreditCard },
      { label: "Site Builder", href: "/dashboard/settings/site-builder", icon: Globe },
      { label: "Client Signup", href: "/dashboard/settings/client-signup", icon: UserPlus },
    ],
  },
];

const DashboardTopBar = () => {
  const { user, profile, signOut } = useDashboardAuth();
  const { addAccount, addInvoice, addTask, addDocument } = useDashboardData();
  const router = useRouter();
  const [commandOpen, setCommandOpen] = useState(false);

  const [clientOpen, setClientOpen] = useState(false);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [documentOpen, setDocumentOpen] = useState(false);

  // Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.slice(0, 2).toUpperCase() || "U";
  };

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "User";

  const quickActions = [
    { label: "Time entry", icon: Clock, href: "/dashboard/billing/time-entries" },
    { label: "Help", icon: HelpCircle, href: "/dashboard/growth/support-plans" },
    { label: "Community", icon: Users, href: "/dashboard/growth/refer" },
    { label: "Refer & earn", icon: Gift, href: "/dashboard/growth/refer" },
    { label: "What's new", icon: Sparkles, href: "/dashboard/activity" },
  ];

  return (
    <>
      <header className="h-14 border-b border-border bg-card flex items-center px-4 gap-4 shrink-0">
        {/* Sidebar Trigger for mobile */}
        <SidebarTrigger className="md:hidden" />

        {/* New Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 h-9">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New</span>
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem onClick={() => setClientOpen(true)}>New Client</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setInvoiceOpen(true)}>New Invoice</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDocumentOpen(true)}>New Document</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTaskOpen(true)}>New Task</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search Bar — opens command palette */}
        <button
          onClick={() => setCommandOpen(true)}
          className="relative flex-1 max-w-md flex items-center gap-2 h-9 rounded-md border border-border bg-background px-3 text-sm text-muted-foreground hover:border-ring transition-colors"
        >
          <Search className="w-4 h-4 shrink-0" />
          <span className="flex-1 text-left">Search...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </button>

        {/* Quick Actions */}
        <nav className="hidden lg:flex items-center gap-1">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <action.icon className="w-4 h-4" />
              <span>{action.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 hover:bg-secondary/50 rounded-lg px-2 py-1.5 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:block text-sm font-medium">{displayName}</span>
              <ChevronDown className="w-3 h-3 text-muted-foreground hidden sm:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-3 py-2 border-b border-border">
              <p className="text-sm font-medium">{displayName}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/account" className="flex items-center gap-2 cursor-pointer">
                <User className="w-4 h-4" />
                Account Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings/firm" className="flex items-center gap-2 cursor-pointer">
                <Settings className="w-4 h-4" />
                Preferences
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer">
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Command Palette */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Search pages and actions..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {navGroups.map((group) => (
            <CommandGroup key={group.heading} heading={group.heading}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.href}
                  value={item.label}
                  onSelect={() => {
                    router.push(item.href);
                    setCommandOpen(false);
                  }}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>

      <NewAccountDialog open={clientOpen} onOpenChange={setClientOpen} onSubmit={(data) => {
        addAccount(data);
        toast.success(`Client "${data.name}" created`);
        router.push("/dashboard/clients/accounts");
      }} />
      <NewInvoiceDialog open={invoiceOpen} onOpenChange={setInvoiceOpen} onSubmit={(data) => {
        addInvoice(data);
        toast.success(`Invoice created for ${data.account}`);
        router.push("/dashboard/billing/invoices");
      }} />
      <NewTaskDialog open={taskOpen} onOpenChange={setTaskOpen} onSubmit={(data) => {
        addTask(data);
        toast.success(`Task "${data.name}" created`);
        router.push("/dashboard/workflow/tasks");
      }} />
      <UploadDocumentDialog open={documentOpen} onOpenChange={setDocumentOpen} onSubmit={(data) => {
        addDocument(data);
        toast.success(`Document "${data.name}" uploaded`);
        router.push("/dashboard/documents/clients");
      }} />
    </>
  );
};

export default DashboardTopBar;
