"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UploadCloud } from "lucide-react";
import { toast } from "sonner";

type ImageUploadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onFileSelect: (file: File) => void; // Prop diubah: mengirim objek File
};

export default function ImageUploadModal({
  isOpen,
  onClose,
  onFileSelect,
}: ImageUploadModalProps) {

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      onFileSelect(file); // Kirim objek File yang dipilih ke induk
      onClose(); // Langsung tutup modal setelah file dipilih
    } else {
      toast.error("Format file tidak didukung.");
    }
  }, [onFileSelect, onClose]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg',".jpg",'.png', '.gif','.svg','.heic', '.webp'] },
    maxFiles: 1,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pilih Gambar</DialogTitle>
          <DialogDescription>
            Seret & lepas file di sini, atau klik untuk memilih gambar.
          </DialogDescription>
        </DialogHeader>
        <div
          {...getRootProps()}
          className={`w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/30 hover:border-primary/50'}`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="font-semibold">Seret & lepas gambar</p>
          <p className="text-sm text-muted-foreground">atau klik untuk memilih file</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}