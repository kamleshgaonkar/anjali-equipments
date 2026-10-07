"use client";

import { useState } from "react";
import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ClipboardList,
  ImageIcon,
  Plus,
  X,
} from "lucide-react";

import { useQuote } from "@/hooks/useQuote";
import { getProductHref } from "@/lib/catalogue";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  href?: string;
}

export default function ProductCard({ product, href }: ProductCardProps) {
  const productHref = href ?? getProductHref(product);
  const { items, addItem, removeItem } = useQuote();
  const [imageFailed, setImageFailed] = useState(false);
  const [quoteHovered, setQuoteHovered] = useState(false);

  const exists = items.some((item) => item.id === product.id);
  const showImage = Boolean(product.image?.trim()) && !imageFailed;

  const handleQuoteAction = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (exists) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  const quoteLabel = exists
    ? `Remove ${product.name} from quote`
    : `Add ${product.name} to quote`;

  const quoteTitle = exists
    ? quoteHovered
      ? "Remove from Quote"
      : "Added to Quote"
    : "Add to Quote";

  return (
    <article
      className="group relative w-full min-w-0 cursor-pointer bg-[#f5f5f4]"
      style={{ aspectRatio: "235 / 320" }}
    >
      {/* Entire tile → product detail */}
      <Link
        href={productHref}
        className="absolute inset-0 flex cursor-pointer flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b191c] focus-visible:ring-inset"
      >
        {/* Image area ~68% */}
        <div className="relative min-h-0 flex-[0.68] overflow-hidden">
          {showImage ? (
            <Image
              src={product.image}
              alt=""
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 899px) 50vw, (max-width: 1199px) 33vw, (max-width: 1499px) 25vw, (max-width: 1799px) 20vw, 16vw"
              className="object-contain p-5 transition-transform duration-300 ease-out group-hover:scale-[1.035] sm:p-6"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
              <ImageIcon
                size={28}
                strokeWidth={1.25}
                className="text-stone-300"
                aria-hidden
              />
              <div>
                <p className="text-[12px] font-medium leading-4 text-stone-400">
                  Product Image
                </p>
                <p className="mt-0.5 text-[11px] leading-4 text-stone-400">
                  Coming Soon
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Text ~32% — compact, close to image */}
        <div className="flex min-h-0 flex-[0.32] flex-col items-center justify-start px-3 pb-3 pt-1 text-center">
          <p className="text-[13px] font-medium leading-4 text-stone-600">
            {product.group}
          </p>

          <h3 className="mt-1.5 line-clamp-2 text-[18px] font-bold leading-[1.25] tracking-tight text-stone-900 sm:text-[19px]">
            {product.name}
          </h3>
        </div>
      </Link>

      {/*
        Quote action states:
        default → clipboard | hover → white + | added → ✓ | hover added → ×
      */}
      <button
        type="button"
        title={quoteTitle}
        aria-label={quoteLabel}
        aria-pressed={exists}
        onClick={handleQuoteAction}
        onMouseEnter={() => setQuoteHovered(true)}
        onMouseLeave={() => setQuoteHovered(false)}
        className="absolute right-2 top-2 z-10 flex h-11 w-11 cursor-pointer items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b191c]"
      >
        <span
          className={`relative flex h-8 w-8 items-center justify-center border transition-colors duration-200 ${
            exists || quoteHovered
              ? "border-[#8b191c] bg-[#8b191c] text-white"
              : "border-stone-200 bg-white text-stone-700"
          }`}
        >
          {exists ? (
            quoteHovered ? (
              <X size={15} strokeWidth={2.25} aria-hidden />
            ) : (
              <Check size={15} strokeWidth={2.25} aria-hidden />
            )
          ) : quoteHovered ? (
            <Plus size={16} strokeWidth={2.5} aria-hidden />
          ) : (
            <ClipboardList size={15} strokeWidth={1.75} aria-hidden />
          )}
        </span>
      </button>
    </article>
  );
}
