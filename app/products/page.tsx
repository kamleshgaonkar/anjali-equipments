import CategoryCard from "@/components/products/CategoryCard";
import { categories } from "@/data/categories";

export default function ProductsPage() {

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">

      <h1 className="text-5xl font-bold">
        Commercial Kitchen Equipment
      </h1>

      <p className="mt-6 max-w-3xl text-lg text-slate-600">
        Explore our complete range of commercial kitchen
        equipment designed for hotels, restaurants,
        cloud kitchens, hospitals and institutions.
      </p>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {categories.map((category) => (
          <CategoryCard
            key={category.slug}
            {...category}
          />
        ))}

      </div>

    </main>
  );
}