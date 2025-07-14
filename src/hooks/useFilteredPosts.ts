import { useMemo } from "react";
import { type Post } from "@/types/Post";
import fuzzysort from "fuzzysort";

export type FilterState = {
  search: string;
  year: string;
  category: "Artikel" | "Event" | "all";
  featured: boolean;
};

function filterPosts(posts: Post[], filters: FilterState): Post[] {
  return posts.filter((post) => {
    const { search, year, category, featured } = filters;
    const matchesSearch = !search
      ? true
      : fuzzysort.single(search, post.title + " " + post.tags.join(" ")) !==
        null;

    const matchesYear =
      year !== "all"
        ? new Date(post.date).getFullYear().toString() === year
        : true;

    const matchesCategory =
      category !== "all" ? post.category === category : true;

    const matchesFeatured = featured ? post.featured === true : true;

    return matchesSearch && matchesYear && matchesCategory && matchesFeatured;
  });
}

function sortPosts(posts: Post[]): Post[] {
  return posts.slice().sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function useFilteredPosts(
  allPosts: Post[],
  filters: FilterState,
  page: number,
  postsPerPage: number
) {
  const filteredPosts = useMemo(
    () => sortPosts(filterPosts(allPosts, filters)),
    [allPosts, filters]
  );

  const paginatedPosts = useMemo(() => {
    const startIndex = (page - 1) * postsPerPage;
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, page, postsPerPage]);

  return {
    totalPages: Math.ceil(filteredPosts.length / postsPerPage),
    paginatedPosts,
    totalResults: filteredPosts.length,
  };
}
