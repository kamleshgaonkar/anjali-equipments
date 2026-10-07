"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";

import ProductDrawer from "@/components/products/ProductDrawer";
import CTA from "@/components/sections/CTA";
import {
  HeaderOffsetSpacer,
  StickyBreadcrumbBar,
} from "@/components/layout/StickyBreadcrumbBar";

import type { PublicCategory } from "@/lib/catalogue/types";
import { Product } from "@/types/product";

type SearchableProduct = Product & {
  categoryName: string;
  categorySlug: string;
};

interface ProductsPageClientProps {
  categories: PublicCategory[];
  products: SearchableProduct[];
  productCounts: Record<string, number>;
}

export default function ProductsPageClient({
  categories,
  products,
}: ProductsPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (query.length < 2) {
      return [];
    }

    return products
      .filter((product) => {
        const searchable = [
          product.name,
          product.model,
          product.group,
          product.categoryName,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchable.includes(query);
      })
      .slice(0, 8);
  }, [searchQuery, products]);

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setDrawerOpen(true);
    setSearchQuery("");
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <HeaderOffsetSpacer />
      <StickyBreadcrumbBar />

      <main className="bg-white">
        {/* ================================================== */}
        {/* PRODUCTS PAGEHERO */}
        {/* ================================================== */}

        <section className="bg-white">
          <div className="relative h-[280px] overflow-visible md:h-[320px] lg:h-[390px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url(/images/kitchen/kitchen-panorama.jpg)",
              }}
            />
            <div className="absolute inset-0 bg-black/70" />

            <div className="relative flex h-full items-center">
              <div className="container-custom w-full py-8 md:py-10">
                <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)] lg:gap-12">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-500">
                      Commercial Kitchen Equipment
                    </p>

                    <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-white md:mt-4 md:text-4xl lg:text-5xl lg:leading-[1.1]">
                      Equipment for Every Stage
                      <br className="hidden sm:block" /> of the Kitchen
                    </h1>

                    <p className="mt-4 max-w-2xl text-sm leading-6 text-white/85 md:mt-5 md:text-base md:leading-7">
                      Explore professional commercial kitchen equipment
                      designed, manufactured and supplied for demanding
                      foodservice environments.
                    </p>
                  </div>

                  {/* Search */}
                  <div className="hidden">
                    <div className="relative">
                      <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(event) =>
                          setSearchQuery(event.target.value)
                        }
                        placeholder="Search equipment by name or model..."
                        className="h-12 w-full rounded-xl border border-white/20 bg-white pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-red-600 focus:ring-4 focus:ring-red-50 md:h-14 md:text-base"
                      />

                      {searchQuery ? (
                        <button
                          type="button"
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                          aria-label="Clear search"
                        >
                          <X size={16} />
                        </button>
                      ) : null}
                    </div>

                    {searchQuery.trim().length >= 2 ? (
                      <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-40 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
                        {searchResults.length > 0 ? (
                          <div className="max-h-[360px] overflow-y-auto p-2">
                            {searchResults.map((product) => (
                              <button
                                key={product.id}
                                type="button"
                                onClick={() => openProduct(product)}
                                className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-2.5 text-left transition hover:bg-slate-50"
                              >
                                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-50">
                                  {product.image ? (
                                    <Image
                                      src={product.image}
                                      alt={product.name}
                                      fill
                                      sizes="48px"
                                      className="object-contain p-1"
                                    />
                                  ) : (
                                    <div className="flex h-full items-center justify-center text-[10px] text-slate-400">
                                      No Image
                                    </div>
                                  )}
                                </div>

                                <div className="min-w-0 flex-1">
                                  <p className="text-[11px] font-semibold uppercase tracking-wider text-red-700">
                                    {product.categoryName}
                                  </p>
                                  <p className="mt-0.5 truncate text-sm font-semibold text-slate-900">
                                    {product.name}
                                  </p>
                                  {product.model ? (
                                    <p className="mt-0.5 text-xs text-slate-500">
                                      {product.model}
                                    </p>
                                  ) : null}
                                </div>

                                <ArrowRight
                                  size={16}
                                  className="shrink-0 text-slate-400"
                                />
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="p-5 text-center text-sm text-slate-500">
                            No equipment found for “{searchQuery}”
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* BROWSE BY CATEGORY */}
        {/* ================================================== */}

        <section className="bg-white">
          <div className="container-custom py-16 lg:py-24">
            <div className="mb-10 md:mb-14">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-red-700">
                Explore Equipment
              </p>

              <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                  Browse by Category
                </h2>

                <p className="max-w-xl text-base leading-7 text-slate-600 lg:text-right">
                  Select a category to explore our complete range of commercial
                  kitchen equipment.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3 xl:gap-6 2xl:grid-cols-4">
              {categories.map((category) => {
                return (
                  <Link
                    key={category.slug}
                    href={`/products/${category.slug}`}
                    className="group relative min-h-[300px] cursor-pointer overflow-hidden rounded-[24px] bg-slate-900 md:min-h-[320px] xl:min-h-[340px]"
                  >
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    ) : null}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/5" />
                    <div className="absolute inset-0 bg-red-950/0 transition duration-500 group-hover:bg-red-950/10" />

                    <div className="relative flex h-full min-h-[330px] flex-col justify-end p-6 md:p-8">
                      <div className="flex items-end justify-between gap-6">
                        <h3 className="max-w-md text-2xl font-bold tracking-tight text-white md:text-3xl">
                          {category.name}
                        </h3>

                        <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 group-hover:border-red-600 group-hover:bg-red-700 sm:flex">
                          <ArrowRight size={19} />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <ProductDrawer
        product={selectedProduct}
        open={drawerOpen}
        onClose={closeDrawer}
      />

      <CTA />
    </>
  );
}
