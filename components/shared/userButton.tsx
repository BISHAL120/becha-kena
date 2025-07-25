"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { LogOutIcon, Settings, ShieldUser, UserCircle } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ToggleButton } from "./toggleButton";

interface ProfileProps {
  user: {
    name: string;
    email: string;
    role: string[];
  } | null;
}

const Profile = ({ user }: ProfileProps) => {
  return (
    <div className=" z-50">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full border border-gray-300 dark:border-white/50 font-semibold"
            >
              {user.name[0].toUpperCase()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            className="w-56 overflow-hidden rounded-xl border border-gray-200 bg-white/95 backdrop-blur-sm shadow-lg dark:bg-gray-800/95 dark:border-gray-700"
          >
            <DropdownMenuLabel className="flex justify-between items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200">
              Account Settings <ToggleButton />
            </DropdownMenuLabel>
            <Separator />
            <DropdownMenuCheckboxItem className=" text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 text-gray-600 dark:text-gray-300">
              <Link
                href="/dashboard"
                className="w-full h-full flex items-center gap-2 px-4 py-2.5"
              >
                <Settings className="w-4 h-4" />
                Dashboard
              </Link>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className=" text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 text-gray-600 dark:text-gray-300">
              <Link
                href={`/users/profile`}
                className="w-full h-full flex items-center gap-2 px-4 py-2.5"
              >
                <UserCircle className="w-4 h-4" />
                Profile
              </Link>
            </DropdownMenuCheckboxItem>

            {/* <DropdownMenuCheckboxItem className=" text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 text-gray-600 dark:text-gray-300">
              <Link
                href={`/dashboard`}
                className="w-full h-full flex items-center gap-2 px-4 py-2.5"
              >
                <ShieldCheck className="w-4 h-4" />
                Admin
              </Link>
            </DropdownMenuCheckboxItem> */}
            {user.role.includes("ADMIN") && (
              <DropdownMenuCheckboxItem className="text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 text-gray-600 dark:text-gray-300">
                <Link
                  href={`/admin`}
                  className="w-full h-full flex items-center gap-2 px-4 py-2.5"
                >
                  <ShieldUser className="w-4 h-4" />
                  Super Admin
                </Link>
              </DropdownMenuCheckboxItem>
            )}
            <Separator />
            <DropdownMenuCheckboxItem className="rounded-b-xl text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 text-gray-600 dark:text-gray-300">
              <div
                onClick={() => signOut()}
                className="w-full h-full flex items-center gap-2 px-4 py-2.5"
              >
                <LogOutIcon className="w-4 h-4" />
                Sign Out
              </div>
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href={`/login`}>Login</Link>
      )}
    </div>
  );
};

export default Profile;

{
  /* <Link href={`/dashboard`}>
  <div className="flex justify-center items-end gap-2">
    <span className="border border-gray-400 p-1 px-3 font-medium rounded-lg transition-colors duration-300 hover:bg-gray-200 hover:text-black/90 dark:hover:text-white/90 hover:border-gray-500 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-400">
      {" "}
      Dashboard
    </span>
  </div>
</Link> */
}
