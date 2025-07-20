// src/services/member.service.ts

import { type Member } from "@/types/Member";
import { memberFormSchema } from "@/lib/validation/member.schema";
import { prisma } from "@/lib/prisma";
import { type FilterState } from "@/hooks/useFilteredPosts"; // Asumsi tipe filter ada di sini
import { Prisma } from "@prisma/client";

// Skema validasi menggunakan Zod
const memberSchema = memberFormSchema;

export const MemberService = {
  /**
   * Mengambil semua anggota dengan opsi pagination dan sorting.
   * Jika 'limit' tidak diberikan, kembalikan semua data.
   */
  async getAll(options?: {
    page?: number;
    limit?: number;
    sortKey?: keyof Member;
    sortDir?: "asc" | "desc";
  }) {
    const { page, limit, sortKey = "name", sortDir = "asc" } = options || {};

    const findOptions = {
      orderBy: { [sortKey]: sortDir },
      skip: page && limit ? (page - 1) * limit : undefined,
      take: limit, // Jika 'limit' undefined, Prisma akan mengambil semua
    };

    const members = await prisma.member.findMany(findOptions);
    const total = await prisma.member.count();

    return { data: members, total };
  },

  async findById(id: number) {
    return await prisma.member.findUnique({ where: { id } });
  },

  /**
   * Membuat anggota baru.
   * @param data - Data anggota baru yang sudah divalidasi.
   */
  async create(data: Omit<Member, "id" | "createdAt">) {
    const validatedData = memberSchema.parse(data);
    return await prisma.member.create({
      data: validatedData,
    });
  },

  /**
   * Mengupdate data anggota berdasarkan ID.
   * @param id - ID anggota yang akan diupdate.
   * @param data - Data anggota yang akan diubah.
   */
  async update(id: number, data: Partial<Omit<Member, "id" | "createdAt">>) {
    // .partial() membuat semua field di skema menjadi opsional untuk update
    const validatedData = memberSchema.partial().parse(data);
    return await prisma.member.update({
      where: { id },
      data: validatedData,
    });
  },

  /**
   * Menghapus anggota berdasarkan ID.
   * @param id - ID anggota yang akan dihapus.
   */
  async delete(id: number) {
    return await prisma.member.delete({
      where: { id },
    });
  },

  /**
   * Mengupdate status untuk beberapa anggota berdasarkan daftar ID.
   * @param ids - Array berisi ID anggota yang akan diubah.
   * @param status - Status baru yang akan diterapkan.
   */
  async updateStatusForIds(
    ids: number[],
    status: "Anggota Biasa" | "Anggota Luar Biasa" | "Non-aktif"
  ) {
    const result = await prisma.member.updateMany({
      where: {
        id: {
          in: ids, // Targetkan semua anggota yang ID-nya ada di dalam array
        },
      },
      data: {
        status: status,
      },
    });

    return result; // Mengembalikan objek { count: jumlah_yang_diupdate }
  },

  /**
   * Mengupdate status semua anggota yang cocok dengan kriteria filter.
   */
  async updateStatusByFilter(
    filters: Partial<FilterState>, // <-- PERBAIKAN: Beri tipe spesifik
    status: "Anggota Biasa" | "Anggota Luar Biasa" | "Non-aktif"
  ) {
    // Bangun klausa 'where' dari filter yang diberikan
    const whereClause: Prisma.MemberWhereInput = {}; // <-- PERBAIKAN: Gunakan tipe dari Prisma

    // Contoh logika filter (bisa Anda kembangkan)
    if (filters.category && filters.category !== "all") {
      // Asumsi model Member punya relasi/field kategori
    }

    const result = await prisma.member.updateMany({
      where: whereClause,
      data: { status },
    });
    return result;
  },

  /**
   * Menambahkan beberapa anggota sekaligus ke database.
   * Melewatkan data duplikat berdasarkan field @unique (nomorAnggota).
   * @param members - Array berisi data anggota baru.
   */
  async bulkCreate(members: Partial<Member>[]) {
    // Di sini Anda bisa menambahkan validasi Zod untuk setiap item di array jika perlu

    const result = await prisma.member.createMany({
      data: members as Member[], // Lakukan type assertion jika Anda yakin datanya cocok
      skipDuplicates: true, // Abaikan baris yang memiliki 'nomorAnggota' yang sama
    });

    return result; // Mengembalikan objek { count: jumlah_yang_ditambahkan }
  },

  /**
   * Mengupdate status anggota berdasarkan daftar ID atau dengan pengecualian.
   */
  async bulkUpdateStatus(params: {
    ids: number[];
    status: "Anggota Biasa" | "Anggota Luar Biasa" | "Non-aktif";
    // 'mode' menentukan apakah kita mengupdate yang ada di dalam list (include)
    // atau semua KECUALI yang ada di list (exclude)
    mode: "include" | "exclude";
  }) {
    const { ids, status, mode } = params;

    // Tentukan klausa 'where' berdasarkan mode
    const whereClause: Prisma.MemberWhereInput = {
      id: {
        [mode === "include" ? "in" : "notIn"]: ids,
      },
    };

    // Jika mode 'exclude', kita mungkin hanya ingin menargetkan yang statusnya 'Aktif'
    if (mode === "exclude") {
      whereClause.status = "Aktif";
    }

    const result = await prisma.member.updateMany({
      where: whereClause,
      data: { status },
    });

    return result;
  },
};
