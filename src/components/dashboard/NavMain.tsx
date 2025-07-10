"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils"; // <-- Impor 'cn' untuk kelas kondisional

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

// Definisikan tipe untuk props (tidak berubah)
type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  items?: { title: string; url: string; icon?: LucideIcon }[];
};

type NavMainProps = {
  items: NavItem[];
  label?: string;
  pathname: string;
};

export function NavMain({ items, label, pathname }: NavMainProps) {
  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => {
          const isActive = item.items
            ? pathname.startsWith(item.url) // Untuk induk: aktif jika URL dimulai dengan path-nya
            : pathname === item.url; // Untuk item tunggal: aktif jika URL sama persis

          return (
            <Collapsible key={item.title} asChild defaultOpen={isActive}>
              <SidebarMenuItem>
                <div className="flex items-center">
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={cn(
                      "flex-1 justify-start",
                      isActive && " font-semibold text-secondary-foreground" // Style untuk menu induk aktif
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>

                  {item.items && item.items.length > 0 && (
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                  )}
                </div>

                {item.items && item.items.length > 0 && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => {
                        const isSubActive = pathname === subItem.url; // Cek submenu aktif
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              size="sm"
                              className={cn(
                                isSubActive &&
                                  "bg-secondary font-semibold text-primary"
                              )} // Style untuk submenu aktif
                            >
                              <Link href={subItem.url}>
                                {subItem.icon && (
                                  <subItem.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                )}
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
