//src/app/api/admin/members/[id]/route.ts
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  memberFormSchema,
  type MemberFormValues,
} from "@/lib/validation/member.schema";
import { type Member } from "@/types/Member";

// Komponen UI
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, X } from "lucide-react";

import { formatImageFilename } from "@/lib/utils/formatImageFilename";
import Image from "next/image";
import { Label } from "@/components/ui/label";

type MemberFormProps = {
  initialData?: Member;
  onSuccess: () => void;
};

export default function MemberForm({
  initialData,
  onSuccess,
}: MemberFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.avatarUrl || null
  );

  const isUpdateMode = !!initialData;

  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberFormSchema),
    mode: "onChange",
    defaultValues: {
      name: initialData?.name ?? "",
      nomorAnggota: initialData?.nomorAnggota ?? "",
      jurusan: initialData?.jurusan ?? "",
      nomorTelepon: initialData?.nomorTelepon ?? "",
      status: initialData?.status ?? "Anggota Biasa",
      avatarUrl: initialData?.avatarUrl ?? "",
    },
  });

  const { isValid } = form.formState;

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    const name = form.getValues("name");

    if (!file || !name) {
      toast.error("Nama dan file wajib diisi sebelum unggah.");
      return;
    }

    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
    toast.success("Gambar berhasil diupload.");
  }

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    form.setValue("avatarUrl", "");
  };

  async function onSubmit(values: MemberFormValues) {
    setIsLoading(true);
    let finalAvatarUrl = values.avatarUrl;

    try {
      // Upload gambar jika ada file yang dipilih
      if (selectedFile) {
        setIsUploading(true);
        const ext = selectedFile.name.split(".").pop() || "jpg";
        const customFilename = formatImageFilename(values.name, ext);
        const renamedFile = new File([selectedFile], customFilename, {
          type: selectedFile.type,
        });

        const formData = new FormData();
        formData.append("file", renamedFile);
        formData.append("name", values.name);

        const res = await fetch("/api/admin/members/upload/image", {
          method: "POST",
          body: formData,
        });

        setIsUploading(false); // Selesai loading upload

        if (!res.ok) {
          if (res.status === 413) {
            toast.error("Ukuran gambar terlalu besar. Maksimal 5 MB");
          } else {
            const errorData = await res.json();
            toast.error("Upload Gagal", {
              description:
                errorData.error || "Terjadi kesalahan yang tidak diketahui.",
            });
          }
          return;
        }

        const data = await res.json();
        finalAvatarUrl = data.secureUrl; // Dapatkan URL baru dari Cloudinary
      }

      const payload = {
        ...values,
        avatarUrl: finalAvatarUrl,
      };

      // Submit ke backend
      const method = isUpdateMode ? "PUT" : "POST";
      const url = isUpdateMode
        ? `/api/admin/members/${initialData.id}`
        : "/api/admin/members";

      if (isUpdateMode && !initialData?.id) {
        toast.error("ID anggota tidak ditemukan untuk update.");
        return;
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Gagal menyimpan data anggota.");
      }

      toast.success(
        `Data "${values.name}" berhasil ${
          isUpdateMode ? "diperbarui" : "ditambahkan"
        }!`
      );
      onSuccess();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Terjadi kesalahan."
      );
    } finally {
      setIsLoading(false);
      setIsUploading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nama Lengkap <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
                  value={field.value ?? ""}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="nomorAnggota"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nomor Anggota <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="174/KPA EMC²/2022"
                  {...field}
                  value={field.value ?? ""}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="status"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Status <span className="text-destructive">*</span>
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Anggota Biasa">Anggota Biasa</SelectItem>
                  <SelectItem value="Anggota Luar Biasa">
                    Anggota Luar Biasa
                  </SelectItem>
                  <SelectItem value="Non Aktif">Non Aktif</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="jurusan"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jurusan</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Jurusan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Sistem Informasi">
                    Sistem Informasi
                  </SelectItem>
                  <SelectItem value="Manajeman Informatika">
                    Manajemen Informatika
                  </SelectItem>
                  <SelectItem value="Biologi">Biologi</SelectItem>
                  <SelectItem value="Fisika">Fisika</SelectItem>
                  <SelectItem value="Matematika">Matematika</SelectItem>
                  <SelectItem value="Statistika">Statistika</SelectItem>
                  <SelectItem value="Kimia">Kimia</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="nomorTelepon"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Telepon</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="0812..."
                  {...field}
                  value={field.value ?? ""}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <Label>Foto Profil</Label>
          <div className="flex items-center gap-4">
            {imagePreview && (
              <div className="relative w-16 h-16">
                <Image
                  src={imagePreview}
                  alt="Pratinjau"
                  fill
                  className="rounded-full object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-1 -right-1 h-6 w-6 rounded-full"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            <Input
              type="file"
              accept="image/*"
              disabled={isLoading || isUploading}
              onChange={handleImageChange}
              className="flex-1"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full mt-6"
          disabled={isLoading || isUploading || !isValid}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Mengunggah...
            </>
          ) : isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...
            </>
          ) : isUpdateMode ? (
            "Perbarui Data Anggota"
          ) : (
            "Tambah Anggota"
          )}
        </Button>
      </form>
    </Form>
  );
}
