"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  memberFormSchema,
  type MemberFormValues,
} from "@/lib/validation/member.schema"; // <-- Path impor diperbaiki
import { type Member } from "@/types/Member"; // <-- Tipe diimpor dari lokasi terpusat

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
    defaultValues: initialData || {
      name: "",
      nomorAnggota: "",
      jurusan: "",
      nomorTelepon: "",
      status: "Aktif",
      avatarUrl: "",
    },
  });
  async function onSubmit(values: MemberFormValues) {
    setIsLoading(true);
    try {
      const method = isUpdateMode ? "PUT" : "POST";
      const url = isUpdateMode
        ? `/api/admin/members/${initialData.id}`
        : "/api/admin/members";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(
          `Gagal ${isUpdateMode ? "memperbarui" : "menambahkan"} anggota.`
        );
      }

      toast.success(
        `Anggota "${values.name}" berhasil ${
          isUpdateMode ? "diperbarui" : "ditambahkan"
        }!`
      );
      router.refresh(); // Memuat ulang data di halaman tabel untuk menampilkan perubahan
      onSuccess(); // Memanggil callback untuk menutup modal
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nama Lengkap <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} disabled={isLoading} />
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
              <FormLabel>URL Foto Profil</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://..."
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tombol submit dengan state loading */}
        <Button type="submit" className="w-full mt-6" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isUpdateMode ? "Update Anggota" : "Tambah Anggota"}
        </Button>
      </form>
    </Form>
  );
}
