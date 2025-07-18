import { NextResponse } from "next/server";
import { MemberService } from "@/services/member.service";
import { extractPublicId } from "@/lib/utils/cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { ApiError, errorHandler } from "@/lib/utils/errors";

type RouteParams = {
  params: { id: string };
};

/**
 * PUT handler untuk mengupdate anggota berdasarkan ID.
 */
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const id = Number(params.id);
    // const id = await Number(params.id);
    const data = await request.json();

    const existingMember = await MemberService.findById(id);
    if (!existingMember) {
      throw new ApiError(404, "Anggota tidak ditemukan");
    }

    // Hapus avatar lama jika avatar baru diunggah dan berbeda
    if (
      data.avatarUrl &&
      existingMember.avatarUrl &&
      data.avatarUrl !== existingMember.avatarUrl
    ) {
      const oldPublicId = extractPublicId(existingMember.avatarUrl);
      if (oldPublicId) {
        console.log("🧹 Menghapus avatar lama:", oldPublicId);
        // Hapus dari cloudinary tanpa menghentikan proses
        await cloudinary.uploader.destroy(oldPublicId);
      }
    }

    const updatedMember = await MemberService.update(id, data);
    return NextResponse.json(updatedMember);
  } catch (error) {
    return errorHandler(error);
  }
}

/**
 * DELETE handler untuk menghapus anggota berdasarkan ID.
 */
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const id = Number(params.id);
    // const id = await Number(params.id);

    // Ambil data member untuk mendapatkan URL avatar sebelum dihapus
    const existingMember = await MemberService.findById(id);

    if (existingMember?.avatarUrl) {
      const publicId = extractPublicId(existingMember.avatarUrl);
      if (publicId) {
        console.log("🧹 Menghapus avatar dari Cloudinary:", publicId);
        await cloudinary.uploader.destroy(publicId);
      }
    }

    // Hapus member dari database
    await MemberService.delete(id);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return errorHandler(error);
  }
}
