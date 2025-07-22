// src/services/post.service.ts

/**
 * @file src/services/post.service.ts
 * @description Service layer untuk semua logika bisnis dan interaksi database terkait Postingan.
 * Menangani upload gambar, validasi data, dan operasi CRUD.
 */

import {
  postCreateSchema,
  postUpdateSchema,
} from "@/lib/validation/post.schema";
import {
  cloudinary,
  extractPublicId,
  uploadImage,
} from "@/lib/utils/cloudinary";
import { ApiError } from "@/lib/utils/errors";
import { FilterState } from "@/hooks/useFilteredPosts";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

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
   * Membuat postingan baru. Menangani upload gambar dan validasi data.
   * @param formData - Data dari form yang berisi teks dan file.
   */
  async create(formData: FormData) {
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string;
    let imageUrl = formData.get("imageUrl") as string;

    if (file) {
      // Panggil utilitas upload dengan opsi spesifik untuk postingan
      imageUrl = await uploadImage(file, title, "post-images", [
        { width: 1200, crop: "limit" },
        { quality: "auto:good" },
        { fetch_format: "auto" },
      ]);
    }

    // 2. Kumpulkan semua data teks dari form untuk divalidasi
    const dataToValidate = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      excerpt: formData.get("excerpt"),
      description: formData.get("description"),
      date: new Date(formData.get("date") as string),
      category: formData.get("category"),
      tags: formData.get("tags"),
      featured: formData.get("featured") === "true",
      author: formData.get("author"),
      readTime: formData.get("readTime"),
      location: formData.get("location"),
      eventStartDate_Date: formData.get("eventStartDate_Date")
        ? new Date(formData.get("eventStartDate_Date") as string)
        : undefined,
      eventStartDate_Time: formData.get("eventStartDate_Time"),
      eventEndDate_Date: formData.get("eventEndDate_Date")
        ? new Date(formData.get("eventEndDate_Date") as string)
        : undefined,
      eventEndDate_Time: formData.get("eventEndDate_Time"),
      price: formData.get("price"),
      registrationLink: formData.get("registrationLink"),
      imageUrl: imageUrl, // Gunakan URL final (dari upload atau yang sudah ada)
    };

    // 3. Validasi dan transformasi data
    const validatedData = postCreateSchema.parse(dataToValidate);

    // 4. Simpan ke database
    return await prisma.post.create({ data: validatedData });
  },

  /**
   * Mengupdate postingan. Menangani upload gambar baru dan penghapusan gambar lama.
   * @param slug - Slug dari postingan yang akan diupdate.
   * @param formData - Data dari form yang berisi teks dan file.
   */
  async update(slug: string, formData: FormData) {
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string;
    let imageUrl = formData.get("imageUrl") as string;

    // 1. Ambil data postingan yang ada untuk mendapatkan URL gambar lama
    const existingPost = await prisma.post.findUnique({ where: { slug } });
    if (!existingPost) {
      throw new ApiError(404, "Postingan tidak ditemukan.");
    }

    if (file) {
      imageUrl = await uploadImage(file, title, "post-images", [
        { width: 1200, crop: "limit" },
        { quality: "auto:good" },
        { fetch_format: "auto" },
      ]);

      // Hapus gambar LAMA dari Cloudinary jika ada
      if (existingPost.imageUrl) {
        const oldPublicId = extractPublicId(existingPost.imageUrl);
        if (oldPublicId) {
          console.log(
            `🧹 Menghapus gambar lama dari Cloudinary: ${oldPublicId}`
          );
          // Perintah destroy tidak perlu di-await jika tidak kritis
          cloudinary.uploader.destroy(oldPublicId).catch((err) => {
            console.error("Gagal menghapus gambar lama di Cloudinary:", err);
          });
        }
      }
    }

    // 3. Kumpulkan data untuk divalidasi
    const dataToValidate = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      excerpt: formData.get("excerpt"),
      description: formData.get("description"),
      date: new Date(formData.get("date") as string),
      category: formData.get("category"),
      tags: formData.get("tags"),
      featured: formData.get("featured") === "true",
      author: formData.get("author"),
      readTime: formData.get("readTime"),
      location: formData.get("location"),
      eventStartDate_Date: formData.get("eventStartDate_Date")
        ? new Date(formData.get("eventStartDate_Date") as string)
        : undefined,
      eventStartDate_Time: formData.get("eventStartDate_Time"),
      eventEndDate_Date: formData.get("eventEndDate_Date")
        ? new Date(formData.get("eventEndDate_Date") as string)
        : undefined,
      eventEndDate_Time: formData.get("eventEndDate_Time"),
      price: formData.get("price"),
      registrationLink: formData.get("registrationLink"),
      imageUrl: imageUrl, // Gunakan URL final (bisa yang baru, bisa yang lama)
    };

    const validatedData = postUpdateSchema.parse(dataToValidate);

    // 4. Update database dengan URL gambar yang baru
    return await prisma.post.update({ where: { slug }, data: validatedData });
  },

  /**
   * Menghapus postingan berdasarkan slug.
   * Termasuk menghapus gambar terkait dari Cloudinary.
   * @param slug - Slug dari postingan yang akan dihapus.
   */
  async delete(slug: string) {
    // 1. Ambil data postingan untuk mendapatkan URL gambar
    const postToDelete = await prisma.post.findUnique({
      where: { slug },
    });

    if (!postToDelete) {
      throw new ApiError(404, "Postingan yang akan dihapus tidak ditemukan.");
    }

    // 2. Jika ada URL gambar, hapus dari Cloudinary
    if (postToDelete.imageUrl) {
      const publicId = extractPublicId(postToDelete.imageUrl);
      if (publicId) {
        console.log(`🧹 Menghapus gambar dari Cloudinary: ${publicId}`);
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          // Log error jika gagal hapus dari Cloudinary, tapi tetap lanjutkan
          console.error("Gagal menghapus gambar di Cloudinary:", error);
        }
      }
    }

    // 3. Hapus data postingan dari database
    return await prisma.post.delete({
      where: { slug },
    });
  },
};
