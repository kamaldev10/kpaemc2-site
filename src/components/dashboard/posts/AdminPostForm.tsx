"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// Impor logika & tipe
import {
  postFormInputSchema,
  postCreateSchema,
  postUpdateSchema,
  type PostFormValues,
} from "@/lib/validation/post.schema";

import { type Post } from "@/types/Post";

// Impor komponen UI
import { Form } from "@/components/ui/form";
import MainContentFields from "./MainContentFields";
import MetadataSidebar from "./MetadataSidebar";
import z from "zod";
import { generateSlug } from "@/lib/utils/generateSlugUtils";
import { sanitizePostInitialData } from "@/lib/utils/sanitizePostInitialData";

type PostFormProps = {
  initialData?: Post;
};

export default function AdminPostForm({ initialData }: PostFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const isUpdateMode = !!initialData;

  const form = useForm<PostFormValues>({
    // Gunakan skema input mentah untuk resolver
    resolver: zodResolver(postFormInputSchema),
    defaultValues: initialData
      ? sanitizePostInitialData(initialData)
      : {
          title: "",
          slug: "",
          excerpt: "",
          description: "",
          imageUrl: "",
          date: new Date(),
          category: "Artikel",
          tags: "",
          featured: false,
        },
    mode: "onChange",
  });

  const watchedTitle = form.watch("title");

  useEffect(() => {
    // 2. Logika ini sekarang menggunakan fungsi yang diimpor dan tidak berubah
    if (watchedTitle && !form.formState.dirtyFields.slug) {
      const newSlug = generateSlug(watchedTitle);
      form.setValue("slug", newSlug, { shouldValidate: true });
    }
  }, [watchedTitle, form.setValue, form.formState.dirtyFields.slug, form]);

  const category = form.watch("category");

  // onSubmit menerima nilai MENTAH sesuai tipe PostFormValues
  async function onSubmit(values: PostFormValues) {
    setIsLoading(true);
    try {
      // Pilih skema yang tepat untuk validasi & transformasi akhir
      const schemaToUse = isUpdateMode ? postUpdateSchema : postCreateSchema;
      const validatedAndTransformedData = schemaToUse.parse(values);

      const method = isUpdateMode ? "PUT" : "POST";
      const url = isUpdateMode
        ? `/api/admin/posts/${initialData.slug}`
        : "/api/admin/posts";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedAndTransformedData),
      });

      if (!response.ok) throw new Error("Gagal menyimpan postingan.");

      toast.success(
        `Postingan berhasil ${isUpdateMode ? "diperbarui" : "disimpan"}!`
      );
      router.push("/dashboard/posts");
      router.refresh();
    } catch (error) {
      // Menampilkan error validasi Zod dengan lebih baik
      if (error instanceof z.ZodError) {
        toast.error("Validasi gagal", {
          description: error.errors
            .map((e) => `${e.path.join(".")}: ${e.message}`)
            .join("\n"),
        });
      } else {
        toast.error(
          error instanceof Error ? error.message : "Terjadi kesalahan."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
      >
        <div className="lg:col-span-2 space-y-8">
          <MainContentFields control={form.control} />
        </div>
        <MetadataSidebar
          control={form.control}
          setValue={form.setValue}
          isUpdate={isUpdateMode}
          category={category as "Artikel" | "Event"}
          isLoading={isLoading}
        />
      </form>
    </Form>
  );
}
