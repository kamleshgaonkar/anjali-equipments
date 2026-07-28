import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const products = [
  {
    name: "Vegetable Preparation Table",
    category: "Preparation Equipment",
    image: "/products/vegetable-preparation-table.jpg",
    slug: "vegetable-preparation-table",
  },
  {
    name: "Four Burner Cooking Range",
    category: "Cooking Equipment",
    image: "/products/four-burner-cooking-range.jpg",
    slug: "four-burner-cooking-range",
  },
  {
    name: "Vertical Refrigerator",
    category: "Refrigeration",
    image: "/products/vertical-refrigerator.jpg",
    slug: "vertical-refrigerator",
  },
  {
    name: "Hot Bain Marie Counter",
    category: "Display Counters",
    image: "/products/hot-bain-marie-counter.jpg",
    slug: "hot-bain-marie-counter",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
            Featured Products
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            Popular Commercial Kitchen Equipment
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Explore some of our most trusted and widely used commercial kitchen
            equipment built for performance and durability.
          </p>
        </div>

        {/* Products */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <div className="p-6">
                <span className="text-sm font-medium text-red-600">
                  {product.category}
                </span>

                <h3 className="mt-2 text-xl font-semibold text-slate-900">
                  {product.name}
                </h3>

                <div className="mt-6 inline-flex items-center gap-2 font-semibold text-red-600 transition group-hover:gap-3">
                  View Product
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}

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