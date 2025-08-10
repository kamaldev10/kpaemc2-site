"use client";

import React, { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const pathNameMapping: { [key: string]: string } = {
  dashboard: "Dashboard",
  new: "Tambah Baru",
  edit: "Update",
  posts: "Konten",
  gallery: "Galeri",
  members: "Anggota",
  settings: "Pengaturan",
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function AppBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return null;
  }

  return (
    <Breadcrumb className="hidden md:block">
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;
          const segmentName = pathNameMapping[segment] || capitalize(segment);

          const isClickable = !isLast && segment !== "edit";

          return (
            <Fragment key={href}>
              <BreadcrumbItem>
                {isClickable ? (
                  // Item bisa diklik jika BUKAN terakhir DAN BUKAN 'edit'
                  <BreadcrumbLink asChild>
                    <Link href={href}>{segmentName}</Link>
                  </BreadcrumbLink>
                ) : (
                  // Item terakhir atau item 'edit' tidak bisa diklik
                  <BreadcrumbPage>{segmentName}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {/* Tambahkan pemisah jika bukan item terakhir */}
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
