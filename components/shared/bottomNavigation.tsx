import { Boxes, Goal, Headset, House, User } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";

const BottomNavigation = async ({ email }: { email: string | null }) => {
  return (
    <div className="md:hidden border-t flex flex-col justify-center h-[64px] bg-background fixed bottom-0 left-0 right-0 z-50">
      <div className="flex justify-center items-center gap-2 py-2">
        <Link href={"/"} className="w-full">
          <div className="flex flex-col items-center">
            <House size={18} />
            <p className="text-sm font-medium">Home</p>
          </div>
        </Link>
        <Separator orientation="vertical" />
        <Link
          prefetch={true}
          href={"/products?page=1&per_page=10&&division=all&category=all"}
          className="w-full"
        >
          <div className="flex flex-col items-center">
            <Boxes size={18} />
            <p className="text-sm font-medium">Products</p>
          </div>
        </Link>
        <Separator orientation="vertical" />
        <Link
          href={"https://www.youtube.com/@ProgrammingHeroCommunity"}
          className="w-full"
        >
          <div className="flex flex-col items-center">
            <Goal size={18} />
            <p className="text-sm font-medium">Training</p>
          </div>
        </Link>
        <Separator orientation="vertical" />
        <Link prefetch={true} href={"/support"} className="w-full">
          <div className="flex flex-col items-center">
            <Headset size={18} />
            <p className="text-sm font-medium">Support</p>
          </div>
        </Link>
        <Separator orientation="vertical" />
        <Link
          prefetch={true}
          href={email ? `/users/${email}` : "/login"}
          className="w-full"
        >
          <div className="flex flex-col items-center">
            <User size={18} />
            <p className="text-sm font-medium">Account</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;
