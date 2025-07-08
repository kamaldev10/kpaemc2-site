// src/components/public/sections/HeroSection.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

// Embla Carousel
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Shadcn UI & Icons
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

// Impor data dan tipe dari file terpisah
import DUMMY_HERO_EVENTS from "@/lib/dummy-data/HeroData";

// Komponen utama Hero Carousel
export default function HeroSection() {
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

  return (
    <section className="relative w-full embla">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex embla__container">
          {DUMMY_HERO_EVENTS.map((event, index) => (
            <div
              key={event.id}
              className="relative h-[85dvh] min-w-0 embla__slide"
            >
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              <div className="pointer-events-none absolute inset-0 flex flex-col items-start justify-end p-8 md:p-12 lg:p-16">
                <div className="w-full max-w-3xl text-left">
                  <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                    {event.title}
                  </h1>
                  <p className="mt-4 line-clamp-3 text-lg leading-8 text-gray-200">
                    {event.description}
                  </p>
                  <Button
                    asChild
                    className="pointer-events-auto mt-6"
                    size="lg"
                  >
                    <Link href={event.href}>
                      Lihat Detail Event
                      <MoveRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 transform items-center justify-center gap-2">
        {DUMMY_HERO_EVENTS.map((_, index) => (
          <button
            key={index}
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
