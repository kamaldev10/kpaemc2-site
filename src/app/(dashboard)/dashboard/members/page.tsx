"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
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
  MoreHorizontal,
  PlusCircle,
  Pencil,
  Trash2,
  ArrowUpDown,
} from "lucide-react";
import { MembersData, type Member } from "@/lib/dummy-data/MembersData";
import ExportMembersButton from "@/components/dashboard/members/ExportMembersButton";
import ImportMembersDialog from "@/components/dashboard/members/ImportMembersDialog";
import MemberForm from "@/components/dashboard/members/MemberForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const MEMBERS_PER_PAGE = 20;

// Definisikan kunci yang valid untuk sorting agar lebih aman
type SortableKey = "name" | "nomorAnggota" | "jurusan" | "status";

export default function MembersManagementPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | undefined>(
    undefined
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: SortableKey; // Gunakan tipe yang sudah dibatasi
    direction: "asc" | "desc";
  }>({
    key: "nomorAnggota",
    direction: "desc",
  });

  // Logika untuk mengurutkan data dengan penanganan nilai 'undefined'
  const sortedMembers = useMemo(() => {
    return [...MembersData].sort((a, b) => {
      const key = sortConfig.key;
      // Berikan nilai default jika properti tidak ada, untuk perbandingan yang aman
      const aValue = a[key] || "";
      const bValue = b[key] || "";

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [sortConfig]);

  // Logika Pagination sekarang menggunakan data yang sudah diurutkan
  const totalPages = Math.ceil(sortedMembers.length / MEMBERS_PER_PAGE);
  const paginatedMembers = sortedMembers.slice(
    (currentPage - 1) * MEMBERS_PER_PAGE,
    currentPage * MEMBERS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSortChange = (key: SortableKey) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
    setCurrentPage(1); // Kembali ke halaman 1 setiap kali sorting diubah
  };

  const handleOpenForm = (member?: Member) => {
    setSelectedMember(member);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    // Di aplikasi nyata, Anda akan memuat ulang data di sini
  };

  const handleDelete = (member: Member) => {
    toast(`Konfirmasi Penghapusan`, {
      description: `Apakah Anda yakin ingin menghapus anggota "${member.name}"?`,
      action: {
        label: "Hapus",
        onClick: () => toast.success(`Anggota "${member.name}" telah dihapus.`),
      },
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
          <ExportMembersButton data={MembersData} />
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="gap-1"
                onClick={() => handleOpenForm()}
              >
                <PlusCircle className="h-4 w-4" /> Tambah Anggota
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
              Menampilkan {paginatedMembers.length} dari {MembersData.length}{" "}
              total anggota.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Urutkan:</span>
            <Select
              value={`${sortConfig.key}-${sortConfig.direction}`}
              onValueChange={(value) => {
                const [key, direction] = value.split("-") as [
                  SortableKey,
                  "asc" | "desc"
                ];
                handleSortChange(key);
                setSortConfig({ key, direction }); // Langsung set untuk sinkronisasi dropdown
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih Urutan" />
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
                <SelectItem value="jurusan-asc">Jurusan (Asc)</SelectItem>
                <SelectItem value="jurusan-desc">Jurusan (Desc)</SelectItem>
                <SelectItem value="status-asc">Status (Asc)</SelectItem>
                <SelectItem value="status-desc">Status (Desc)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">
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
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSortChange("jurusan")}
                    >
                      Jurusan <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
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
                {paginatedMembers.map((member) => (
                  <TableRow key={member.id}>
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
                    <TableCell className="text-muted-foreground">
                      {member.jurusan || "-"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(member.status)}>
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
                ))}
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
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
