// src/app/api/public/about/route.ts
import { NextResponse } from "next/server";
import { AboutService } from "@/services/about.service";

export async function GET() {
  try {
    const aboutInfo = await AboutService.get();
    if (!aboutInfo) {
      return new NextResponse("Informasi tidak ditemukan", { status: 404 });
    }
    return NextResponse.json(aboutInfo);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
