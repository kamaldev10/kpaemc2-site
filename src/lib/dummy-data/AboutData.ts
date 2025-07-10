// src/lib/dummy-data/AboutData.ts

// Tipe data untuk setiap periode kepengurusan disederhanakan
export type StructurePeriod = {
  period: string;
  image: string; // Path ke gambar/foto struktur
  chairmanName: string; // Menyimpan nama ketua untuk referensi
};

// Tipe data utama untuk seluruh data "Tentang Kami"
export type About = {
  orgName: string;
  description: string;
  vision: string;
  mission: string[];
  activePeriod: string;
  structure: StructurePeriod[];
};

// Ekspor data utama
export const AboutData: About = {
  orgName: "KPA EMC²",
  description:
    "KPA EMC² adalah organisasi kemahasiswaan milik FMIPA UNRI yang bertujuan menghimpun, membina, mengedukasi, dan menyalurkan potensi mahasiswa FMIPA UNRI, serta berkontribusi menjaga kelestarian dan keseimbangan lingkungan hidup.",
  vision:
    "Terwujudnya organisasi pecinta alam yang bertakwa kepada Tuhan Yang Maha Esa, berkarakter, berkualitas, serta berpartisipasi dalam pengembangan ilmu pengetahuan dan teknologi untuk mendukung pelestarian lingkungan hidup.",
  mission: [
    "Mengembangkan eksistensi organisasi di dalam maupun di luar universitas.",
    "Membentuk generasi yang bermoral, berkarakter dan intelektual.",
    "Berkontribusi dalam kegiatan sosial dan menjaga pelestarian lingkungan hidup.",
    "Menjalin silaturahmi baik kepada sesama pecinta alam maupun lembaga lain.",
  ],
  activePeriod: "2025",
  structure: [
    {
      period: "2025",
      image: "/images/struktur-2025.png", // Pastikan path gambar ini ada di folder /public/images
      chairmanName: "Desti Seri Fatimah",
    },
    {
      period: "2024",
      image: "/images/struktur-2024.png", // Pastikan path gambar ini ada di folder /public/images
      chairmanName: "Rian Hidayat",
    },
    {
      period: "2023",
      image: "/images/struktur-2023.png", // Pastikan path gambar ini ada di folder /public/images
      chairmanName: "Annisa Fitri",
    },
  ],
};
