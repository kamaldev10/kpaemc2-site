import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Kami terbuka secara umum. Kamu dapat menghubungi kami melalui formulir pada halaman ini.",
  openGraph: {
    title: "Kontak",
    description: "Hubungi kami untuk mendapatkan informasi lebih lanjut.",
    url: "https://kpa-emc2.org/contact",
    siteName: "KPA EMC2",
    images: [
      {
        url: "/og/contact.png",
        width: 1200,
        height: 630,
        alt: "Kontak KPA EMC²",
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
