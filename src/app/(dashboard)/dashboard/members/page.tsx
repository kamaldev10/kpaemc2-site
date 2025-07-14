"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

// Komponen UI
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  MoreHorizontal,
  PlusCircle,
  Pencil,
  Trash2,
  ArrowUpDown,
} from "lucide-react";
import { toast } from "sonner";

// Komponen & Data
import ExportMembersButton from "@/components/dashboard/members/ExportMembersButton";
import ImportMembersDialog from "@/components/dashboard/members/ImportMembersDialog";
import MemberForm from "@/components/dashboard/members/MemberForm";
import { type Member } from "@/types/Member"; // Disarankan memindah tipe ke folder terpusat

const MEMBERS_PER_PAGE = 20;
type SortableKey = "name" | "nomorAnggota" | "jurusan" | "status";

export default function MembersManagementPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State untuk UI
  const [members, setMembers] = useState<Member[]>([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | undefined>(
    undefined
  );

  // Baca state dari URL
  const currentPage = Number(searchParams.get("page")) || 1;
  const sortKey = (searchParams.get("sort") as SortableKey) || "nomorAnggota";
  const sortDir = (searchParams.get("dir") as "asc" | "desc") || "asc";

  const totalPages = Math.ceil(totalMembers / MEMBERS_PER_PAGE);

  const fetchMembers = useCallback(async () => {
    setIsLoading(true);
    const params = new URLSearchParams({
      page: String(currentPage),
      limit: String(MEMBERS_PER_PAGE),
      sort: sortKey,
      dir: sortDir,
    });

    try {
      const response = await fetch(`/api/admin/members?${params.toString()}`);
      if (!response.ok) throw new Error("Gagal mengambil data anggota");
      const data = await response.json();
      const total = Number(response.headers.get("X-Total-Count"));
      setMembers(data);
      setTotalMembers(total);
    } catch (error) {
      toast.error("Gagal memuat data anggota.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, sortKey, sortDir]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const updateUrlParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => params.set(key, value));
    router.push(`/dashboard/members?${params.toString()}`);
  };

  const handleSortChange = (key: SortableKey) => {
    const direction = sortKey === key && sortDir === "asc" ? "desc" : "asc";
    updateUrlParams({ sort: key, dir: direction, page: "1" });
  };

  const handleOpenForm = (member?: Member) => {
    setSelectedMember(member);
    setIsFormOpen(true);
  };
  const handleFormSuccess = () => {
    setIsFormOpen(false);
    fetchMembers();
    toast.success("Data anggota berhasil disimpan!");
  };

  const handleDelete = (member: Member) => {
    toast(`Konfirmasi Penghapusan`, {
      description: `Apakah Anda yakin ingin menghapus anggota "${member.name}"?`,
      action: {
        label: "Hapus",
        onClick: async () => {
          try {
            const response = await fetch(`/api/admin/members/${member.id}`, {
              method: "DELETE",
            });
            if (!response.ok) throw new Error("Gagal menghapus anggota.");
            toast.success(`Anggota "${member.name}" telah dihapus.`);
            fetchMembers(); // Muat ulang data setelah sukses
          } catch (error) {
            toast.error("Gagal menghapus anggota.");
            console.log(error);
          }
        },
      },
      // PERBAIKAN 3: Tambahkan onClick kosong pada cancel
      cancel: { label: "Batal", onClick: () => {} },
    });
  };

  // Fungsi getStatusVariant diperbarui untuk menangani status opsional
  const getStatusVariant = (status?: "Aktif" | "Alumni" | "Non-aktif") => {
    switch (status) {
      case "Aktif":
        return "default";
      case "Alumni":
        return "outline";
      case "Non-aktif":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl">
            Manajemen Anggota
          </h1>
          <p className="text-sm text-muted-foreground">
            Kelola semua data anggota organisasi Anda.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ImportMembersDialog />
          <ExportMembersButton data={members} />
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="gap-1"
                onClick={() => handleOpenForm()}
              >
                <PlusCircle className="h-4 w-4" />
                Tambah Anggota
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {selectedMember ? "Edit Anggota" : "Tambah Anggota Baru"}
                </DialogTitle>
              </DialogHeader>
              <MemberForm
                initialData={selectedMember}
                onSuccess={handleFormSuccess}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Daftar Anggota</CardTitle>
            <CardDescription>
              Menampilkan {members.length} dari {totalMembers} total anggota.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Urutkan:</span>
            <Select
              value={`${sortKey}-${sortDir}`}
              onValueChange={(value) => {
                const [key, dir] = value.split("-");
                updateUrlParams({ sort: key, dir: dir });
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Nama (A-Z)</SelectItem>
                <SelectItem value="name-desc">Nama (Z-A)</SelectItem>
                <SelectItem value="nomorAnggota-asc">
                  No. Anggota (Asc)
                </SelectItem>
                <SelectItem value="nomorAnggota-desc">
                  No. Anggota (Desc)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-xl">
              <TableHeader>
                <TableRow>
                  <TableHead className="max-w-lg">
                    <Button
                      variant="ghost"
                      onClick={() => handleSortChange("name")}
                    >
                      Nama <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSortChange("nomorAnggota")}
                    >
                      No. Anggota <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Jurusan</TableHead>
                  <TableHead>
                    <Button variant="ghost">Status</Button>
                  </TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto" />{" "}
                      Memuat data...
                    </TableCell>
                  </TableRow>
                ) : (
                  members.map((member) => (
                    <TableRow key={member.id}>
                      {" "}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Image
                            src={member.avatarUrl || "/images/placeholder.svg"}
                            alt={member.name}
                            width={40}
                            height={40}
                            className="rounded-full object-cover bg-muted"
                          />
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {member.nomorTelepon || "-"}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{member.nomorAnggota}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground flex">
                        {member.jurusan || "-"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getStatusVariant(member.status)}
                          className=""
                        >
                          {member.status || "N/A"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => handleOpenForm(member)}
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(member)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Hapus
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
        </CardContent>
        {totalPages > 1 && (
          <CardFooter className="border-t pt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    // PERBAIKAN 1: Logika pindah halaman langsung di sini
                    onClick={() =>
                      updateUrlParams({ page: String(currentPage - 1) })
                    }
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                <PaginationItem>
                  <span className="px-4 text-sm font-medium">
                    Halaman {currentPage} dari {totalPages}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      updateUrlParams({ page: String(currentPage + 1) })
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
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
