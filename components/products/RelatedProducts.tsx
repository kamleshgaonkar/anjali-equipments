import { Product } from "@/types/product";
import ProductCard from "@/components/products/ProductCard";
import { getProductHref } from "@/lib/catalogue";

interface RelatedProductsProps {
  products: Product[];
  currentCategory?: string;
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products.length) return null;

  const items = products.slice(0, 6);

  return (
    <section className="mt-16 border-t border-stone-200 pt-14 md:mt-20 md:pt-16">
      <div className="mb-8 md:mb-10">
        <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#8b191c]">
          Explore More
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 md:text-3xl">
          Related Products
        </h2>
      </div>

      <div
        className="grid items-start justify-start gap-4 sm:gap-5"
        style={{
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(100%, 220px), 250px))",
        }}
      >
        {items.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            href={getProductHref(product)}
          />
        ))}
      </div>
    </section>
  );
}
