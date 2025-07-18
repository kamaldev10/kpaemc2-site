export type Member = {
  id: number;
  name: string;
  nomorAnggota: string;
  jurusan?: string;
  nomorTelepon?: string;
  status: "Anggota Biasa" | "Anggota Luar Biasa" | "Non Aktif";
  avatarUrl?: string;
};
