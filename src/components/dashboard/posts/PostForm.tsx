// src/components/dashboard/PostForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic"; // Diperlukan untuk MDEditor

import { postFormSchema, type PostFormValues } from "./PostForm.logic";
import { type Post } from "@/lib/dummy-data/PostsData";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MetadataSidebar from "./MetadataSidebar"; // Impor sidebar modular

// Impor MDEditor secara dinamis
const MarkdownEditor = dynamic(() => import("./MarkdownEditor"), {
  ssr: false,
});

type PostFormProps = {
  initialData?: Post;
};

export default function PostForm({ initialData }: PostFormProps) {
  const router = useRouter();

  // Konversi string tags menjadi satu string dipisahkan koma untuk form
  const defaultValues = initialData
    ? {
        ...initialData,
        date: new Date(initialData.date),
        tags: initialData.tags.join(", "),
      }
    : {
        featured: false,
        tags: "",
      };

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: defaultValues,
  });

  const category = form.watch("category");

  function onSubmit(values: PostFormValues) {
    // Di sini Anda akan mengirim data ke database
    console.log("Data form yang disubmit:", values);
    alert(
      `Postingan "${values.title}" telah ${
        initialData ? "diperbarui" : "dibuat"
      }! (Simulasi)`
    );
    router.push("/dashboard/posts");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Kolom Utama (Kiri) */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Konten Utama</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul</FormLabel>
                    <FormControl>
                      <Input placeholder="Judul Postingan Anda..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="slug"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="judul-postingan-anda" {...field} />
                    </FormControl>
                    <FormDescription>
                      Ini adalah bagian dari URL. Biasanya dibuat otomatis dari
                      judul.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="excerpt"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kutipan Singkat (Excerpt)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ringkasan singkat dari postingan Anda..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* === MENGGUNAKAN MARKDOWN EDITOR === */}
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi Lengkap</FormLabel>
                    <FormControl>
                      <MarkdownEditor {...field} />
                    </FormControl>
                    <FormDescription>
                      Tulis konten Anda menggunakan sintaks Markdown.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        {/* Kolom Sidebar (Kanan) */}
        <MetadataSidebar
          form={form}
          isUpdate={!!initialData}
          category={category}
        />
      </form>
    </Form>
  );
}
