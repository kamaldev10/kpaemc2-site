"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Impor komponen UI
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

// Impor ikon dan data/komponen lain
import { MoreHorizontal, PlusCircle, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import PostFilters from "@/components/shared/PostFilters"; // Asumsi path ini benar
import { useFilteredPosts, type FilterState } from "@/hooks/useFilteredPosts";

// Komponen utama yang berisi semua logika
function PostsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Baca filter dan halaman saat ini dari URL, sediakan nilai default.
  const page = Number(searchParams.get("page")) || 1;
  const filters: FilterState = {
    search: searchParams.get("search") || "",
    year: searchParams.get("year") || "all",
    category:
      (searchParams.get("category") as FilterState["category"]) || "all",
    featured: searchParams.get("featured") === "true",
  };

  // 2. Gunakan hook kustom untuk mendapatkan data yang sudah diproses.
  const { paginatedPosts, totalPages, totalResults } = useFilteredPosts(
    filters,
    page
  );

  // 3. Fungsi untuk menangani saat filter baru diterapkan.
  const handleApplyFilters = (newFilters: FilterState) => {
    const params = new URLSearchParams();
    if (newFilters.search) params.set("search", newFilters.search);
    if (newFilters.year !== "all") params.set("year", newFilters.year);
    if (newFilters.category !== "all")
      params.set("category", newFilters.category);
    if (newFilters.featured) params.set("featured", "true");
    params.set("page", "1"); // Selalu kembali ke halaman 1 saat filter baru

    router.push(`/dashboard/posts?${params.toString()}`);
  };

  // 4. Fungsi untuk menangani perubahan halaman pagination.
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const params = new URLSearchParams(searchParams);
      params.set("page", newPage.toString());
      router.push(`/dashboard/posts?${params.toString()}`);
    }
  };

  const handleDelete = (postTitle: string) => {
    toast(`Konfirmasi Penghapusan`, {
      description: `Apakah Anda yakin ingin menghapus postingan "${postTitle}"?`,
      action: {
        label: "Hapus",
        onClick: () => toast.success(`Postingan "${postTitle}" telah dihapus.`),
      },
      cancel: { label: "Batal", onClick: () => {} },
    });
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          Manajemen Postingan
        </h1>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/dashboard/posts/new">
            <PlusCircle className="h-4 w-4" />
            Tambah Postingan
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <PostFilters
            initialFilters={filters}
            onApplyFilters={handleApplyFilters}
            className="mb-5"
          />
          <CardTitle>Daftar Semua Postingan</CardTitle>
          <CardDescription>
            Ditemukan {totalResults} postingan yang cocok dengan filter Anda.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {paginatedPosts.length > 0 ? (
            <div className="hidden md:block">
              <Table>
                <TableHeader>
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
                  {paginatedPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt={post.title}
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={post.imageUrl}
                          width="64"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold">{post.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-2">
                          {post.excerpt}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            post.category === "Event" ? "default" : "secondary"
                          }
                        >
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
                              onClick={() => handleDelete(post.title)}
                              className="flex items-center gap-2 text-destructive focus:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Tidak ada postingan yang ditemukan.
            </div>
          )}
          {/* Tampilan Kartu untuk Mobile (di bawah md)        */}
          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {paginatedPosts.map((post) => (
              <Card key={post.id} className="w-full overflow-hidden">
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
                          onClick={() => handleDelete(post.title)}
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
                    <Badge
                      variant={
                        post.category === "Event" ? "default" : "secondary"
                      }
                    >
                      {post.category}
                    </Badge>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
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
            ))}
          </div>
        </CardContent>
        {totalPages > 1 && (
          <CardFooter className="border-t pt-4">
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
                      page === 1 ? "pointer-events-none opacity-50" : ""
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
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

// Komponen Wrapper untuk Suspense agar useSearchParams tidak menyebabkan error
export default function PostsPage() {
  return (
    <Suspense fallback={<div>Memuat data...</div>}>
      <PostsPageContent />
    </Suspense>
  );
}
