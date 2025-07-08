// src/hooks/useFilteredPosts.ts
import { useMemo } from "react";
import { PostsData } from "@/lib/dummy-data/PostsData";

const POSTS_PER_PAGE = 10;

// Tambahkan 'featured' ke tipe state filter
export type FilterState = {
  search: string;
  year: string;
  category: string;
  featured: boolean; // Baru
};

export function useFilteredPosts(filters: FilterState, page: number) {
  const filteredPosts = useMemo(() => {
    return PostsData.filter((post) => {
      const { search, year, category, featured } = filters;
      const searchTags = search
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean);

      const matchesTags =
        searchTags.length > 0
          ? searchTags.every((searchTag) =>
              post.tags?.some((tag) => tag.toLowerCase().includes(searchTag))
            )
          : true;
      const matchesYear =
        year !== "all"
          ? new Date(post.date).getFullYear().toString() === year
          : true;
      const matchesCategory =
        category !== "all" ? post.category === category : true;
      const matchesFeatured = featured ? post.featured === true : true; // Logika filter featured

      return matchesTags && matchesYear && matchesCategory && matchesFeatured;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [filters]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = useMemo(() => {
    const startIndex = (page - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [page, filteredPosts]);

  return {
    totalPages,
    paginatedPosts,
    totalResults: filteredPosts.length,
  };
}
