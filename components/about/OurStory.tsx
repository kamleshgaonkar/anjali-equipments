import Image from "next/image";

export default function OurStory() {
  return (
    <section className="bg-white py-24">
      <div className="container-custom">

        {/* ===========================
            Section 1
        ============================ */}

        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* Left Image */}

          <div className="relative h-[320px] overflow-hidden rounded-3xl sm:h-[420px] lg:h-[560px]">
            <Image
              src="/images/about-company.png"
              alt="Anjali Equipments Manufacturing Facility"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Content */}

          <div>

            <span className="eyebrow text-red-600">
              ABOUT ANJALI EQUIPMENTS
            </span>

            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-slate-900 lg:text-5xl">
            Engineering Commercial Kitchen Solutions Since 2010
            </h2>

            <p className="mt-8 text-lg leading-8 text-slate-600">
            Established in 2010, Anjali Equipments has become a trusted manufacturer and supplier of premium SS304 commercial kitchen equipment, serving hotels, restaurants, hospitals, institutions and food service businesses across India.
            </p>

            <p className="mt-6 text-lg leading-8 text-slate-600">
            From CNC laser cutting and hydraulic press brake bending to precision TIG welding and installation, every solution is engineered for quality, durability and long-term performance. Combined with our imported equipment portfolio and dependable after-sales support, we deliver complete commercial kitchen solutions under one roof.
            </p>

          </div>

        </div>

        {/* ===========================
            Section 2
        ============================ */}

        <div className="mt-32 grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* Left Image */}

          <div className="relative order-2 h-[320px] overflow-hidden rounded-3xl sm:h-[420px] lg:h-[560px]">
            <Image
              src="/about/dharam-sharma-anjali-equipments.jpg"
              alt="Mr. Dharam Sharma"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Content */}

          <div className="order-1">

            <span className="eyebrow text-red-600">
              OUR FOUNDER
            </span>

            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-slate-900 lg:text-5xl">
              Built on Vision.
              <br />
              Driven by Commitment.
            </h2>

            <p className="mt-8 text-lg leading-8 text-slate-600">
            Founded by Mr. Dharam Sharma in 2010, Anjali Equipments was built on a simple vision: to manufacture commercial kitchen equipment that businesses can trust for quality, reliability and performance.
            </p>

            <p className="mt-6 text-lg leading-8 text-slate-600">
            Today, under his leadership, the company combines in-house manufacturing, imported equipment supply, professional installation and dedicated after-sales support to deliver complete commercial kitchen solutions while building lasting relationships with customers across India.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}