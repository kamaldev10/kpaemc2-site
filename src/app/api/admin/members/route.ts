// src/app/api/admin/members/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { MemberService } from "@/services/member.service";
import { z } from "zod";
import { Member } from "@/types/Member";

/**
 * GET handler yang mendukung pagination dan sorting dari URL query.
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const isExport = searchParams.get("export") === "true";

    if (isExport) {
      // Jika export, panggil getAll tanpa limit untuk mengambil semua data
      const result = await MemberService.getAll();
      return NextResponse.json(result.data);
    }

    // Logika pagination seperti biasa jika bukan export
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const sortKey = (searchParams.get("sort") as keyof Member) || "name";
    const sortDir = (searchParams.get("dir") as "asc") || "desc" || "asc";

    const result = await MemberService.getAll({
      page,
      limit,
      sortKey,
      sortDir,
    });

    return NextResponse.json(result.data, {
      headers: { "X-Total-Count": String(result.total) },
    });
  } catch (error) {
    console.error("Error fetching members:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

/**
 * POST handler untuk membuat anggota baru.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newMember = await MemberService.create(data);
    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    // Tangani error validasi dari Zod
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 400 });
    }
    console.error("Error creating member:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
