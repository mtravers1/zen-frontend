import { useState } from "react";
import { Search, Plus, ChevronDown, Clock, HelpCircle, Users, Gift, Sparkles, LogOut, User, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDashboardAuth } from "@/hooks/useDashboardAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";

const DashboardTopBar = () => {
  const { user, profile, signOut } = useDashboardAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

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
    { label: "Time entry", icon: Clock, href: "#" },
    { label: "Help", icon: HelpCircle, href: "#" },
    { label: "Community", icon: Users, href: "#" },
    { label: "Refer & earn", icon: Gift, href: "#" },
    { label: "What's new", icon: Sparkles, href: "#" },
  ];

  return (
    <header className="h-14 border-b border-border bg-card flex items-center px-4 gap-4">
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
          <DropdownMenuItem>New Client</DropdownMenuItem>
          <DropdownMenuItem>New Invoice</DropdownMenuItem>
          <DropdownMenuItem>New Document</DropdownMenuItem>
          <DropdownMenuItem>New Task</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Search Bar */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-9 bg-background border-border"
        />
      </div>

      {/* Quick Actions - Hidden on mobile */}
      <nav className="hidden lg:flex items-center gap-1">
        {quickActions.map((action) => (
          <Link
            key={action.label}
            to={action.href}
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
            <Link to="/dashboard/account" className="flex items-center gap-2 cursor-pointer">
              <User className="w-4 h-4" />
              Account Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/dashboard/settings" className="flex items-center gap-2 cursor-pointer">
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
  );
};

export default DashboardTopBar;
