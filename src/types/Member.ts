export type Member = {
  id: number;
  name: string;
  nomorAnggota: string;
  jurusan?: string;
  nomorTelepon?: string;
  status: "Aktif" | "Alumni" | "Non-aktif";
  avatarUrl?: string;
};
