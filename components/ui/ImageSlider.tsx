"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

const images = [
  "/why/factory-1.png",
  "/why/factory-2.png",
  "/why/factory-3.png",
  "/why/factory-4.png",
];

export default function ImageSlider() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const autoplay = Autoplay({
    delay: 5000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [autoplay]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="overflow-hidden rounded-2xl">

      {/* Slider */}

      <div ref={emblaRef} className="overflow-hidden">

        <div className="flex">

          {images.map((image, index) => (

            <div
              key={index}
              className="relative min-w-full"
            >

              <div className="relative h-[280px] overflow-hidden sm:h-[400px] lg:h-[700px]">

                <Image
                  src={image}
                  alt={`Factory ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover transition-transform duration-[7000ms] ease-linear hover:scale-105"
                />

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Dots */}

      <div className="mt-6 flex justify-center gap-3">

        {images.map((_, index) => (

          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => emblaApi?.scrollTo(index)}
            className="flex min-h-11 min-w-11 items-center justify-center"
          >
            <span
              className={`block h-2.5 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? "w-10 bg-red-600"
                  : "w-2.5 bg-slate-300"
              }`}
            />
          </button>

        ))}

      </div>

    </div>
  );
}