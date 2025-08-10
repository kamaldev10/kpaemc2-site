import { NextResponse } from "next/server";
import { errorHandler } from "@/lib/utils/errors";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Jalankan beberapa query agregat secara paralel untuk efisiensi
    const [postCount, memberCount, recentActivity] = await Promise.all([
      prisma.post.count(),
      prisma.member.count(),
      prisma.post.findMany({
        // Contoh: ambil 2 postingan terbaru
        take: 2,
        orderBy: { createdAt: "desc" },
        select: { id: true, title: true, category: true },
      }),
    ]);

    const stats = {
      totalPosts: postCount,
      totalMembers: memberCount,
      recentActivity: recentActivity,
      // Anda bisa menambahkan data lain seperti total pengunjung di sini
      totalVisitors: 12345, // Data dummy untuk pengunjung
    };

    return NextResponse.json(stats);
  } catch (error) {
    return errorHandler(error);
  }
}
