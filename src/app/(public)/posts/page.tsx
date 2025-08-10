/**
 * @file app/(public)/posts/page.tsx
 * @description Halaman publik untuk menampilkan semua postingan dengan filter dan pagination.
 */
"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

// Komponen UI
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Loader2 } from "lucide-react";

// Komponen & Tipe Kustom
import PostFilters from "@/components/shared/PostFilters";
import { type Post } from "@/types/Post";
import { type FilterState } from "@/hooks/useFilteredPosts"; // Gunakan tipe FilterState yang sudah ada
import { CardFooter } from "@/components/ui/card";
import PostsListSkeleton from "@/components/public/post/PostsListSkeleton";

const POSTS_PER_PAGE = 10;

// Komponen Wrapper untuk Suspense
export default function PostsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <PostsPageContent />
    </Suspense>
  );
}

// Komponen Inti
function PostsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const page = Number(searchParams.get("page")) || 1;
  const filters: FilterState = {
    search: searchParams.get("search") || "",
    year: searchParams.get("year") || "all",
    category:
      (searchParams.get("category") as FilterState["category"]) || "all",
    featured: searchParams.get("featured") === "true",
  };

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", String(POSTS_PER_PAGE));

    try {
      // Panggil endpoint API publik
      const response = await fetch(`/api/public/posts?${params.toString()}`);
      if (!response.ok) throw new Error("Gagal mengambil data postingan");

      const data = await response.json();
      const total = Number(response.headers.get("X-Total-Count") || 0);

      setPosts(data);
      setTotalPosts(total);
    } catch (error) {
      console.log(error);
      toast.error("Gagal memuat data postingan.");
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const handleApplyFilters = (newFilters: FilterState) => {
    const params = new URLSearchParams();
    if (newFilters.search) params.set("search", newFilters.search);
    if (newFilters.year !== "all") params.set("year", newFilters.year);
    if (newFilters.category !== "all")
      params.set("category", newFilters.category);
    if (newFilters.featured) params.set("featured", "true");
    params.set("page", "1");
    router.push(`/posts?${params.toString()}`);
  };

  const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case "Artikel":
        return "secondary";
      case "Kegiatan":
        return "default";
      case "Rilis Kegiatan":
        return "release";
      case "Kolaborasi":
        return "collaboration";
      default:
        return "secondary";
    }
  };

  return (
    <section className="bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Artikel & Event
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Temukan informasi, inspirasi, dan kegiatan terbaru dari organisasi
            kami.
          </p>
        </div>

        <PostFilters
          initialFilters={filters}
          onApplyFilters={handleApplyFilters}
          uniqueYears={["2026", "2025", "2024"]}
        />

        <div className="mt-12 min-h-[50vh]">
          {isLoading ? (
            <PostsListSkeleton />
          ) : posts.length > 0 ? (
            <div className="space-y-8 border-y py-6">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
                >
                  {/* Kolom Gambar */}
                  <div className="md:col-span-4 relative w-full overflow-hidden rounded-2xl bg-muted aspect-[16/9] shadow-md">
                    <Link href={`/posts/${post.slug}`}>
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                      />
                    </Link>
                  </div>

                  {/* Kolom Konten Teks */}
                  <div className="md:col-span-8 flex flex-col h-full">
                    <div className="flex flex-wrap items-center gap-x-4 text-xs mb-2">
                      <Badge variant={getCategoryBadgeVariant(post.category)}>
                        {post.category}
                      </Badge>
                      <time
                        dateTime={new Date(post.date).toISOString()}
                        className="text-muted-foreground"
                      >
                        {formatDate(post.date)}
                      </time>
                    </div>

                    <h2 className="text-xl font-bold leading-snug text-foreground mb-2">
                      <Link
                        href={`/posts/${post.slug}`}
                        className="hover:text-primary transition-colors duration-200"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags di bagian bawah */}
                    <div className="flex-1 flex items-end mt-4">
                      <div className="flex flex-wrap gap-2">
                        {post.tags?.slice(0, 4).map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center pt-20 text-muted-foreground">
              Tidak ada postingan yang ditemukan.
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <CardFooter className="pt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Link
                    href={`/dashboard/posts?${new URLSearchParams({
                      ...Object.fromEntries(searchParams),
                      page: String(page - 1),
                    })}`}
                    className={
                      page === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  >
                    <PaginationPrevious />
                  </Link>
                </PaginationItem>
                <PaginationItem>
                  <span className="px-4 text-sm font-medium">
                    Halaman {page} dari {totalPages}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <Link
                    href={`/dashboard/posts?${new URLSearchParams({
                      ...Object.fromEntries(searchParams),
                      page: String(page + 1),
                    })}`}
                    className={
                      page === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  >
                    <PaginationNext />
                  </Link>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        )}
      </div>
    </section>
  );
}
