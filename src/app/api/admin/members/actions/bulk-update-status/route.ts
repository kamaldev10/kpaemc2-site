// src/app/api/admin/members/actions/bulk-update-status/route.ts
import { NextResponse, type NextRequest } from "next/server";
import { MemberService } from "@/services/member.service";
import { errorHandler } from "@/lib/utils/errors";
import z from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Validasi input dari frontend
    const { ids, status, mode } = z
      .object({
        ids: z.array(z.number()),
        status: z.enum(["Anggota Biasa", "Anggota Luar Biasa", "Non-aktif"]),
        mode: z.enum(["include", "exclude"]),
      })
      .parse(body);

    const result = await MemberService.bulkUpdateStatus({ ids, status, mode });

    return NextResponse.json({
      message: `${result.count} anggota berhasil diubah statusnya menjadi ${status}.`,
    });
  } catch (error) {
    return errorHandler(error);
  }
}
