import Image from "next/image";

import ProductGroup from "./ProductGroup";

import { Category } from "@/data/categories";
import { Product } from "@/types/product";

interface CategorySectionProps {
    category: Category;
    products: Product[];
    onProductClick: (product: Product) => void;
  }

export default function CategorySection({
  category,
  products,
  onProductClick,
}: CategorySectionProps) {
  // Group products automatically by their "group" property
  const groups = Object.values(
    products.reduce(
      (acc, product) => {
        const groupName = product.group || "Products";

if (!acc[groupName]) {
  acc[groupName] = {
    title: groupName,
    products: [] as Product[],
  };
}

acc[groupName].products.push(product);

        return acc;
      },
      {} as Record<
        string,
        {
          title: string;
          products: Product[];
        }
      >
    )
  );

  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:grid-cols-12">
        {/* Left */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-red-600">
              Category
            </span>

            <h2 className="mt-4 text-5xl font-semibold text-slate-900">
              {category.name}
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              {category.description}
            </p>

            <div className="mt-10 overflow-hidden rounded-3xl">
              <Image
                src={category.image}
                alt={category.name}
                width={700}
                height={900}
                className="h-auto w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-24 lg:col-span-7">
        {groups.map((group, index) => (
  <div
    key={group.title}
    className={index === 0 ? "mt-10" : ""}
  >
    <ProductGroup
      title={group.title}
      products={group.products}
      onProductClick={onProductClick}
    />
  </div>
))}
        </div>
      </div>
    </section>
  );
}