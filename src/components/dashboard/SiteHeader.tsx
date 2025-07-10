"use client";

import { SidebarIcon } from "lucide-react";

import { SearchForm } from "@/components/dashboard/SearchForm";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import SwitchThemeToggle from "../shared/SwitchThemeToggle";
import { useTheme } from "next-themes";
import { AppBreadcrumb } from "./AppBreadcrumb";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();

  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
  };

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <AppBreadcrumb />
        <SearchForm className="w-full sm:ml-auto sm:w-auto" />
        <Separator orientation="vertical" className="mx-2 h-4" />
        <SwitchThemeToggle
          onThemeChange={handleThemeChange}
          initialTheme={theme as "light" | "dark"}
        />{" "}
      </div>
    </header>
  );
}
