"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

// Definisikan props yang bisa diterima oleh komponen
type BackButtonProps = {
  href?: string; // Opsional: jika ingin mengarah ke URL spesifik
  children?: React.ReactNode; // Opsional: untuk teks custom
  className?: string; // Opsional: untuk styling tambahan
};

export default function BackButton({
  href,
  children,
  className,
}: BackButtonProps) {
  const router = useRouter();

  // Tentukan teks default jika tidak ada children yang diberikan
  const buttonText = children || "";

  // Jika href diberikan, gunakan komponen Link dari Next.js
  if (href) {
    return (
      <Button variant="ghost" className={cn("mb-8", className)} asChild>
        <Link href={href}>
          <ChevronLeft className="mr-2 h-6 w-6" />
          {buttonText}
        </Link>
      </Button>
    );
  }

  // Jika tidak ada href, gunakan fungsi router.back()
  return (
    <Button
      variant="ghost"
      onClick={() => router.back()}
      className={cn("mb-8", className)}
    >
      <ChevronLeft className="mr-2 h-6 w-6" />
      {buttonText}
    </Button>
  );
}
