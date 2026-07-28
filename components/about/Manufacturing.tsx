import Image from "next/image";

const stats = [
  {
    number: "8,000+",
    title: "Sq. Ft.",
    description: "Manufacturing Facility",
  },
  {
    number: "2",
    title: "Advanced CNC",
    description: "Precision Machines",
  },
  {
    number: "100%",
    title: "Premium SS",
    description: "Fabrication Excellence",
  },
  {
    number: "Quality",
    title: "Driven",
    description: "Manufacturing Process",
  },
];

export default function Manufacturing() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="mx-auto max-w-4xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-red-600">
            Manufacturing Excellence
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900 lg:text-5xl">
            Built with Precision, Powered by Technology
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            At Anjali Equipments, every product is manufactured in our modern
            facility using advanced CNC machinery, premium stainless steel and
            skilled craftsmanship. Our streamlined production process ensures
            consistent quality, precision engineering and reliable performance
            for every commercial kitchen solution we deliver.
          </p>
        </div>

        {/* Stats */}

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.description}
              className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-5xl font-bold text-red-600">
                {item.number}
              </h3>

              <p className="mt-3 text-lg font-semibold text-slate-900">
                {item.title}
              </p>

              <p className="mt-2 text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Gallery */}

        <div className="mt-24 space-y-24">

          {/* Row 1 */}

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative h-[450px] overflow-hidden rounded-3xl">
              <Image
                src="/images/manufacturing/laser-machine.png"
                alt="CNC Laser Cutting Machine"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-red-600">
                Advanced Machinery
              </span>

              <h3 className="mt-4 text-4xl font-bold text-slate-900">
                CNC Fiber Laser Cutting
              </h3>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                Our CNC laser cutting machine delivers exceptional precision,
                clean edges and dimensional accuracy, enabling us to fabricate
                high-quality stainless steel components with speed and
                consistency.
              </p>
            </div>
          </div>

          {/* Row 2 */}

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 relative h-[450px] overflow-hidden rounded-3xl lg:order-1">
              <div>
                <span className="text-sm font-semibold uppercase tracking-widest text-red-600">
                  Precision Fabrication
                </span>

                <h3 className="mt-4 text-4xl font-bold text-slate-900">
                  CNC Press Brake Technology
                </h3>

                <p className="mt-6 text-lg leading-8 text-slate-600">
                  Advanced CNC bending technology allows us to manufacture
                  products with perfect angles, superior strength and unmatched
                  consistency, ensuring every piece meets our quality standards.
                </p>
              </div>
            </div>

            <div className="order-1 relative h-[450px] overflow-hidden rounded-3xl lg:order-2">
              <Image
                src="/images/manufacturing/press-brake.png"
                alt="Press Brake Machine"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Row 3 */}

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative h-[450px] overflow-hidden rounded-3xl">
              <Image
                src="/images/manufacturing/factory.png"
                alt="Manufacturing Facility"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-red-600">
                Production Facility
              </span>

              <h3 className="mt-4 text-4xl font-bold text-slate-900">
                Modern Manufacturing Infrastructure
              </h3>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                Spread across an 8,000+ sq. ft. manufacturing facility, our
                production unit is designed to efficiently handle projects of
                every scale while maintaining strict quality control at every
                stage of manufacturing.
              </p>
            </div>
          </div>

          {/* Row 4 */}

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <span className="text-sm font-semibold uppercase tracking-widest text-red-600">
                Skilled Workforce
              </span>

              <h3 className="mt-4 text-4xl font-bold text-slate-900">
                Craftsmanship That Builds Confidence
              </h3>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                Behind every product is a dedicated team of skilled fabricators
                and technicians who ensure every weld, bend and finish meets the
                highest standards of quality, durability and performance.
              </p>
            </div>

            <div className="order-1 relative h-[450px] overflow-hidden rounded-3xl lg:order-2">
              <Image
                src="/images/manufacturing/team.png"
                alt="Fabrication Team"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}