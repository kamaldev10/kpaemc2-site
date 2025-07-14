// types/Post.ts
export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  imageUrl: string;
  date: string | Date;
  category: string;
  tags: string[];
  featured?: boolean | null;

  // Field Artikel
  author?: string | null;
  readTime?: string | null;

  // Field Event
  location?: string | null;
  eventStartDate?: string | Date | null;
  eventEndDate?: string | Date | null;
  price?: string | null;
  registrationLink?: string | null;
};
