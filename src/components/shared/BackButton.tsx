// src/components/shared/BackButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button variant="ghost" onClick={() => router.back()} className="mb-8">
      <ArrowLeft className="mr-2 h-4 w-4" />
      Kembali
    </Button>
  );
}
