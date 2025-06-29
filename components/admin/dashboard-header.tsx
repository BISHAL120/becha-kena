"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardHeader() {
  return (
    <header className="w-full h-16 flex items-center justify-between gap-4 border-b bg-background px-6">
      <SidebarTrigger className="hidden md:flex border hover:text-white duration-300 transition-colors cursor-pointer" />
    </header>
  );
}
