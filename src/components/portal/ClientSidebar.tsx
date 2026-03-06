'use client'

import {
  Home, Briefcase, FolderOpen, MessageCircle, GitBranch,
  ShoppingCart, Bell, User, CreditCard, GraduationCap, Library,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import zentavosLogo from "@/assets/zentavos-logo.png";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ElementType;
  badge?: number;
}

const ClientSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/portal") return pathname === "/portal";
    return pathname.startsWith(path);
  };

  const menuItems: MenuItem[] = [
    { title: "Overview", url: "/portal", icon: Home },
    { title: "My Services", url: "/portal/services", icon: Briefcase },
    { title: "Workflow Status", url: "/portal/workflow", icon: GitBranch },
    { title: "Documents", url: "/portal/documents", icon: FolderOpen },
    { title: "Invoices & Payments", url: "/portal/billing", icon: CreditCard },
    { title: "Messages", url: "/portal/messages", icon: MessageCircle, badge: 2 },
    { title: "Notifications", url: "/portal/notifications", icon: Bell, badge: 5 },
    { title: "Training", url: "/portal/training", icon: GraduationCap },
    { title: "Resources", url: "/portal/resources", icon: Library },
    { title: "Purchase Services", url: "/portal/shop", icon: ShoppingCart },
    { title: "My Account", url: "/portal/account", icon: User },
  ];

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
              {item.badge && item.badge > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                  {item.badge}
                </span>
              )}
            </>
          )}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar
      className={`${collapsed ? "w-14" : "w-60"} border-r border-border bg-card transition-all duration-300`}
      collapsible="icon"
    >
      <div className="p-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <img src={zentavosLogo as any} alt="Zentavos" className={`h-8 object-contain logo-dark-mode ${collapsed ? "mx-auto" : ""}`} />
          {!collapsed && <span className="font-semibold text-lg text-foreground">Zentavos</span>}
        </Link>
      </div>

      <SidebarContent className="px-2 py-4">
        {!collapsed && (
          <div className="px-3 py-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Client Portal</span>
          </div>
        )}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map(renderMenuItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ClientSidebar;
