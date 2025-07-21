import { format } from "date-fns";
import { type Post } from "@/types/Post";
import { type PostFormValues } from "@/lib/validation/post.schema";

/**
 * Membersihkan dan memformat data Post dari database agar cocok
 * dengan nilai default yang diharapkan oleh AdminPostForm.
 * @param post - Data postingan dari database.
 * @returns Objek yang siap digunakan sebagai defaultValues di react-hook-form.
 */
export function sanitizePostInitialData(post: Post): PostFormValues {
  return {
    ...post,
    date: new Date(post.date),
    tags: Array.isArray(post.tags) ? post.tags.join(", ") : "",
    description: Array.isArray(post.description)
      ? post.description.join("\n\n")
      : post.description,

    // PERBAIKAN UTAMA: Konversi null/undefined menjadi nilai default yang valid
    featured: post.featured ?? false,
    author: post.author ?? "",
    readTime: post.readTime ?? undefined,
    location: post.location ?? "",
    price: post.price ?? "",
    registrationLink: post.registrationLink ?? "",

    // Pisahkan DateTime menjadi Date dan Time untuk form
    eventStartDate_Date: post.eventStartDate
      ? new Date(post.eventStartDate)
      : undefined,
    eventStartDate_Time: post.eventStartDate
      ? format(new Date(post.eventStartDate), "HH:mm")
      : "",
    eventEndDate_Date: post.eventEndDate
      ? new Date(post.eventEndDate)
      : undefined,
    eventEndDate_Time: post.eventEndDate
      ? format(new Date(post.eventEndDate), "HH:mm")
      : "",
  };
}
