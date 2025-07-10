// app/dashboard/posts/new/page.tsx
import PostForm from "@/components/dashboard/posts/PostForm";

export default function NewPostPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <h1 className="text-lg font-semibold md:text-2xl">
        Tambah Postingan Baru
      </h1>
      <p className="text-sm text-muted-foreground">
        Isi semua field di bawah ini untuk membuat postingan baru.
      </p>
      <PostForm />
    </div>
  );
}
