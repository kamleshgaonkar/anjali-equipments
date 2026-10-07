
interface ProductOverviewProps {
  description?: string;
}

export default function ProductOverview({ description }: ProductOverviewProps) {
  if (!description) {
    return null;
  }

  return (
    <section className="border-t border-stone-200 pt-12">
      <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#8b191c]">
        Product Details
      </p>

      <h2 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 md:text-3xl">
        Product Overview
      </h2>

      <p className="mt-6 max-w-[52rem] text-base leading-8 text-stone-600 md:text-lg md:leading-9">
        {description}
      </p>
    </section>
  );
}
