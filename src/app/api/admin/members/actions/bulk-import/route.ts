// src/app/api/admin/members/actions/bulk-import/route.ts
import { NextResponse, type NextRequest } from "next/server";
import { MemberService } from "@/services/member.service";
import { errorHandler } from "@/lib/utils/errors";

/**
 * POST handler untuk menerima dan memproses data import massal.
 */
export async function POST(request: NextRequest) {
  try {
    const membersToImport = await request.json();
    if (!Array.isArray(membersToImport) || membersToImport.length === 0) {
      throw new Error("Data import tidak valid atau kosong.");
    }

    const result = await MemberService.bulkCreate(membersToImport);

    return NextResponse.json({
      message: `${result.count} dari ${membersToImport.length} anggota berhasil diimpor.`,
      count: result.count,
    });
  } catch (error) {
    return errorHandler(error);
  }
}
