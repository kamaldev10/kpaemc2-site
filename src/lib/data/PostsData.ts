// src/lib/data/PostsData.ts

export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  description: string; // Diubah: Menjadi string tunggal untuk Markdown
  imageUrl: string;
  date: string | Date; // Bisa berupa string (dari API/JSON) atau objek Date
  category: "Artikel" | "Event";
  tags: string[]; // Tetap array of string
  featured?: boolean;

  // Field Artikel
  author?: string;
  readTime?: number;

  // Field Event
  location?: string;
  eventStartDate?: string | Date; // Diubah: Menyimpan tanggal & waktu mulai
  eventEndDate?: string | Date; // Diubah: Menyimpan tanggal & waktu selesai
  price?: string;
  registrationLink?: string;
};

// views, likes dan related Post belum dibuat di database
export const PostsData: Post[] = [
  {
    id: 1,
    title: "Pengabdian Masyarakat di Desa Simpang Ayam",
    slug: "pengabdian-masyarakat-di-desa-simpang-ayam",
    excerpt:
      "Pengabdian Masyarakat di Desa Simpang Ayam merupakan bentuk perwujudan tri dharma perguruan tinggi yaitu pengabdian.",
    description:
      "Assalamualaikum Warahmahtullahi Wabarakatuh. Salam Lestari !!!       Pengabdian Masyarakat di Desa Simpang Ayam yang telah kami laksanakan pada tanggal 26-28 Juli yang lalu tentunya memberikan banyak kenangan dan banyak manfaat bagi kami dan harapan nya juga bagi seluruh warga Desa Simpang Ayam.      Dengan diskusi dan sosialisasi akan mitigasi bencana, diskusi tentang pengelolaan bank sampah dan pengolahan hasil bank sampah, sosialisasi ke Sekolah Dasar tentang pentingnya menjaga lingkungan sejak dini, penanaman di lingkungan sekolah dan MDTA, hingga mengadakan kampanye tentang krisis iklim yang harus ditangani yang ada di Desa Simpang Ayam, Kab. Bengkalis.      Nantikan keseruan kegiatan kami lainnya dsri postingan-postingan yang akan kami beri!! Lestari !!!.",
    imageUrl: "/images/posts/pengabdian-simpang-ayam.jpg",
    date: "2024-08-04",
    category: "Event",
    location: "Desa Simpang Ayam, Bengkalis",
    tags: ["event", "pengabdian", "bengkalis", "mapala"],
    featured: true,

    eventStartDate: "2025-07-15T09:00:00",
    eventEndDate: "2025-07-15T15:00:00",
    registrationLink: "",
    price: "",
  },
  {
    id: 2,
    title: "Fakta Sampah yang Jarang Diketahui Orang",
    slug: "fakta-sampah-yang-jarang-diketahui-orang",
    excerpt:
      "Sampah yang dianggap hanya sebagai bahan atau barang bekas memiliki fakta-fakta menarik yang harus kita ketahui.",
    description:
      "Sampah yang dianggap hanya sebagai bahan atau barang bekas memiliki fakta-fakta menarik yang harus kita ketahui. Sampah yang banyak terlihat berserakan merupakan hasil dari bumi yang seharusnya kita lestarikan. 1. 80% Sampah di Laut adalah Plastik. Fakta menarik tentang sampah yaitu keberadaan sampah plastik yang ada di laut. Jumlah sampah yang ada di laut seluruh dunia diperkirakan 9 juta ton setiap tahunnya dan 80% merupakan sampah berbahan plastik. Sebuah penelitian mengungkapkan bahwa kantong plastik akan tetap berwujud sekurang-kurangnya 10-15 tahun. Akibat sampah plastik yang menumpuk di laut ekosistem laut menjadi rusak dan tercemar. 2. 17 Milyar Sampah Plastik dari Supermarket. Sumber utama terbentuknya gunung sampah ini dikarenakan banyaknya makanan siap saji yang dibungkus dengan plastik dan styrofoam. Kemudian kantong plastik digunakan pula untuk membungkus barang yang dibeli. Semua ini menyebabkan supermarket merupakan penghasil sampah plastik terbesar di dunia. Sehingga pemerintah memberikan peraturan bahwa setiap kantong plastik di supermarket dikenai biaya Rp. 200,- untuk menguarangi pemakaian kantong plastik. 3. 12 juta barel minyak serta 14 juta pohon untuk membuat plastik. Plastik banyak digunakan oleh penduduk untuk banyak keperluan yang menyebabkan banyak nya produksi plastik dibutuhkan dan juga menyebabkan rusaknya sumberdaya alam di bumi. Bayangkan saja untuk membuat plastik di dunia setiap tahunnya membutuhkan 12 juta barel minyak serta 14 juta pohon. Hal ini tentunya berbeda dengan zaman dulu yang hanya menggunakan daun pisang untuk pembungkus makanan. 4. 27. 000 batang kayu setiap hari digunakan untuk pembuatan kertas. Kertas, dan tissue menjadi barang yang tidak asing bagi kita semua. Ternyata fakta menarik tentang sampah kertas dan tissue membutuhkan sumber daya alam berupa 27.000 batang kayu. Pemakaian yang tinggi akan produk yang terbuat dari kayu ini, ternyata sulit untuk dilakukan daur ulang. Selain sidikitnya pohon di bumi, juga dapat menyebabkan pencemaran lingkungan dan berbagai dampak lainnya seperti air sungai meluap dan menyebabkan banjir. Jadi, kamu sudahkah kalian sadar pentingnya mengurangi sampah. Ceritakan pendapatmu di kolom komentar!! Wassalamu'alaikum Warahmatullahi Wabarakatuh.Salam Lestari !!!",
    imageUrl: "/images/posts/fakta-sampah-1.jpg",
    date: "2024-02-19",
    category: "Artikel",
    author: "Ali Musthafa Kamal",
    readTime: 3,
    tags: ["sampah", "fakta", "artikel"],
    featured: true,
  },
  {
    id: 3,
    title: " Pertemuan Bersama Pecinta Alam Riau 8",
    slug: "pertemuan-bersama-pecinta-alam-riau-8",
    excerpt:
      "PURNAMA PA RIAU VIII telah masuk tahun yang ke 20, dan Purnama PA Riau masih eksis dengan segala dinamikanya.",
    description:
      "Assalamualaikum Warahmahtullahi Wabarakatuh., Salam Lestari !!!Pertemuan Bersama Pecinta Alam se-Riau kemudian disebut Purnama PA Riau adalah Kegiatan yang berbentuk sidang atau kongres serta kepecinta alaman dapat berupa latihan bersama, petualangan, aksi lingkungan, dan lain lain yang diikuti oleh delegasi organisasi pecinta alam se-riau.Pada 29 Mei - 02 Juni 2024 pecinta alam se-riau telah melaksanakan Purnama PA Riau VIII yang di tuan rumahi Mapala Phylomina Universitas Riau.Adapun Lembaga yang hadir yaitu KPA EMC²,  Mapala Batar Mapala Phylomin Mapala Bestar Mapala Umr Mapala Oasi Mapala Laksaman Mapala Wanapalh Mapala UI Mapala Humendal Mapala Saka Brimapala Sungkai, Maparsa IAI Ar-Risalah, Mapala Satwa SaharaPURNAMA PA RIAU VIII telah masuk tahun yang ke 20, dan Purnama PA Riau masih eksis dengan segala dinamikanya.Purnama PA sebagai tempat berkumpulnya rekan rekan PA Riau, yang menjaga silaturahmi, saling sharing ide, pengetahuan dan hal hal positif lainnya.Selamat bermusyawarah untuk kita semuaBanyak hal dan pembelajaran yang kita dapat selama acara ini, salah satu nya tentu kebersamaan kitaaKita sebagai keluarga tidak akan bertanya apakah anggotanya sedang butuh pertolongan atau tidak, ia akan selalu berada untuknya tidak peduli ia sedang dibutuhkan atau tidak. Begitulah kebersamaan yang harus tertanam di pikiran kita.Kebersamaan sering menjadi momen yang mendewasakan karena adanya sebuah perpisahaan yang akan menjadi ajang pembelajaran untuk diri kita",
    imageUrl: "/images/posts/purnama-pa-8.jpg",
    date: "2024-06-05",
    category: "Event",
    location: "Mapala Phylomina",
    tags: ["purnama pa riau", "mapala", "event"],
    featured: false,
    eventStartDate: "2024-05-29T09:00:00",
    eventEndDate: "2024-06-02T15:00:00",
    registrationLink: "",
    price: "",
  },
  {
    id: 4,
    title: "Single Rope Technique Sebagai Teknik Untuk Menelusuri Gua ",
    slug: "single-rope-technique-sebagai-teknik-untuk-menelusuri-gua",
    excerpt:
      "Single Rope technique(SRT) bisa di artikan dengan Teknik satu tali.",
    description:
      "Assalamualaikum Warahmahtullahi Wabarakatuh. Salam Lestari !!!Pengabdian Masyarakat di Desa Simpang Ayam yang telah kami laksanakan pada tanggal 26-28 Juli yang lalu tentunya memberikan banyak kenangan dan banyak manfaat bagi kami dan harapan nya juga bagi seluruh warga Desa Simpang Ayam.Dengan diskusi dan sosialisasi akan mitigasi bencana, diskusi tentang pengelolaan bank sampah dan pengolahan hasil bank sampah, sosialisasi ke Sekolah Dasar tentang pentingnya menjaga lingkungan sejak dini, penanaman di lingkungan sekolah dan MDTA, hingga mengadakan kampanye tentang krisis iklim yang harus ditangani yang ada di Desa Simpang Ayam, Kab. Bengkalis.Nantikan keseruan kegiatan kami lainnya dsri postingan-postingan yang akan kami beri!! Lestari !!!.",
    imageUrl: "/images/posts/srt-1.jpg",
    date: "2024-02-06",
    category: "Artikel",
    author: "Ali Musthafa Kamal",
    readTime: 3,
    tags: ["srt", "gua", "artikel"],
    featured: true,
  },
  {
    id: 5,
    title: "Pengabdian Masyarakat di Desa Simpang Ayam",
    slug: "pengabdian-masyarakat-di-desa-simpang-ayam-1",
    excerpt:
      "Pengabdian Masyarakat di Desa Simpang Ayam merupakan bentuk perwujudan tri dharma perguruan tinggi yaitu pengabdian.",
    description:
      "Assalamualaikum Warahmahtullahi Wabarakatuh. Salam Lestari !!!Pengabdian Masyarakat di Desa Simpang Ayam yang telah kami laksanakan pada tanggal 26-28 Juli yang lalu tentunya memberikan banyak kenangan dan banyak manfaat bagi kami dan harapan nya juga bagi seluruh warga Desa Simpang Ayam.Dengan diskusi dan sosialisasi akan mitigasi bencana, diskusi tentang pengelolaan bank sampah dan pengolahan hasil bank sampah, sosialisasi ke Sekolah Dasar tentang pentingnya menjaga lingkungan sejak dini, penanaman di lingkungan sekolah dan MDTA, hingga mengadakan kampanye tentang krisis iklim yang harus ditangani yang ada di Desa Simpang Ayam, Kab. Bengkalis.Nantikan keseruan kegiatan kami lainnya dsri postingan-postingan yang akan kami beri!! Lestari !!!.",
    imageUrl: "/images/posts/pengabdian-simpang-ayam.jpg",
    date: "2024-08-04",
    category: "Event",
    location: "Desa Simpang Ayam, Bengkalis",
    tags: ["event", "pengabdian", "bengkalis", "mapala"],
    featured: true,

    eventStartDate: "2025-07-15T09:00:00",
    eventEndDate: "2025-07-15T15:00:00",
    registrationLink: "",
    price: "",
  },
  {
    id: 6,
    title: "Pengabdian Masyarakat di Desa Simpang Ayam",
    slug: "pengabdian-masyarakat-di-desa-simpang-ayam-2",
    excerpt:
      "Pengabdian Masyarakat di Desa Simpang Ayam merupakan bentuk perwujudan tri dharma perguruan tinggi yaitu pengabdian.",
    description:
      "Assalamualaikum Warahmahtullahi Wabarakatuh. Salam Lestari !!!Pengabdian Masyarakat di Desa Simpang Ayam yang telah kami laksanakan pada tanggal 26-28 Juli yang lalu tentunya memberikan banyak kenangan dan banyak manfaat bagi kami dan harapan nya juga bagi seluruh warga Desa Simpang Ayam.Dengan diskusi dan sosialisasi akan mitigasi bencana, diskusi tentang pengelolaan bank sampah dan pengolahan hasil bank sampah, sosialisasi ke Sekolah Dasar tentang pentingnya menjaga lingkungan sejak dini, penanaman di lingkungan sekolah dan MDTA, hingga mengadakan kampanye tentang krisis iklim yang harus ditangani yang ada di Desa Simpang Ayam, Kab. Bengkalis.Nantikan keseruan kegiatan kami lainnya dsri postingan-postingan yang akan kami beri!! Lestari !!!.",
    imageUrl: "/images/posts/pengabdian-simpang-ayam.jpg",
    date: "2024-08-04",
    category: "Event",
    location: "Desa Simpang Ayam, Bengkalis",
    tags: ["event", "pengabdian", "bengkalis", "mapala"],
    featured: true,

    eventStartDate: "2025-07-15T09:00:00",
    eventEndDate: "2025-07-15T15:00:00",
    registrationLink: "",
    price: "",
  },
  {
    id: 7,
    title: "Pengabdian Masyarakat di Desa Simpang Ayam",
    slug: "pengabdian-masyarakat-di-desa-simpang-ayam-3",
    excerpt:
      "Pengabdian Masyarakat di Desa Simpang Ayam merupakan bentuk perwujudan tri dharma perguruan tinggi yaitu pengabdian.",
    description:
      "Assalamualaikum Warahmahtullahi Wabarakatuh. Salam Lestari !!!Pengabdian Masyarakat di Desa Simpang Ayam yang telah kami laksanakan pada tanggal 26-28 Juli yang lalu tentunya memberikan banyak kenangan dan banyak manfaat bagi kami dan harapan nya juga bagi seluruh warga Desa Simpang Ayam.Dengan diskusi dan sosialisasi akan mitigasi bencana, diskusi tentang pengelolaan bank sampah dan pengolahan hasil bank sampah, sosialisasi ke Sekolah Dasar tentang pentingnya menjaga lingkungan sejak dini, penanaman di lingkungan sekolah dan MDTA, hingga mengadakan kampanye tentang krisis iklim yang harus ditangani yang ada di Desa Simpang Ayam, Kab. Bengkalis.Nantikan keseruan kegiatan kami lainnya dsri postingan-postingan yang akan kami beri!! Lestari !!!.",
    imageUrl: "/images/posts/pengabdian-simpang-ayam.jpg",
    date: "2024-08-04",
    category: "Event",
    location: "Desa Simpang Ayam, Bengkalis",
    tags: ["event", "pengabdian", "bengkalis", "mapala"],
    featured: true,

    eventStartDate: "2025-07-15T09:00:00",
    eventEndDate: "2025-07-15T15:00:00",
    registrationLink: "",
    price: "",
  },
  {
    id: 8,
    title: "Pengabdian Masyarakat di Desa Simpang Ayam",
    slug: "pengabdian-masyarakat-di-desa-simpang-ayam-4",
    excerpt:
      "Pengabdian Masyarakat di Desa Simpang Ayam merupakan bentuk perwujudan tri dharma perguruan tinggi yaitu pengabdian.",
    description:
      "Assalamualaikum Warahmahtullahi Wabarakatuh. Salam Lestari !!!Pengabdian Masyarakat di Desa Simpang Ayam yang telah kami laksanakan pada tanggal 26-28 Juli yang lalu tentunya memberikan banyak kenangan dan banyak manfaat bagi kami dan harapan nya juga bagi seluruh warga Desa Simpang Ayam.Dengan diskusi dan sosialisasi akan mitigasi bencana, diskusi tentang pengelolaan bank sampah dan pengolahan hasil bank sampah, sosialisasi ke Sekolah Dasar tentang pentingnya menjaga lingkungan sejak dini, penanaman di lingkungan sekolah dan MDTA, hingga mengadakan kampanye tentang krisis iklim yang harus ditangani yang ada di Desa Simpang Ayam, Kab. Bengkalis.Nantikan keseruan kegiatan kami lainnya dsri postingan-postingan yang akan kami beri!! Lestari !!!.",
    imageUrl: "/images/posts/pengabdian-simpang-ayam.jpg",
    date: "2024-08-04",
    category: "Event",
    location: "Desa Simpang Ayam, Bengkalis",
    tags: ["event", "pengabdian", "bengkalis", "mapala"],
    featured: true,

    eventStartDate: "2025-07-15T09:00:00",
    eventEndDate: "2025-07-15T15:00:00",
    registrationLink: "",
    price: "",
  },
  {
    id: 9,
    title: "Pengabdian Masyarakat di Desa Simpang Ayam",
    slug: "pengabdian-masyarakat-di-desa-simpang-ayam-5",
    excerpt:
      "Pengabdian Masyarakat di Desa Simpang Ayam merupakan bentuk perwujudan tri dharma perguruan tinggi yaitu pengabdian.",
    description:
      "Assalamualaikum Warahmahtullahi Wabarakatuh. Salam Lestari !!!Pengabdian Masyarakat di Desa Simpang Ayam yang telah kami laksanakan pada tanggal 26-28 Juli yang lalu tentunya memberikan banyak kenangan dan banyak manfaat bagi kami dan harapan nya juga bagi seluruh warga Desa Simpang Ayam.Dengan diskusi dan sosialisasi akan mitigasi bencana, diskusi tentang pengelolaan bank sampah dan pengolahan hasil bank sampah, sosialisasi ke Sekolah Dasar tentang pentingnya menjaga lingkungan sejak dini, penanaman di lingkungan sekolah dan MDTA, hingga mengadakan kampanye tentang krisis iklim yang harus ditangani yang ada di Desa Simpang Ayam, Kab. Bengkalis.Nantikan keseruan kegiatan kami lainnya dsri postingan-postingan yang akan kami beri!! Lestari !!!.",

    imageUrl: "/images/posts/pengabdian-simpang-ayam.jpg",
    date: "2024-08-04",
    category: "Event",
    location: "Desa Simpang Ayam, Bengkalis",
    tags: ["event", "pengabdian", "bengkalis", "mapala"],
    featured: true,

    eventStartDate: "2025-07-15T09:00:00",
    eventEndDate: "2025-07-15T15:00:00",
    registrationLink: "",
    price: "",
  },
  {
    id: 10,
    title: "Pengabdian Masyarakat di Desa Simpang Ayam",
    slug: "pengabdian-masyarakat-di-desa-simpang-ayam-6",
    excerpt:
      "Pengabdian Masyarakat di Desa Simpang Ayam merupakan bentuk perwujudan tri dharma perguruan tinggi yaitu pengabdian.",
    description:
      "Assalamualaikum Warahmahtullahi Wabarakatuh. Salam Lestari !!!Pengabdian Masyarakat di Desa Simpang Ayam yang telah kami laksanakan pada tanggal 26-28 Juli yang lalu tentunya memberikan banyak kenangan dan banyak manfaat bagi kami dan harapan nya juga bagi seluruh warga Desa Simpang Ayam.Dengan diskusi dan sosialisasi akan mitigasi bencana, diskusi tentang pengelolaan bank sampah dan pengolahan hasil bank sampah, sosialisasi ke Sekolah Dasar tentang pentingnya menjaga lingkungan sejak dini, penanaman di lingkungan sekolah dan MDTA, hingga mengadakan kampanye tentang krisis iklim yang harus ditangani yang ada di Desa Simpang Ayam, Kab. Bengkalis.Nantikan keseruan kegiatan kami lainnya dsri postingan-postingan yang akan kami beri!! Lestari !!!.",
    imageUrl: "/images/posts/pengabdian-simpang-ayam.jpg",
    date: "2024-08-04",
    category: "Event",
    location: "Desa Simpang Ayam, Bengkalis",
    tags: ["event", "pengabdian", "bengkalis", "mapala"],
    featured: true,

    eventStartDate: "2025-07-15T09:00:00",
    eventEndDate: "2025-07-15T15:00:00",
    registrationLink: "",
    price: "",
  },
  {
    id: 11,
    title: "Pengabdian Masyarakat di Desa Simpang Ayam",
    slug: "pengabdian-masyarakat-di-desa-simpang-ayam-7",
    excerpt:
      "Pengabdian Masyarakat di Desa Simpang Ayam merupakan bentuk perwujudan tri dharma perguruan tinggi yaitu pengabdian.",
    description:
      "Assalamualaikum Warahmahtullahi Wabarakatuh. Salam Lestari !!!Pengabdian Masyarakat di Desa Simpang Ayam yang telah kami laksanakan pada tanggal 26-28 Juli yang lalu tentunya memberikan banyak kenangan dan banyak manfaat bagi kami dan harapan nya juga bagi seluruh warga Desa Simpang Ayam.Dengan diskusi dan sosialisasi akan mitigasi bencana, diskusi tentang pengelolaan bank sampah dan pengolahan hasil bank sampah, sosialisasi ke Sekolah Dasar tentang pentingnya menjaga lingkungan sejak dini, penanaman di lingkungan sekolah dan MDTA, hingga mengadakan kampanye tentang krisis iklim yang harus ditangani yang ada di Desa Simpang Ayam, Kab. Bengkalis.Nantikan keseruan kegiatan kami lainnya dsri postingan-postingan yang akan kami beri!! Lestari !!!.",
    imageUrl: "/images/posts/pengabdian-simpang-ayam.jpg",
    date: "2024-08-04",
    category: "Event",
    location: "Desa Simpang Ayam, Bengkalis",
    tags: ["event", "pengabdian", "bengkalis", "mapala"],
    featured: true,

    eventStartDate: "2025-07-15T09:00:00",
    eventEndDate: "2025-07-15T15:00:00",
    registrationLink: "",
    price: "",
  },
];
