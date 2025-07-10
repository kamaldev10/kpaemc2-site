// lib/dummy-data/PostsData.ts

// types/Post.ts

export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  imageUrl: string;
  href: string;
  date: string;
  category: "Artikel" | "Event";
  author?: string;
  readTime?: string;
  location?: string;
  tags: string[];
  featured?: boolean;
  views?: number;
  likes?: number;
  eventDate?: string;
  eventTime?: string;
  registrationLink?: string;
  price?: string;
  relatedPosts?: number[];
};

export const PostsData: Post[] = [
  {
    id: 1,
    title: "Pendakian Gunung Slamet",
    slug: "pendakian-gunung-slamet",
    excerpt: "Ekspedisi menantang ke puncak tertinggi Jawa Tengah.",
    description:
      "Perjalanan luar biasa mendaki Gunung Slamet bersama tim, dengan rute Bambangan dan pengalaman luar biasa sepanjang jalan.",
    imageUrl: "/images/posts/slamet.jpg",
    href: "/posts/pendakian-gunung-slamet",
    date: "2025-07-01",
    category: "Event",
    location: "Gunung Slamet, Jawa Tengah",
    tags: ["pendakian", "event", "gunung"],
    featured: true,
    views: 230,
    likes: 48,
    eventDate: "2025-08-10",
    eventTime: "05:00 WIB",
    registrationLink: "https://bit.ly/daftar-slamet",
    price: "Gratis",
    relatedPosts: [2, 3],
  },
  {
    id: 2,
    title: "Tips Bertahan Hidup di Alam Bebas",
    slug: "tips-survival-alam",
    excerpt: "Panduan dasar survival untuk pemula.",
    description:
      "Dalam artikel ini kami membahas berbagai teknik dasar survival seperti membuat api, menemukan air, dan membuat tempat perlindungan.",
    imageUrl: "/images/posts/survival.jpg",
    href: "/posts/tips-survival-alam",
    date: "2025-06-20",
    category: "Artikel",
    author: "Ali Musthafa Kamal",
    readTime: "6 menit",
    tags: ["survival", "tips", "artikel"],
    featured: false,
    views: 180,
    likes: 67,
    relatedPosts: [1],
  },
  {
    id: 3,
    title: "Pelatihan Navigasi Gunung",
    slug: "pelatihan-navigasi-gunung",
    excerpt: "Belajar teknik navigasi peta dan kompas.",
    description:
      "Sesi pelatihan khusus untuk anggota baru dalam menggunakan peta topografi dan kompas, dipandu oleh senior KPA EMC2.",
    imageUrl: "/images/posts/navigation.jpg",
    href: "/posts/pelatihan-navigasi-gunung",
    date: "2025-06-25",
    category: "Event",
    location: "Basecamp KPA EMC2",
    tags: ["pelatihan", "navigasi", "event"],
    featured: false,
    views: 120,
    likes: 35,
    eventDate: "2025-07-20",
    eventTime: "08:00 WIB",
    registrationLink: "https://bit.ly/nav-training",
    price: "Gratis",
    relatedPosts: [1, 4],
  },
  {
    id: 4,
    title: "Mengenal Tumbuhan Obat di Hutan",
    slug: "tumbuhan-obat-hutan",
    excerpt: "Studi etnobotani tentang tumbuhan liar yang bermanfaat.",
    description:
      "Artikel informatif mengenai berbagai jenis tanaman liar di hutan tropis Indonesia yang memiliki manfaat medis.",
    imageUrl: "/images/posts/tumbuhan.jpg",
    href: "/posts/tumbuhan-obat-hutan",
    date: "2025-06-10",
    category: "Artikel",
    author: "Diah Putri",
    readTime: "5 menit",
    tags: ["tumbuhan", "hutan", "artikel"],
    featured: true,
    views: 300,
    likes: 89,
    relatedPosts: [3],
  },
  {
    id: 5,
    title: "Mengenal Tumbuhan Obat di Hutan",
    slug: "tumbuhan-obat-hutan",
    excerpt: "Studi etnobotani tentang tumbuhan liar yang bermanfaat.",
    description:
      "Artikel informatif mengenai berbagai jenis tanaman liar di hutan tropis Indonesia yang memiliki manfaat medis.",
    imageUrl: "/images/posts/tumbuhan.jpg",
    href: "/posts/tumbuhan-obat-hutan",
    date: "2025-06-10",
    category: "Artikel",
    author: "Diah Putri",
    readTime: "5 menit",
    tags: ["tumbuhan", "hutan", "artikel"],
    featured: true,
    views: 300,
    likes: 89,
    relatedPosts: [3],
  },
  {
    id: 6,
    title: "Pendakian Gunung Arjuno-Welirang",
    slug: "pendakian-arjuno-welirang",
    excerpt: "Perjalanan lintas dua gunung aktif.",
    description:
      "Dokumentasi ekspedisi tim EMC2 saat menaklukkan jalur Arjuno-Welirang via Tretes, menyusuri hutan pinus dan kawah aktif.",
    imageUrl: "/images/posts/arjuno.jpg",
    href: "/posts/pendakian-arjuno-welirang",
    date: "2025-05-15",
    category: "Event",
    location: "Jawa Timur",
    tags: ["pendakian", "gunung", "jelajah"],
    featured: false,
    views: 400,
    likes: 75,
    eventDate: "2025-06-30",
    eventTime: "04:30 WIB",
    registrationLink: "https://bit.ly/arjuno-trip",
    price: "Rp 150.000",
    relatedPosts: [1],
  },
  {
    id: 7,
    title: "Pendakian Gunung Arjuno-Welirang",
    slug: "pendakian-arjuno-welirang",
    excerpt: "Perjalanan lintas dua gunung aktif.",
    description:
      "Dokumentasi ekspedisi tim EMC2 saat menaklukkan jalur Arjuno-Welirang via Tretes, menyusuri hutan pinus dan kawah aktif.",
    imageUrl: "/images/posts/arjuno.jpg",
    href: "/posts/pendakian-arjuno-welirang",
    date: "2025-05-15",
    category: "Event",
    location: "Jawa Timur",
    tags: ["pendakian", "gunung", "jelajah"],
    featured: false,
    views: 400,
    likes: 75,
    eventDate: "2025-06-30",
    eventTime: "04:30 WIB",
    registrationLink: "https://bit.ly/arjuno-trip",
    price: "Rp 150.000",
    relatedPosts: [1],
  },
  {
    id: 8,
    title: "Pendakian Gunung Arjuno-Welirang",
    slug: "pendakian-arjuno-welirang",
    excerpt: "Perjalanan lintas dua gunung aktif.",
    description:
      "Dokumentasi ekspedisi tim EMC2 saat menaklukkan jalur Arjuno-Welirang via Tretes, menyusuri hutan pinus dan kawah aktif.",
    imageUrl: "/images/posts/arjuno.jpg",
    href: "/posts/pendakian-arjuno-welirang",
    date: "2025-05-15",
    category: "Event",
    location: "Jawa Timur",
    tags: ["pendakian", "gunung", "jelajah"],
    featured: false,
    views: 400,
    likes: 75,
    eventDate: "2025-06-30",
    eventTime: "04:30 WIB",
    registrationLink: "https://bit.ly/arjuno-trip",
    price: "Rp 150.000",
    relatedPosts: [1],
  },
  {
    id: 9,
    title: "Pendakian Gunung Arjuno-Welirang",
    slug: "pendakian-arjuno-welirang",
    excerpt: "Perjalanan lintas dua gunung aktif.",
    description:
      "Dokumentasi ekspedisi tim EMC2 saat menaklukkan jalur Arjuno-Welirang via Tretes, menyusuri hutan pinus dan kawah aktif.",
    imageUrl: "/images/posts/arjuno.jpg",
    href: "/posts/pendakian-arjuno-welirang",
    date: "2025-05-15",
    category: "Event",
    location: "Jawa Timur",
    tags: ["pendakian", "gunung", "jelajah"],
    featured: false,
    views: 400,
    likes: 75,
    eventDate: "2025-06-30",
    eventTime: "04:30 WIB",
    registrationLink: "https://bit.ly/arjuno-trip",
    price: "Rp 150.000",
    relatedPosts: [1],
  },
  {
    id: 10,
    title: "Pendakian Gunung Arjuno-Welirang",
    slug: "pendakian-arjuno-welirang",
    excerpt: "Perjalanan lintas dua gunung aktif.",
    description:
      "Dokumentasi ekspedisi tim EMC2 saat menaklukkan jalur Arjuno-Welirang via Tretes, menyusuri hutan pinus dan kawah aktif.",
    imageUrl: "/images/posts/arjuno.jpg",
    href: "/posts/pendakian-arjuno-welirang",
    date: "2025-05-15",
    category: "Event",
    location: "Jawa Timur",
    tags: ["pendakian", "gunung", "jelajah"],
    featured: false,
    views: 400,
    likes: 75,
    eventDate: "2025-06-30",
    eventTime: "04:30 WIB",
    registrationLink: "https://bit.ly/arjuno-trip",
    price: "Rp 150.000",
    relatedPosts: [1],
  },
  {
    id: 11,
    title: "Pendakian Gunung Arjuno-Welirang",
    slug: "pendakian-arjuno-welirang",
    excerpt: "Perjalanan lintas dua gunung aktif.",
    description:
      "Dokumentasi ekspedisi tim EMC2 saat menaklukkan jalur Arjuno-Welirang via Tretes, menyusuri hutan pinus dan kawah aktif.",
    imageUrl: "/images/posts/arjuno.jpg",
    href: "/posts/pendakian-arjuno-welirang",
    date: "2025-05-15",
    category: "Event",
    location: "Jawa Timur",
    tags: ["pendakian", "gunung", "jelajah"],
    featured: false,
    views: 400,
    likes: 75,
    eventDate: "2025-06-30",
    eventTime: "04:30 WIB",
    registrationLink: "https://bit.ly/arjuno-trip",
    price: "Rp 150.000",
    relatedPosts: [1],
  },
];
