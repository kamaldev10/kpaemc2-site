// src/lib/dummy-data/AboutData.ts

// Definisikan tipe data untuk struktur anggota agar bisa rekursif (bersarang)
export type Member = {
  name: string;
  position: string;
  children?: Member[]; // Anggota bisa memiliki bawahan/divisi
};

// Tipe data untuk setiap periode kepengurusan
export type StructurePeriod = {
  period: string;
  image: string; // Path ke gambar/foto struktur
  chairman: Member; // Ketua Umum pada periode tersebut
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
  orgName: "KPA EMC2",
  description:
    "KPA EMC2 adalah organisasi mahasiswa pecinta alam yang berdedikasi untuk menumbuhkan kesadaran dan kecintaan terhadap lingkungan melalui kegiatan petualangan, edukasi, dan konservasi. Kami berkomitmen untuk menjadi wadah bagi mahasiswa yang memiliki semangat petualang dan kepedulian tinggi terhadap kelestarian alam Indonesia.",
  vision:
    "Menjadi organisasi pecinta alam yang unggul, inovatif, dan berpengaruh dalam menginspirasi generasi muda untuk menjaga dan melestarikan keanekaragaman hayati serta lingkungan hidup secara berkelanjutan.",
  mission: [
    "Menyelenggarakan kegiatan eksplorasi dan petualangan di alam bebas yang aman dan bertanggung jawab.",
    "Mengadakan program edukasi dan pelatihan tentang konservasi lingkungan dan teknik bertahan hidup.",
    "Berperan aktif dalam kampanye dan advokasi isu-isu lingkungan di tingkat lokal maupun nasional.",
    "Membangun jejaring dan kerja sama dengan organisasi sejenis, pemerintah, dan masyarakat umum.",
    "Membentuk anggota yang memiliki karakter tangguh, berintegritas, dan berjiwa pemimpin.",
  ],
  activePeriod: "2024-2025",
  structure: [
    {
      period: "2024-2025",
      image: "/images/struktur-2024-2025.png", // Contoh path gambar
      chairman: {
        name: "Ali Musthafa Kamal",
        position: "Ketua Umum",
        children: [
          {
            name: "Rahma Aulia",
            position: "Sekretaris Umum",
            children: [
              { name: "Sari Putri", position: "Divisi Humas" },
              { name: "Doni Saputra", position: "Divisi Kesekretariatan" },
            ],
          },
          {
            name: "Budi Santoso",
            position: "Bendahara Umum",
            children: [
              { name: "Eka Wulandari", position: "Divisi Dana & Usaha" },
            ],
          },
          {
            name: "Ahmad Zaki",
            position: "Ketua Divisi Gunung Hutan",
            children: [],
          },
          {
            name: "Fitriani",
            position: "Ketua Divisi Panjat Tebing",
            children: [],
          },
        ],
      },
    },
    {
      period: "2023-2024",
      image: "/images/struktur-2023-2024.png",
      chairman: {
        name: "Rian Hidayat",
        position: "Ketua Umum",
        // Anda bisa mengisi data anak-anaknya jika diperlukan
      },
    },
    {
      period: "2022-2023",
      image: "/images/struktur-2022-2023.png",
      chairman: {
        name: "Annisa Fitri",
        position: "Ketua Umum",
      },
    },
  ],
};
