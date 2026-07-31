import Image from "next/image";

const logos = [
  "amazon.jpg",
  "aromas-cafe.jpg",
  "athiva.jpg",
  "baaroq.jpg",
  "bombay-missal.jpg",
  "brittos.jpg",
  "casa-tito.jpg",
  "cv-raman-university.jpg",
  "denish-cakes.jpg",
  "effingut.jpg",
  "filament-bar.jpg",

  "godrej.jpg",
  "hilton.jpg",
  "hitchki.jpg",
  "house-of-candy.jpg",
  "hyatt.jpg",
  "inox.jpg",
  "jamie-oliver-kitchen.jpg",
  "jw-marriott.jpg",
  "kpmg.jpg",
  "ks-charcoal.jpg",
  "lodha.jpg",

  "lord-of-the-drinks.jpg",
  "massive-restaurants.jpg",
  "ministry-of-dance.jpg",
  "miraj-cinemas.jpg",
  "nahar-international-school.jpg",
  "perch.jpg",
  "pop-tates.jpg",
  "pritam.jpg",
  "punjab-grill.jpg",
  "radisson.jpg",
  "rajdhani.jpg",

  "ramada.jpg",
  "ribbons-and-balloons.jpg",
  "sante-spa-cuisine.jpg",
  "sodexo.jpg",
  "tajsats.jpg",
  "tanjore.jpg",
  "tcs.jpg",
  "the-fern.jpg",
  "the-paradise-tunga.jpg",
  "universal-business-school.jpg",
  "urbo-kitchen-and-bar.jpg",

  "view-hotels.jpg",
  "welcome-hotels.jpg",
];

export default function Clients() {
  return (
    <section className="overflow-hidden bg-white py-20">
      <div className="mx-auto mb-12 max-w-3xl px-6 text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
        Our Trusted Clients
        </span>
        
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
    className="flex h-28 w-56 items-center justify-center rounded-2xl border border-slate-200 bg-white p-6"
  >
    <Image
  src={`/clients/home/${logo}`}
  alt={logo.replace(".jpg", "")}
  width={220}  
  height={100}
  className="max-h-16 w-auto object-contain opacity-100 transition duration-9000"
/>
  </div>
))}

        </div>

      </div>
    </section>
  );
}