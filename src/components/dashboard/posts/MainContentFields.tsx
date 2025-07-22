"use client";

import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";
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
// import { toTitleCase } from "@/lib/utils/utils";

const MarkdownEditor = dynamic(
  () => import("@/components/shared/MarkdownEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] bg-muted rounded-md animate-pulse" />
    ),
  }
);

// Komponen ini tidak lagi memerlukan props
export default function MainContentFields() {
  // Ambil 'control' dari konteks yang disediakan oleh FormProvider
  const { control } = useFormContext<PostFormValues>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Konten Utama</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          name="title"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Judul <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Judul Postingan Anda..."
                  {...field}
                  // onBlur={(e) => {
                  //   field.onBlur(); // Jalankan onBlur bawaan
                  //   field.onChange(toTitleCase(e.target.value)); // Ubah nilai menjadi Title Case
                  // }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="slug"
          control={control}
          render={({ field }) => (
            <FormItem className="sr-only">
              <FormLabel>
                Slug <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input disabled placeholder="judul-postingan-unik" {...field} />
              </FormControl>
              <FormDescription>Dibuat otomatis dari judul.</FormDescription>
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
                Kutipan Singkat (Excerpt)
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea placeholder="Ringkasan singkat ..." {...field} />
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
                  height={590}
                />
              </FormControl>
              <FormDescription className="text-xs">
                Gunakan sintaks Markdown untuk memformat tulisan.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="descriptionSource"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sumber</FormLabel>
              <FormControl>
                <Input
                  placeholder="Contoh: kompas.com atau https:instagram.com/kpaemc2/9281g8has9dh21ge87weh8aba8"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
