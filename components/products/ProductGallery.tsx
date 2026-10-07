"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

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

  useEffect(() => {
    setSelectedImage(images[0] ?? null);
  }, [images]);

  if (!selectedImage) {
    return (
      <div className="flex aspect-square flex-col items-center justify-center gap-3 bg-[#f5f5f4] text-center">
        <ImageIcon
          size={32}
          strokeWidth={1.25}
          className="text-stone-300"
          aria-hidden
        />
        <div>
          <p className="text-sm font-medium text-stone-400">Product Image</p>
          <p className="mt-0.5 text-xs text-stone-400">Coming Soon</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden bg-[#f5f5f4]">
        <Image
          src={selectedImage}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-3 sm:p-6 md:p-10"
        />
      </div>

      {images.length > 1 ? (
        <div className="flex flex-wrap gap-3">
          {images.map((img, index) => {
            const isActive = selectedImage === img;

            return (
              <button
                key={`${img}-${index}`}
                type="button"
                onClick={() => setSelectedImage(img)}
                aria-label={`View image ${index + 1}`}
                aria-pressed={isActive}
                className={`relative h-16 w-16 overflow-hidden bg-[#f5f5f4] transition sm:h-20 sm:w-20 ${
                  isActive
                    ? "ring-2 ring-[#8b191c] ring-offset-2"
                    : "ring-1 ring-stone-200 hover:ring-stone-300"
                }`}
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-contain p-2"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
