"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import { type Member } from "@/types/Member";

export default function ExportMembersButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    setIsLoading(true);
    toast.info("Mempersiapkan semua data anggota untuk di-export...");

    try {
      // 1. Panggil API untuk mengambil SEMUA data anggota
      const response = await fetch("/api/admin/members?export=true");
      if (!response.ok) {
        throw new Error("Gagal mengambil data anggota.");
      }
      const allMembers: Member[] = await response.json();

      allMembers.sort((a, b) => a.nomorAnggota.localeCompare(b.nomorAnggota));

      // 2. Proses data JSON menjadi file Excel
      const worksheet = XLSX.utils.json_to_sheet(allMembers);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Daftar Anggota");
      XLSX.writeFile(
        workbook,
        `Semua-Anggota-KPA-EMC2-${new Date().toISOString().split("T")[0]}.xlsx`
      );

      toast.success(`Berhasil mengekspor ${allMembers.length} data anggota!`);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat export."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      className="flex-col h-20 w-full"
      onClick={handleExport}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 mb-1 animate-spin" />
      ) : (
        <Download className="h-5 w-5 mb-1" />
      )}
      <span className="text-xs">Export Semua</span>
    </Button>
  );
}
