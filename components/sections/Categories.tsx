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

            <h2 className="mt-5 text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
              Commercial Kitchen Equipment
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
              Discover our extensive range of premium stainless steel
              commercial kitchen equipment engineered for performance,
              durability and hygiene.
            </p>

          </div>

          {/* Horizontal Slider */}
          <div className="relative mt-16">

  {/* Left Arrow */}

  <button
  type="button"
  aria-label="Previous category"
  onClick={scrollPrev}
  className="absolute left-2 top-[140px] z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-all duration-300 hover:bg-red-600 sm:left-4 sm:top-1/2 sm:h-12 sm:w-12 sm:-translate-y-1/2 lg:left-6"
>
  <ChevronLeft size={22} />
</button>

  {/* Right Arrow */}

  <button
  type="button"
  aria-label="Next category"
  onClick={scrollNext}
  className="absolute right-2 top-[140px] z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-all duration-300 hover:bg-red-600 sm:right-4 sm:top-1/2 sm:h-12 sm:w-12 sm:-translate-y-1/2 lg:right-6"
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
          className="min-w-0 flex-[0_0_85%] px-3 sm:flex-[0_0_48%] sm:px-4 lg:flex-[0_0_25%] xl:flex-[0_0_20%]"
        >

          <Link
            href={`/products/${category.slug}`}
            className="group block"
          >

            <article className="overflow-hidden rounded-xl">

              <div className="relative h-[320px] overflow-hidden sm:h-[400px] lg:h-[480px]">

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