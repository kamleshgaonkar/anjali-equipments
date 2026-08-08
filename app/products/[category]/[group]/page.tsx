import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getAllProducts } from "@/lib/products";
import { catalog } from "@/data/products/catalog";
import PageHero from "@/components/layout/PageHero";
type Props = {
  params: Promise<{
    category: string;
    group: string;
  }>;
};

export default async function GroupPage({ params }: Props) {
  const { category, group } = await params;

  const currentCategory = catalog.find(
    (item) => item.slug === category
  );

  if (!currentCategory) {
    notFound();
  }

  const currentGroup = currentCategory.groups.find(
    (item) => item.slug === group
  );

  if (!currentGroup) {
    notFound();
  }

  const products = getAllProducts().filter(
    (product) =>
      product.category === currentCategory.title &&
      product.group === currentGroup.title
  );

  return (
    <main className="bg-white">
     <PageHero
      title="Products"
    />

      <section className="py-20">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${category}/${group}/${product.slug}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] bg-slate-100">
                {product.image && (
  <Image
    src={product.image}
    alt={product.name}
    fill
    className="object-cover transition duration-500 group-hover:scale-105"
  />
)}  
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-semibold text-slate-900">
                    {product.name}
                  </h2>

                  <p className="mt-3 text-slate-600 line-clamp-2">
                    {product.shortDescription}
                  </p>

                  <span className="mt-6 inline-flex font-semibold text-red-600">
                    View Product →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}