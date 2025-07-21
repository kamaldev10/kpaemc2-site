// src/app/api/admin/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PostService } from "@/services/post.service";
import { FilterState } from "@/hooks/useFilteredPosts";
import { errorHandler } from "@/lib/utils/errors";

// GET: Mengambil semua postingan
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Ambil parameter dari URL
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const year = searchParams.get("year") || "all";
    const category =
      (searchParams.get("category") as FilterState["category"]) || "all";
    const featured = searchParams.get("featured") === "true";

    // Panggil service untuk mengambil data dari database
    const result = await PostService.getFilteredPosts({
      filters: { search, year, category, featured },
      page,
      limit,
    });

    // Kirim total data melalui header untuk pagination di frontend
    return NextResponse.json(result.data, {
      headers: { "X-Total-Count": String(result.total) },
    });
  } catch (error) {
    return errorHandler(error);
  }
}

// POST: Membuat postingan baru
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const newPost = await PostService.create(formData);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
