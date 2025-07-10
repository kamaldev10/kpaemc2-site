"use client";

import { Button } from "@/components/ui/button";
import { type Member } from "@/lib/dummy-data/MembersData";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";

export default function ExportMembersButton({ data }: { data: Member[] }) {
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Daftar Anggota");
    XLSX.writeFile(workbook, "Daftar-Anggota.xlsx");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      className="gap-1"
    >
      <Download className="h-4 w-4" />
      Export
    </Button>
  );
}
