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
} from "lucide-react";

import { NavMain } from "@/components/dashboard/NavMain";
import { NavPost } from "./NavPost";
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
      url: "/dashboard/posts",
      icon: FileText,
      items: [
        { title: "Semua Postingan", url: "/dashboard/posts", icon: Newspaper },
        { title: "Galeri", url: "/dashboard/gallery", icon: GalleryHorizontal },
      ],
    },
    {
      title: "Internal Organisasi",
      url: "/dashboard/members",
      icon: Users,
      items: [
        { title: "Daftar Anggota", url: "/dashboard/members", icon: BookUser },
      ],
    },
    {
      title: "Manajemen Sosial Media",
      url: "/dashboard/sosmed",
      icon: Share2,
      items: [
        { title: "Jadwalkan Post", url: "/dashboard/sosmed/scheduler" },
        { title: "Analitik", url: "/dashboard/sosmed/analytics" },
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
  navPosts: [
    {
      name: "Pendakian Gunung Djadi",
      url: "#",
    },
    {
      name: "Purnama PA Riau 9",
      url: "#",
    },
    {
      name: "Tanaman Obat dapat membantu pencernaan",
      url: "#",
    },
    {
      name: "Korupsi dilakukan oleh DLHK Riau senilai 10M",
      url: "#",
    },
    {
      name: "Selamat Kepada 174 atas dedikasinya sebagai anggota ",
      url: "#",
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
        <NavPost posts={data.navPosts} />
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
