"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  name: string;
  image?: string;
  gallery?: string[];
}

export default function ProductGallery({
  name,
  image,
  gallery = [],
}: ProductGalleryProps) {
  const images = useMemo(() => {
    return [image, ...gallery].filter(
      (img): img is string => Boolean(img && img.trim())
    );
  }, [image, gallery]);

  const [selectedImage, setSelectedImage] = useState(images[0] ?? null);

  if (!selectedImage) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 text-slate-500">
        Product image coming soon.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Main Image */}

      <div className="aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <Image
          src={selectedImage}
          alt={name}
          width={900}
          height={900}
          priority
          className="mx-auto h-auto w-full object-contain"
        />
      </div>

      {/* Gallery */}

      {images.length > 1 && (
        <div className="flex flex-wrap gap-4">

          {images.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(img)}
              className={`overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                selectedImage === img
                  ? "scale-105 border-red-700 shadow-lg"
                  : "border-slate-200 hover:border-red-400"
              }`}
            >
              <Image
                src={img}
                alt={`${name} ${index + 1}`}
                width={110}
                height={110}
                className="h-24 w-24 object-cover lg:h-28 lg:w-28"
              />
            </button>
          ))}

        </div>
      )}

    </div>
  );
}