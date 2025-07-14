import { z } from "zod";

// Skema awal (data dari form)
export const aboutInfoSchemaRaw = z.object({
  orgName: z.string().min(3, "Nama organisasi wajib diisi."),
  description: z.string().min(50, "Deskripsi wajib diisi."),
  vision: z.string().min(20, "Visi wajib diisi."),
  activePeriod: z.string().min(4, "Periode aktif wajib diisi."),
  bornDate: z.string().min(4, "Tanggal berdiri wajib diisi."),
  motto: z.string().min(3, "Motto wajib diisi."),
  mission: z.string().min(1, "Minimal harus ada satu misi."),
});

// Skema akhir (data untuk dikirim ke database)
export const aboutInfoSchema = aboutInfoSchemaRaw.transform((data) => ({
  ...data,
  mission: data.mission
    .split("\n")
    .map((m) => m.trim())
    .filter(Boolean),
}));

// Type untuk form input
export type AboutInfoFormValues = z.input<typeof aboutInfoSchema>;
