import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const SectionTitle = ({ title, href }: { title: string; href: string }) => {
  return (
    <div className="flex justify-between items-center mb-12 py-4 border-b border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
        {title}
      </h2>
      <Link
        href={href}
        className="flex items-center px-4 py-2 text-base font-medium text-gray-600 dark:text-slate-200 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Shop More{" "}
        <ChevronRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

export default SectionTitle;
