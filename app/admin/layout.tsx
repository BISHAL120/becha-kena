import { auth } from "@/auth";
import { AdminSidebar } from "@/components/admin/adminSidebar";
import { DashboardHeader } from "@/components/admin/dashboard-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import db from "@/prisma/db";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "E-commerce Admin Dashboard",
  description: "Multi-vendor e-commerce admin dashboard",
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  const user = session?.user.id;

  if (!user) {
    return <div>Unauthorized</div>;
  }

  const getUser = await db.user.findUnique({
    where: {
      id: user,
    },
    select: {
      role: true,
    },
  });

  if (!getUser?.role.includes("ADMIN")) {
    return redirect("/dashboard");
  }

  return (
    <div>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <AdminSidebar />
          <main className="flex-1 overflow-hidden">
            <DashboardHeader />
            <div className="max-w-[1500px] mx-auto">{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
