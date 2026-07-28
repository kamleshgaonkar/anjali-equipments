import {
    ShieldCheck,
    Wrench,
    Truck,
    Headphones,
    BadgeCheck,
    Factory,
  } from "lucide-react";
  
  const features = [
    {
      icon: Factory,
      title: "In-House Manufacturing",
      description:
        "Modern manufacturing facility producing precision stainless steel equipment.",
    },
    {
      icon: BadgeCheck,
      title: "Premium SS304 Quality",
      description:
        "Built using high-grade stainless steel for durability and hygiene.",
    },
    {
      icon: Wrench,
      title: "Custom Solutions",
      description:
        "Tailor-made equipment designed to match your kitchen requirements.",
    },
    {
      icon: Truck,
      title: "Pan India Delivery",
      description:
        "Efficient logistics and timely delivery across India.",
    },
    {
      icon: Headphones,
      title: "After Sales Support",
      description:
        "Installation guidance, maintenance and responsive customer support.",
    },
    {
      icon: ShieldCheck,
      title: "Reliable Performance",
      description:
        "Engineered for long-lasting performance in demanding commercial kitchens.",
    },
  ];
  
  export default function WhyChoose() {
    return (
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
              Why Choose Us
            </span>
  
            <h2 className="mt-4 text-4xl font-bold text-slate-900">
              Built on Quality. Trusted by Professionals.
            </h2>
  
            <p className="mt-5 text-lg leading-8 text-slate-600">
              We combine engineering expertise, premium materials and dependable
              service to deliver commercial kitchen equipment businesses can rely on.
            </p>
          </div>
  
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
  
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-50">
                    <Icon className="h-7 w-7 text-red-600" />
                  </div>
  
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">
                    {feature.title}
                  </h3>
  
                  <p className="mt-3 leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }