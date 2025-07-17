import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export { cloudinary };

export function extractPublicId(url: string): string | null {
  const matches = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/);
  return matches?.[1] || null;
}
