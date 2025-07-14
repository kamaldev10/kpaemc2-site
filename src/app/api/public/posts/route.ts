// src/app/api/public/posts/route.ts
import { NextResponse, type NextRequest } from "next/server";
import { PostService } from "@/services/post.service";
import { FilterState } from "@/hooks/useFilteredPosts";

// Handler GET untuk mengambil data postingan dengan filter & pagination
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
    console.error("Error fetching public posts:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
