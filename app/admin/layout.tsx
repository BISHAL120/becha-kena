import { auth } from "@/auth";
import { SidebarDemo } from "@/components/admin/aceternity Ui/merchantSidebar";
import db from "@/prisma/db";
import { redirect } from "next/navigation";

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
    <SidebarDemo>
      <div className="xl:max-w-[1350px] md:mx-auto">{children}</div>
    </SidebarDemo>
  );
};

export default Layout;
