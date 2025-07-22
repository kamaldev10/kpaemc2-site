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
    featured: post.featured ?? false,
    author: post.author ?? "",
    descriptionSource: post.descriptionSource ?? "",
    imageSource: post.imageSource ?? "",
  };
}
