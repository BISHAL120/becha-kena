import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import SignOut from "./signOut";
import { auth } from "@/auth";
import db from "@/prisma/db";

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
  {
    title: "Blogs",
    href: "/blogs",
  },
  {
    title: "Admin",
    href: "/admin",
  },
  {
    title: "TRAINING",
    href: "https://www.youtube.com/@bechakena",
  },
];

export async function DesktopNavigation({
  className,
  role,
}: {
  className?: string;
  role: string[] | undefined;
}) {
  const session = await auth();
  const user = session?.user;
  const AllCategories = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <NavigationMenu className={`${className} hidden md:block `}>
      <NavigationMenuList className="">
        <NavigationMenuItem className="">
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col gap-3 p-2 md:w-[100px] lg:w-[200px] lg:grid-cols-[.75fr_1fr]">
              {AllCategories.map((component) => (
                <li key={component.id}>
                  <Link
                    prefetch={true}
                    title={component.name}
                    href={`/categories/${component.id}?page=1&per_page=10&division=all`}
                    className={`flex items-center justify-between rounded-md border dark:border-muted/50 px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground`}
                  >
                    {component.name}
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="">
          <ul className="flex gap-5 text-sm font-medium">
            {Menus.map((menu) => (
              <Link
                key={menu.title}
                title={menu.title}
                href={menu.href}
                target={menu.title === "TRAINING" ? "_blank" : "_self"}
                // prefetch={preFetchedRoute.includes(menu.href)}
                prefetch={menu.title !== "TRAINING" ? true : false}
                className={` hover:border-b border-b-primary pb-0.5 ${
                  !role?.includes("ADMIN") && menu.title === "Blogs" && "hidden"
                } ${
                  !role?.includes("ADMIN") && menu.title === "Admin" && "hidden"
                }`}
              >
                {menu.title}
              </Link>
            ))}
            {user && <SignOut className="cursor-pointer" />}
          </ul>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
