// src/components/public/posts/PostDetailView.tsx
"use client";

import Image from "next/image";
import { type Post } from "@/types/Post";
import BackButton from "@/components/shared/BackButton";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type PostDetailProps = {
  post: Post;
};

export default function PostDetailView({ post }: PostDetailProps) {
  const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

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
    <main>
      {/* Header Imersif dengan Gambar */}
      <header className="relative h-[45vh] md:h-[70vh] w-full">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            <Badge
              variant={getCategoryBadgeVariant(post.category)}
              className="mb-2"
            >
              {post.category}
            </Badge>{" "}
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl drop-shadow-lg">
              {post.title}
            </h1>
          </div>
        </div>
      </header>

      {/* Konten Utama */}
      <div className="mx-auto max-w-4xl px-4 md:px-6 pb-8">
        <BackButton className="my-4">Kembali</BackButton>
        {/* Meta Info Bar */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground mb-6 py-4 border-y">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Dipublikasikan pada {formatDate(post.date)}</span>
          </div>
          {post.author && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Oleh {post.author}</span>
            </div>
          )}
        </div>
        <div className="flex-row">
          <div className="prose prose-lg dark:prose-invert max-w-none text-justify indent-6">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {Array.isArray(post.description)
                ? post.description.join("\n\n")
                : post.description}
            </ReactMarkdown>
          </div>
          <p>{post.descriptionSource}</p>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 border-t pt-6">
            <div className="flex flex-wrap items-center gap-3">
              <Tag className="h-5 w-5 text-muted-foreground" />
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
