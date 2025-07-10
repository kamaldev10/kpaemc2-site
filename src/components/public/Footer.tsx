// src/components/shared/Footer.tsx
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Send } from "lucide-react";
import SocialLink from "../shared/SocialLink";
import { FaWhatsapp, FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-screen-xl px-4 pt-12 py-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Kolom 1: Branding & Sosial Media */}
          <div className="lg:col-span-1">
            <h1 className="text-2xl font-bold text-primary">
              {process.env.NEXT_PUBLIC_ORG_NAME}
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              KPA EMC² adalah LSO FMIPA UNRI yang bertujuan menghimpun, membina,
              mengedukasi, dan menyalurkan potensi mahasiswa FMIPA UNRI, serta
              berkontribusi menjaga kelestarian dan keseimbangan lingkungan
              hidup.
            </p>
            <div className="mt-6 flex gap-4">
              <SocialLink
                href={process.env.NEXT_PUBLIC_FACEBOOK_URL}
                ariaLabel="Facebook"
                icon={FaFacebook}
              />
              <SocialLink
                href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}
                ariaLabel="Instagram"
                icon={FaInstagram}
              />
              <SocialLink
                href={process.env.NEXT_PUBLIC_THREADS_URL}
                ariaLabel="Threads"
                icon={FaThreads}
              />
              <SocialLink
                href={process.env.NEXT_PUBLIC_YOUTUBE_URL}
                ariaLabel="YouTube"
                icon={FaYoutube}
              />
              <SocialLink
                href={process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL}
                ariaLabel="WhatsApp Channel"
                icon={FaWhatsapp}
              />
            </div>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div>
            <h2 className="font-semibold text-foreground">Jelajahi</h2>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="/posts"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Postingan
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Informasi */}
          <div>
            <h2 className="font-semibold text-foreground">Informasi</h2>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Hubungi Kami
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/bergabung"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Cara Bergabung
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Newsletter */}
          <div>
            <h2 className="font-semibold text-foreground">Berlangganan</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Dapatkan berita, update event, dan artikel terbaru langsung ke
              email Anda.
            </p>
            <form className="mt-6 flex gap-2">
              <Input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 bg-background"
                aria-label="Email untuk newsletter"
              />
              <Button type="submit" size="icon" aria-label="Kirim">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-2 bg-border/50" />

        {/* Bottom Bar */}
        <div className="text-center text-xs text-muted-foreground sm:flex sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} KPA EMC². Hak Cipta Dilindungi.
          </p>
          <p className="mt-4 sm:mt-0">Dibuat dengan 🫰🏻 di Ketenangan Alam</p>
        </div>
      </div>
    </footer>
  );
}
