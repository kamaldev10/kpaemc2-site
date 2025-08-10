/**
 * @file app/dashboard/posts/page.tsx
 * @description Halaman manajemen postingan dengan filter dan pagination.
 */
"use client";

import { Suspense, useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Loader2,
  MoreHorizontal,
  PlusCircle,
  Pencil,
  Trash2,
} from "lucide-react";

import { type Post } from "@/types/Post";
import { type FilterState } from "@/hooks/useFilteredPosts";
import PostFilters from "@/components/shared/PostFilters";
import { Skeleton } from "@/components/ui/skeleton";

const POSTS_PER_PAGE = 10;

function DashboardPostsPageSkeleton() {
  return (
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
              Gambar
            </TableHead>
            <TableHead>Judul</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell className="hidden sm:table-cell">
                <Skeleton className="h-16 w-16 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full mt-2" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-20 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-8 w-8 rounded-md" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    // Anda bisa menambahkan skeleton untuk mobile di sini
  );
}

export default function PostsPage() {
  return (
    <Suspense fallback={<DashboardPostsPageSkeleton />}>
      <PostsPageContent />
    </Suspense>
  );
}

function PostsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const page = Number(searchParams.get("page")) || 1;

  const filters = useMemo<FilterState>(
    () => ({
      search: searchParams.get("search") || "",
      year: searchParams.get("year") || "all",
      category:
        (searchParams.get("category") as FilterState["category"]) || "all",
      featured: searchParams.get("featured") === "true",
    }),
    [searchParams]
  );

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    const params = new URLSearchParams();

    if (filters.search) params.set("search", filters.search);
    if (filters.year !== "all") params.set("year", filters.year);
    if (filters.category !== "all") params.set("category", filters.category);
    if (filters.featured) params.set("featured", "true");
    params.set("limit", String(POSTS_PER_PAGE));
    params.set("page", String(page));

    try {
      const response = await fetch(`/api/admin/posts?${params.toString()}`);
      if (!response.ok) throw new Error("Gagal mengambil data postingan");

      const data = await response.json();
      const total = Number(response.headers.get("X-Total-Count") || 0);

      setPosts(data);
      setTotalPosts(total);
    } catch (error) {
      toast.error("Gagal memuat data postingan.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [filters, page]);

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
    router.push(`/dashboard/posts?${params.toString()}`);
  };

  const handleDelete = (post: Post) => {
    toast(`Konfirmasi Penghapusan`, {
      description: `Yakin ingin menghapus postingan "${post.title}"?`,
      action: {
        label: "Hapus",
        onClick: async () => {
          try {
            const response = await fetch(`/api/admin/posts/${post.slug}`, {
              method: "DELETE",
            });
            if (!response.ok) throw new Error("Gagal menghapus.");
            toast.success(`Postingan "${post.title}" telah dihapus.`);
            fetchPosts();
          } catch (error) {
            toast.error("Gagal menghapus postingan.");
            console.log(error);
          }
        },
      },
      cancel: { label: "Batal", onClick: () => {} },
    });
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
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          Manajemen Postingan
        </h1>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/dashboard/posts/new">
            <PlusCircle className="h-4 w-4" />
            Tambah Baru
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Semua Postingan</CardTitle>
          <CardDescription>
            Ditemukan<strong> {totalPosts} </strong>postingan .
          </CardDescription>
          <PostFilters
            initialFilters={filters}
            onApplyFilters={handleApplyFilters}
            uniqueYears={["2025", "2024", "2023", "2022", "2021"]}
          />
        </CardHeader>
        <CardContent>
          <div className="hidden md:block">
            <Table className="border">
              <TableHeader className="border bg-accent ">
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Gambar</span>
                  </TableHead>
                  <TableHead>Judul</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : (
                  posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt={post.title}
                          className="aspect-square rounded-md object-cover"
                          height={32}
                          width={64}
                          src={post.imageUrl}
                        />
                      </TableCell>
                      <TableCell className="max-w-md">
                        <div className="font-semibold truncate">
                          {post.title}
                        </div>
                        <div className="text-xs text-muted-foreground line-clamp-2 text-wrap">
                          {post.excerpt}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getCategoryBadgeVariant(post.category)}>
                          {post.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(post.date)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/posts/edit/${post.slug}`}
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <Pencil className="h-4 w-4" />
                                Update
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(post)}
                              className="flex items-center gap-2 text-destructive focus:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Tampilan mobile card */}
          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {isLoading ? (
              <div className="col-span-full text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
              </div>
            ) : (
              posts.map((post) => (
                <Card key={post.id} className="w-full overflow-hidden">
                  {" "}
                  {/* 1. Kontainer gambar dibuat 'relative' */}
                  <div className="relative w-full aspect-video">
                    <Image
                      alt={post.title}
                      className="object-cover"
                      fill
                      src={post.imageUrl}
                    />
                    {/* 2. Menu Aksi diposisikan 'absolute' di pojok kanan atas */}
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Menu Aksi</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/dashboard/posts/edit/${post.slug}`}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Pencil className="h-4 w-4" />
                              <span>Update</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(post)}
                            className="flex items-center gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  {/* Konten teks di bawah gambar */}
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <Badge variant={getCategoryBadgeVariant(post.category)}>
                        {post.category}
                      </Badge>
                      <time
                        // PERBAIKAN: Konversi objek Date menjadi string ISO jika diperlukan
                        dateTime={
                          typeof post.date === "string"
                            ? post.date
                            : post.date.toISOString()
                        }
                      >
                        {formatDate(post.date)}
                      </time>
                    </div>
                    <CardTitle className="text-base line-clamp-2 leading-snug">
                      <Link
                        href={`/posts/${post.slug}`}
                        className="hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {posts.length === 0 && !isLoading && (
            <div className="text-center py-12 text-muted-foreground">
              Tidak ada postingan yang ditemukan.
            </div>
          )}
        </CardContent>

        {totalPages > 1 && (
          <CardFooter className="border-t pt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  {page > 1 ? (
                    <Link
                      href={`/dashboard/posts?${new URLSearchParams({
                        ...Object.fromEntries(searchParams),
                        page: String(page - 1),
                      })}`}
                    >
                      <PaginationPrevious />
                    </Link>
                  ) : (
                    <PaginationPrevious className="pointer-events-none opacity-50" />
                  )}
                </PaginationItem>

                <PaginationItem>
                  <span className="px-4 text-sm font-medium">
                    Halaman {page} dari {totalPages}
                  </span>
                </PaginationItem>

                <PaginationItem>
                  {page < totalPages ? (
                    <Link
                      href={`/dashboard/posts?${new URLSearchParams({
                        ...Object.fromEntries(searchParams),
                        page: String(page + 1),
                      })}`}
                      passHref
                    >
                      <PaginationNext />
                    </Link>
                  ) : (
                    <PaginationNext className="pointer-events-none opacity-50" />
                  )}
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
