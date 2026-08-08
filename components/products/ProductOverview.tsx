interface ProductOverviewProps {
  description?: string;
}
  
export default function ProductOverview({
  description,
}: ProductOverviewProps) {
  if (!description) {
    return null;
  }
  
    return (
      <section className="py-14">
        <div className="max-w-5xl">
  
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-red-700">
            Product Details
          </p>
  
          <h2 className="text-4xl font-bold text-slate-900">
            Product Overview
          </h2>
  
          <p className="mt-8 text-lg leading-9 text-slate-600">
            {description}
          </p>
  
        </div>
      </section>
    );
  }