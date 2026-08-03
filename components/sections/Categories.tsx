"use client";

import Image from "next/image";
import Link from "next/link";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { ChevronLeft, ChevronRight } from "lucide-react";
 

const categories = [
  {
    title: "Cooking",
    count: "24 Products",
    image: "/categories/cooking.jpg",
    slug: "cooking",
  },
  {
    title: "Refrigeration",
    count: "12 Products",
    image: "/categories/refrigeration.png",
    slug: "refrigeration",
  },
  {
    title: "Food Preparation",
    count: "18 Products",
    image: "/categories/food-preparation.jpg",
    slug: "food-preparation",
  },
  {
    title: "Storage & Handling",
    count: "8 Products",
    image: "/categories/storage-handling.png",
    slug: "storage-handling",
  },
  {
    title: "Washing",
    count: "10 Products",
    image: "/categories/washing.jpg",
    slug: "washing",
  },
  {
    title: "Exhaust & Ventilation",
    count: "8 Products",
    image: "/categories/exhaust-ventilation.jpg",
    slug: "exhaust-ventilation",
  },
  {
    title: "Food Holding & Serving",
    count: "15 Products",
    image: "/categories/Food-Holding-&-Serving.jpg",
    slug: "food-holding-serving",
  },
  {
    title: "Bar",
    count: "8 Products",
    image: "/categories/bar.jpg",
    slug: "bar",
  },
  {
    title: "Bakery",
    count: "10 Products",
    image: "/categories/bakery.jpg",
    slug: "bakery",
  },
  {
    title: "Other Equipment",
    count: "Various Products",
    image: "/categories/others.avif",
    slug: "other",
  },
];

export default function Categories() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ]
  );

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1B1B1B] via-[#202020] to-[#151515]">
   <div className="py-24">

        <div className="w-full">

          {/* Heading */}

          <div className="mx-auto mb-16 max-w-3xl px-6 text-center">

            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-red-600">
              PRODUCT CATEGORIES
            </span>

            <h2 className="mt-5 text-5xl font-semibold text-white">
              Commercial Kitchen Equipment
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Discover our extensive range of premium stainless steel
              commercial kitchen equipment engineered for performance,
              durability and hygiene.
            </p>

          </div>

          {/* Horizontal Slider */}
          <div className="relative mt-16">

  {/* Left Arrow */}

  <button
  onClick={scrollPrev}
  className="absolute left-4 lg:left-6 top-1/2 z-20 -translate-y-1/2 h-12 w-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white transition-all duration-300 hover:bg-red-600 flex items-center justify-center"
>
  <ChevronLeft size={22} />
</button>

  {/* Right Arrow */}

  <button
  onClick={scrollNext}
  className="absolute right-4 lg:right-6 top-1/2 z-20 -translate-y-1/2 h-12 w-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white transition-all duration-300 hover:bg-red-600 flex items-center justify-center"
>
  <ChevronRight size={22} />
</button>

  {/* Embla */}

  <div
    className="overflow-hidden"
    ref={emblaRef}
  >
    <div className="flex px-4 lg:px-6">

      {categories.map((category) => (

        <div
          key={category.slug}
          className="min-w-0 flex-[0_0_88%] sm:flex-[0_0_48%] lg:flex-[0_0_25%] xl:flex-[0_0_20%] px-4"
        >

          <Link
            href={`/products/${category.slug}`}
            className="group block"
          >

            <article className="overflow-hidden rounded-xl">

              <div className="relative h-[480px] overflow-hidden">

                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  quality={100}
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <span className="absolute bottom-6 left-6 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black">
                  {category.count}
                </span>

              </div>

              <div className="pt-5">

                <h3 className="text-[23px] font-light tracking-[0.06em] leading-[1.3] text-white">
                  {category.title}
                </h3>

              </div>

            </article>

          </Link>

        </div>

      ))}

    </div>

  </div>

</div>

        </div>

      </div>
    </section>
  );
}