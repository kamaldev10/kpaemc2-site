/**
 * seed.ts
 * Skrip untuk mengisi database dengan data awal.
 */
import { PrismaClient } from "@prisma/client";
import { MembersData } from "../src/lib/data/MembersData";
import { PostsData } from "../src/lib/data/PostsData";
import { AboutData } from "../src/lib/data/AboutData";

const prisma = new PrismaClient();

async function main() {
  console.log(`🚀 Memulai proses seeding...`);

  await prisma.$transaction(async (tx) => {
    // Hapus data lama
    await tx.aboutInfo.deleteMany();
    await tx.post.deleteMany();
    await tx.member.deleteMany();
    console.log("🧹 Data lama berhasil dibersihkan.");

    // Seed data "Tentang Kami"
    await tx.aboutInfo.create({
      data: {
        id: 1,
        orgName: AboutData.orgName,
        bornDate: AboutData.bornDate,
        motto: AboutData.motto,
        description: AboutData.description,
        vision: AboutData.vision,
        mission: AboutData.mission,
        activePeriod: AboutData.activePeriod,
        structure: AboutData.structure,
      },
    });
    console.log(`🌱 Berhasil menambahkan data "Tentang Kami".`);

    // Seed data Postingan
    const formattedPosts = PostsData.map((post) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _, ...restOfPost } = post;
      return {
        ...restOfPost,
        date: new Date(post.date),
        eventStartDate: post.eventStartDate
          ? new Date(post.eventStartDate)
          : null,
        eventEndDate: post.eventEndDate ? new Date(post.eventEndDate) : null,
        tags: post.tags || [],
        featured: post.featured ?? false,
        description: Array.isArray(post.description)
          ? post.description.join("\n\n")
          : post.description,
      };
    });
    await tx.post.createMany({ data: formattedPosts });
    console.log(
      `🌱 Berhasil menambahkan ${formattedPosts.length} data postingan.`
    );

    // Seed data Anggota
    const formattedMembers = MembersData.map((member) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _, ...restOfMember } = member;
      return {
        ...restOfMember,
        jurusan: member.jurusan || null,
        nomorTelepon: member.nomorTelepon || null,
        status: member.status || "Aktif",
        avatarUrl: member.avatarUrl || null,
      };
    });
    await tx.member.createMany({ data: formattedMembers });
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
