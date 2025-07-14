export function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Hapus karakter non-alfanumerik kecuali spasi dan strip
    .trim()
    .replace(/\s+/g, "-") // Ganti spasi dengan strip
    .replace(/-+/g, "-"); // Ganti beberapa strip menjadi satu
}
