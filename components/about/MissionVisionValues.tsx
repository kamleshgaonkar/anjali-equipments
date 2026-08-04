import {
    Target,
    Eye,
    Gem,
    Lightbulb,
    Handshake,
    ShieldCheck,
    Users,
    TrendingUp,
  } from "lucide-react";
  
  const values = [
    {
      icon: Gem,
      title: "Quality",
      description:
        "We manufacture premium stainless steel equipment using high-quality materials and precise engineering to ensure durability and long-lasting performance.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We continuously improve our products and manufacturing processes to deliver modern, efficient and practical kitchen solutions.",
    },
    {
      icon: Handshake,
      title: "Integrity",
      description:
        "We believe in honest communication, transparency and building long-term relationships through trust and commitment.",
    },
    {
      icon: Users,
      title: "Customer Focus",
      description:
        "Every project is unique. We work closely with our clients to understand their requirements and deliver customized commercial kitchen solutions.",
    },
    {
      icon: ShieldCheck,
      title: "Reliability",
      description:
        "Our equipment is designed to perform consistently in demanding commercial kitchens where quality and dependability matter every day.",
    },
    {
      icon: TrendingUp,
      title: "Continuous Improvement",
      description:
        "We constantly refine our products, services and processes to deliver greater value and exceed customer expectations.",
    },
  ];
  
  export default function MissionVisionValues() {
    return (
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
  
          {/* Heading */}
  
          <div className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-red-600">
              Our Purpose
            </span>
  
            <h2 className="mt-4 text-4xl font-bold text-slate-900">
              Mission, Vision & Values
            </h2>
          </div>
  
          {/* Mission & Vision */}
  
          <div className="grid gap-8 lg:grid-cols-2">
  
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-10">
  
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100">
                <Target className="h-8 w-8 text-red-600" />
              </div>
  
              <h3 className="mt-8 text-2xl font-bold text-slate-900 sm:text-3xl">
                Our Mission
              </h3>
  
              <p className="mt-5 text-lg leading-8 text-slate-600">
                To manufacture premium commercial kitchen equipment that enhances
                efficiency, hygiene and productivity while delivering dependable
                quality and long-term value to hotels, restaurants, hospitals,
                institutions and food service businesses.
              </p>
  
            </div>
  
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-10">
  
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100">
                <Eye className="h-8 w-8 text-red-600" />
              </div>
  
              <h3 className="mt-8 text-2xl font-bold text-slate-900 sm:text-3xl">
                Our Vision
              </h3>
  
              <p className="mt-5 text-lg leading-8 text-slate-600">
                To become one of India&apos;s most trusted commercial kitchen equipment
                manufacturers by combining innovation, precision engineering and
                customer-centric solutions that set new benchmarks in quality and
                performance.
              </p>
  
            </div>
  
          </div>
  
          {/* Values */}
  
          <div className="mt-20">
  
            <div className="text-center">
  
              <h3 className="text-3xl font-bold text-slate-900">
                Our Core Values
              </h3>
  
              <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                These principles guide every decision we make and every commercial
                kitchen solution we deliver.
              </p>
  
            </div>
  
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
  
              {values.map((value) => {
                const Icon = value.icon;
  
                return (
                  <div
                    key={value.title}
                    className="rounded-2xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-50">
                      <Icon className="h-7 w-7 text-red-600" />
                    </div>
  
                    <h4 className="mt-6 text-2xl font-semibold text-slate-900">
                      {value.title}
                    </h4>
  
                    <p className="mt-4 leading-7 text-slate-600">
                      {value.description}
                    </p>
                  </div>
                );
              })}
  
            </div>
  
          </div>
  
        </div>
      </section>
    );
  }