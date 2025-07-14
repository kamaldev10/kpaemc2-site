import { z } from "zod";
import { format } from "date-fns";

// Skema ini mendefinisikan bentuk data mentah yang datang dari form
export const postFormInputSchema = z.object({
  title: z.string().min(5, "Judul wajib diisi."),
  slug: z
    .string()
    .min(5, "Slug wajib diisi.")
    .regex(/^[a-z0-9-]+$/, "Hanya huruf kecil, angka, dan strip."),
  excerpt: z.string().min(20, "Kutipan singkat wajib diisi.").max(250),
  description: z.string().min(50, "Deskripsi wajib diisi."),
  imageUrl: z
    .string()
    .url("URL gambar tidak valid.")
    .min(1, "URL Gambar wajib diisi."),
  date: z.date({ required_error: "Tanggal publikasi wajib diisi." }),
  category: z
    .string({ required_error: "Kategori harus dipilih." })
    .min(1, "Kategori tidak boleh kosong."),
  tags: z.string().min(1, "Minimal satu tag wajib diisi."),
  featured: z.boolean().default(false),
  author: z.string().optional(),
  readTime: z.string().optional(),
  location: z.string().optional(),
  eventStartDate_Date: z.date().optional(),
  eventStartDate_Time: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Format waktu salah.")
    .optional()
    .or(z.literal("")),
  eventEndDate_Date: z.date().optional(),
  eventEndDate_Time: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Format waktu salah.")
    .optional()
    .or(z.literal("")),
  price: z.string().optional(),
  registrationLink: z
    .string()
    .url("URL tidak valid.")
    .optional()
    .or(z.literal("")),
});

// Skema untuk membuat data baru
export const postCreateSchema = postFormInputSchema
  .transform((data) => {
    // PERBAIKAN: Gunakan 'tags' dari hasil destructuring
    const {
      eventStartDate_Date,
      eventStartDate_Time,
      eventEndDate_Date,
      eventEndDate_Time,
      tags,
      ...rest
    } = data;

    let eventStartDate: Date | undefined = undefined;
    if (eventStartDate_Date && eventStartDate_Time) {
      const dateStr = format(eventStartDate_Date, "yyyy-MM-dd");
      eventStartDate = new Date(`${dateStr}T${eventStartDate_Time}:00`);
    }

    let eventEndDate: Date | undefined = undefined;
    if (eventEndDate_Date && eventEndDate_Time) {
      const dateStr = format(eventEndDate_Date, "yyyy-MM-dd");
      eventEndDate = new Date(`${dateStr}T${eventEndDate_Time}:00`);
    }

    return {
      ...rest,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      eventStartDate,
      eventEndDate,
    };
  })
  .refine(
    (data) => {
      if (data.category === "Event")
        return !!data.location && !!data.eventStartDate;
      return true;
    },
    {
      message: "Lokasi dan Waktu Mulai Acara wajib diisi untuk kategori Event.",
      path: ["location"],
    }
  );

// Skema untuk mengupdate data
export const postUpdateSchema = postFormInputSchema
  .partial() // Buat semua field menjadi opsional
  .transform((data) => {
    const {
      eventStartDate_Date,
      eventStartDate_Time,
      eventEndDate_Date,
      eventEndDate_Time,
      tags,
      ...rest
    } = data;

    let eventStartDate: Date | undefined = undefined;
    if (eventStartDate_Date && eventStartDate_Time) {
      const dateStr = format(eventStartDate_Date, "yyyy-MM-dd");
      eventStartDate = new Date(`${dateStr}T${eventStartDate_Time}:00`);
    }

    let eventEndDate: Date | undefined = undefined;
    if (eventEndDate_Date && eventEndDate_Time) {
      const dateStr = format(eventEndDate_Date, "yyyy-MM-dd");
      eventEndDate = new Date(`${dateStr}T${eventEndDate_Time}:00`);
    }

    const tagsArray = tags
      ? tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : undefined;

    return {
      ...rest,
      tags: tagsArray,
      eventStartDate,
      eventEndDate,
    };
  });

// Tipe ini untuk nilai mentah dari form, sebelum transformasi
export type PostFormValues = z.infer<typeof postFormInputSchema>;
