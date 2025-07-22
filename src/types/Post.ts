export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  descriptionSource: string | null;
  imageUrl: string;
  imageSource: string | null;
  date: Date | string;
  // category: string; //category bentuk biasa saja
  category:
    | "Artikel"
    | "Kegiatan"
    | "Rilis Kegiatan"
    | "Kolaborasi"
    | "Pengalaman Pribadi"; //dijabarkan untuk keamanan dan autocomplete
  tags: string[];
  featured: boolean | null;
  author: string | null;
};
