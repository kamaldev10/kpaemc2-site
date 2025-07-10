"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload, FileCheck2 } from "lucide-react";
import * as XLSX from "xlsx";
import { type Member } from "@/lib/dummy-data/MembersData"; // <-- 1. Impor tipe Member

export default function ImportMembersDialog() {
  const [importedData, setImportedData] = useState<Partial<Member>[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) return;

      const data = new Uint8Array(event.target.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Beri tahu TypeScript bahwa hasil json adalah array dari objek yang mirip Member
      const json: Partial<Member>[] = XLSX.utils.sheet_to_json(worksheet);

      setImportedData(json);
    };
    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "text/csv": [".csv"],
    },
    maxFiles: 1,
  });

  const handleProcessImport = () => {
    // Di aplikasi nyata, kirim 'importedData' ke backend
    console.log("Data yang akan diproses:", importedData);
    alert(`${importedData.length} data anggota siap diimpor! (Cek console)`);
    setImportedData([]); // Reset
  };

  return (
    <Dialog onOpenChange={() => setImportedData([])}>
      {" "}
      {/* Reset saat modal ditutup/dibuka */}
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <Upload className="h-4 w-4" />
          Import
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Anggota dari Excel</DialogTitle>
        </DialogHeader>
        <div
          {...getRootProps()}
          className={`w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-muted-foreground/30"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
          <p>Seret file .xlsx ke sini, atau klik untuk memilih</p>
        </div>
        {importedData.length > 0 && (
          <div className="mt-4 text-center">
            <FileCheck2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="font-semibold">
              {importedData.length} baris data ditemukan dan siap diimpor.
            </p>
            <Button onClick={handleProcessImport} className="mt-4">
              Proses Import
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
