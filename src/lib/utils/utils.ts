import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function decodeBase64Json(base64String: string) {
  return JSON.parse(Buffer.from(base64String, "base64").toString("utf-8"));
}
