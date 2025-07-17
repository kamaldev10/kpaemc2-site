import { NextRequest, NextResponse } from "next/server";
import { type UploadApiResponse } from "cloudinary";
import { Readable } from "stream";
import { formatImageFilename } from "@/lib/utils/formatImageFilename";
import { cloudinary } from "@/lib/utils/cloudinary";

function bufferToStream(buffer: Buffer): Readable {
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null);
  return readable;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const name = formData.get("name")?.toString();

    if (!(file instanceof Blob) || !name) {
      return NextResponse.json(
        { error: "File atau nama tidak valid." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileSizeMB = buffer.byteLength / 1024 / 1024;
    console.log(`📦 File size: ${fileSizeMB.toFixed(2)} MB`);

    if (fileSizeMB > 5) {
      return NextResponse.json(
        {
          error: "File terlalu besar. Konversi terlebih dahulu. Maksimal 5 MB",
        },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop() || "jpg";
    const publicId = formatImageFilename(name, ext);

    const uploadResult: UploadApiResponse =
      await new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            public_id: `member-images/${publicId}`,
            folder: "member-images",
            transformation: [
              {
                width: 500,
                height: 500,
                crop: "fill",
                gravity: "auto",
              },
              {
                fetch_format: "auto",
                quality: "auto",
              },
            ],
          },
          (error, result) => {
            if (error) return reject(error);
            if (!result)
              return reject(new Error("Upload gagal, result undefined."));
            return resolve(result); // ✅ valid karena sudah dicek
          }
        );

        bufferToStream(buffer).pipe(uploadStream);
      });

    return NextResponse.json({
      success: true,
      secureUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    return NextResponse.json({ error: "Upload gagal." }, { status: 500 });
  }
}
