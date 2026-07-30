interface ProductFeaturesProps {
    features: string[];
  }
  
  export default function ProductFeatures({
    features,
  }: ProductFeaturesProps) {
    if (!features.length) return null;
  
    return (
      <section className="mt-14">
        <h2 className="text-2xl font-bold text-slate-900">
          Features
        </h2>
  
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-red-200 hover:bg-red-50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold text-red-700">
                ✓
              </div>
  
              <span className="font-medium text-slate-700">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </section>
    );
  }