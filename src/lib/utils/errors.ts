// src/lib/errors.ts
import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Class error kustom untuk menangani error API dengan statusCode.
 */
export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}

/**
 * Fungsi terpusat untuk menangani semua jenis error dan mengembalikannya
 * sebagai respons JSON yang konsisten.
 */
export function errorHandler(error: unknown) {
  // 1. Tangani error kustom ApiError
  if (error instanceof ApiError) {
    return NextResponse.json(
      { status: "fail", message: error.message },
      { status: error.statusCode }
    );
  }

  // 2. Tangani error validasi dari Zod
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      {
        status: "fail",
        message: "Data yang dikirim tidak valid.",
        issues: error.issues,
      },
      { status: 400 } // Bad Request
    );
  }

  // 3. Tangani error tak terduga lainnya
  console.error("An unexpected error occurred:", error);
  return NextResponse.json(
    { status: "error", message: "Terjadi kesalahan internal pada server." },
    { status: 500 } // Internal Server Error
  );
}
