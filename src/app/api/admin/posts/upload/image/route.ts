import { NextRequest, NextResponse } from "next/server";
import { type UploadApiResponse } from "cloudinary";
import { Readable } from "stream";
import { ApiError, errorHandler } from "@/lib/utils/errors";
import { cloudinary } from "@/lib/utils/cloudinary";
import { formatImageFilename } from "@/lib/utils/formatImageFilename";

function bufferToStream(buffer: Buffer): Readable {
  const readable = new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
  return readable;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title")?.toString();

    if (!(file instanceof Blob) || !title) {
      throw new ApiError(400, "File tidak ditemukan.");
    }

    if (file.size > 5 * 1024 * 1024)
      throw new ApiError(413, "Ukuran file terlalu besar. Maksimal 5 MB.");

    const buffer = Buffer.from(await file.arrayBuffer());

    const ext = file.name.split(".").pop() || "jpg";
    const publicId = formatImageFilename(title, ext);

    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            public_id: `${publicId}`,
            folder: "post-images",
            transformation: [
              { width: 1200, crop: "limit" },
              { quality: "auto" },
              { fetch_format: "auto" },
            ],
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

    return NextResponse.json({
      success: true,
      secureUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });
  } catch (error) {
    return errorHandler(error);
  }
}
