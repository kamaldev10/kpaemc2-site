// src/components/public/posts/PostDetailView.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { type Post } from "@/types/Post";
import BackButton from "@/components/shared/BackButton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  User,
  Clock,
  Tag,
  MapPin,
  Ticket,
  ExternalLink,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type PostDetailProps = {
  post: Post;
};

const formatEventDateTime = (
  start?: Date | string | null,
  end?: Date | string | null
) => {
  if (!start) return { date: null, time: null };

  const startDate = new Date(start);
  const endDate = end ? new Date(end) : null;

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  };

  const formattedStartDate = startDate.toLocaleDateString("id-ID", dateOptions);
  const formattedStartTime = startDate.toLocaleTimeString("id-ID", timeOptions);

  // Jika tidak ada tanggal akhir atau tanggalnya sama
  if (!endDate || endDate.toDateString() === startDate.toDateString()) {
    const formattedEndTime = endDate
      ? endDate.toLocaleTimeString("id-ID", timeOptions)
      : null;
    return {
      date: formattedStartDate,
      time: formattedEndTime
        ? `${formattedStartTime} - ${formattedEndTime}`
        : formattedStartTime,
    };
  }

  // Jika tanggalnya berbeda (multi-day event)
  const formattedEndDate = endDate.toLocaleDateString("id-ID", dateOptions);
  const formattedEndTime = endDate.toLocaleTimeString("id-ID", timeOptions);

  return {
    date: `${formattedStartDate} - ${formattedEndDate}`,
    time: `${formattedStartTime} - ${formattedEndTime}`,
  };
};

export default function PostDetailView({ post }: PostDetailProps) {
  const isEvent = post.category === "Event";
  const { date: eventDateDisplay, time: eventTimeDisplay } =
    formatEventDateTime(post.eventStartDate, post.eventEndDate);

  const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <main>
      {/* Header Imersif dengan Gambar */}
      <header className="relative h-[45vh] md:h-[60vh] w-full">
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
              variant={post.category === "Event" ? "default" : "secondary"}
            >
              {post.category}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl drop-shadow-lg">
              {post.title}
            </h1>
          </div>
        </div>
      </header>

      {/* Konten Utama */}
      <div className="mx-auto max-w-4xl px-4 md:px-6 py-8">
        <BackButton>Kembali</BackButton>
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
          {post.readTime && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} menit baca</span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8">
          <div className={isEvent ? "lg:col-span-3" : "lg:col-span-4"}>
            <div className="prose prose-lg dark:prose-invert max-w-none text-justify indent-6">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {Array.isArray(post.description)
                  ? post.description.join("\n\n")
                  : post.description}
              </ReactMarkdown>
            </div>
          </div>

          {/* Panel Detail Event (Sidebar) */}
          {isEvent && (
            <aside className="lg:col-span-1 mt-8 lg:mt-0">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Detail Event</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {eventDateDisplay && (
                    <div className="flex items-start gap-3">
                      <Calendar className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                      <div>
                        <p className="font-semibold text-sm">Tanggal</p>
                        <p className="text-xs text-muted-foreground">
                          {eventDateDisplay}
                        </p>
                      </div>
                    </div>
                  )}
                  {eventTimeDisplay && (
                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                      <div>
                        <p className="font-semibold text-sm">Waktu</p>
                        <p className="text-muted-foreground text-xs">
                          {eventTimeDisplay}
                        </p>
                      </div>
                    </div>
                  )}
                  {post.location && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                      <div>
                        <p className="font-semibold text-sm">Lokasi</p>
                        <p className="text-sm text-muted-foreground text-xs">
                          {post.location}
                        </p>
                      </div>
                    </div>
                  )}
                  {post.price && (
                    <div className="flex items-start gap-3">
                      <Ticket className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                      <div>
                        <p className="font-semibold text-sm">Harga Tiket</p>
                        <p className="text-sm text-muted-foreground">
                          {post.price}
                        </p>
                      </div>
                    </div>
                  )}
                  {post.registrationLink && (
                    <Button asChild className="w-full mt-4">
                      <Link
                        href={post.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs"
                      >
                        <ExternalLink className="mr-1 h-4 w-4" />
                        Daftar Sekarang
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </aside>
          )}
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
