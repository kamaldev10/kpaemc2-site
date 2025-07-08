import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artikel & Event",
  description:
    "Kumpulan artikel dan event terkini dari KPA EMC2. Temukan informasi terbaru, tips survival, dan agenda kegiatan alam bebas.",
  openGraph: {
    title: "Artikel & Event",
    description:
      "Kumpulan artikel dan event terkini dari KPA EMC2. Temukan informasi terbaru, tips survival, dan agenda kegiatan alam bebas.",
    url: "https://kpa-emc2.org/posts",
    siteName: "KPA EMC2",
    images: [
      {
        url: "/og/posts.png",
        width: 1200,
        height: 630,
        alt: "Artikel & Event KPA EMC2",
      },
    ],
    type: "website",
  },
};

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
