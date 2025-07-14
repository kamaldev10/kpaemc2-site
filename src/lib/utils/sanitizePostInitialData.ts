import { format } from "date-fns";
import { Post } from "@/types/Post";
import { PostFormValues } from "@/lib/validation/post.schema";

export function sanitizePostInitialData(initialData: Post): PostFormValues {
  return {
    title: initialData.title ?? "",
    slug: initialData.slug ?? "",
    excerpt: initialData.excerpt ?? "",
    description: Array.isArray(initialData.description)
      ? initialData.description.join("\n\n")
      : initialData.description ?? "",
    imageUrl: initialData.imageUrl ?? "",
    date: initialData.date ? new Date(initialData.date) : new Date(),
    category: initialData.category ?? "Artikel",
    tags: Array.isArray(initialData.tags)
      ? initialData.tags.join(", ")
      : initialData.tags ?? "",
    featured: initialData.featured ?? false,
    author: initialData.author ?? undefined,
    location: initialData.location ?? undefined,
    price: initialData.price ?? undefined,
    registrationLink: initialData.registrationLink ?? undefined,

    eventStartDate_Date: initialData.eventStartDate
      ? new Date(initialData.eventStartDate)
      : undefined,
    eventStartDate_Time: initialData.eventStartDate
      ? format(new Date(initialData.eventStartDate), "HH:mm")
      : "",
    eventEndDate_Date: initialData.eventEndDate
      ? new Date(initialData.eventEndDate)
      : undefined,
    eventEndDate_Time: initialData.eventEndDate
      ? format(new Date(initialData.eventEndDate), "HH:mm")
      : "",
  };
}
