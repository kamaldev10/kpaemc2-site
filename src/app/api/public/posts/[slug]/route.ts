// src/app/api/public/posts/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PostService } from "@/services/post.service";

type RouteParams = {
  params: {
    slug: string;
  };
};

/**
 * GET handler untuk mengambil satu postingan berdasarkan slug.
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = params;
    const post = await PostService.getBySlug(slug);

    if (!post) {
      return new NextResponse("Postingan tidak ditemukan", { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error(`Error fetching post with slug ${params.slug}:`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
