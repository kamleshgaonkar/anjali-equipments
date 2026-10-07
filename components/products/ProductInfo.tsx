import { ArrowRight, BadgeCheck } from "lucide-react";
import { Product } from "@/types/product";
import QuoteButton from "@/components/quote/QuoteButton";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const whatsappHref = `https://wa.me/918657003003?text=${encodeURIComponent(
    `Hello Anjali Equipments,

I am interested in:

Product: ${product.name}
Model: ${product.model ?? "N/A"}

Please share the price and further details.

Thank you.`
  )}`;

  return (
    <div className="flex h-full flex-col">
      <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#8b191c]">
        {product.group}
      </p>

      <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 md:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
        {product.name}
      </h1> 

      {product.model ? (
        <p className="mt-4 text-sm text-stone-600">
          <span className="font-semibold text-stone-800">Model:</span>{" "}
          {product.model}
        </p>
      ) : null}

      {product.shortDescription ? (
        <p className="mt-5 max-w-xl text-base leading-7 text-stone-600">
          {product.shortDescription}
        </p>
      ) : null}

      <div className="mt-6 flex items-start gap-3 border border-emerald-200 bg-emerald-50/80 px-4 py-3.5">
        <BadgeCheck
          size={20}
          className="mt-0.5 shrink-0 text-emerald-600"
          aria-hidden
        />
        <div>
          <p className="text-sm font-semibold text-stone-900">
            Manufactured by Anjali Equipments
          </p>
          <p className="mt-0.5 text-sm text-stone-600">
            Premium Commercial Kitchen Equipment
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 border-y border-stone-200 py-6 sm:grid-cols-3 sm:gap-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
            Material
          </p>
          <p className="mt-2 text-sm font-semibold text-stone-900">
            {product.material || "—"}
          </p>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
            Warranty
          </p>
          <p className="mt-2 text-sm font-semibold text-stone-900">
            {product.warranty || "—"}
          </p>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
            Custom Size
          </p>
          <p className="mt-2 text-sm font-semibold text-stone-900">
            {product.customSizes ? "Available" : "Not Available"}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <QuoteButton product={product} variant="detail" />

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-7 py-3.5 text-sm font-semibold text-stone-800 transition hover:border-[#8b191c] hover:text-[#8b191c]"
        >
          Get Best Price
          <ArrowRight size={16} aria-hidden />
        </a>
      </div>
    </div>
  );
}
