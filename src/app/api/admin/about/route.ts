// src/app/api/admin/about/route.ts
import { NextResponse } from "next/server";
import { AboutService } from "@/services/about.service";
import { z } from "zod";

// GET handler untuk mengambil data di dashboard
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

// PUT handler untuk mengupdate data dari form di dashboard
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const updatedInfo = await AboutService.update(data);
    return NextResponse.json(updatedInfo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 400 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
