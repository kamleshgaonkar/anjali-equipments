"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { NavCatalogueCategory } from "@/lib/catalogue/types";

export default function ProductsMegaMenu({
  catalogue,
  onNavigate,
}: {
  catalogue: NavCatalogueCategory[];
  onNavigate: () => void;
}) {
  return (
    <div className="container-custom py-7">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-red-700">
        Explore Equipment
      </p>

      <div className="mt-6 grid grid-cols-3 gap-x-5 gap-y-[18px]">
        {catalogue.map((category) => (
          <Link
            key={category.id}
            href={`/products/${category.slug}`}
            onClick={onNavigate}
            className="group relative block h-[110px] overflow-hidden rounded-[12px] bg-slate-900 xl:h-[124px]"
          >
            {category.heroImage ? (
              <Image
                src={category.heroImage}
                alt={category.name}
                fill
                sizes="(min-width: 1280px) 22vw, 28vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            ) : null}

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/5" />
            <div className="absolute inset-0 bg-red-950/0 transition duration-500 group-hover:bg-red-950/10" />

            <div className="relative flex h-full items-end justify-between gap-3 p-3.5 xl:p-4">
              <h3 className="line-clamp-2 max-w-[80%] text-sm font-bold leading-tight tracking-tight text-white xl:text-base">
                {category.name}
              </h3>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 group-hover:border-red-600 group-hover:bg-red-700 xl:h-9 xl:w-9">
                <ArrowRight size={15} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/products"
        onClick={onNavigate}
        className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#8b191c] transition-all hover:gap-2.5"
      >
        View All Equipment
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}
