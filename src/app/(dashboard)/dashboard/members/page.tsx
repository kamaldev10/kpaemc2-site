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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
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
  MoreHorizontal,
  PlusCircle,
  Pencil,
  Trash2,
  ArrowUpDown,
  Users,
  GripVertical,
} from "lucide-react";
import { toast } from "sonner";

// Komponen & Data
import ExportMembersButton from "@/components/dashboard/members/ExportMembersButton";
import ImportMembersDialog from "@/components/dashboard/members/ImportMembersDialog";
import MemberForm from "@/components/dashboard/members/MemberForm";
import { type Member } from "@/types/Member"; // Disarankan memindah tipe ke folder terpusat
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import MemberCardDialog from "@/components/dashboard/members/MemberCardDialog";
import MembersTableSkeleton from "@/components/dashboard/members/MembersTableSkeleton";

const MEMBERS_PER_PAGE = 20;
type SortableKey = "name" | "nomorAnggota" | "jurusan" | "status";

export default function MembersManagementPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State untuk UI
  const [members, setMembers] = useState<Member[]>([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSheetOpen, setisSheetOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | undefined>(
    undefined
  );

  // State untuk checkbox
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isSelectAllMode, setIsSelectAllMode] = useState(false);

  // Baca state dari URL
  const currentPage = Number(searchParams.get("page")) || 1;
  const sortKey = (searchParams.get("sort") as SortableKey) || "nomorAnggota";
  const sortDir = (searchParams.get("dir") as "asc" | "desc") || "desc";

  const totalPages = Math.ceil(totalMembers / MEMBERS_PER_PAGE);

  // State Untuk Detail anggota
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [memberForDetail, setMemberForDetail] = useState<Member | null>(null);

  const fetchMembers = useCallback(async () => {
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
    setIsLoading(true);
    fetchMembers();

    if (!isSheetOpen) setSelectedMember(undefined);
  }, [fetchMembers, isSheetOpen]);

  const updateUrlParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => params.set(key, value));
    router.push(`/dashboard/members?${params.toString()}`);
  };

  const paginatedMembers = members; // fetchMembers sudah mengembalikan data terpaginasi

  // Logika untuk menentukan status checkbox header

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setIsSelectAllMode(true);
      setSelectedIds(new Set()); // Kosongkan pengecualian saat memilih semua
    } else {
      setIsSelectAllMode(false);
      setSelectedIds(new Set());
    }
  };

  const handleSelectRow = (id: number, checked: boolean) => {
    // Jika mode 'pilih semua' aktif, kita mengelola pengecualian
    if (isSelectAllMode) {
      const newDeselected = new Set(selectedIds);
      if (!checked) newDeselected.add(id); // Tambah ke daftar pengecualian
      else newDeselected.delete(id); // Hapus dari daftar pengecualian
      setSelectedIds(newDeselected);
    } else {
      // Jika mode normal, kita mengelola yang dipilih
      const newSelected = new Set(selectedIds);
      if (checked) newSelected.add(id);
      else newSelected.delete(id);
      setSelectedIds(newSelected);
    }
  };

  const handleUpdateToALB = async () => {
    let payload;
    let confirmationMessage;

    if (isSelectAllMode) {
      payload = {
        ids: Array.from(selectedIds), // Kirim ID yang dikecualikan
        status: "Anggota Luar Biasa",
        mode: "exclude", // Mode 'kecualikan'
      };
      confirmationMessage = `Anda akan mengubah status SEMUA Anggota Biasa menjadi "Anggota Luar Biasa", KECUALI ${selectedIds.size} anggota. Lanjutkan?`;
    } else {
      const idsToUpdate = Array.from(selectedIds);
      if (idsToUpdate.length === 0)
        return toast.info("Tidak ada anggota yang dipilih.");
      payload = {
        ids: idsToUpdate, // Kirim ID yang dipilih
        status: "Anggota Luar Biasa",
        mode: "include", // Mode 'sertakan'
      };
      confirmationMessage = `Anda akan mengubah status ${idsToUpdate.length} anggota menjadi "Anggota Luar Biasa". Lanjutkan?`;
    }

    toast("Konfirmasi Aksi", {
      description: confirmationMessage,
      action: {
        label: "Lanjutkan",
        onClick: async () => {
          try {
            const response = await fetch(
              "/api/admin/members/actions/bulk-update-status",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload), // Kirim payload yang sudah benar
              }
            );
            const result = await response.json();
            if (!response.ok) throw new Error(result.message);

            toast.success(result.message);
            setSelectedIds(new Set());
            setIsSelectAllMode(false);
            fetchMembers();
          } catch (error) {
            toast.error("Aksi gagal", {
              description:
                error instanceof Error ? error.message : "Terjadi kesalahan",
            });
          }
        },
      },
      cancel: { label: "Batal", onClick: () => {} },
    });
  };

  const handleSortChange = (key: SortableKey) => {
    const direction = sortKey === key && sortDir === "asc" ? "desc" : "asc";
    updateUrlParams({ sort: key, dir: direction, page: "1" });
  };

  const handleOpenForm = (member?: Member) => {
    setSelectedMember(member);
    setisSheetOpen(true);
  };

  const handleFormSuccess = () => {
    setisSheetOpen(false);
    fetchMembers();
  };

  const handleOpenDetail = (member: Member) => {
    setMemberForDetail(member);
    setIsDetailOpen(true);
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
      cancel: { label: "Batal", onClick: () => {} },
    });
  };

  // Fungsi getStatusVariant diperbarui untuk menangani status opsional
  const getStatusVariant = (
    status?: "Anggota Biasa" | "Anggota Luar Biasa" | "Non Aktif"
  ) => {
    switch (status) {
      case "Anggota Biasa":
        return "default";
      case "Anggota Luar Biasa":
        return "outline";
      case "Non Aktif":
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
            Kelola Data Anggota {process.env.NEXT_PUBLIC_ORG_NAME}{" "}
          </p>
        </div>
        <div className="sm:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <GripVertical className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-2">
                <Button
                  variant="ghost"
                  className="flex-col h-20"
                  onClick={handleUpdateToALB}
                  disabled={selectedIds.size === 0 && !isSelectAllMode}
                >
                  <Users className="h-5 w-5 mb-1" />
                  <span className="text-xs">Ubah Status</span>
                </Button>
                <ImportMembersDialog />
                <ExportMembersButton />{" "}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Separator />
      <Card className="border-0 shadow-none">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div className=" space-y-2">
            <CardTitle>Daftar Anggota</CardTitle>
            <CardDescription>
              {(() => {
                // Hitung jumlah item yang dipilih secara akurat
                const selectionCount = isSelectAllMode
                  ? totalMembers - selectedIds.size
                  : selectedIds.size;

                // Tampilkan pesan berdasarkan apakah ada item yang dipilih atau tidak
                if (selectionCount > 0) {
                  return (
                    <span>
                      <strong className="text-primary">{selectionCount}</strong>{" "}
                      dari {totalMembers} anggota dipilih.
                    </span>
                  );
                }

                // Pesan default jika tidak ada yang dipilih
                return (
                  <span>
                    Menampilkan {members.length} dari{" "}
                    <strong className="text-primary">{totalMembers}</strong>{" "}
                    total anggota.
                  </span>
                );
              })()}
            </CardDescription>
          </div>
          <div className="gap-3 flex items-center">
            {/* SORT Features */}
            <div className="hidden sm:inline-flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Urutkan:</span>
              <Select
                value={`${sortKey}-${sortDir}`}
                onValueChange={(value) => {
                  const [key, dir] = value.split("-");
                  updateUrlParams({ sort: key, dir: dir });
                }}
              >
                <SelectTrigger className=" md:w-[190px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nomorAnggota-asc">
                    No. Anggota (Asc)
                  </SelectItem>
                  <SelectItem value="nomorAnggota-desc">
                    No. Anggota (Desc)
                  </SelectItem>
                  <SelectItem value="name-asc">Nama (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Nama (Z-A)</SelectItem>
                  <SelectItem value="jurusan-asc">Jurusan (A-Z)</SelectItem>
                  <SelectItem value="jurusan-desc">Jurusan (Z-A)</SelectItem>
                  <SelectItem value="status-asc">Status (A-Z)</SelectItem>
                  <SelectItem value="status-desc">Status (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tombol Tambah Anggota */}
            <Sheet open={isSheetOpen} onOpenChange={setisSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  size="sm"
                  className="sm:flex items-center gap-1"
                  onClick={() => handleOpenForm()}
                >
                  <PlusCircle className="h-4 w-4" />
                  <span className="hidden sm:flex">Tambah Anggota</span>
                </Button>
              </SheetTrigger>

              <SheetContent className="p-4">
                <SheetHeader>
                  <SheetTitle>
                    {selectedMember ? "Edit Anggota" : "Tambah Anggota Baru"}
                  </SheetTitle>
                  <SheetDescription>
                    {selectedMember
                      ? "Perbarui data anggota di bawah ini."
                      : "Isi formulir berikut untuk menambahkan anggota baru."}
                  </SheetDescription>
                </SheetHeader>

                <MemberForm
                  initialData={selectedMember}
                  onSuccess={handleFormSuccess}
                />
              </SheetContent>
            </Sheet>

            {/* Kumpulan Fitur dalam Popover */}
            <div className="hidden sm:flex">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <GripVertical className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-2">
                    <Button
                      variant="ghost"
                      className="flex-col h-20"
                      onClick={handleUpdateToALB}
                      disabled={selectedIds.size === 0 && !isSelectAllMode}
                    >
                      <Users className="h-5 w-5 mb-1" />
                      <span className="text-xs">Ubah Status</span>
                    </Button>
                    <ImportMembersDialog />
                    <ExportMembersButton />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Separator />
            {isLoading ? (
              <MembersTableSkeleton />
            ) : (
              <Table className="max-w-dvh sm:max-w-full">
                <TableCaption>
                  <p className="flex text-xs items-center">
                    <span className="font-semibold mr-2">Note:</span>
                    <Badge variant="destructive" className="mr-1">
                      Non Aktif
                    </Badge>
                    dipecat, meniggal dll (bukan anggota{" "}
                    {process.env.NEXT_PUBLIC_ORG_NAME})
                  </p>
                </TableCaption>
                <TableHeader>
                  <TableRow className="items-center justify-center-safe">
                    <TableHead className="max-w-12 ">
                      <Checkbox
                        onCheckedChange={handleSelectAll}
                        checked={isSelectAllMode}
                      />
                    </TableHead>
                    <TableHead className="max-w-2/6">
                      <Button
                        variant="ghost"
                        onClick={() => handleSortChange("name")}
                      >
                        Nama <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="max-w-1/6">
                      <Button
                        variant="ghost"
                        onClick={() => handleSortChange("nomorAnggota")}
                      >
                        No. Anggota <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="max-w-1/6">
                      <Button
                        variant="ghost"
                        onClick={() => handleSortChange("jurusan")}
                      >
                        Jurusan <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="max-w-1/6">
                      <Button
                        variant="ghost"
                        onClick={() => handleSortChange("status")}
                      >
                        Status <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedMembers.map((member, index) => {
                    const isChecked = isSelectAllMode
                      ? !selectedIds.has(member.id)
                      : selectedIds.has(member.id);

                    const rowNumber =
                      (currentPage - 1) * MEMBERS_PER_PAGE + index + 1;

                    return (
                      <TableRow
                        key={member.id}
                        data-state={isChecked ? "selected" : ""}
                        className="items-center justify-items-center-safe w-full text-xs sm:text-sm"
                      >
                        <TableCell>
                          {isSelectAllMode ? (
                            <Checkbox
                              checked={isChecked}
                              onCheckedChange={(checked) =>
                                handleSelectRow(member.id, !!checked)
                              }
                            />
                          ) : (
                            <span className="text-muted-foreground">
                              {rowNumber}
                            </span>
                          )}
                        </TableCell>

                        <TableCell className="flex items-center gap-3 w-2/6 sm:w-full ">
                          <Image
                            src={
                              member.avatarUrl ||
                              "/images/person-placeholder.svg"
                            }
                            alt={member.name}
                            width={40}
                            height={40}
                            className="rounded-full object-cover bg-muted"
                            loading="lazy"
                          />
                          <div className="">
                            <p className="font-medium text-ellipsis md:text-clip">
                              {member.name}
                            </p>
                            <p className="  text-muted-foreground">
                              {member.nomorTelepon || "-"}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {member.nomorAnggota}
                          </Badge>
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
                                onClick={() => handleOpenDetail(member)}
                              >
                                Kartu Anggota
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleOpenForm(member)}
                              >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(member)}
                                className="text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Hapus
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
            <Separator />
          </div>
        </CardContent>

        <CardFooter className=" pt-4">
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
      </Card>

      <MemberCardDialog
        member={memberForDetail}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </div>
  );
}
