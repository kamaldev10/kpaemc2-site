import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { ApiError } from "./errors";
import { formatImageFilename } from "./formatImageFilename";
import { bufferToStream } from "./stream";

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

/**
 * Fungsi reusable untuk mengunggah file ke Cloudinary.
 * @param file - Objek File yang akan diunggah.
 * @param name - Nama yang akan digunakan untuk membuat filename (misal: judul post, nama member).
 * @param folder - Folder tujuan di Cloudinary (misal: 'post-images', 'member-images').
 * @param transformations - Opsi transformasi gambar dari Cloudinary.
 * @returns URL aman dari gambar yang sudah diunggah.
 */
export async function uploadImage(
  file: File,
  name: string,
  folder: string,
  transformations: object[]
): Promise<string> {
  // 1. Validasi ukuran file
  if (file.size > 5 * 1024 * 1024) {
    // 5 MB
    throw new ApiError(413, "Ukuran file terlalu besar. Maksimal 5 MB.");
  }

  // 2. Buat nama file yang unik dan bersih
  const publicId = formatImageFilename(name, file.name);
  const buffer = Buffer.from(await file.arrayBuffer());

  // 3. Proses upload ke Cloudinary
  const uploadResult = await new Promise<UploadApiResponse>(
    (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          public_id: publicId,
          folder: folder,
          transformation: transformations,
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error("Upload gagal."));
          resolve(result);
        }
      );
      bufferToStream(buffer).pipe(uploadStream);
    }
  );

  return uploadResult.secure_url;
}
