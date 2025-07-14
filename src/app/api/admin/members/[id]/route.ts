// src/app/api/admin/members/[id]/route.ts
import { NextResponse } from "next/server";
import { MemberService } from "@/services/member.service";
import { z } from "zod";

type RouteParams = {
  params: {
    id: string;
  };
};

/**
 * PUT handler untuk mengupdate anggota berdasarkan ID.
 */
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const id = Number(params.id);
    const data = await request.json();
    const updatedMember = await MemberService.update(id, data);
    return NextResponse.json(updatedMember);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 400 });
    }
    console.error(`Error updating member with id ${params.id}:`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

/**
 * DELETE handler untuk menghapus anggota berdasarkan ID.
 */
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const id = Number(params.id);
    await MemberService.delete(id);
    return new NextResponse(null, { status: 204 }); // Standard response for successful delete
  } catch (error) {
    console.error(`Error deleting member with id ${params.id}:`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
