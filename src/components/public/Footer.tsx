// src/components/shared/Footer.tsx
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Send, Instagram, Youtube, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Kolom 1: Branding & Sosial Media */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-primary">KPA EMC2</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Organisasi mahasiswa pecinta alam yang berdedikasi pada
              konservasi, edukasi, dan petualangan.
            </p>
            <div className="mt-6 flex gap-4">
              <Link
                href="#"
                aria-label="Instagram"
                className="hover:text-primary transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                aria-label="YouTube"
                className="hover:text-primary transition-colors"
              >
                <Youtube className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                aria-label="Twitter"
                className="hover:text-primary transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                aria-label="Facebook"
                className="hover:text-primary transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div>
            <p className="font-semibold text-foreground">Jelajahi</p>
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
            <p className="font-semibold text-foreground">Informasi</p>
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
            <p className="font-semibold text-foreground">
              Langganan Newsletter
            </p>
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

        <Separator className="my-8 bg-border/50" />

        {/* Bottom Bar */}
        <div className="text-center text-xs text-muted-foreground sm:flex sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} KPA EMC². Hak Cipta Dilindungi.
          </p>
          <p className="mt-4 sm:mt-0">Dibuat dengan ❤️ di Pekanbaru</p>
        </div>
      </div>
    </footer>
  );
}
