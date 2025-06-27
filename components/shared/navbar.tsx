import Link from "next/link";
import Logo from "../ui/logo";
import { Separator } from "../ui/separator";
import { DesktopNavigation } from "./desktop";
import SearchBar from "./search";
import { ToggleButton } from "./toggleButton";
import UserButton from "./userButton";

interface NavbarProps {
  number: string | null;
  user: {
    name: string;
    role: string[];
  } | null;
}

const Navbar = async ({ number, user }: NavbarProps) => {
  return (
    <div className="sticky z-50 top-0 bg-neutral-50 dark:bg-background pb-1 ">
      <div className="hidden md:block pt-5 w-full px-3 py-2 pb-3 space-y-2">
        <div className="flex justify-between items-center ">
          <Link href="/" className="flex justify-center items-center gap-1">
            <Logo />
            <h2 className="text-2xl font-bold text-gray-900">
              BECHA{" "}
              <span className="text-green-500 bg-gradient-to-r from-green-500 to-green-600 bg-clip-text">
                KENA
              </span>
            </h2>
          </Link>
          {/* Search Bar */}
          <SearchBar />
          <div className="flex justify-center items-center gap-4">
            <ToggleButton />

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
        <div className="">
          <DesktopNavigation role={user?.role} className="w-full" />
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default Navbar;
