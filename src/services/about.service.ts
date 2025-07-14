// src/services/about.service.ts
import { prisma } from "@/lib/prisma";
import { aboutInfoSchema } from "@/lib/validation/about.schema";

const ABOUT_INFO_ID = 1; // Karena kita hanya akan punya satu baris data

export const AboutService = {
  /**
   * Mengambil data informasi organisasi.
   * Hanya akan ada satu data, jadi kita gunakan findUnique.
   */
  async get() {
    return await prisma.aboutInfo.findUnique({
      where: { id: ABOUT_INFO_ID },
    });
  },

  /**
   * Mengupdate data informasi organisasi.
   * @param data - Data baru yang akan disimpan.
   */
  async update(data: unknown) {
    // Validasi data yang masuk sebelum di-update
    const validatedData = aboutInfoSchema.parse(data);

    return await prisma.aboutInfo.update({
      where: { id: ABOUT_INFO_ID },
      data: {
        ...validatedData,
        // Properti 'structure' mungkin perlu penanganan khusus jika di-update
        // Untuk saat ini kita asumsikan tidak di-update dari form ini
      },
    });
  },
};
