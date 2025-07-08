// components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Menu, X, Search, UserCircle } from "lucide-react";

import Image from "next/image";
import SwitchThemeToggle from "../shared/SwitchThemeToggle";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Postingan", href: "/posts" },
  // { label: "Galeri", href: "/gallery" },
  { label: "Tentang", href: "/about" },
  { label: "Kontak", href: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setQuery("");
      setIsMenuOpen(false);
    }
  };

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
  };

  const NavigationContent = () => (
    <>
      {/* Search Bar untuk Mobile */}
      <form
        onSubmit={handleSearch}
        className="relative md:hidden w-full px-4 mb-4"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari artikel/event..."
          className="pl-10 pr-4 py-2 rounded-full border border-border bg-input text-sm w-full"
        />
        <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      </form>

      {/* Daftar Link Navigasi */}
      <nav className="flex flex-col xl:flex-row xl:items-center gap-4 xl:gap-6 px-4 xl:px-0">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsMenuOpen(false)}
            className="text-foreground hover:text-primary transition-colors text-lg md:text-sm font-medium"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 dark:bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          {/* 1. Logo */}
          <Link
            href="/"
            className="inline-flex text-xl font-bold text-primary flex-shrink-0 gap-2 items-center xl:w-1/5"
          >
            <Image
              src="/images/logo.svg"
              alt="Logo KPA EMC²"
              width={42}
              height={42}
            ></Image>

            <span className="hidden xl:inline text-sm">
              Kelompok Pecinta Alam Einstein Mapalindup Ceria Club
            </span>
            <span className="inline xl:hidden">KPA EMC²</span>
          </Link>

          {/* 2. Search Bar (Desktop) */}
          <div className="hidden xl:flex flex-1 justify-center px-8">
            <form onSubmit={handleSearch} className="relative w-full max-w-md">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari artikel atau event..."
                className="pl-10 pr-4 py-2 rounded-full border border-border bg-input text-sm w-full"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </form>
          </div>

          {/* Wrapper untuk item sisi kanan */}
          <div className="flex items-center align-middle gap-4 flex-shrink-0">
            {/* 3 & 4. Navigasi & Dashboard (Desktop) */}
            <div className="hidden xl:flex items-center gap-6">
              <NavigationContent />
              <Link
                href="/dashboard"
                className="text-foreground hover:text-primary transition-colors text-sm font-medium flex items-center gap-2"
              >
                <UserCircle className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            </div>

            {/* 5. Switch Theme Toggle */}
            <SwitchThemeToggle
              onThemeChange={handleThemeChange}
              initialTheme={theme as "light" | "dark"}
            />

            {/* Tombol Menu Mobile */}
            <div className="xl:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Buka menu"
              >
                <Menu className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigasi Mobile (Off-canvas) */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 transition-opacity duration-300",
          isMenuOpen ? "bg-black/50" : "bg-transparent pointer-events-none"
        )}
        onClick={() => setIsMenuOpen(false)}
      />
      <div
        className={cn(
          "xl:hidden fixed top-0 left-0 h-full w-4/5 max-w-xs bg-background shadow-lg z-50 transform transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 border-b border-border flex justify-between items-center">
          <Link
            href="/"
            className="inline-flex text-xl font-bold text-primary flex-shrink-0 gap-2"
          >
            <Image
              src="/images/logo.svg"
              alt="Logo KPA EMC²"
              width={30}
              height={30}
            ></Image>
            <span className="">KPA EMC²</span>
          </Link>
          <button onClick={() => setIsMenuOpen(false)} aria-label="Tutup menu">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 flex flex-col gap-6">
          <NavigationContent />
          <hr />
          <Link
            href="/dashboard"
            onClick={() => setIsMenuOpen(false)}
            className="text-foreground hover:text-primary text-lg font-medium flex items-center gap-2"
          >
            <UserCircle className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>
    </>
  );
}
