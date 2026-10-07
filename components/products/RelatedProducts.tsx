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
    <section className="mt-12 border-t border-stone-200 pt-10 md:mt-20 md:pt-16">
      <div className="mb-6 md:mb-10">
        <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#8b191c]">
          Explore More
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 md:text-3xl">
          Related Products
        </h2>
      </div>

      <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 sm:gap-5"
      style={{
        gridTemplateColumns:
          "repeat(auto-fill, minmax(min(100%, 220px), 250px))",
        scrollbarWidth: "none",
      }}
    >
       {items.map((product) => (
  <div
    key={product.id}
    className="w-[78vw] max-w-[280px] shrink-0 snap-start sm:w-auto sm:max-w-none"
  >
    <ProductCard
      product={product}
      href={getProductHref(product)}
    />
  </div>
))}
      </div>
    </section>
  );
}
