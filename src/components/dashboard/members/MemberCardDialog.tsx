"use client";

import Image from "next/image";
import { type Member } from "@/types/Member";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type MemberCardDialogProps = {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
};

// Fungsi untuk mendapatkan varian badge berdasarkan status
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

export default function MemberCardDialog({
  member,
  isOpen,
  onClose,
}: MemberCardDialogProps) {
  if (!member) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
        <div className="relative w-full bg-card overflow-hidden">
          <Image
            width={300}
            height={300}
            src="/images/logo.svg"
            alt="Logo Latar Belakang"
            unoptimized
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/5 h-auto object-contain opacity-30 z-0"
          />
          <div className="relative z-10">
            {/* Header dengan gradasi */}
            <div className="p-6 bg-gradient-to-br from-primary/80 via-primary/40 to-primary/15">
              <DialogHeader className="text-left mb-6 text-card-foreground">
                <DialogTitle className="text-lg font-semibold">
                  KARTU TANDA ANGGOTA
                </DialogTitle>
                <DialogDescription className="text-sm">
                  KPA EMC² FMIPA UNRI
                </DialogDescription>
              </DialogHeader>

              {/* Konten Utama Kartu */}
              <div className="flex gap-4 items-center">
                <div className="relative h-32 w-24 flex-shrink-0 rounded-lg overflow-hidden border-2 border-white/80 shadow-lg">
                  <Image
                    src={member.avatarUrl || "/images/placeholder.svg"}
                    alt={`Foto ${member.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1 text-sm text-card-foreground">
                  <p className="font-bold text-lg">{member.name}</p>
                  <p className="font-mono">{member.nomorAnggota}</p>
                  <p>{member.jurusan || "-"}</p>
                  <Badge
                    variant={getStatusVariant(member.status)}
                    className="mt-2"
                  >
                    {member.status || "N/A"}
                  </Badge>
                </div>
              </div>
              {/* Detail Tambahan */}
              <div className="text-sm mt-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nomor Telepon</span>
                  <span className="font-medium text-foreground">
                    {member.nomorTelepon || "-"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Tanggal Pelantikan
                  </span>
                  <span className="font-medium text-foreground">
                    {member.joinDate
                      ? new Date(member.joinDate).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                        })
                      : "-"}
                  </span>
                </div>
              </div>

              <Separator />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
