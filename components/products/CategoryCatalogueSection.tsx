import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import type { Category } from "@/data/categories";
import type { Product } from "@/types/product";

interface CategoryCatalogueSectionProps {
  category: Category;
  products: Product[];
  imageOnRight?: boolean;
}

export default function CategoryCatalogueSection({
  category,
  products,
  imageOnRight = false,
}: CategoryCatalogueSectionProps) {
  const count = products.length;
  const countLabel = count === 1 ? "1 Product" : `${count} Products`;

  const imageColumn = (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 lg:aspect-[4/5] xl:aspect-[4/3]">
      <Image
        src={category.image}
        alt={category.name}
        fill
        sizes="(max-width: 1024px) 100vw, 42vw"
        className="object-cover transition duration-500 hover:scale-[1.02]"
      />
    </div>
  );

  const contentColumn = (
    <div className="flex flex-col justify-center">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-3xl font-semibold tracking-tight text-black md:text-4xl">
          {category.name}
        </h2>

        <span className="inline-flex items-center rounded-full bg-[#8b191c]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#8b191c]">
          {countLabel}
        </span>
      </div>

      {count === 0 ? (
        <p className="mt-8 text-slate-600">
          Products for this category are coming soon.
        </p>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
          {products.map((product) => (
            <li key={product.id}>
              <Link
                href={`/products/${category.slug}/${product.slug}`}
                className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-all duration-300 hover:bg-slate-50 hover:shadow-sm"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#8b191c]/10 text-[#8b191c] transition duration-300 group-hover:bg-[#8b191c] group-hover:text-white">
                  <Check size={14} strokeWidth={2.5} aria-hidden />
                </span>

                <span className="text-[15px] font-medium leading-snug text-slate-800 transition-colors duration-300 group-hover:text-black">
                  {product.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link
        href={`/products/${category.slug}`}
        className="mt-8 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 transition-all duration-300 hover:gap-2.5 hover:text-[#8b191c]"
      >
        Explore Category
        <span aria-hidden>→</span>
      </Link>
    </div>
  );

  return (
    <section className="py-16 lg:py-20">
      <div
        className={`flex flex-col items-stretch gap-10 lg:items-center lg:gap-14 ${
          imageOnRight ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        <div className="w-full shrink-0 lg:w-[42%]">{imageColumn}</div>
        <div className="w-full lg:w-[58%]">{contentColumn}</div>
      </div>
    </section>
  );
}
