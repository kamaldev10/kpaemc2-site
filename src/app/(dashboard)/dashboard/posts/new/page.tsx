// app/dashboard/posts/new/page.tsx
import AdminPostForm from "@/components/dashboard/posts/AdminPostForm";
import BackButton from "@/components/shared/BackButton";

export default function NewPostPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="flex">
        <BackButton className="mb-0" />
        <h1 className="text-lg font-semibold md:text-2xl">
          Tambah Postingan Baru
        </h1>
      </div>
      <p className="text-sm text-muted-foreground">
        Isi semua field di bawah ini untuk membuat postingan baru.
      </p>
      <AdminPostForm />
    </div>
  );
}
