"use client";

import * as React from "react";
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  GalleryHorizontal,
  Users,
  Share2,
  Settings,
  Globe,
  LifeBuoy,
  Send,
  BookUser,
  CircleAlert,
  FileChartColumn,
  Clock4,
  Mail,
  HandCoins,
} from "lucide-react";

import { NavMain } from "@/components/dashboard/NavMain";
import { NavSecondary } from "@/components/dashboard/NavSecondary";
import { NavUser } from "@/components/dashboard/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const data = {
  user: {
    name: "Ali Musthafa Kamal",
    email: "ali.kamal@example.com",
    avatar: "/images/members/ali.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Konten ",
      icon: FileText,
      items: [
        { title: "Semua Postingan", url: "/dashboard/posts", icon: Newspaper },
        { title: "Galeri", url: "/dashboard/gallery", icon: GalleryHorizontal },
      ],
    },
    {
      title: "Internal Organisasi",
      icon: Users,
      items: [
        { title: "Daftar Anggota", url: "/dashboard/members", icon: BookUser },
        {
          title: "Tentang Organisasi",
          url: "/dashboard/about",
          icon: CircleAlert,
        },
      ],
    },
    {
      title: "Sosial Media",
      icon: Share2,
      items: [
        {
          title: "Jadwalkan Post",
          url: "/dashboard/sosmed/scheduler",
          icon: Clock4,
        },
      ],
    },
    {
      title: "Administrasi",
      icon: FileChartColumn,
      items: [
        {
          title: "Pengelolaan Surat",
          url: "/dashboard/mail",
          icon: Mail,
        },
        {
          title: "pengelolaan Keuangan",
          url: "/dashboard/finance",
          icon: HandCoins,
        },
      ],
    },
  ],

  navSecondary: [
    { title: "Publik Website", url: "/", icon: Globe },
    { title: "Pengaturan", url: "/dashboard/settings", icon: Settings },

    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image
                    src="/images/logo.svg"
                    alt="Logo Organisasi"
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">
                    {process.env.NEXT_PUBLIC_ORG_NAME || "KPA EMC²"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Admin Panel
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} pathname={pathname} />
        <NavSecondary
          items={data.navSecondary}
          pathname={pathname}
          className="mt-auto"
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
