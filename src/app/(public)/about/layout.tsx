import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "KPA EMC² adalah organisasi kemahasiswaan milik FMIPA UNRI yang bertujuan menghimpun, membina, mengedukasi, dan menyalurkan potensi mahasiswa FMIPA UNRI.",
  openGraph: {
    title: "Tentang Kami",
    description:
      "KPA EMC² adalah organisasi kemahasiswaan milik FMIPA UNRI yang bertujuan menghimpun, membina, mengedukasi, dan menyalurkan potensi mahasiswa FMIPA UNRI.",
    url: "https://kpa-emc2.org/about",
    siteName: "KPA EMC2",
    images: [
      {
        url: "/og/about.png",
        width: 1200,
        height: 630,
        alt: "Tentang KPA EMC²",
      },
    ],
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
