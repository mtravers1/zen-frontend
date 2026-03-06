import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import ClientSidebar from "./ClientSidebar";
import ClientTopBar from "./ClientTopBar";

interface ClientPortalLayoutProps {
  children: ReactNode;
}

const ClientPortalLayout = ({ children }: ClientPortalLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <ClientSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <ClientTopBar />
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ClientPortalLayout;
