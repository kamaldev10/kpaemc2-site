"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { type Post } from "@/types/Post"; // Impor tipe Post terpusat Anda

// Embla Carousel
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Shadcn UI & Icons
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

// Komponen ini sekarang menerima 'posts' sebagai prop
type HeroSectionProps = {
  posts: Post[];
};

export default function HeroSection({ posts }: HeroSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Jika tidak ada postingan, jangan tampilkan apa-apa
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {/* Gunakan data 'posts' dari props */}
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="relative h-[85dvh] min-w-0 flex-[0_0_100%]"
            >
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority={index === 0} // Prioritaskan gambar pertama
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              <div className="pointer-events-none absolute inset-0 flex flex-col items-start justify-end p-8 md:p-12 lg:p-16">
                <div className="w-full max-w-3xl text-left">
                  <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                    {post.title}
                  </h1>
                  <p className="mt-4 line-clamp-2 sm:line-clamp-3 text-base sm:text-lg text-gray-200">
                    {post.excerpt}
                  </p>
                  <Button
                    asChild
                    className="pointer-events-auto mt-6"
                    size="lg"
                  >
                    {/* Perbaiki link agar dinamis berdasarkan slug */}
                    <Link href={`/posts/${post.slug}`}>
                      Lihat Detail
                      <MoveRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigasi Titik */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 transform items-center justify-center gap-2">
        {posts.map((post, index) => (
          <button
            key={post.id}
            onClick={() => scrollTo(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === selectedIndex ? "w-8 bg-primary" : "w-4 bg-primary/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
