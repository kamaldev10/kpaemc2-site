// src/app/api/admin/posts/[slug]/route.ts
import { NextResponse } from "next/server";
import { PostService } from "@/services/post.service";
import { z } from "zod";

type RouteParams = { params: { slug: string } };

// PUT: Mengupdate postingan berdasarkan slug
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const data = await request.json();
    const updatedPost = await PostService.update(params.slug, data);
    return NextResponse.json(updatedPost);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 400 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// DELETE: Menghapus postingan berdasarkan slug
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    await PostService.delete(params.slug);
    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 400 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
