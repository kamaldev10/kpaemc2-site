import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { type Post } from "@/types/Post";

// Fungsi untuk memformat tanggal
const formatDate = (date: string | Date) =>
  new Date(date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

// Komponen ini sekarang menerima 'posts' sebagai prop
type LatestPostsProps = {
  posts: Post[];
};

export default function LatestPostsSection({ posts }: LatestPostsProps) {
  // Jika tidak ada postingan, jangan tampilkan section ini
  if (!posts || posts.length === 0) {
    return null;
  }

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case "Artikel":
        return "secondary";
      case "Kegiatan":
        return "default";
      case "Rilis Kegiatan":
        return "release";
      case "Kolaborasi":
        return "collaboration";
      default:
        return "secondary";
    }
  };

  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-screen-xl px-4 md:px-6">
        {/* Header Section */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Terbaru dari Kami
          </h2>
          <p className="mt-2 text-lg leading-8 text-muted-foreground">
            Jelajahi artikel, berita, dan pengumuman acara terbaru dari
            organisasi kami.
          </p>
        </div>

        {/* Grid untuk Postingan */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Gunakan data 'posts' dari props */}
          {posts.map((post) => (
            <article
              key={post.id}
              className="group relative flex transform flex-col items-start transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="relative w-full overflow-hidden rounded-2xl bg-muted shadow-md aspect-[16/9]">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 w-full">
                <div className="flex items-center gap-x-4 text-xs">
                  <time
                    dateTime={
                      typeof post.date === "string"
                        ? post.date
                        : post.date.toISOString()
                    }
                    className="text-muted-foreground"
                  >
                    {formatDate(post.date)}
                  </time>
                  <Badge variant={getCategoryBadgeVariant(post.category)}>
                    {post.category}
                  </Badge>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-6 text-foreground group-hover:text-primary transition-colors">
                  <Link href={`/posts/${post.slug}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-4 sm:mt-16 text-center">
          <Button asChild variant="outline">
            <Link href="/posts">
              Selengkapnya
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
