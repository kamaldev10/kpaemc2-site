const allowedExtensions = ["jpg", "jpeg", "png", "webp", "gif", "svg", "heic"];

export function formatImageFilename(name: string, originalFilename: string) {
  const extension = originalFilename.split(".").pop()?.toLowerCase() || "jpg";
  const validExtension = allowedExtensions.includes(extension)
    ? extension
    : "jpg";

  const sanitizedName = name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");

  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:T]/g, "").slice(0, 13); // YYYYMMDDHHmm (13 karakter)

  return `${sanitizedName}-${timestamp}`;
}
