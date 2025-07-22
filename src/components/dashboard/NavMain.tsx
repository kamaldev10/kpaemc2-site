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
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

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
  // State untuk track item yang terbuka
  const [openStates, setOpenStates] = React.useState<Record<string, boolean>>(
    () =>
      items.reduce((acc, item) => {
        const isInitiallyOpen = item.url
          ? item.items
            ? pathname.startsWith(item.url)
            : pathname === item.url
          : false;
        acc[item.title] = isInitiallyOpen;
        return acc;
      }, {} as Record<string, boolean>)
  );

  const toggleOpen = (title: string) => {
    setOpenStates((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => {
          const isActive = item.url
            ? item.items
              ? pathname.startsWith(item.url)
              : pathname === item.url
            : false;

          const isOpen = openStates[item.title];
          const LinkOrSpan = item.url ? Link : "span";

          return (
            <Collapsible key={item.title} asChild open={isOpen}>
              <SidebarMenuItem>
                <div className="flex items-center w-full">
                  <SidebarMenuButton
                    asChild
                    variant="default"
                    tooltip={item.title}
                    className={cn(
                      "transition-all duration-300 ease-in-out w-full",
                      isActive
                        ? "bg-primary/30 hover:bg-primary/50 text-foreground"
                        : "hover:bg-muted text-muted-foreground"
                    )}
                  >
                    <CollapsibleTrigger
                      onClick={() => toggleOpen(item.title)}
                      className="flex justify-between items-center w-full"
                    >
                      <LinkOrSpan
                        className="flex items-center justify-start gap-2"
                        href={item.url || "#"}
                      >
                        <item.icon
                          className={cn(
                            "h-4 w-4 transition-colors duration-300",
                            isActive ? "text-primary" : "text-muted-foreground"
                          )}
                        />
                        <span>{item.title}</span>
                      </LinkOrSpan>
                      {item.items && (
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 ml-auto transition-transform duration-300",
                            isOpen && "rotate-90"
                          )}
                        />
                      )}
                    </CollapsibleTrigger>
                  </SidebarMenuButton>
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
