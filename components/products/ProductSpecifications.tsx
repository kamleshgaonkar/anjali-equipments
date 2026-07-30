import { ProductSpecification } from "@/types/product";

interface ProductSpecificationsProps {
  specifications: ProductSpecification[];
}

export default function ProductSpecifications({
  specifications,
}: ProductSpecificationsProps) {
  if (!specifications.length) return null;

  return (
    <section className="mt-14">
      <h2 className="text-2xl font-bold text-slate-900">
        Specifications
      </h2>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {specifications.map((spec, index) => (
          <div
            key={spec.label}
            className={`flex items-center justify-between px-6 py-5 ${
              index !== specifications.length - 1
                ? "border-b border-slate-200"
                : ""
            } ${index % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
          >
            <span className="font-medium text-slate-600">
              {spec.label}
            </span>

            <span className="font-semibold text-slate-900">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}