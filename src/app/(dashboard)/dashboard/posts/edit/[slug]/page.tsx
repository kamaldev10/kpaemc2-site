import { notFound } from "next/navigation";
import { PostService } from "@/services/post.service"; // Impor service
import AdminPostForm from "@/components/dashboard/posts/AdminPostForm";
import BackButton from "@/components/shared/BackButton";

// Komponen Halaman (Server Component) untuk mengambil data
export default async function EditPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  // 1. Ambil data postingan dari database melalui service
  const postToEdit = await PostService.getBySlug(slug);

  // 2. Jika postingan tidak ditemukan, tampilkan halaman 404
  if (!postToEdit) {
    return notFound();
  }

  // 3. Render komponen form dan kirim data sebagai 'initialData'
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="flex">
        <BackButton className="mb-0" />
        <h1 className="text-lg font-semibold md:text-2xl">Update Postingan</h1>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">
          Ubah field di bawah ini untuk memperbarui postingan:{" "}
          <span className="font-medium text-primary">
            &quot;{postToEdit.title}&quot;
          </span>
        </p>
      </div>
      <AdminPostForm initialData={postToEdit} />
    </div>
  );
}
