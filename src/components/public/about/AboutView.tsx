"use client";

// import { useState } from "react";
// import Image from "next/image";
import { motion } from "framer-motion";
// import { type About, type StructureInfo } from "@/types/AboutInfo";
import { type About } from "@/types/AboutInfo";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Card, CardContent } from "@/components/ui/card";
import { Quote, Milestone } from "lucide-react";

type AboutViewProps = {
  aboutData: About;
};

export default function AboutView({ aboutData }: AboutViewProps) {
  return (
    <div className="max-w-7xl px-4 py-8 mx-auto space-y-20 sm:py-16">
      {/* Section Header */}
      <motion.section
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Tentang <span className="text-primary">{aboutData.orgName}</span>
        </h1>
        <p className="mt-6 text-sm md:text-lg leading-5  md:leading-8 text-muted-foreground max-w-3xl mx-auto">
          {aboutData.description}
        </p>

        {/*Motto & Tanggal Berdiri */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto mt-10 text-left">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Milestone className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Berdiri Sejak</h3>
              <p className="text-muted-foreground">{aboutData.bornDate}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Quote className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Motto</h3>
              <p className="text-muted-foreground italic text-balance">
                &quot;{aboutData.motto}&quot;
              </p>
            </div>
          </div>
        </div>
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
          <p className="text-muted-foreground">{aboutData.vision}</p>
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-foreground mb-4 border-l-4 border-primary pl-4">
            Misi
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            {aboutData.mission.map((misi, i) => (
              <li key={i}>{misi}</li>
            ))}
          </ul>
        </div>
      </motion.section>
    </div>
  );
}
