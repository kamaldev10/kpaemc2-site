// app/about/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AboutData } from "@/lib/dummy-data/AboutData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  // Ambil daftar tahun/periode dari data
  const periods = AboutData.structure.map((s) => s.period);

  // State untuk menyimpan periode yang dipilih, defaultnya adalah periode aktif
  const [selectedPeriod, setSelectedPeriod] = useState(AboutData.activePeriod);

  // Cari data struktur berdasarkan periode yang dipilih
  const currentStructureData = AboutData.structure.find(
    (s) => s.period === selectedPeriod
  );

  return (
    <div className="bg-background">
      <div className="max-w-5xl px-4 py-16 mx-auto space-y-20 sm:py-24">
        {/* Section Header */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Tentang <span className="text-primary">{AboutData.orgName}</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
            {AboutData.description}
          </p>
        </motion.section>

        {/* Section Visi & Misi */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div>
            <h2 className="text-3xl font-semibold text-foreground mb-4 border-l-4 border-primary pl-4">
              Visi
            </h2>
            <p className="text-muted-foreground">{AboutData.vision}</p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-foreground mb-4 border-l-4 border-primary pl-4">
              Misi
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              {AboutData.mission.map((misi, i) => (
                <li key={i}>{misi}</li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Section Struktur Kepengurusan */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              Struktur Kepengurusan
            </h2>
            <p className="text-muted-foreground mt-4 mb-6">
              Pilih periode kepengurusan untuk melihat bagan struktur
              organisasi.
            </p>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[280px] mx-auto">
                <SelectValue placeholder="Pilih Periode" />
              </SelectTrigger>
              <SelectContent>
                {periods.map((period) => (
                  <SelectItem key={period} value={period}>
                    Periode {period}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Card className="overflow-hidden">
            <CardContent className="p-4 md:p-6">
              {currentStructureData && currentStructureData.image ? (
                <Image
                  src={currentStructureData.image}
                  alt={`Struktur Organisasi Periode ${currentStructureData.period}`}
                  width={800}
                  height={1200}
                  className="w-full h-auto rounded-lg"
                />
              ) : (
                <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
                  <p className="text-center text-muted-foreground">
                    Gambar struktur untuk periode {selectedPeriod} tidak
                    tersedia.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
