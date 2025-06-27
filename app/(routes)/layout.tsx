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
      name: true,
      role: true,
      image: true,
    },
  });

  return (
    <div>
      <div className="xl:max-w-[1350px] min-h-[calc(100vh-120px)] md:mx-auto relative">
        <Navbar number={session && session.user.email!} user={user} />
        <MobileNavbar user={user} />
        <div className="mb-[65px]">{children}</div>
        <BottomNavigation email={session && session.user.email!} />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
