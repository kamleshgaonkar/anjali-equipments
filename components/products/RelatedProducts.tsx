import Link from "next/link";
import Image from "next/image";

import { Product } from "@/types/product";

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({
  products,
}: RelatedProductsProps) {
  if (!products.length) return null;

  return (
    <section className="mt-24">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-700">
          EXPLORE MORE
        </p>

        <h2 className="mt-2 text-4xl font-bold">
          Related Products
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.category}/${product.slug}`}
            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:border-red-200 hover:shadow-2xl"
          >
            <div className="relative aspect-[4/3] border-b border-slate-200 bg-slate-50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-5 transition duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold text-slate-900">
                {product.name}
              </h3>

              <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                {product.shortDescription}
              </p>

              <div className="mt-5 inline-flex items-center gap-2 font-semibold text-red-700 transition group-hover:gap-3">
                View Details
                <span>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}