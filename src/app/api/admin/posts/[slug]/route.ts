import { NextResponse } from "next/server";
import { PostService } from "@/services/post.service";
import { errorHandler } from "@/lib/utils/errors";

type RouteParams = { params: { slug: string } };

// PUT: Mengupdate postingan berdasarkan slug
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { slug } = params;
    const formData = await request.formData();
    const updatedPost = await PostService.update(slug, formData);
    return NextResponse.json(updatedPost);
  } catch (error) {
    return errorHandler(error);
  }
}

// DELETE: Menghapus postingan berdasarkan slug
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { slug } = params;
    await PostService.delete(slug);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return errorHandler(error);
  }
}
