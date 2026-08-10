"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import QuoteButton from "@/components/quote/QuoteButton";
import { toCatalogueSlug } from "@/lib/catalogue";

interface ProductCardProps {
  product: Product;
  href?: string;
}

function getCardInfoRows(product: Product) {
  const rows: { label: string; value: string }[] = [];
  const seen = new Set<string>();

  const push = (
    label: string,
    value?: string | boolean | null
  ) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    const key = label.toLowerCase();

    if (seen.has(key)) return;

    const normalized =
      typeof value === "boolean"
        ? value
          ? "Available"
          : "Not Available"
        : String(value).trim();

    if (!normalized) return;

    seen.add(key);
    rows.push({
      label,
      value: normalized,
    });
  };

  push("Material", product.material);
  push("Warranty", product.warranty);

  if (product.customSizes !== undefined) {
    push("Custom Size", product.customSizes);
  }

  const preferredLabels = [
    "Capacity",
    "Product Capacity",
    "Burner",
    "Fuel Type",
    "Application",
  ];

  for (const label of preferredLabels) {
    if (rows.length >= 4) break;

    const match = product.specifications?.find(
      (spec) =>
        spec.label.toLowerCase() === label.toLowerCase()
    );

    if (match?.value) {
      push(match.label, match.value);
    }
  }

  return rows;
}

export default function ProductCard({
  product,
  href,
}: ProductCardProps) {
  const productHref =
    href ??
    `/products/${toCatalogueSlug(product.category)}/${toCatalogueSlug(
      product.group
    )}/${product.slug}`;

  const infoRows = getCardInfoRows(product);

  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Product Image */}
      <Link
        href={productHref}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b191c] focus-visible:ring-inset"
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain p-3 transition duration-500 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            Image coming soon
          </div>
        )}
      </Link>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-5">
        <Link
          href={productHref}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b191c] focus-visible:ring-offset-2"
        >
          <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-slate-900 transition-colors hover:text-[#8b191c]">
            {product.name}
          </h3>
        </Link>

        {product.model ? (
          <p className="mt-1.5 text-xs text-slate-500">
            Model:{" "}
            <span className="font-medium text-slate-800">
              {product.model}
            </span>
          </p>
        ) : null}

        {product.shortDescription ? (
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
            {product.shortDescription}
          </p>
        ) : null}

        {/* Product specifications */}
        {infoRows.length > 0 ? (
          <dl className="mt-3 space-y-1">
            {infoRows.map((row) => (
              <div
                key={row.label}
                className="flex min-w-0 gap-1 text-xs leading-4"
              >
                <dt className="shrink-0 text-slate-500">
                  {row.label}:
                </dt>

                <dd className="min-w-0 truncate font-medium text-slate-900">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        {/* CTA Buttons */}
        <div className="mt-auto grid grid-cols-2 gap-2 pt-6">
          {/* View Details */}
          <Link
            href={productHref}
            className="inline-flex min-h-12 min-w-0 items-center justify-center whitespace-nowrap rounded-xl border border-[#8b191c] bg-white px-2 text-center text-sm font-semibold text-[#8b191c] transition-all duration-300 hover:bg-[#8b191c] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b191c] focus-visible:ring-offset-2 sm:px-3"
          >
            <span>View Details</span>
          </Link>

          {/* Add to Quote */}
          <div
            className="
              min-w-0
              [&>button]:flex
              [&>button]:min-h-12
              [&>button]:w-full
              [&>button]:min-w-0
              [&>button]:items-center
              [&>button]:justify-center
              [&>button]:whitespace-nowrap
              [&>button]:rounded-xl
              [&>button]:px-2
              [&>button]:text-sm
              [&>button]:font-semibold
              sm:[&>button]:px-3
            "
          >
            <QuoteButton
              product={product}
              variant="card"
            />
          </div>
        </div>
      </div>
    </article>
  );
}