// app/about/page.tsx
"use client";

import Image from "next/image";
import { AboutData, type Member } from "@/lib/dummy-data/AboutData"; // Impor tipe Member
import { Tree, TreeNode } from "react-organizational-chart";
import { User } from "lucide-react";
import { motion } from "framer-motion";

// Komponen kecil untuk menampilkan kartu anggota di bagan
const MemberCard = ({ member }: { member: Member }) => (
  <div className="inline-flex flex-col items-center text-center">
    <div className="p-3 bg-card border rounded-full shadow-sm mb-2">
      <User className="w-6 h-6 text-primary" />
    </div>
    <span className="font-semibold text-foreground text-sm">{member.name}</span>
    <span className="text-xs text-muted-foreground">{member.position}</span>
  </div>
);

// Fungsi rekursif untuk membuat node bagan secara dinamis
const renderTreeNodes = (member: Member) => (
  <TreeNode key={member.name} label={<MemberCard member={member} />}>
    {member.children && member.children.map((child) => renderTreeNodes(child))}
  </TreeNode>
);

export default function AboutPage() {
  // Cari data untuk periode aktif
  const currentPeriod = AboutData.structure.find(
    (s) => s.period === AboutData.activePeriod
  );

  // Jika data periode tidak ditemukan, tampilkan pesan
  if (!currentPeriod) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Data untuk periode {AboutData.activePeriod} tidak ditemukan.</p>
      </div>
    );
  }

  return (
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

      {/* Section Visi & Misi dalam Grid */}
      <motion.section
        className="grid grid-cols-1 md:grid-cols-2 gap-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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
          <p className="mt-4 text-muted-foreground">
            Periode {AboutData.activePeriod}
          </p>
        </div>

        {/* Bagan Organisasi Dinamis */}
        <div className="overflow-x-auto p-4 border rounded-2xl bg-muted/40">
          <Tree
            lineWidth={"2px"}
            lineColor="hsl(var(--border))"
            lineBorderRadius={"10px"}
            label={<MemberCard member={currentPeriod.chairman} />}
          >
            {currentPeriod.chairman.children?.map((member) =>
              renderTreeNodes(member)
            )}
          </Tree>
        </div>
      </section>

      {/* Section Arsip Struktur */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-foreground">Arsip</h2>
          <p className="mt-2 text-muted-foreground">
            Struktur Kepengurusan Periode Sebelumnya
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {AboutData.structure
            .filter((item) => item.period !== AboutData.activePeriod) // Tampilkan selain periode aktif
            .map((item) => (
              <motion.div
                key={item.period}
                className="relative w-full h-72 rounded-xl overflow-hidden shadow-lg group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={item.image}
                  alt={`Struktur ${item.period}`}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <span className="text-sm font-medium">Periode</span>
                  <p className="text-xl font-bold">{item.period}</p>
                </div>
              </motion.div>
            ))}
        </div>
      </section>
    </div>
  );
}
