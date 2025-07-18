// src/lib/validation/member.schema.ts
import * as z from "zod";

export const memberFormSchema = z.object({
  // Field Wajib
  name: z.string().min(3, "Nama lengkap minimal 3 karakter."),
  nomorAnggota: z
    .string()
    .regex(
      /^\d{3}\/KPA EMC²\/\d{4}$/,
      "Format harus 3 digit/KPA EMC²/4 digit (contoh: 174/KPA EMC²/2022)"
    ),
  status: z.enum(["Anggota Biasa", "Anggota Luar Biasa", "Non Aktif"], {
    required_error: "Anda perlu memilih status keanggotaan.",
  }),

  // Field Opsional
  jurusan: z.string().optional(),
  nomorTelepon: z
    .string()
    .min(10, "Nomor telepon minimal 10 digit.")
    .optional()
    .or(z.literal("")),
  avatarUrl: z
    .string()
    .url("URL avatar tidak valid.")
    .optional()
    .or(z.literal("")),
});

export type MemberFormValues = z.infer<typeof memberFormSchema>;
