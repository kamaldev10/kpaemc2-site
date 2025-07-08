// src/components/public/posts/PostCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { type Post } from "@/types/Post";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={post.href}
      className="group grid grid-cols-1 md:grid-cols-3 gap-6 items-start rounded-xl border bg-card p-4 hover:bg-muted/50 transition-colors duration-300"
    >
      <div className="relative w-full h-48 md:h-full rounded-lg overflow-hidden md:col-span-1">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col h-full md:col-span-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <Badge variant={post.category === "Event" ? "default" : "secondary"}>
            {post.category}
          </Badge>
          <span>
            {new Date(post.date).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <h2 className="font-semibold text-xl text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h2>
        <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags?.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
