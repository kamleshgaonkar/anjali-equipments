"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductGroup from "./ProductGroup";

import { Category } from "@/data/categories";
import { Product } from "@/types/product";

interface ProductGroupProps {
  title: string;
  products: Product[];
  onProductClick: (product: Product) => void;
  onProductHover: (image: string) => void;
  onProductLeave: () => void;
  onMouseMove: (pos: { x: number; y: number }) => void;
}
interface CategorySectionProps {
  category: Category;
  products: Product[];
  onProductClick: (product: Product) => void;
}

export default function CategorySection({
  category,
  products,
  onProductClick,
}: CategorySectionProps) {
  // Group products automatically by their "group" property
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
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:grid-cols-12">
        {/* Left */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-red-600">
              Category
            </span>

            <h2 className="mt-4 text-5xl font-semibold text-slate-900">
              {category.name}
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              {category.description}
            </p>

            <div className="mt-10">
  <div className="overflow-hidden rounded-3xl">
    <Image
      src={category.image}
      alt={category.name}
      width={700}
      height={900}
      className="h-auto w-full object-cover transition duration-700 hover:scale-105"
    />
  </div>

  <Link
    href={`/products/${category.slug}`}
    className="mt-6 inline-flex items-center gap-3 rounded-xl bg-red-600 px-7 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-red-700 hover:shadow-xl"
  >
    Explore {category.name}
    <span className="text-lg">→</span>
  </Link>
</div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-24 lg:col-span-7">
        {groups.map((group, index) => (
  <div
    key={group.title}
    className={index === 0 ? "mt-10" : ""}
  >
  <ProductGroup
    title={group.title}
    products={group.products}
    onProductClick={onProductClick}
    onProductHover={setHoveredImage}
    onMouseMove={setMousePosition}
    onProductLeave={() => setHoveredImage(null)}
/>

  </div>
))}
        </div>
      </div>
      {hoveredImage && (
    <div
    className="
    fixed
    z-50
    pointer-events-none
    overflow-hidden
    rounded-[18px]
    border
    border-slate-200
    bg-white
    shadow-[0_25px_70px_rgba(0,0,0,0.12)]
    animate-in
    fade-in
    zoom-in-95
    duration-150
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