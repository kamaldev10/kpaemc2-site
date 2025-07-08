// app/posts/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { PostsData } from "@/lib/dummy-data/PostsData";
import { MapPin, Calendar, Clock, Ticket, ExternalLink } from "lucide-react";

export type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  props: Pick<PageProps, "params">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = PostsData.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.imageUrl,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function PostDetailPage(props: PageProps) {
  const { slug } = await props.params;
  const post = PostsData.find((p) => p.slug === slug);

  if (!post) return notFound();

  return (
    <div className="max-w-3xl px-4 mx-auto py-10">
      <div className="relative w-full h-[300px] mb-6 rounded-lg overflow-hidden">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
        {post.title}
      </h1>
      <p className="text-sm text-gray-500 mb-4">
        {post.category === "Artikel"
          ? `By ${post.author} • ${post.readTime}`
          : `${post.location} • ${post.eventDate}`}
      </p>

      <div className="text-base text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line">
        {post.description}
      </div>

      {post.category === "Event" && (
        <div className="mt-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Detail Event
          </h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-3">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" /> Lokasi:{" "}
              {post.location}
            </li>
            <li className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-600" /> Tanggal:{" "}
              {post.eventDate}
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-600" /> Waktu:{" "}
              {post.eventTime}
            </li>

            <li className="flex items-center gap-2">
              <Ticket className="w-4 h-4 text-red-500" /> Harga: {post.price}
            </li>

            <li className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-cyan-600" />
              <a
                href={post.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Link Pendaftaran
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
