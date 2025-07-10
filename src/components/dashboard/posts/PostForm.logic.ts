// src/components/dashboard/posts/PostForm.logic.ts
import * as z from "zod";

export const postFormSchema = z.object({
  title: z.string().min(5, "Judul harus memiliki minimal 5 karakter."),
  slug: z
    .string()
    .min(5, "Slug harus memiliki minimal 5 karakter.")
    .refine((s) => !s.includes(" "), "Slug tidak boleh mengandung spasi."),
  excerpt: z
    .string()
    .min(20, "Kutipan singkat minimal 20 karakter.")
    .max(200, "Kutipan singkat maksimal 200 karakter."),
  description: z.string().min(50, "Deskripsi minimal 50 karakter."),
  imageUrl: z.string().url("URL gambar tidak valid."),
  date: z.date({ required_error: "Tanggal publikasi harus diisi." }),
  category: z.enum(["Artikel", "Event"], {
    required_error: "Kategori harus dipilih.",
  }),
  tags: z.string().min(1, "Minimal harus ada satu tag."),
  featured: z.boolean().optional(), // Diubah: Menjadi opsional

  // Opsional, tergantung kategori
  author: z.string().optional(),
  readTime: z.string().optional(), // Diubah dari 'readTime' menjadi string, atau number jika Anda mau
  location: z.string().optional(),
  eventDate: z.string().optional(),
  eventTime: z.string().optional(),
  registrationLink: z
    .string()
    .url("URL pendaftaran tidak valid.")
    .optional()
    .or(z.literal("")), // Izinkan string kosong
  price: z.string().optional(),
});

export type PostFormValues = z.infer<typeof postFormSchema>;
