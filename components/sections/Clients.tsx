import Image from "next/image";

const logos = [
  "/clients/1.gif",
  "/clients/2.jpg",
  "/clients/3.jpg",
  "/clients/4.jpg",
  "/clients/5.jpg",
  "/clients/6.jpg",
  "/clients/7.jpg",
  "/clients/8.jpg",
  "/clients/9.jpg",
  "/clients/10.jpg",
];

export default function Clients() {
  return (
    <section className="overflow-hidden bg-white py-20">
      <div className="mx-auto mb-12 max-w-3xl px-6 text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
          Trusted By
        </span>

        <h2 className="mt-4 text-4xl font-bold text-slate-900">
          Brands That Trust Anjali Equipments
        </h2>

        <p className="mt-5 text-lg text-slate-600">
          Delivering commercial kitchen solutions for hotels, restaurants,
          hospitals, institutions and leading businesses across India.
        </p>
      </div>

      <div className="relative">

        {/* Left Fade */}

        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-40 bg-gradient-to-r from-white to-transparent" />

        {/* Right Fade */}

        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-40 bg-gradient-to-l from-white to-transparent" />

        <div className="flex animate-marquee gap-16 whitespace-nowrap">

          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex h-28 w-56 items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <Image
                src={logo}
                alt="Client Logo"
                width={170}
                height={80}
                className="max-h-16 w-auto object-contain grayscale opacity-70 transition duration-300 hover:grayscale-0 hover:opacity-100"
              />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}