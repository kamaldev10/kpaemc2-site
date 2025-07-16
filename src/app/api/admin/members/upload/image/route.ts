import { NextRequest, NextResponse } from "next/server";
import { getDriveClient } from "@/lib/utils/googleDrive";
import { bufferToStream } from "@/lib/utils/stream";
import { formatImageFilename } from "@/lib/utils/formatImageFilename";

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
        { error: "File terlalu besar." },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop() || "jpg";
    const customFilename = formatImageFilename(name, ext);

    const drive = getDriveClient();
    const folderId = process.env.GOOGLE_DRIVE_MEMBER_IMAGES_FOLDER_ID;
    if (!folderId) throw new Error("Folder ID tidak diset.");

    const res = await drive.files.create({
      requestBody: {
        name: customFilename,
        parents: [folderId],
      },
      media: {
        mimeType: file.type,
        body: bufferToStream(buffer),
      },
      fields: "id, webViewLink, webContentLink",
    });

    const fileData = res.data;

    return NextResponse.json({
      success: true,
      fileId: fileData.id,
      webViewLink: fileData.webViewLink,
      webContentLink: fileData.webContentLink,
      directUrl: `https://drive.google.com/uc?export=view&id=${fileData.id}`,
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    return NextResponse.json({ error: "Upload gagal." }, { status: 500 });
  }
}
