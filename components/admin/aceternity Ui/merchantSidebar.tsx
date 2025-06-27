"use client";
import { ToggleButton } from "@/components/shared/toggleButton";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  BikeIcon,
  Clapperboard,
  Filter,
  HouseIcon,
  // LayoutDashboard,
  Ratio,
  // Settings,
  Settings2Icon,
  UserRoundCheck,
  Users,
} from "lucide-react";
import Link from "next/link";

export function SidebarDemo({ children }: { children: React.ReactNode }) {
  const links = [
    {
      label: "OverView",
      href: "/admin",
      icon: (
        // <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        <HouseIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Users",
      href: "#",
      icon: (
        <Users className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      subMenu: [
        {
          label: "All Users",
          href: "/admin/users/all",
        },
        {
          label: "Inactive Users",
          href: "/admin/users/inActive",
        },
        {
          label: "Merchants",
          href: "/admin/users/merchants",
        },
      ],
    },
    {
      label: "Active & Upgrade",
      href: "#",
      icon: (
        <Filter className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      subMenu: [
        {
          label: "Id Active",
          href: "/admin/settings/id-active/allActivation",
        },
        {
          label: "Merchant Upgrade",
          href: "/admin/settings/merchant-upgrade/allUpgrade",
        },
      ],
    },
    {
      label: "Id Active Pricing",
      href: "#",
      icon: (
        <UserRoundCheck className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      subMenu: [
        {
          label: "History",
          href: "/admin/settings/id-active",
        },
        {
          label: "Add new",
          href: "/admin/settings/id-active/new",
        },
      ],
    },
    {
      label: "Merchant Pricing",
      href: "#",
      icon: (
        <Settings2Icon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      subMenu: [
        {
          label: "History",
          href: "/admin/settings/merchant-upgrade",
        },
        {
          label: "Add new",
          href: "/admin/settings/merchant-upgrade/new",
        },
      ],
    },
    {
      label: "Categories",
      href: "#",
      icon: (
        <Ratio className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      subMenu: [
        {
          label: "All Categories",
          href: "/admin/categories",
        },
        {
          label: "Add Category",
          href: "/admin/categories/new",
        },
      ],
    },
    {
      label: "Partners",
      href: "/admin/partners",
      icon: (
        <BikeIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      subMenu: [
        {
          label: "All Partners",
          href: "/admin/partners",
        },
        {
          label: "Add Partners",
          href: "/admin/partners/new",
        },
      ],
    },
    {
      label: "Class",
      href: "/class",
      icon: (
        <Clapperboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  return (
    <div
      className={cn(
        "h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto overflow-auto"
      )}
    >
      <Sidebar>
        <SidebarContent className="justify-between gap-10 border-r dark:border-slate-500">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="flex items-center justify-between gap-2">
              <Link href={"/admin"} className="text-2xl font-bold">
                Becha Kena
              </Link>
              <div className="border border-gray-300 dark:border-slate-500 rounded-md">
                <ToggleButton />
              </div>
            </div>
            {/* TODO: Fix this section */}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-700"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </SidebarContent>
      </Sidebar>
      <div className="flex flex-1">
        <div className="flex-1 w-full h-full">{children}</div>
      </div>
    </div>
  );
}
