import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton untuk satu item dalam daftar postingan.
 */
function PostListItemSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
      {/* Kerangka Gambar */}
      <div className="md:col-span-4">
        <Skeleton className="w-full aspect-[16/9] rounded-2xl" />
      </div>
      {/* Kerangka Konten Teks */}
      <div className="md:col-span-8 flex flex-col h-full">
        <div className="flex items-center gap-x-4 mb-3">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6 mt-1" />
        <div className="flex-1 flex items-end mt-4">
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Komponen utama yang menampilkan beberapa kerangka item postingan.
 * @param count - Jumlah kerangka yang ingin ditampilkan. Default 5.
 */
export default function PostsListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-8 border-y py-6">
      {Array.from({ length: count }).map((_, index) => (
        <PostListItemSkeleton key={index} />
      ))}
    </div>
  );
}
