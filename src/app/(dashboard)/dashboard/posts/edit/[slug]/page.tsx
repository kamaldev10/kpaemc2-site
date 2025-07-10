// app/dashboard/posts/edit/[slug]/page.tsx
import PostForm from "@/components/dashboard/posts/PostForm";
import { PostsData } from "@/lib/dummy-data/PostsData";
import { notFound } from "next/navigation";

// Komponen Halaman (Server Component) untuk mengambil data
export default async function EditPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  // 1. Ambil data postingan yang akan di-edit berdasarkan slug
  // Di aplikasi nyata, ini akan menjadi panggilan ke database atau API
  const postToEdit = PostsData.find((p) => p.slug === slug);

  // 2. Jika postingan dengan slug tersebut tidak ada, tampilkan halaman 404
  if (!postToEdit) {
    notFound();
  }

  // 3. Render komponen PostForm dan kirim data sebagai 'initialData'
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="space-y-1">
        <h1 className="text-lg font-semibold md:text-2xl">Update Postingan</h1>
        <p className="text-sm text-muted-foreground">
          Ubah field di bawah ini untuk memperbarui postingan:{" "}
          <span className="font-medium text-primary">
            &quot;{postToEdit.title}&quot;
          </span>
        </p>
      </div>

      {/* Kita menggunakan komponen PostForm yang sama persis dengan halaman 'Tambah Baru'.
         Dengan memberikan prop 'initialData', form akan otomatis terisi.
       */}
      <PostForm initialData={postToEdit} />
    </div>
  );
}
