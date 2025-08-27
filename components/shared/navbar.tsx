import Link from "next/link";
import Logo from "../ui/logo";
import LogoText from "./logo";
import SearchBar from "./search";
import { ToggleButton } from "./toggleButton";
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
    <div className="w-full hidden md:block bg-neutral-50 dark:bg-background">
      {/* Top Section */}
      <div className="xl:max-w-[1650px] mx-auto  w-full px-3 pt-4 pb-2">
        <div className="flex justify-between items-center ">
          <Link href="/" className="flex justify-center items-center gap-1">
            <Logo />
            <LogoText />
          </Link>
          {/* Search Bar */}
          <SearchBar />
          <div className="flex justify-center items-center gap-4">
            {number ? (
              <>
                <ToggleButton />
                <UserButton user={user} />
              </>
            ) : (
              <>
                <ToggleButton />
                <Link href="/login">
                  <div className="font-mono text-base font-semibold cursor-pointer flex justify-center items-center gap-2">
                    LOGIN
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
