import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PostService } from "@/services/post.service"; // <-- 1. Impor Service
import PostDetailView from "@/components/public/post/PostDetailView";

type PageProps = {
  params: { slug: string };
};

// Fungsi generateMetadata untuk SEO dinamis
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = params; // <-- Akses langsung tanpa 'await'

  // Ambil data dari database untuk metadata
  const post = await PostService.getBySlug(slug);

  if (!post) {
    return { title: "Postingan Tidak Ditemukan" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.imageUrl, alt: post.title }],
    },
  };
}

// Komponen Halaman (Server Component)
export default async function PostPage({ params }: PageProps) {
  const { slug } = params; // <-- Akses langsung tanpa 'await'

  // 1. Ambil data di server menggunakan service
  const post = await PostService.getBySlug(slug);

  // 2. Jika tidak ada data, tampilkan halaman 404
  if (!post) {
    return notFound();
  }

  // 3. Render komponen tampilan dan kirim data sebagai props
  // Pastikan Anda sudah membuat komponen PostDetailView seperti di langkah sebelumnya
  return <PostDetailView post={post} />;
}
