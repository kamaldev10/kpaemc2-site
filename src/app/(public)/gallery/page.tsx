"use client";
import Image from "next/image";

export default function GalleryPage() {
  return (
    <>
      <section>
        <div className="py-10 bg-gradient-to-r from-fuchsia-600 to-blue-600">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold leading-tight text-center text-white sm:text-4xl lg:text-5xl">
              You’ll be in great company
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-6 xl:grid-cols-11">
          <div>
            <div className="aspect-w-1 aspect-h-1">
              <Image
                width={120}
                height={120}
                className="bg-gray-200"
                src="/images/members/ali.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
