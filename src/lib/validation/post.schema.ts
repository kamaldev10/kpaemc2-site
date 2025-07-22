// post.schema.ts (simplified snippet)
import { z } from "zod";

export const postFormInputSchema = z.object({
  title: z.string().min(5),
  slug: z
    .string()
    .min(5)
    .regex(/^[a-z0-9-]+$/, "Hanya huruf kecil, angka, dan strip."),
  excerpt: z.string().min(20).max(500),
  description: z.string().min(50),
  descriptionSource: z.string().optional(),
  imageUrl: z.string().min(1, "Gambar unggulan wajib dipilih."),
  imageSource: z.string().optional(),
  date: z.date(),
  category: z.enum(
    [
      "Artikel",
      "Kegiatan",
      "Rilis Kegiatan",
      "Kolaborasi",
      "Pengalaman Pribadi",
    ],
    {
      required_error: "Kategori harus dipilih.",
    }
  ),
  tags: z.string().min(1),
  featured: z.boolean().default(false),
  author: z.string().optional(),
});

export const postCreateSchema = postFormInputSchema.transform((data) => {
  const {
    tags,
    description,

    ...rest
  } = data;

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
  };
});

export const postUpdateSchema = postFormInputSchema
  .partial()
  .transform((data) => {
    const {
      tags,
      description,

      ...rest
    } = data;

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
    };
  });

export type PostFormValues = z.input<typeof postFormInputSchema>;
