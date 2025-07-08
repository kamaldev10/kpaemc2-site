// src/lib/dummy-data/HeroData.ts

export type HeroEvent = {
  id: number;
  title: string;
  slug: string; // Baru: slug untuk URL
  description: string;
  imageUrl: string;
  href: string;
};

const DUMMY_HERO_EVENTS: HeroEvent[] = [
  {
    id: 1,
    title: "Workshop Kepemimpinan Digital 2025",
    slug: "workshop-kepemimpinan-digital-2025", // Baru
    description:
      "Jadilah pemimpin masa depan di era digital. Workshop intensif ini akan membahas strategi kepemimpinan adaptif, manajemen tim jarak jauh, dan pemanfaatan teknologi untuk inovasi.",
    imageUrl: "/images/events/pengabdian-simpang-ayam.jpg",
    href: "/event/workshop-kepemimpinan-digital-2025", // Diubah: Sesuai dengan slug
  },
  {
    id: 2,
    title: "Seminar Teknologi & Inovasi Berkelanjutan",
    slug: "seminar-teknologi-inovasi-berkelanjutan", // Baru
    description:
      "Temukan bagaimana teknologi terbaru dapat mendorong praktik bisnis yang berkelanjutan. Seminar ini akan menghadirkan para ahli dari industri terkemuka yang akan berbagi wawasan.",
    imageUrl: "/images/articles/twkm-aceh.jpg",
    href: "/event/seminar-teknologi-inovasi-berkelanjutan", // Diubah: Sesuai dengan slug
  },
  {
    id: 3,
    title: "Malam Apresiasi Anggota Tahunan",
    slug: "malam-apresiasi-anggota-tahunan-2025", // Baru
    description:
      "Mari rayakan pencapaian kita bersama! Acara ini didedikasikan untuk seluruh anggota yang telah berkontribusi luar biasa sepanjang tahun. Nikmati malam penuh penghargaan.",
    imageUrl: "/images/articles/purnama-pa-riau-9.jpg",
    href: "/event/malam-apresiasi-anggota-tahunan-2025", // Diubah: Sesuai dengan slug
  },
];

export default DUMMY_HERO_EVENTS;
