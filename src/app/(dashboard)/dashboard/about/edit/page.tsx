import { AboutService } from "@/services/about.service";
import { notFound } from "next/navigation";
import AboutForm from "@/components/dashboard/about/AboutForm";
import BackButton from "@/components/shared/BackButton";

export default async function EditAboutPage() {
  // Ambil data awal dari database untuk mengisi form
  const aboutData = await AboutService.get();

  if (!aboutData) {
    return notFound();
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center gap-4">
        <BackButton href="/dashboard/about" />
        <div className="space-y-1">
          <h1 className="text-lg font-semibold md:text-2xl">
            Edit Halaman &quot;Tentang Kami&quot;
          </h1>
          <p className="text-sm text-muted-foreground">
            Perubahan yang Anda simpan di sini akan langsung ditampilkan di
            halaman publik.
          </p>
        </div>
      </div>

      {/* Render komponen form dan kirim data sebagai 'initialData' */}
      <AboutForm initialData={aboutData} />
    </div>
  );
}
