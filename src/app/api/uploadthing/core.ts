// src/app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter untuk aplikasi Anda, bisa berisi beberapa FileRoutes
export const ourFileRouter = {
  // Definisikan rute upload, beri nama unik
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Atur middleware di sini jika perlu (misal: cek autentikasi user)
    .middleware(async ({ req }) => {
      // Kode ini berjalan di server sebelum upload
      // Anda bisa cek sesi user di sini
      const user = { id: "user_123" }; // Simulasi user
      if (!user) throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Kode ini berjalan di server setelah upload selesai
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
