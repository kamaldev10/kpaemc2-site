"use client";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// Impor
import {
  postFormInputSchema,
  type PostFormValues,
} from "@/lib/validation/post.schema";
import { type Post } from "@/types/Post";
import MainContentFields from "./MainContentFields";
import MetadataSidebar from "./MetadataSidebar";
import { generateSlug } from "@/lib/utils/utils";
import ImageUploadModal from "@/components/shared/ImageUploadModal";
import { sanitizePostInitialData } from "@/lib/utils/sanitizePostInitialData";

type PostFormProps = {
  initialData?: Post;
};

export default function AdminPostForm({ initialData }: PostFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State untuk menyimpan FILE yang akan diunggah dan URL PRATINJAU-nya
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.imageUrl || null
  );

  const isUpdateMode = !!initialData;

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormInputSchema),

    defaultValues: initialData
      ? sanitizePostInitialData(initialData)
      : {
          // Nilai default untuk form baru
          title: "",
          slug: "",
          excerpt: "",
          description: "",
          descriptionSource: "",
          imageUrl: "",
          imageSource: "",
          category: "Kegiatan",
          date: new Date(),
          tags: "",
          featured: false,
        },
    mode: "onChange",
  });

  const watchedTitle = form.watch("title");

  useEffect(() => {
    if (watchedTitle && !form.formState.dirtyFields.slug) {
      const newSlug = generateSlug(watchedTitle);
      form.setValue("slug", newSlug, { shouldValidate: true });
    }
  }, [watchedTitle, form.setValue, form.formState.dirtyFields.slug, form]);

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    form.setValue("imageUrl", "");
  };

  const onError = (errors: unknown) => {
    console.error("FORM VALIDATION ERRORS:", errors);
    toast.error("Validasi Gagal", {
      description:
        "Silakan periksa kembali semua field yang wajib diisi dan pastikan formatnya benar.",
    });
  };

  async function onSubmit(values: PostFormValues) {
    setIsLoading(true);
    try {
      // 1. Buat satu FormData untuk semua data (teks dan file)
      const formData = new FormData();

      // 2. Tambahkan semua data teks dari form ke FormData
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          // Konversi nilai non-string jika perlu
          if (value instanceof Date) {
            formData.append(key, value.toISOString());
          } else if (typeof value === "boolean") {
            formData.append(key, String(value));
          } else {
            formData.append(key, value as string);
          }
        }
      });

      // 3. Jika ada file baru yang dipilih, tambahkan ke FormData
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      // 4. Kirim satu request tunggal ke API
      const method = isUpdateMode ? "PUT" : "POST";
      const url = isUpdateMode
        ? `/api/admin/posts/${initialData.slug}`
        : "/api/admin/posts";

      const response = await fetch(url, {
        method,
        body: formData, // Kirim FormData, bukan JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menyimpan data.");
      }

      toast.success(
        `Postingan berhasil ${isUpdateMode ? "diperbarui" : "disimpan"}!`
      );
      router.push("/dashboard/posts");
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
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
      >
        <div className="lg:col-span-2 space-y-8">
          <MainContentFields />
        </div>
        <MetadataSidebar
          control={form.control}
          isUpdate={isUpdateMode}
          imagePreview={imagePreview}
          imageFilename={selectedFile?.name}
          onImageSelectClick={() => setIsModalOpen(true)}
          onImageRemove={handleRemoveImage}
          isLoading={isLoading}
          isTitleFilled={!!watchedTitle}
        />
        <ImageUploadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onFileSelect={(file) => {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
            form.setValue("imageUrl", file.name, { shouldValidate: true });
          }}
        />
      </form>
    </FormProvider>
  );
}
