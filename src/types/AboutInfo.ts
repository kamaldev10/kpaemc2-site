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
