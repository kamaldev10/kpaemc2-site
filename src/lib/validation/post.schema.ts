// post.schema.ts (simplified snippet)
import { z } from "zod";
import { format } from "date-fns";

export const postFormInputSchema = z.object({
  title: z.string().min(5),
  slug: z
    .string()
    .min(5)
    .regex(/^[a-z0-9-]+$/, "Hanya huruf kecil, angka, dan strip."),
  excerpt: z.string().min(20).max(250),
  description: z.string().min(50),
  imageUrl: z.string().min(1, "Gambar unggulan wajib dipilih."),
  date: z.date(),
  category: z.string().min(1),
  tags: z.string().min(1),
  featured: z.boolean().default(false),
  author: z.string().optional(),
  readTime: z.coerce
    .number()
    .int("Harus angka bulat")
    .positive("Harus angka positif")
    .optional(),
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
  registrationLink: z.string().url().optional().or(z.literal("")),
});

export const postCreateSchema = postFormInputSchema.transform((data) => {
  const {
    tags,
    description,
    eventStartDate_Date,
    eventStartDate_Time,
    eventEndDate_Date,
    eventEndDate_Time,
    readTime,
    ...rest
  } = data;

  const eventStartDate =
    eventStartDate_Date instanceof Date && eventStartDate_Time
      ? new Date(
          `${format(
            eventStartDate_Date,
            "yyyy-MM-dd"
          )}T${eventStartDate_Time}:00`
        )
      : undefined;

  const eventEndDate =
    eventEndDate_Date instanceof Date && eventEndDate_Time
      ? new Date(
          `${format(eventEndDate_Date, "yyyy-MM-dd")}T${eventEndDate_Time}:00`
        )
      : undefined;

  return {
    ...rest,
    tags:
      typeof tags === "string"
        ? tags
            .split(",")
            .map((t: string) => t.trim())
            .filter(Boolean)
        : [],
    // description:
    //   typeof description === "string"
    //     ? description
    //         .split("\n\n")
    //         .map((p: string) => p.trim())
    //         .filter(Boolean)
    //     : [],

    description,
    eventStartDate,
    eventEndDate,
    readTime,
  };
});

export const postUpdateSchema = postFormInputSchema
  .partial()
  .transform((data) => {
    const {
      tags,
      description,
      eventStartDate_Date,
      eventStartDate_Time,
      eventEndDate_Date,
      eventEndDate_Time,
      readTime,
      ...rest
    } = data;

    let eventStartDate: Date | undefined = undefined;
    if (
      eventStartDate_Date instanceof Date &&
      typeof eventStartDate_Time === "string" &&
      eventStartDate_Time.trim() !== ""
    ) {
      const dateStr = format(eventStartDate_Date, "yyyy-MM-dd");
      eventStartDate = new Date(`${dateStr}T${eventStartDate_Time}:00`);
    }

    let eventEndDate: Date | undefined = undefined;
    if (
      eventEndDate_Date instanceof Date &&
      typeof eventEndDate_Time === "string" &&
      eventEndDate_Time.trim() !== ""
    ) {
      const dateStr = format(eventEndDate_Date, "yyyy-MM-dd");
      eventEndDate = new Date(`${dateStr}T${eventEndDate_Time}:00`);
    }

    const transformedTags =
      typeof tags === "string"
        ? tags
            .split(",")
            .map((t: string) => t.trim())
            .filter(Boolean)
        : undefined;

    // const transformedDescription =
    //   typeof description === "string"
    //     ? description
    //         .split("\n\n")
    //         .map((p: string) => p.trim())
    //         .filter(Boolean)
    //     : undefined;
    const transformedDescription = description;

    return {
      ...rest,
      tags: transformedTags,
      description: transformedDescription,
      eventStartDate,
      eventEndDate,
      readTime,
    };
  });

export type PostFormValues = z.input<typeof postFormInputSchema>;
