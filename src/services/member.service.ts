// src/services/member.service.ts

import { type Member } from "@/types/Member";
import { memberFormSchema } from "@/lib/validation/member.schema";
import { prisma } from "@/lib/prisma";

// Skema validasi menggunakan Zod
const memberSchema = memberFormSchema;

export const MemberService = {
  /**
   * Mengambil semua anggota dengan opsi pagination dan sorting.
   */
  async getAll(options: {
    page: number;
    limit: number;
    sortKey: keyof Member;
    sortDir: "asc" | "desc";
  }) {
    const { page, limit, sortKey, sortDir } = options;

    const members = await prisma.member.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sortKey]: sortDir,
      },
    });

    const totalMembers = await prisma.member.count();

    return {
      data: members,
      total: totalMembers,
    };
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
};
