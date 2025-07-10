"use client";

import * as React from "react";
import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils"; // <-- Impor 'cn'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export type SecondaryNavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

// Ubah props untuk menerima pathname
type NavSecondaryProps = {
  items: SecondaryNavItem[];
  pathname: string;
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>;

export function NavSecondary({ items, pathname, ...props }: NavSecondaryProps) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  size="sm"
                  // Terapkan style aktif secara kondisional
                  className={cn(
                    isActive && "bg-secondary text-primary font-semibold"
                  )}
                >
                  <Link href={item.url}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
