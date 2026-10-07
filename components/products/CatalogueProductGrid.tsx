import type { Product } from "@/types/product";
import ProductCard from "@/components/products/ProductCard";

interface CatalogueProductGridProps {
  products: Product[];
  categorySlug: string;
  groupSlug: string;
  emptyTitle?: string;
  emptyDescription?: string;
}

export default function CatalogueProductGrid({
  products,
  categorySlug,
  groupSlug,
  emptyTitle = "Products Coming Soon",
  emptyDescription = "We are currently updating this section.",
}: CatalogueProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="border border-dashed border-slate-200 px-6 py-12 text-center">
        <p className="font-medium text-slate-900">{emptyTitle}</p>
        <p className="mt-2 text-sm text-slate-600">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div
      className="
        grid grid-cols-1 items-start gap-4
        min-[640px]:grid-cols-2 min-[640px]:gap-[18px]
        min-[900px]:grid-cols-3 min-[900px]:gap-5
        min-[1200px]:grid-cols-4 min-[1200px]:gap-5
        min-[1500px]:grid-cols-5 min-[1500px]:gap-6
        min-[1800px]:grid-cols-6 min-[1800px]:gap-6
      "
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          href={`/products/${categorySlug}/${groupSlug}/${product.slug}`}
        />
      ))}
    </div>
  );
}
