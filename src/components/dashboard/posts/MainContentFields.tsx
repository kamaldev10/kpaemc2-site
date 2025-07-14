"use client";

import dynamic from "next/dynamic";
import { Control } from "react-hook-form";
import { type PostFormValues } from "@/lib/validation/post.schema";

// Impor komponen UI
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Impor Markdown Editor secara dinamis untuk performa
const MarkdownEditor = dynamic(
  () => import("@/components/shared/MarkdownEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-40 bg-muted rounded-md animate-pulse" />
    ),
  }
);

// Tipe untuk props komponen
type MainContentFieldsProps = {
  // Menerima 'control' dari useForm di komponen induk
  control: Control<PostFormValues>;
};

export default function MainContentFields({ control }: MainContentFieldsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Konten Utama</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Judul <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Judul Postingan Anda..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="slug"
          control={control}
          render={({ field }) => (
            <FormItem className="hidden">
              <FormLabel>
                Slug <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input disabled placeholder="judul-postingan-unik" {...field} />
              </FormControl>
              <FormDescription>
                Bagian Otomatis dari URL yang unik.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="excerpt"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Kutipan Singkat (Excerpt){" "}
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ringkasan singkat untuk tampilan kartu..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Deskripsi Lengkap <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <MarkdownEditor
                  value={field.value as string}
                  onChange={field.onChange}
                  height={400}
                />
              </FormControl>
              <FormDescription>
                Gunakan sintaks Markdown untuk formatting.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
