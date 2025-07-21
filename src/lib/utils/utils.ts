import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// decode base64
export function decodeBase64Json(base64String: string) {
  return JSON.parse(Buffer.from(base64String, "base64").toString("utf-8"));
}

// Mengubah setiap kata dalam string menjadi huruf kapital di awalnya.
export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

// Generate slug otomatis
export function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Hapus karakter non-alfanumerik kecuali spasi dan strip
    .trim()
    .replace(/\s+/g, "-") // Ganti spasi dengan strip
    .replace(/-+/g, "-"); // Ganti beberapa strip menjadi satu
}

// Null to Undefined
export function nullToUndefined<T>(value: T | null): T | undefined {
  return value === null ? undefined : value;
}
