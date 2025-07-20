"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/utils";

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

// Definisikan tipe untuk props
type NavItem = {
  title: string;
  url?: string | null;
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
          // Cek status aktif, pastikan item.url ada sebelum membandingkan
          const isActive = item.url
            ? item.items
              ? pathname.startsWith(item.url)
              : pathname === item.url
            : false;

          const LinkOrSpan = item.url ? Link : "span";

          return (
            <Collapsible key={item.title} asChild defaultOpen={isActive}>
              <SidebarMenuItem>
                <div className="flex items-center">
                  <SidebarMenuButton
                    asChild
                    variant="default"
                    tooltip={item.title}
                    className={cn(
                      isActive &&
                        "bg-primary/30 hover:bg-primary/50 text-foreground cursor-pointer"
                    )}
                  >
                    <CollapsibleTrigger>
                      <LinkOrSpan
                        className="flex items-center justify-start gap-2"
                        href={item.url || "#"}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </LinkOrSpan>
                    </CollapsibleTrigger>
                  </SidebarMenuButton>

                  {item.items && item.items.length > 0 && (
                    <CollapsibleTrigger>
                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                        <ChevronRight className="h-4 w-4" />
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                  )}
                </div>

                {item.items && item.items.length > 0 && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => {
                        const isSubActive = pathname === subItem.url;
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              size="sm"
                              className={cn(
                                isSubActive &&
                                  "bg-muted font-semibold text-foreground"
                              )}
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
