import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Preparation Equipment",
    count: "18 Products",
    image: "/categories/preparation.jpg",
    slug: "preparation-equipment",
  },
  {
    title: "Cooking Equipment",
    count: "24 Products",
    image: "/categories/cooking.jpg",
    slug: "cooking-equipment",
  },
  {
    title: "Refrigeration",
    count: "12 Products",
    image: "/categories/refrigeration.jpg",
    slug: "refrigeration",
  },
  {
    title: "Display Counters",
    count: "15 Products",
    image: "/categories/display-counters.jpg",
    slug: "display-counters",
  },
  {
    title: "Bakery Equipment",
    count: "10 Products",
    image: "/categories/bakery.jpg",
    slug: "bakery-equipment",
  },
  {
    title: "Storage Equipment",
    count: "8 Products",
    image: "/categories/storage.jpg",
    slug: "storage-equipment",
  },
];

export default function Categories() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
            Product Categories
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            Commercial Kitchen Equipment
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Discover our extensive range of premium stainless steel
            commercial kitchen equipment engineered for performance,
            durability and hygiene.
          </p>
        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products/${category.slug}`}
              className="group overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-6">
                  <span className="rounded-full bg-white/90 px-4 py-1 text-sm font-medium text-slate-800">
                    {category.count}
                  </span>
                </div>
              </div>

              <div className="p-7">
                <h3 className="text-2xl font-bold text-slate-900">
                  {category.title}
                </h3>

                <div className="mt-6 inline-flex items-center gap-2 font-semibold text-red-600 transition group-hover:gap-3">
                  View Category
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}

        <div className="mt-16 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-8 py-4 font-semibold text-white transition hover:bg-red-800"
          >
            View All Products
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}