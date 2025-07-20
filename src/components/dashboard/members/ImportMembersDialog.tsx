"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload, FileCheck2, Loader2 } from "lucide-react";
import * as XLSX from "xlsx";
import { type Member } from "@/types/Member";
import { toast } from "sonner";

export default function ImportMembersDialog() {
  const router = useRouter();
  const [importedData, setImportedData] = useState<Partial<Member>[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
    },
    maxFiles: 1,
  });

  const handleProcessImport = async () => {
    setIsProcessing(true);
    try {
      // Kirim data ke backend
      const response = await fetch("/api/admin/members/actions/bulk-import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(importedData),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Gagal mengimpor data.");

      toast.success(result.message);
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Terjadi kesalahan."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const resetState = () => setImportedData([]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) resetState();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex-col h-20 w-full">
          <Upload className="h-5 w-5 mb-1" />
          <span className="text-xs">Import Excel</span>
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
            <Button
              onClick={handleProcessImport}
              className="mt-4"
              disabled={isProcessing}
            >
              {isProcessing && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isProcessing ? "Memproses..." : "Proses Import"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
