"use client";

import { useState } from "react";

import Image from "next/image";

import ProductGroup from "./ProductGroup";

import { Category } from "@/data/categories";
import type { PublicCategory } from "@/lib/catalogue/types";
import { Product } from "@/types/product";

type CatalogueCategory = Category | PublicCategory;

interface CategorySectionProps {
  categories: CatalogueCategory[];
  category: CatalogueCategory;
  products: Product[];
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
  onProductClick: (product: Product) => void;
}

export default function CategorySection({
  categories,
  category,
  products,
  activeCategory,
  onCategoryChange,
  onProductClick,
}: CategorySectionProps) {
  const groups = Object.values(
    products.reduce(
      (acc, product) => {
        const groupName = product.group || "Products";

        if (!acc[groupName]) {
          acc[groupName] = {
            title: groupName,
            products: [] as Product[],
          };
        }

        acc[groupName].products.push(product);

        return acc;
      },
      {} as Record<
        string,
        {
          title: string;
          products: Product[];
        }
      >
    )
  );

  const [hoveredImage, setHoveredImage] =
    useState<string | null>(null);

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  return (
    <section className="py-14 lg:py-20">

      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

          {/* LEFT — CATEGORY NAVIGATOR */}

          <aside>
            <div className="lg:sticky lg:top-28">

              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-red-600">
                Category
              </span>

              {/* Active category image */}

              <div className="relative mt-4 h-[300px] overflow-hidden rounded-2xl bg-slate-200">

                <Image
                  key={category.slug}
                  src={category.image}
                  alt={category.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-all duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-7">

                  <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
                    {category.name}
                  </h2>

                </div>

              </div>

              {/* Category navigation */}

              <div className="mt-8 border-t border-slate-200">

                {categories.map((item, index) => {
                  const active =
                    item.slug === activeCategory;

                  return (
                    <button
                      key={item.slug}
                      type="button"
                      onClick={() =>
                        onCategoryChange(item.slug)
                      }
                      className={`
                        group
                        flex
                        w-full
                        items-center
                        justify-between
                        border-b
                        border-slate-200
                        py-4
                        text-left
                        transition
                        ${
                          active
                            ? "text-red-600"
                            : "text-slate-600 hover:text-slate-950"
                        }
                      `}
                    >

                      <div className="flex items-center gap-4">

                        <span
                          className={`
                            text-xs
                            font-medium
                            ${
                              active
                                ? "text-red-600"
                                : "text-slate-400"
                            }
                          `}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span
                          className={`
                            text-base
                            ${
                              active
                                ? "font-semibold"
                                : "font-medium"
                            }
                          `}
                        >
                          {item.name}
                        </span>

                      </div>

                      <span
                        className={`
                          transition-transform
                          ${
                            active
                              ? "translate-x-0 text-red-600"
                              : "text-slate-300 group-hover:translate-x-1"
                          }
                        `}
                      >
                        →
                      </span>

                    </button>
                  );
                })}

              </div>

            </div>
          </aside>

          {/* RIGHT — PRODUCT CATALOGUE */}

          <div>

            <div className="mb-10">

              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-red-600">
              {category.name} Equipment
              </span>
 
            </div>

             

            <div className="space-y-16">

              {groups.map((group) => (
                <ProductGroup
                  key={group.title}
                  title={group.title}
                  products={group.products}
                  onProductClick={onProductClick}
                  onProductHover={setHoveredImage}
                  onMouseMove={setMousePosition}
                  onProductLeave={() =>
                    setHoveredImage(null)
                  }
                />
              ))}

            </div>

          </div>

        </div>

      </div>

      {/* Existing hover image — kept for now */}

      {hoveredImage && (
        <div
          className="
            pointer-events-none
            fixed
            z-50
            overflow-hidden
            rounded-[18px]
            border
            border-slate-200
            bg-white
            shadow-[0_25px_70px_rgba(0,0,0,0.12)]
          "
          style={{
            left: mousePosition.x + 35,
            top: mousePosition.y - 120,
            width: 260,
            height: 260,
          }}
        >
          <Image
            src={hoveredImage}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      )}

    </section>
  );
}