import Image from "next/image";

const stats = [
  {
    number: "8,000+",
    title: "Sq. Ft.",
    description: "Manufacturing Facility",
  },
  {
    number: "2",
    title: "CNC Machines",
    description: "Precision Manufacturing",
  },
  {
    number: "SS304",
    title: "Food-Grade Steel",
    description: "Premium Stainless Steel",
  },
  {
    number: "Precision TIG",
    title: "Welding & Finishing",
    description: " ",
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
          At Anjali Equipments, every commercial kitchen solution is manufactured in-house using premium SS304 stainless steel. From CNC laser cutting and hydraulic press brake bending to precision TIG welding and final installation, our advanced manufacturing process ensures exceptional quality, durability and long-term performance.
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
            <div className="relative h-[280px] overflow-hidden rounded-3xl sm:h-[360px] lg:h-[450px]">
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

              <h3 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              CNC Laser Cutting Machine
              </h3>

              <p className="mt-6 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Our CNC laser cutting machine delivers exceptional precision,
                clean edges and dimensional accuracy, enabling us to fabricate
                high-quality stainless steel components with speed and
                consistency.
              </p>
            </div>
          </div>

          {/* Row 2 */}

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <span className="text-sm font-semibold uppercase tracking-widest text-red-600">
                Precision Fabrication
              </span>

              <h3 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
                CNC Press Brake Technology
              </h3>

              <p className="mt-6 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Advanced CNC bending technology allows us to manufacture
                products with perfect angles, superior strength and unmatched
                consistency, ensuring every piece meets our quality standards.
              </p>
            </div>

            <div className="order-1 relative h-[280px] overflow-hidden rounded-3xl sm:h-[360px] lg:order-2 lg:h-[450px]">
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
            <div className="relative h-[280px] overflow-hidden rounded-3xl sm:h-[360px] lg:h-[450px]">
            <Image
                src="/images/manufacturing/team.png"
                alt="Fabrication Team"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-red-600">
              Skilled Workforce
              </span>

              <h3 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Craftsmanship That Builds Confidence
              </h3>

              <p className="mt-6 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Behind every product is a dedicated team of skilled fabricators
                and technicians who ensure every weld, bend and finish meets the
                highest standards of quality, durability and performance.
              </p>
            </div>
          </div>
 

        </div>
      </div>
    </section>
  );
}