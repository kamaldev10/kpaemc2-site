// app/(public)/layout.tsx
import { ReactNode } from "react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-background text-foreground">
        {children}
      </main>
      <Footer />
    </>
  );
}
