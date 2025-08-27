import { auth } from "@/auth";
import BottomNavigation from "@/components/shared/bottomNavigation";
import { DesktopNavigation } from "@/components/shared/desktop";
import Footer from "@/components/shared/footer";
import { MobileNavbar } from "@/components/shared/mobileNavbar";
import Navbar from "@/components/shared/navbar";
import { Separator } from "@/components/ui/separator";
import db from "@/prisma/db";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = await db.user.findUnique({
    where: {
      email: session?.user.email || "",
    },
    select: {
      email: true,
      name: true,
      role: true,
      image: true,
    },
  });

  return (
    <div>
      <div className="min-h-[calc(100vh-120px)] md:mx-auto">
        <Navbar number={session && session.user.email!} user={user} />
        {/* Bottom Section */}
        <div className=" hidden md:block sticky z-40 top-0 bg-neutral-50 dark:dark:bg-background">
          <DesktopNavigation role={user?.role} className="w-full" />
          <Separator color="neutral" />
        </div>
        <MobileNavbar user={user} />
        <div className="mb-[65px] xl:max-w-[1650px] mx-auto">{children}</div>
        <BottomNavigation />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
