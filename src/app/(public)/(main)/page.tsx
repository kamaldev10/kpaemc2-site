"use client";

import AllPosts from "@/components/public/sections/AllPosts";
import HeroSection from "@/components/public/sections/HeroSection";

export default function HomePage() {
  return (
    <div className=" w-full mx-auto">
      <HeroSection />
      <AllPosts />
      {/* <AboutSection />
      <SkillsSection />
      <CertificatesSection />
      <ProjectsSection /> */}
      {/* <ContactSection /> */}
    </div>
  );
}
