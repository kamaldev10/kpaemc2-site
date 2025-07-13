/**
 * seed.ts
 *
 * Skrip ini digunakan untuk mengisi database Anda dengan data awal (dummy data).
 * Ia akan menghapus semua data lama terlebih dahulu untuk memastikan kebersihan data.
 * Semua operasi database dibungkus dalam sebuah transaksi untuk menjaga integritas data.
 *
 * Cara menjalankan:
 * 1. Pastikan skema Anda sudah sinkron: npx prisma migrate dev
 * 2. Jalankan seed: npx prisma db seed
 */

import { PrismaClient } from "@prisma/client";
import { MembersData } from "../src/lib/data/MembersData";
import { PostsData } from "../src/lib/data/PostsData";
import { AboutData } from "../src/lib/data/AboutData";

const prisma = new PrismaClient();

async function main() {
  console.log(`🚀 Memulai proses seeding...`);

  // Gunakan transaksi agar semua operasi berhasil atau semua gagal bersamaan
  await prisma.$transaction(async (tx) => {
    // 1. Hapus data lama untuk memastikan idempotensi
    await tx.aboutInfo.deleteMany();
    await tx.post.deleteMany();
    await tx.member.deleteMany();
    console.log("🧹 Data lama berhasil dibersihkan.");

    // 2. Seed data "Tentang Kami" (AboutInfo)
    await tx.aboutInfo.create({
      data: {
        id: 1, // Set ID secara manual karena ini data tunggal
        orgName: AboutData.orgName,
        description: AboutData.description,
        vision: AboutData.vision,
        mission: AboutData.mission,
        activePeriod: AboutData.activePeriod,
        structure: AboutData.structure, // Prisma akan menangani konversi ke JSON
      },
    });
    console.log(`🌱 Berhasil menambahkan data "Tentang Kami".`);

    // 3. Seed data Postingan
    const formattedPosts = PostsData.map((post) => {
      const { id: _id, ...restOfPost } = post;
      return {
        ...restOfPost,
        date: new Date(post.date),
        eventStartDate: post.eventStartDate
          ? new Date(post.eventStartDate)
          : null,
        eventEndDate: post.eventEndDate ? new Date(post.eventEndDate) : null,
        tags: post.tags || [],
        featured: post.featured ?? false,
      };
    });
    await tx.post.createMany({ data: formattedPosts });
    console.log(
      `🌱 Berhasil menambahkan ${formattedPosts.length} data postingan.`
    );

    // 4. Seed data Anggota
    const formattedMembers = MembersData.map((member) => {
      const { id: _id, ...restOfMember } = member;
      return {
        ...restOfMember,
        jurusan: member.jurusan || null,
        nomorTelepon: member.nomorTelepon || null,
        status: member.status || "Aktif",
        avatarUrl: member.avatarUrl || null,
      };
    });

    await tx.member.createMany({
      data: formattedMembers,
    });
    console.log(
      `🌱 Berhasil menambahkan ${formattedMembers.length} data anggota.`
    );
  });

  console.log(`✅ Seeding selesai dengan sukses!`);
}

main()
  .catch((e) => {
    console.error("❌ Terjadi error saat seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
