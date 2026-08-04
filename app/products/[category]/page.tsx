import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getCategory, getProductsByCategory } from "@/lib/products";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export default async function ProductCategoryPage({
  params,
}: Props) {
  const { category: categorySlug } = await params;

  const category = getCategory(categorySlug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(categorySlug);

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {category.name}
        </h1>

        <p className="mt-5 text-lg text-slate-600">
          {category.description}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="mt-16 rounded-xl border border-dashed p-12 text-center">
          <h2 className="text-2xl font-semibold">
            Products Coming Soon
          </h2>

          <p className="mt-3 text-slate-600">
            We are currently updating this category.
          </p>
        </div>
      ) : (
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${categorySlug}/${product.slug}`}
              className="group overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] bg-slate-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold">
                  {product.name}
                </h2>

                <p className="mt-3 line-clamp-2 text-sm text-slate-600">
                  {product.shortDescription}
                </p>

                <span className="mt-5 inline-flex font-medium text-blue-600">
                  View Details →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}