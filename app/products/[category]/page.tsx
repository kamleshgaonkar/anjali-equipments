"use client";


import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { catalog } from "@/data/products/catalog";
import PageHero from "@/components/layout/PageHero"; 
type Props = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const currentCategory = catalog.find(
    (item) => item.slug === category
  );

  if (!currentCategory) {
    notFound();
  }

  return (
    
    <main className="bg-white">
      <PageHero
      title="Products"
    />

      <section className="py-20">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {currentCategory.groups.map((group) => (
              <Link
                key={group.slug}
                href={`/products/${currentCategory.slug}/${group.slug}`}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src={group.image}
                    alt={group.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-8">
                  <h2 className="text-2xl font-semibold text-slate-900">
                    {group.title}
                  </h2>

                  <p className="mt-4 text-slate-600">
                    {group.description}
                  </p>

                  <span className="mt-8 inline-flex items-center font-semibold text-red-600">
                    Explore Products →
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