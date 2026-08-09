"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import ProductCard from "@/components/products/ProductCard";
import MobileProductCard from "@/components/products/MobileProductCard";

export interface CatalogueSubcategory {
  title: string;
  slug: string;
  description: string;
  image: string;
  products: Product[];
}

interface CategorySubcategoryCatalogueProps {
  categorySlug: string;
  subcategories: CatalogueSubcategory[];
}

export default function CategorySubcategoryCatalogue({
  categorySlug,
  subcategories,
}: CategorySubcategoryCatalogueProps) {
  const [selectedSlug, setSelectedSlug] = useState(
    subcategories[0]?.slug ?? ""
  );

  const selected = useMemo(
    () =>
      subcategories.find((item) => item.slug === selectedSlug) ??
      subcategories[0],
    [selectedSlug, subcategories]
  );

  if (!selected) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold text-slate-900">
          Products Coming Soon
        </h2>
        <p className="mt-3 text-slate-600">
          We are currently updating this category.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10 md:space-y-14">
      {/* Subcategory navigation */}
      <section aria-label="Subcategories">
        <div className="-mx-5 overflow-x-auto overscroll-x-contain px-5 [scrollbar-width:none] [-ms-overflow-style:none] md:mx-0 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-3 md:grid md:w-full md:grid-cols-3 md:gap-4 lg:grid-cols-6">
            {subcategories.map((subcategory) => {
              const isActive = subcategory.slug === selected.slug;

              return (
                <button
                  key={subcategory.slug}
                  type="button"
                  onClick={() => setSelectedSlug(subcategory.slug)}
                  aria-pressed={isActive}
                  className={`group w-[148px] shrink-0 overflow-hidden rounded-2xl border bg-white text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b191c] focus-visible:ring-offset-2 md:w-auto ${
                    isActive
                      ? "border-[#8b191c] shadow-[0_10px_30px_rgba(139,25,28,0.12)] ring-1 ring-[#8b191c]"
                      : "border-slate-200 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md"
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                    {subcategory.image ? (
                      <Image
                        src={subcategory.image}
                        alt={`${subcategory.title} subcategory`}
                        fill
                        sizes="(max-width: 768px) 148px, 16vw"
                        className="object-contain p-3 transition duration-500 group-hover:scale-105"
                      />
                    ) : null}

                    {isActive ? (
                      <span className="absolute left-2 top-2 rounded-full bg-[#8b191c] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                        Active
                      </span>
                    ) : null}
                  </div>

                  <div className="px-3 py-3">
                    <p
                      className={`text-sm font-semibold leading-snug ${
                        isActive ? "text-[#8b191c]" : "text-slate-900"
                      }`}
                    >
                      {subcategory.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Selected subcategory products */}
      <section aria-live="polite">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 uppercase md:text-3xl">
            {selected.title}
          </h2>

          {selected.description ? (
            <p className="mt-3 text-base leading-7 text-slate-600">
              {selected.description}
            </p>
          ) : null}
        </div>

        {selected.products.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-200 px-6 py-12 text-center">
            <p className="font-medium text-slate-900">
              Products Coming Soon
            </p>
            <p className="mt-2 text-sm text-slate-600">
              We are currently updating this subcategory.
            </p>
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="mt-6 space-y-3 md:hidden">
              {selected.products.map((product) => (
                <MobileProductCard
                  key={product.id}
                  product={product}
                  href={`/products/${categorySlug}/${selected.slug}/${product.slug}`}
                />
              ))}
            </div>

            {/* Desktop grid */}
            <div className="mt-8 hidden gap-8 md:grid md:grid-cols-2 lg:grid-cols-3">
              {selected.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  href={`/products/${categorySlug}/${selected.slug}/${product.slug}`}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
