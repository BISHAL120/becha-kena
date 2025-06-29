import Link from "next/link";
import Logo from "../ui/logo";
import { DesktopNavigation } from "./desktop";
import SearchBar from "./search";
import UserButton from "./userButton";

interface NavbarProps {
  number: string | null;
  user: {
    name: string;
    email: string;
    role: string[];
  } | null;
}

const Navbar = async ({ number, user }: NavbarProps) => {
  // console.log(user);
  return (
    <div className="w-full sticky z-50 top-0 dark:bg-background bg-primary text-white">
      <div className="hidden xl:max-w-[1550px] mx-auto md:block  w-full px-3 py-6 space-y-2">
        <div className="flex justify-between items-center ">
          <Link href="/" className="flex justify-center items-center gap-1">
            <Logo />
            <h2 className="text-2xl font-bold text-slate-50">
              BECHA{" "}
              <span className="text-green-500 bg-gradient-to-r from-green-500 to-green-600 bg-clip-text">
                KENA
              </span>
            </h2>
          </Link>
          {/* Search Bar */}
          <SearchBar />
          <div className="flex justify-center items-center gap-4">
            {number ? (
              <UserButton user={user} />
            ) : (
              <Link href="/login">
                <div className="font-mono text-base font-semibold cursor-pointer flex justify-center items-center gap-2">
                  LOGIN
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="bg-[#72a3ce] dark:bg-slate-800">
        <DesktopNavigation role={user?.role} className="w-full" />
      </div>
    </div>
  );
};

export default Navbar;
