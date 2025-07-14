"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  aboutInfoSchema,
  aboutInfoSchemaRaw,
  type AboutInfoFormValues,
} from "@/lib/validation/about.schema";
import { type About } from "@/types/AboutInfo";

// UI Components
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
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";

type AboutFormProps = {
  initialData?: About;
};

export default function AboutForm({ initialData }: AboutFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AboutInfoFormValues>({
    resolver: zodResolver(aboutInfoSchemaRaw), // gunakan schema mentah di form
    defaultValues: initialData
      ? {
          ...initialData,
          mission: initialData.mission?.join("\n") ?? "",
        }
      : {
          orgName: "",
          bornDate: "",
          motto: "",
          description: "",
          vision: "",
          mission: "",
          activePeriod: "",
        },
    mode: "onChange",
  });

  async function onSubmit(rawValues: AboutInfoFormValues) {
    setIsLoading(true);

    // Transformasikan secara manual menggunakan Zod
    const parsed = aboutInfoSchema.safeParse(rawValues);
    if (!parsed.success) {
      toast.error("Gagal memproses data.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) throw new Error("Gagal memperbarui informasi.");

      toast.success("Informasi 'Tentang Kami' berhasil diperbarui!");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Terjadi kesalahan."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Informasi Umum */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Umum</CardTitle>
            <CardDescription>
              Detail dasar mengenai organisasi Anda.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ["orgName", "Nama Organisasi"],
              ["motto", "Motto"],
              ["bornDate", "Tanggal Berdiri"],
              ["activePeriod", "Periode Aktif Saat Ini"],
            ].map(([name, label]) => (
              <FormField
                key={name}
                name={name as keyof AboutInfoFormValues}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </CardContent>
        </Card>

        {/* Deskripsi & Visi Misi */}
        <Card>
          <CardHeader>
            <CardTitle>Deskripsi & Visi Misi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi Organisasi</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="vision"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visi</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="mission"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Misi</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} disabled={isLoading} />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">
                    Pisahkan setiap poin misi dengan baris baru (Enter).
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Simpan Perubahan
          </Button>
        </div>
      </form>
    </Form>
  );
}
