// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import StyledComponentsRegistry from "@/lib/registry";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Kelompok Pecinta Alam Einstein Mapalindup Ceria Club",
    template: "%s | KPA EMC²",
  },
  description:
    "Website resmi KPA EMC² - berita, event, galeri, dan informasi lengkap.",
  keywords: ["KPA EMC2", "organisasi", "event", "berita", "kampus", "kegiatan"],
  authors: [{ name: "Admin IT KPA EMC²" }],
  creator: "Admin IT KPA EMC²",
  metadataBase: new URL("https://kpaemc2.org"),
  openGraph: {
    title: "Kelompok Pecinta Alam Einstein Mapalindup Ceria Club",
    description:
      "Website resmi KPA EMC² - berita, event, galeri, dan informasi lengkap.",
    url: "https://your-domain.com",
    siteName: "Kelompok Pecinta Alam Einstein Mapalindup Ceria Club",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Organisasi Banner",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kelompok Pecinta Alam Einstein Mapalindup Ceria Club",
    description:
      "Website resmi KPA EMC² - berita, event, galeri, dan informasi lengkap.",
    images: ["/og-image.png"],
    creator: "@yourTwitterHandle",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={montserrat.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StyledComponentsRegistry>
            <main className="min-h-screen">{children}</main>
          </StyledComponentsRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
