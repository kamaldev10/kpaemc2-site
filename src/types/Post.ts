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
