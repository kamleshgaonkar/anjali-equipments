import { Check } from "lucide-react";

interface ProductFeaturesProps {
  features: string[];
}

export default function ProductFeatures({ features }: ProductFeaturesProps) {
  if (!features.length) return null;

  return (
    <section className="border-t border-stone-200 pt-12">
      <h2 className="text-2xl font-bold tracking-tight text-stone-900 md:text-3xl">
        Features
      </h2>

      <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 border-b border-stone-100 pb-4"
          >
            <Check
              size={16}
              strokeWidth={2.5}
              className="mt-1 shrink-0 text-[#8b191c]"
              aria-hidden
            />
            <span className="text-[15px] leading-6 text-stone-700">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
