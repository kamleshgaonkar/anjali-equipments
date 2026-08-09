import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  href?: string;
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ProductCard({
  product,
  href,
}: ProductCardProps) {
  const productHref =
    href ??
    `/products/${toSlug(product.category)}/${toSlug(product.group)}/${product.slug}`;

  return (
    <Link
      href={productHref}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b191c] focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-5 transition duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900">
          {product.name}
        </h3>

        {product.shortDescription ? (
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
            {product.shortDescription}
          </p>
        ) : null}

        <div className="mt-5 inline-flex items-center gap-2 font-semibold text-red-700 transition-all group-hover:gap-3">
          View Details
          <span aria-hidden>→</span>
        </div>
      </div>
    </Link>
  );
}
