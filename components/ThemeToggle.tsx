"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative flex justify-center items-center">
      <MoonIcon
        className="absolute left-1 z-10 h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-400 fill-yellow-400"
        style={{ pointerEvents: "none" }}
      />
      <Switch
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <SunIcon
        className="absolute right-1 z-10 h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-yellow-400 fill-yellow-400"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}
