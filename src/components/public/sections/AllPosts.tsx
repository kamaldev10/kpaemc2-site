// src/components/public/sections/AllPosts.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PostsData } from "@/lib/dummy-data/PostsData";

const POSTS_PER_PAGE = 6; // Tampilkan 9 post per halaman (grid 2x3)

export default function AllPosts() {
  const [currentPage, setCurrentPage] = useState(1);

  // Menghitung total halaman
  const totalPages = Math.ceil(PostsData.length / POSTS_PER_PAGE);

  // Logika untuk memotong data sesuai halaman saat ini
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = PostsData.slice(startIndex, endIndex);

  // Fungsi untuk mengubah halaman
  const handlePageChange = (newPage: number) => {
    // Pastikan halaman baru berada dalam rentang yang valid
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Fungsi untuk memformat tanggal
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-screen-xl px-4 md:px-6">
        {/* Header Section */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Terbaru dari Kami
          </h2>
          <p className="mt-2 text-lg leading-8 text-muted-foreground">
            Temukan semua artikel, berita, dan pengumuman acara terbaru dari
            organisasi kami di sini.
          </p>
        </div>

        {/* Grid 2x3 untuk Postingan */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {currentPosts.map((post) => (
            <article
              key={post.id}
              className="group relative flex transform flex-col items-start transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="relative w-full overflow-hidden rounded-2xl bg-muted shadow-md aspect-[16/9]">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 w-full">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.date} className="text-muted-foreground">
                    {formatDate(post.date)}
                  </time>
                  <span
                    className={`relative z-10 rounded-full px-3 py-1 font-medium ${
                      post.category === "Event"
                        ? "bg-primary/10 text-primary"
                        : "bg-blue-100 text-blue-800" // Warna lain untuk artikel
                    }`}
                  >
                    {post.category}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-6 text-foreground group-hover:text-primary transition-colors">
                  <Link href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Komponen Pagination */}
        <div className="mt-16">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              {/* Info halaman saat ini */}
              <PaginationItem>
                <span className="px-4 text-sm font-medium">
                  Halaman {currentPage} dari {totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
}
