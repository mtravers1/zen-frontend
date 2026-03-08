import { ReactNode } from "react";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopBar from "./DashboardTopBar";
import { DashboardDataProvider } from "@/contexts/DashboardDataContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardContent = ({ children }: { children: ReactNode }) => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <div
      className="flex flex-col h-screen transition-all duration-300"
      style={{ marginLeft: collapsed ? "3.5rem" : "15rem" }}
    >
      <DashboardTopBar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <DashboardDataProvider>
      <SidebarProvider>
        <div className="h-screen overflow-hidden w-full bg-background">
          <DashboardSidebar />
          <DashboardContent>{children}</DashboardContent>
        </div>
      </SidebarProvider>
    </DashboardDataProvider>
  );
};

export default DashboardLayout;
