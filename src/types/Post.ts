// types/Post.ts
export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  imageUrl: string;
  date: string | Date;
  category: "Artikel" | "Event";
  tags: string[];
  featured?: boolean;

  // Field Artikel
  author?: string;
  readTime?: string;

  // Field Event
  location?: string;
  eventStartDate?: string | Date;
  eventEndDate?: string | Date;
  price?: string;
  registrationLink?: string;
};
