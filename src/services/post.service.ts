// src/services/post.service.ts
import { FilterState } from "@/hooks/useFilteredPosts";
import { prisma } from "@/lib/prisma";
import {
  postCreateSchema,
  postUpdateSchema,
} from "@/lib/validation/post.schema"; // <-- Impor skema
import { Prisma } from "@prisma/client";

export const PostService = {
  // Mengambil semua postingan dengan opsi
  async getAll(options?: { limit?: number; page?: number }) {
    const { limit, page } = options || {};
    const posts = await prisma.post.findMany({
      orderBy: { date: "desc" },
      take: limit,
      skip: page && limit ? (page - 1) * limit : undefined,
    });
    const total = await prisma.post.count();
    return { data: posts, total };
  },

  /**
   * Mengambil postingan dengan filter, sorting, dan pagination.
   * Dirancang untuk halaman publik yang membutuhkan query kompleks.
   */
  async getFilteredPosts(options: {
    filters: FilterState;
    page: number;
    limit: number;
  }) {
    const { filters, page, limit } = options;
    const { search, year, category, featured } = filters;

    // 1. Bangun klausa 'where' secara dinamis berdasarkan filter
    const where: Prisma.PostWhereInput = {};

    if (search) {
      const searchTerms = search
        .toLowerCase()
        .split(",")
        .map((term) => term.trim())
        .filter(Boolean);
      if (searchTerms.length > 0) {
        where.OR = [
          { title: { contains: search, mode: "insensitive" } },
          { tags: { hasSome: searchTerms } },
        ];
      }
    }

    if (category !== "all") {
      where.category = category;
    }

    if (year !== "all") {
      const parsedYear = parseInt(year);
      const startDate = new Date(parsedYear, 0, 1);
      const endDate = new Date(parsedYear + 1, 0, 1);
      where.date = {
        gte: startDate,
        lt: endDate,
      };
    }

    if (featured) {
      where.featured = true;
    }

    // 2. Lakukan dua query: satu untuk menghitung total, satu untuk mengambil data paginasi
    const totalPosts = await prisma.post.count({ where });
    const posts = await prisma.post.findMany({
      where,
      orderBy: {
        date: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data: posts, total: totalPosts };
  },

  /**
   * Mengambil postingan yang ditandai sebagai 'featured'.
   * @param options - Opsi untuk limit, dll.
   */
  async getFeaturedPosts(options?: { limit?: number }) {
    return await prisma.post.findMany({
      where: {
        featured: true, // Filter hanya yang featured: true
      },
      orderBy: {
        date: "desc", // Ambil yang paling baru
      },
      take: options?.limit,
    });
  },

  // Mengambil satu postingan berdasarkan slug
  async getBySlug(slug: string) {
    return await prisma.post.findUnique({
      where: { slug },
    });
  },

  /**
   * Membuat postingan baru setelah validasi dan transformasi data.
   * @param data - Data mentah dari request API.
   */
  async create(data: unknown) {
    const validatedAndTransformedData = postCreateSchema.parse(data);
    return await prisma.post.create({
      data: validatedAndTransformedData,
    });
  },

  /**
   * Mengupdate postingan berdasarkan slug.
   * @param slug - Slug dari postingan yang akan diupdate.
   * @param data - Data mentah dari request API yang akan diupdate.
   */
  async update(slug: string, data: unknown) {
    const validatedAndTransformedData = postUpdateSchema.parse(data);
    return await prisma.post.update({
      where: { slug },
      data: validatedAndTransformedData,
    });
  },

  // Menghapus postingan berdasarkan slug
  async delete(slug: string) {
    return await prisma.post.delete({
      where: { slug },
    });
  },
};
