// app/posts/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PostsData } from "@/lib/dummy-data/PostsData";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const POSTS_PER_PAGE = 10;

export default function PostsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [year, setYear] = useState(searchParams.get("year") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [featured, setFeatured] = useState(
    searchParams.get("featured") === "true"
  );
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const searchTags = search
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag !== "");

  const filteredPosts = PostsData.filter((post) => {
    const matchesTags = searchTags.every((searchTag) =>
      post.tags.some((tag) => tag.toLowerCase().includes(searchTag))
    );
    const matchesYear = year
      ? new Date(post.date).getFullYear().toString() === year
      : true;
    const matchesCategory = category ? post.category === category : true;
    const matchesFeatured = featured ? post.featured === true : true;
    return matchesTags && matchesYear && matchesCategory && matchesFeatured;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  const uniqueYears = Array.from(
    new Set(
      PostsData.map((post) => new Date(post.date).getFullYear().toString())
    )
  ).sort((a, b) => Number(b) - Number(a));

  const updateQueryParams = (newParams: Record<string, string>) => {
    const query = new URLSearchParams({
      search,
      year,
      category,
      featured: featured.toString(),
      page: page.toString(),
      ...newParams,
    });
    router.push(`/posts?${query.toString()}`);
  };

  useEffect(() => {
    updateQueryParams({});
  }, [search, year, category, featured, page]);

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Artikel & Event
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Temukan informasi, inspirasi, dan kegiatan terbaru dari KPA EMC2
        </p>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-10 flex-wrap">
        <Input
          type="text"
          placeholder="Cari berdasarkan tag, pisahkan dengan koma..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full max-w-xs text-base"
        />
        <select
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
            setPage(1);
          }}
          className="border rounded px-2 py-1"
        >
          <option value="">Semua Tahun</option>
          {uniqueYears.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="border rounded px-2 py-1"
        >
          <option value="">Semua Kategori</option>
          <option value="Artikel">Artikel</option>
          <option value="Event">Event</option>
        </select>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => {
              setFeatured(e.target.checked);
              setPage(1);
            }}
          />
          <span className="text-sm text-gray-700 dark:text-gray-200">
            Hanya featured
          </span>
        </label>
        <button
          onClick={() => {
            setSearch("");
            setYear("");
            setCategory("");
            setFeatured(false);
            setPage(1);
          }}
          className="text-sm text-blue-600 hover:underline"
        >
          Reset Filter
        </button>
      </div>

      {/* Post List */}
      <div className="space-y-8">
        {paginatedPosts.map((post) => (
          <Link
            key={post.id}
            href={post.href}
            className="group flex flex-col sm:flex-row gap-4 items-start border rounded-xl p-4 bg-white dark:bg-gray-900 hover:shadow-md transition"
          >
            <div className="relative w-full sm:w-64 h-40 rounded-lg overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex-1 space-y-1">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {post.category} ·{" "}
                {new Date(post.date).toLocaleDateString("id-ID")}
              </div>
              <h2 className="font-semibold text-xl text-gray-900 dark:text-white">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                {post.description}
              </p>
              <div className="mt-2 text-sm text-blue-600 hover:underline">
                Selengkapnya →
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all border ${
                  pageNum === page
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-white border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {pageNum}
              </button>
            )
          )}
        </div>
      )}
    </section>
  );
}
