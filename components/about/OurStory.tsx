import Image from "next/image";

export default function OurStory() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">

        <div className="relative h-[280px] overflow-hidden rounded-3xl sm:h-[360px] lg:h-[500px]">
          <Image
            src="/images/about-company.png"
            alt="Anjali Equipments"
            fill
            className="object-cover"
          />
        </div>

        <div>

          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-red-600">
            Our Story
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            Engineering Commercial Kitchens with Precision
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            At Anjali Equipments, we specialize in manufacturing premium
            stainless steel commercial kitchen equipment designed to meet the
            evolving needs of the food service industry. Every product is built
            with precision engineering, superior craftsmanship and a commitment
            to long-lasting performance.
          </p>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            From hotels and restaurants to hospitals, educational institutions,
            cloud kitchens and industrial food facilities, our customized
            solutions are trusted by businesses that demand quality, efficiency
            and reliability in their commercial kitchens.
          </p>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Our focus extends beyond manufacturing. We believe in building
            lasting partnerships through dependable service, innovative designs
            and customer-centric solutions that help businesses operate more
            efficiently every day.
          </p>

        </div>

      </div>
    </section>
  );
}