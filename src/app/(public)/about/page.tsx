import { AboutService } from "@/services/about.service";
import AboutView from "@/components/public/about/AboutView"; // Impor komponen client
import { notFound } from "next/navigation";

// Ini adalah Server Component, tempat kita mengambil data
export default async function AboutPage() {
  // Ambil data langsung dari service di server
  const aboutData = await AboutService.get();

  // Jika data tidak ada, tampilkan halaman 404
  if (!aboutData) {
    return notFound();
  }

  // Render komponen client dan kirim data sebagai props
  return (
    <div className="bg-background">
      <AboutView aboutData={aboutData} />
    </div>
  );
}
