// src/app/api/admin/members/[id]/route.ts
import { NextResponse } from "next/server";
import { MemberService } from "@/services/member.service";
import { z } from "zod";
import { extractPublicId } from "@/lib/utils/cloudinary";
import { v2 as cloudinary } from "cloudinary";

type RouteParams = {
  params: { id: string };
};

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const id = Number(params.id);
    const data = await request.json();

    console.log("🔧 PUT member:", { id, data });

    const existing = await MemberService.findById(id);
    if (!existing) {
      return new NextResponse("Member not found", { status: 404 });
    }

    // Delete old avatar if new one is different
    if (
      data.avatarUrl &&
      existing.avatarUrl &&
      data.avatarUrl !== existing.avatarUrl
    ) {
      const oldPublicId = extractPublicId(existing.avatarUrl);
      if (oldPublicId) {
        console.log("🧹 Deleting old avatar:", oldPublicId);
        await cloudinary.uploader.destroy(oldPublicId);
      }
    }

    const updatedMember = await MemberService.update(id, data);
    return NextResponse.json(updatedMember);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 400 });
    }

    console.error("❌ PUT error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

/**
 * DELETE handler untuk menghapus anggota berdasarkan ID.
 */
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const id = await Number(params.id);

    // Ambil member sebelum dihapus
    const existing = await MemberService.findById(id);

    if (existing?.avatarUrl) {
      const publicId = extractPublicId(existing.avatarUrl);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    await MemberService.delete(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 400 });
    }
    console.error(`Error updating member with id ${params.id}:`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
