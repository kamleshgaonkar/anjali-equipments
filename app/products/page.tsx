import CategoryCard from "@/components/products/CategoryCard";
import { getAllCategories } from "@/lib/products";

export default function ProductsPage() {
  const categories = getAllCategories();

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900">
          Commercial Kitchen Equipment
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          Explore our complete range of commercial kitchen equipment
          designed for hotels, restaurants, cloud kitchens, hospitals
          and institutions.
        </p>
      </div>

      <section className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard
            key={category.slug}
            {...category}
          />
        ))}
      </section>
    </main>
  );
}