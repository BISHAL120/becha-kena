import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ToggleButton } from "./toggleButton";
import { Separator } from "../ui/separator";
import SignOut from "./signOut";

interface MobileNavbarProps {
  user: {
    name: string;
    role: string[];
    image: string | null;
  } | null;
}

type subMenu = {
  title: string;
  href: string;
};

const Menus: { title: string; href: string; sunMenu?: subMenu[] }[] = [
  {
    title: "HOME",
    href: "/",
  },

  {
    title: "MERCHANTS",
    href: "/merchants-of-bangladesh",
  },
  {
    title: "Products",
    href: "/products",
  },
  {
    title: "SUPPORT",
    href: "/support",
  },
  /* {
    title: "Blogs",
    href: "/blogs",
  }, */
  {
    title: "TRAINING",
    href: "https://www.youtube.com/@resellkori",
  },
];

export const MobileNavbar = ({ user }: MobileNavbarProps) => {
  return (
    <div className="md:hidden w-full flex justify-between items-center px-2">
      <Link href="/" className="flex justify-center items-center gap-2">
        <Image src="/assets/logo.png" alt="Logo" width={30} height={30} />
        <h2 className="text-2xl font-bold text-gray-900">
          BECHA{" "}
          <span className="text-green-500 bg-gradient-to-r from-green-500 to-green-600 bg-clip-text">
            KENA
          </span>
        </h2>
      </Link>

      <Sheet>
        <SheetTrigger className="p-2">
          <MenuIcon size={40} className="font-bold" />
        </SheetTrigger>
        <SheetContent side={"left"} className="flex flex-col justify-between">
          <div>
            <SheetHeader>
              <SheetTitle className="flex justify-center items-center gap-4">
                <Image
                  src="/assets/logo.png"
                  alt="logo"
                  className="w-[30px] h-[30px]"
                  width={50}
                  height={50}
                />
                <h2 className="text-2xl font-semibold text-gray-900">
                  BECHA{" "}
                  <span className="text-green-500 bg-gradient-to-r from-green-500 to-green-600 bg-clip-text">
                    KENA
                  </span>
                </h2>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2 py-10">
              {Menus.map((item, idx) => (
                <Link
                  href={item.href}
                  key={idx}
                  className=" mb-2 font-semibold text-muted-foreground"
                >
                  <SheetClose className="w-full">
                    <p className="mb-3">{item.title}</p>
                    <Separator />
                  </SheetClose>
                </Link>
              ))}
              {user && (
                <div className=" w-full mb-2 font-semibold text-center text-muted-foreground flex justify-center items-center">
                  <SignOut className="cursor-pointer" />
                </div>
              )}
              {user && <Separator />}
            </div>
          </div>
          <SheetFooter className="bg-slate-50 border-t">
            <div className="w-full flex items-center justify-between ">
              <div className="">
                {user ? (
                  <div className="flex items-center gap-3">
                    <Image
                      src={user.image || "/demoImage/placeholder.svg"}
                      width={45}
                      height={30}
                      alt="Profile Image"
                      className="rounded-full "
                    />
                    <p className="text-xl font-serif text-slate-800">
                      {user.name}
                    </p>
                  </div>
                ) : (
                  <Link href={"/login"} className="text-start">
                    <SheetClose className="w-full font-semibold text-muted-foreground text-start">
                      Login/Register
                    </SheetClose>
                  </Link>
                )}
              </div>
              <div className="border flex justify-center items-center rounded-md">
                <ToggleButton />
              </div>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
