// app/(public)/posts/[slug]/page.tsx

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PostsData } from "@/lib/dummy-data/PostsData";
import PostDetailView from "@/components/public/post/PostDetailView";

type PageProps = {
  params: Promise<{ slug: string }>; // Ubah tipe menjadi Promise
};

// Fungsi generateMetadata untuk SEO dinamis
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // PERBAIKAN: Await params sebelum mengakses propertinya
  const { slug } = await params;
  const post = PostsData.find((p) => p.slug === slug);

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
  // PERBAIKAN: Await params sebelum mengakses propertinya
  const { slug } = await params;

  // 1. Ambil data di server
  const post = PostsData.find((p) => p.slug === slug);

  // 2. Jika tidak ada data, tampilkan halaman 404
  if (!post) {
    return notFound();
  }

  // 3. Render komponen tampilan dan kirim data sebagai props
  return <PostDetailView post={post} />;
}
