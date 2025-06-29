import { auth } from "@/auth";
import BottomNavigation from "@/components/shared/bottomNavigation";
import Footer from "@/components/shared/footer";
import { MobileNavbar } from "@/components/shared/mobileNavbar";
import Navbar from "@/components/shared/navbar";
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
      <div className="min-h-[calc(100vh-120px)] md:mx-auto relative">
        <Navbar number={session && session.user.email!} user={user} />
        <MobileNavbar user={user} />
        <div className="mb-[65px] xl:max-w-[1650px] mx-auto">{children}</div>
        <BottomNavigation email={session && session.user.email!} />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
