"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { PostsData } from "@/lib/dummy-data/PostsData";

// Impor komponen dari shadcn/ui
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";

const POSTS_PER_PAGE = 5;

export default function PostsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    year: "all",
    category: "all",
    featured: false,
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    setFilters({
      search: params.get("search") || "",
      year: params.get("year") || "all",
      category: params.get("category") || "all",
      featured: params.get("featured") === "true",
    });
    setPage(Number(params.get("page")) || 1);
  }, [searchParams]);

  const filteredPosts = PostsData.filter((post) => {
    const searchTags = filters.search
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean);
    const matchesTags =
      searchTags.length > 0
        ? searchTags.every((searchTag) =>
            post.tags?.some((tag) => tag.toLowerCase().includes(searchTag))
          )
        : true;
    const matchesYear =
      filters.year !== "all"
        ? new Date(post.date).getFullYear().toString() === filters.year
        : true;
    const matchesCategory =
      filters.category !== "all" ? post.category === filters.category : true;
    const matchesFeatured = filters.featured ? post.featured === true : true;
    return matchesTags && matchesYear && matchesCategory && matchesFeatured;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );
  const uniqueYears = Array.from(
    new Set(
      PostsData.map((post) => new Date(post.date).getFullYear().toString())
    )
  ).sort((a, b) => Number(b) - Number(a));

  const applyFiltersAndNavigate = (
    newFilters: typeof filters,
    newPage: number
  ) => {
    const params = new URLSearchParams();
    if (newFilters.search) params.set("search", newFilters.search);
    if (newFilters.year !== "all") params.set("year", newFilters.year);
    if (newFilters.category !== "all")
      params.set("category", newFilters.category);
    if (newFilters.featured) params.set("featured", "true");
    if (newPage > 1) params.set("page", newPage.toString());

    startTransition(() => {
      router.push(`/posts?${params.toString()}`);
    });
  };

  const handleApply = () => {
    setPage(1);
    applyFiltersAndNavigate(filters, 1);
  };

  const handleReset = () => {
    const defaultFilters = {
      search: "",
      year: "all",
      category: "all",
      featured: false,
    };
    setFilters(defaultFilters);
    setPage(1);
    router.push("/posts");
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      applyFiltersAndNavigate(filters, newPage);
    }
  };

  return (
    <section className="bg-background">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Artikel & Event
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Temukan informasi, inspirasi, dan kegiatan terbaru dari organisasi
            kami.
          </p>
        </div>

        {/* Filter Controls Desktop */}
        <div className="hidden md:flex items-center gap-2 p-3 border bg-card rounded-full shadow-sm mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari tag..."
              className="pl-10 rounded-full"
              value={filters.search}
              onChange={(e) =>
                setFilters((f) => ({ ...f, search: e.target.value }))
              }
            />
          </div>
          <Separator orientation="vertical" className="h-6" />
          <Select
            value={filters.year}
            onValueChange={(value) =>
              setFilters((f) => ({ ...f, year: value }))
            }
          >
            <SelectTrigger className="w-[150px] border-none shadow-none focus:ring-0">
              <SelectValue placeholder="Tahun" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all"> Tahun</SelectItem>
              {uniqueYears.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filters.category}
            onValueChange={(value) =>
              setFilters((f) => ({ ...f, category: value }))
            }
          >
            <SelectTrigger className="w-[150px] border-none shadow-none focus:ring-0">
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all"> Kategori</SelectItem>
              <SelectItem value="Artikel">Artikel</SelectItem>
              <SelectItem value="Event">Event</SelectItem>
            </SelectContent>
          </Select>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center space-x-2 pl-2">
            <Checkbox
              id="featured-desktop"
              checked={filters.featured}
              onCheckedChange={(checked) =>
                setFilters((f) => ({ ...f, featured: !!checked }))
              }
            />
            <Label htmlFor="featured-desktop" className="text-sm font-medium">
              Featured
            </Label>
          </div>
          <Button
            onClick={handleApply}
            className="rounded-full"
            disabled={isPending}
          >
            {isPending ? "Mencari..." : "Terapkan"}
          </Button>
          <Button
            onClick={handleReset}
            variant="ghost"
            className="rounded-full"
          >
            Reset
          </Button>
        </div>

        {/* Filter Mobile */}
        <div className="md:hidden mb-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filter Postingan
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Postingan</SheetTitle>
                <SheetDescription>Persempit pencarian Anda.</SheetDescription>
              </SheetHeader>
              {/* ======================================================== */}
              {/* BAGIAN YANG HILANG & KINI DITAMBAHKAN KEMBALI            */}
              {/* ======================================================== */}
              <div className="grid gap-6 py-6">
                <div className="space-y-2">
                  <Label htmlFor="search-tags-mobile">
                    Cari berdasarkan tag
                  </Label>
                  <Input
                    id="search-tags-mobile"
                    placeholder="teknologi, karir..."
                    value={filters.search}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, search: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year-filter-mobile">Tahun</Label>
                  <Select
                    value={filters.year}
                    onValueChange={(value) =>
                      setFilters((f) => ({ ...f, year: value }))
                    }
                  >
                    <SelectTrigger id="year-filter-mobile" className="w-full">
                      <SelectValue placeholder="Semua Tahun" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all"> Tahun</SelectItem>
                      {uniqueYears.map((y) => (
                        <SelectItem key={y} value={y}>
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category-filter-mobile">Kategori</Label>
                  <Select
                    value={filters.category}
                    onValueChange={(value) =>
                      setFilters((f) => ({ ...f, category: value }))
                    }
                  >
                    <SelectTrigger
                      id="category-filter-mobile"
                      className="w-full"
                    >
                      <SelectValue placeholder="Semua Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all"> Kategori</SelectItem>
                      <SelectItem value="Artikel">Artikel</SelectItem>
                      <SelectItem value="Event">Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="featured-mobile"
                    checked={filters.featured}
                    onCheckedChange={(checked) =>
                      setFilters((f) => ({ ...f, featured: !!checked }))
                    }
                  />
                  <Label
                    htmlFor="featured-mobile"
                    className="text-sm font-medium"
                  >
                    Hanya tampilkan yang utama
                  </Label>
                </div>
              </div>
              {/* ======================================================== */}
              <SheetFooter>
                <SheetClose asChild>
                  <Button
                    onClick={handleApply}
                    className="w-full"
                    disabled={isPending}
                  >
                    {isPending ? "Mencari..." : "Terapkan Filter"}
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Post List */}
        <div className="space-y-8">
          {paginatedPosts.map((post) => (
            <Link
              key={post.id}
              href={post.href}
              className="group grid grid-cols-1 md:grid-cols-3 gap-6 items-start rounded-xl border bg-card p-4 hover:bg-muted/50 transition-colors duration-300"
            >
              <div className="relative w-full h-48 md:h-full rounded-lg overflow-hidden md:col-span-1">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col h-full md:col-span-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <Badge
                    variant={
                      post.category === "Event" ? "default" : "secondary"
                    }
                  >
                    {post.category}
                  </Badge>
                  <span>
                    {new Date(post.date).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h2 className="font-semibold text-xl text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags?.slice(0, 4).map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Link>
          ))}
          {paginatedPosts.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">
                Tidak ada postingan yang cocok dengan filter Anda.
              </p>
              <Button variant="link" onClick={handleReset}>
                Reset filter
              </Button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page - 1);
                    }}
                    className={
                      page === 1 ? "pointer-events-none opacity-50" : undefined
                    }
                  />
                </PaginationItem>
                <PaginationItem>
                  <span className="px-4 text-sm font-medium">
                    Halaman {page} dari {totalPages}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page + 1);
                    }}
                    className={
                      page === totalPages
                        ? "pointer-events-none opacity-50"
                        : undefined
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </section>
  );
}
