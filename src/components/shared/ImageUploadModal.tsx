"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UploadDropzone } from "@uploadthing/react";
import { type OurFileRouter } from "@/app/api/uploadthing/core"; // Impor tipe router
import { toast } from "sonner";

type ImageUploadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: (url: string) => void;
};

export default function ImageUploadModal({
  isOpen,
  onClose,
  onUploadComplete,
}: ImageUploadModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Unggah Gambar Unggulan</DialogTitle>
          <DialogDescription>
            Seret & lepas file di sini, atau klik untuk memilih.
          </DialogDescription>
        </DialogHeader>

        <UploadDropzone<OurFileRouter, "imageUploader">
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            if (res && res.length > 0) {
              toast.success("Gambar berhasil diunggah!");
              onUploadComplete(res[0].url);
              onClose();
            }
          }}
          onUploadError={(error: Error) => {
            toast.error(`Error: ${error.message}`);
          }}
          config={{
            mode: "auto",
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
