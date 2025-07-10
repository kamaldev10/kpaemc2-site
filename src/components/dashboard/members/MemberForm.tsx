"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { memberFormSchema, type MemberFormValues } from "./MemberForm.logic";
import { type Member } from "@/lib/dummy-data/MembersData";
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

type MemberFormProps = {
  initialData?: Member;
  onSuccess: () => void;
};

export default function MemberForm({
  initialData,
  onSuccess,
}: MemberFormProps) {
  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberFormSchema),
    // Nilai default disesuaikan. 'status' selalu memiliki nilai awal 'Aktif'.
    defaultValues: initialData || {
      name: "",
      nomorAnggota: "",
      jurusan: "",
      nomorTelepon: "",
      status: "Aktif", // Nilai default untuk form baru
      avatarUrl: "",
    },
  });

  function onSubmit(values: MemberFormValues) {
    console.log("Data form yang disubmit:", values);
    alert(
      `Anggota "${values.name}" berhasil ${
        initialData ? "diperbarui" : "ditambahkan"
      }! (Cek console)`
    );
    onSuccess();
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
                <Input placeholder="John Doe" {...field} />
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
                <Input placeholder="EMC2.XX.XXX" {...field} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <FormControl>
                <Input placeholder="Ilmu Komputer" {...field} />
              </FormControl>
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
                <Input type="tel" placeholder="0812..." {...field} />
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
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-6">
          {initialData ? "Update Anggota" : "Tambah Anggota"}
        </Button>
      </form>
    </Form>
  );
}
