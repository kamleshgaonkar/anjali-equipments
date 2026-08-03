"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {

    if (window.innerWidth < 1024) return;
    
    const section = sectionRef.current;
    const slider = sliderRef.current;

    if (!section || !slider) return;

    const ctx = gsap.context(() => {
      const totalScroll =
        slider.scrollWidth - window.innerWidth;

      gsap.to(slider, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();

  }, []);

  return (
    <section
    ref={sectionRef}
    className="relative overflow-hidden bg-gradient-to-b from-[#1B1B1B] via-[#202020] to-[#151515]"
  >
    <div className="flex h-screen items-center">

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

          <div
  ref={sliderRef}
  className="flex gap-6 overflow-x-auto lg:overflow-visible pl-5 lg:pl-[10vw] pr-5 lg:pr-[20vw] scrollbar-hide will-change-transform"
>

            {categories.map((category) => (

              <Link
                key={category.slug}
                href={`/products/${category.slug}`}
                className="group w-[280px] sm:w-[340px] lg:w-[380px] shrink-0"
              >

                <article className="overflow-hidden rounded-xl">

                  {/* Image */}

                  <div className="relative h-[480px] overflow-hidden">

                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      unoptimized
                      quality={100}
                      sizes="380px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    <div className="absolute bottom-6 left-6">

                      <span className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow-lg">
                        {category.count}
                      </span>

                    </div>

                  </div>

                  {/* Content */}

                  <div className="pt-5">

                  <h3 className="text-[23px] font-light tracking-[0.06em] leading-[1.3] text-slate-100">
                      {category.title}
                    </h3>

                  </div>

                </article>

              </Link>

            ))}

          </div>

        </div>

      </div>
    </section>
  );
}