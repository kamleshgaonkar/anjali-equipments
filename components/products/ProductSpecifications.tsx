import { ProductSpecification } from "@/types/product";

interface ProductSpecificationsProps {
  specifications: ProductSpecification[];
}

export default function ProductSpecifications({
  specifications,
}: ProductSpecificationsProps) {
  if (!specifications.length) return null;

  return (
    <section className="border-t border-stone-200 pt-12">
      <h2 className="text-2xl font-bold tracking-tight text-stone-900 md:text-3xl">
        Specifications
      </h2>

      <div className="mt-8 max-w-[52rem] overflow-hidden border border-stone-200">
        {specifications.map((spec, index) => (
          <div
            key={`${spec.label}-${index}`}
            className={`grid grid-cols-1 gap-1 px-4 py-3.5 sm:grid-cols-[32%_minmax(0,1fr)] sm:gap-6 sm:px-5 sm:py-4 ${
              index % 2 === 0 ? "bg-white" : "bg-stone-50"
            } ${
              index !== specifications.length - 1
                ? "border-b border-stone-200"
                : ""
            }`}
          >
            <span className="text-sm font-medium text-stone-500">
              {spec.label}
            </span>
            <span className="text-sm font-semibold text-stone-900">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
