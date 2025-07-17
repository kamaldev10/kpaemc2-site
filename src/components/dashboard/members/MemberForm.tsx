//src/app/api/admin/members/[id]/route.ts
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
import { Loader2 } from "lucide-react";

import { formatImageFilename } from "@/lib/utils/formatImageFilename";
import Image from "next/image";

type MemberFormProps = {
  initialData?: Member;
  onSuccess: () => void;
};

export default function MemberForm({
  initialData,
  onSuccess,
}: MemberFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const isUpdateMode = !!initialData;

  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberFormSchema),
    mode: "onChange",
    defaultValues: {
      name: initialData?.name ?? "",
      nomorAnggota: initialData?.nomorAnggota ?? "",
      jurusan: initialData?.jurusan ?? "",
      nomorTelepon: initialData?.nomorTelepon ?? "",
      status: initialData?.status ?? "Aktif",
      avatarUrl: initialData?.avatarUrl ?? "",
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.avatarUrl || null
  );

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    const name = form.getValues("name");

    if (!file || !name) {
      toast.error("Nama dan file wajib diisi sebelum unggah.");
      return;
    }

    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
    toast.success("Gambar berhasil dipilih.");
  }

  async function onSubmit(values: MemberFormValues) {
    setIsLoading(true);

    try {
      // Upload gambar jika ada file yang dipilih
      if (selectedFile) {
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

        const data = await res.json();
        if (!res.ok || !data?.secureUrl) {
          throw new Error(data?.error || "Upload gambar gagal");
        }

        // Isi avatarUrl dengan secureUrl dari Cloudinary
        values.avatarUrl = data.secureUrl;
      }

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
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Gagal submit ke server.");
      }

      toast.success(
        `Anggota "${values.name}" berhasil ${
          isUpdateMode ? "diperbarui" : "ditambahkan"
        }!`
      );
      router.refresh();
      onSuccess();
    } catch (error) {
      console.error("❌ Gagal submit form:", error);
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  }

  const requiredFieldsFilled =
    form.watch("name") && form.watch("nomorAnggota") && form.watch("status");

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
                  <SelectItem value="Aktif">Aktif</SelectItem>
                  <SelectItem value="Alumni">Alumni</SelectItem>
                  <SelectItem value="Non-aktif">Non-aktif</SelectItem>
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

        <FormField
          name="avatarUrl"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto Profil</FormLabel>
              <FormControl>
                <div className="flex items-center gap-4">
                  {imagePreview && (
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={64}
                      height={64}
                      unoptimized
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    disabled={isLoading}
                    onChange={(e) => {
                      handleImageChange(e);
                      // Simpan file name sementara ke field (tidak terlalu penting tapi agar tidak warning)
                      field.onChange(field.value ?? "");
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tombol submit dengan state loading */}
        <Button
          type="submit"
          className="w-full mt-12"
          disabled={isLoading || !requiredFieldsFilled}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isUpdateMode ? "Update Anggota" : "Tambah Anggota"}
        </Button>
      </form>
    </Form>
  );
}
