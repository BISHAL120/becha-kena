// import DashNav from "@/components/navbar/dashboard/dsashboardNav";

import { DashboardHeader } from "@/components/dashboard/components/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/components/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <DashboardSidebar />
          <SidebarInset className="flex-1 px-4">
            <DashboardHeader name={"Bishal"} />
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
