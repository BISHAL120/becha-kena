"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export function ToggleButton() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative overflow-hidden"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{
          y: theme === "light" ? 0 : -20,
          opacity: theme === "light" ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{
          y: theme === "dark" ? 0 : 20,
          opacity: theme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      </motion.div>

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
