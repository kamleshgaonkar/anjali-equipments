"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  name: string;
  image: string;
  gallery?: string[];
}

export default function ProductGallery({
  name,
  image,
  gallery = [],
}: ProductGalleryProps) {
  const images = [image, ...gallery];
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div>
      {/* Main Image */}

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <Image
          src={selectedImage}
          alt={name}
          width={800}
          height={800}
          priority
          className="mx-auto h-auto w-full object-contain"
        />
      </div>

      {/* Thumbnails */}

      {images.length > 1 && (
        <div className="mt-5 flex gap-3 overflow-x-auto pb-1 sm:gap-4">
          {images.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(img)}
              className={`shrink-0 overflow-hidden rounded-xl border-2 transition ${
                selectedImage === img
                  ? "border-red-700"
                  : "border-slate-200 hover:border-red-300"
              }`}
            >
              <Image
  src={img}
  alt={name}
  width={90}
  height={90}
  className="h-16 w-16 object-cover sm:h-[90px] sm:w-[90px]"
/>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}