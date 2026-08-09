"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Product } from "@/types/product";
import QuoteButton from "@/components/quote/QuoteButton";

interface MobileProductCardProps {
  product: Product;
  href: string;
}

function getProductInfoRows(product: Product) {
  const rows: { label: string; value: string }[] = [];
  const seen = new Set<string>();

  const push = (label: string, value?: string | boolean | null) => {
    if (value === undefined || value === null || value === "") return;

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
    rows.push({ label, value: normalized });
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
    "Size",
    "Dimensions",
    "Power",
    "Voltage",
    "Application",
  ];

  for (const label of preferredLabels) {
    const match = product.specifications?.find(
      (spec) => spec.label.toLowerCase() === label.toLowerCase()
    );
    if (match?.value) {
      push(match.label, match.value);
    }
  }

  // Fill remaining useful specs without inventing data
  for (const spec of product.specifications ?? []) {
    if (rows.length >= 5) break;

    const label = spec.label.trim();
    const lower = label.toLowerCase();

    if (
      lower === "model" ||
      lower === "material" ||
      lower === "warranty" ||
      lower === "custom sizes" ||
      lower === "custom size"
    ) {
      continue;
    }

    push(label, spec.value);
  }

  return rows;
}

export default function MobileProductCard({
  product,
  href,
}: MobileProductCardProps) {
  const infoRows = getProductInfoRows(product);

  const whatsappHref = `https://wa.me/918657003003?text=${encodeURIComponent(
    `Hello Anjali Equipments,

I am interested in:

Product: ${product.name}
Model: ${product.model ?? "N/A"}

Please share the price and further details.

Thank you.`
  )}`;

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <Link href={href} className="flex gap-3 p-3">
        {/* Image ~35% */}
        <div className="relative w-[35%] shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-50 aspect-square">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="35vw"
              className="object-contain p-1.5"
            />
          ) : null}
        </div>

        {/* Info ~65% */}
        <div className="min-w-0 flex-1 py-0.5">
          <h2 className="text-[15px] font-semibold leading-snug text-slate-900">
            {product.name}
          </h2>

          {product.model ? (
            <p className="mt-1 text-xs text-slate-500">
              Model:{" "}
              <span className="font-medium text-slate-800">
                {product.model}
              </span>
            </p>
          ) : null}

          {product.shortDescription ? (
            <p className="mt-1.5 line-clamp-2 text-xs leading-4 text-slate-600">
              {product.shortDescription}
            </p>
          ) : null}

          {infoRows.length > 0 ? (
            <dl className="mt-2 space-y-0.5">
              {infoRows.map((row) => (
                <div
                  key={row.label}
                  className="flex gap-1 text-[11px] leading-4"
                >
                  <dt className="shrink-0 text-slate-500">
                    {row.label}:
                  </dt>
                  <dd className="min-w-0 font-medium text-slate-900">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </Link>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2 border-t border-slate-100 px-3 py-2.5">
        <QuoteButton product={product} variant="compact" />

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border border-[#25D366] bg-white px-3 py-2.5 text-sm font-semibold text-[#128C7E] transition-colors duration-300 hover:bg-[#25D366]/10"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>
      </div>
    </article>
  );
}
