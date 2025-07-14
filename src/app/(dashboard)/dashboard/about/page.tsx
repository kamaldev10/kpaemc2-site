import Image from "next/image";
import Link from "next/link";
import { AboutService } from "@/services/about.service";
import { type StructureInfo } from "@/types/AboutInfo";

// Impor komponen UI
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Pencil, Milestone, Quote } from "lucide-react";

export default async function AboutDashboardPage() {
  // Ambil data langsung dari service di server
  const aboutData = await AboutService.get();

  if (!aboutData) {
    return (
      <div className="p-6">
        <h1 className="text-lg font-semibold md:text-2xl">
          Data Tidak Ditemukan
        </h1>
        <p className="text-muted-foreground">
          Informasi &quot;Tentang Kami&quot; belum ada di database.
        </p>
      </div>
    );
  }

  // Type assertion untuk 'structure'
  const structureArray = (aboutData.structure as StructureInfo[]) || [];

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl">
            Halaman &quot;Tentang Kami&quot;
          </h1>
          <p className="text-sm text-muted-foreground">
            Ini adalah data yang saat ini ditampilkan di halaman publik.
          </p>
        </div>
        <Button asChild size="sm" className="ml-auto gap-2">
          <Link href="/dashboard/about/edit">
            <Pencil className="h-4 w-4" />
            Edit Halaman
          </Link>
        </Button>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>{aboutData.orgName}</CardTitle>
            <CardDescription>
              Periode Aktif: {aboutData.activePeriod}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <Milestone className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <div>
                  <span className="font-semibold">Berdiri Sejak:</span>{" "}
                  {aboutData.bornDate}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Quote className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <div>
                  <span className="font-semibold">Motto:</span>{" "}
                  <span className="italic">&quot;{aboutData.motto}&quot;</span>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Deskripsi</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {aboutData.description}
              </p>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2">Visi</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {aboutData.vision}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Misi</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  {aboutData.mission.map((misi, i) => (
                    <li key={i}>{misi}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Struktur Kepengurusan Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            {structureArray.find((s) => s.period === aboutData.activePeriod)
              ?.image ? (
              <Image
                src={
                  structureArray.find(
                    (s) => s.period === aboutData.activePeriod
                  )!.image
                }
                alt={`Struktur Organisasi Periode ${aboutData.activePeriod}`}
                width={800}
                height={1200}
                className="w-full h-auto rounded-lg border"
              />
            ) : (
              <p className="text-muted-foreground text-sm">
                Gambar struktur tidak tersedia.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
