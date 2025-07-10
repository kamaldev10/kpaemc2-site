import * as z from "zod";

export const memberFormSchema = z.object({
  // Field Wajib
  name: z.string().min(3, "Nama lengkap minimal 3 karakter."),
  nomorAnggota: z
    .string()
    .min(5, "Nomor anggota wajib diisi.")
    .regex(/^EMC2\.\d{2}\.\d{3}$/, "Format harus EMC2.XX.XXX"),

  // PERBAIKAN: Status sekarang wajib diisi, .optional() dihapus
  status: z.enum(["Aktif", "Alumni", "Non-aktif"], {
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
