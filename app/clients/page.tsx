import Link from "next/link";
import CTA from "@/components/sections/CTA";
import {
  HeaderOffsetSpacer,
  StickyBreadcrumbBar,
} from "@/components/layout/StickyBreadcrumbBar";

export const metadata = {
  title: "Our Clients | Anjali Equipments",
  description:
    "Trusted by leading hotels, restaurants, hospitals, cloud kitchens and corporate clients across India.",
};

const clientCategories = [
  
  {
    title: "Hotels, Resorts & Hospitality",
    folder: "hotels-resorts",
    logos: [
      "athiva",
      "hilton",
      "hyatt",
      "jw-marriott",
      "ks-charcoal",
      "lodha",
      "massive-restaurants",
      "perch",
      "pritam",
      "radisson",
      "ramada",
      "the-paradise-tunga",
      "urbo-kitchen-and-bar",
      "view-hotels",
      "welcome-hotels",
    ],
  },

  {
    title: "Restaurants, Cafés & Bars",
    folder: "restaurants-cafes",
    logos: [
      "aromas-cafe",
      "baaroq",
      "bombay-missal",
      "brittos",
      "casa-tito",
      "denish-cakes",
      "effingut",
      "filament-bar",
      "hitchki",
      "house-of-candy",
      "jamie-oliver-kitchen",
      "lord-of-the-drinks",
      "pop-tates",
      "punjab-grill",
      "rajdhani",
      "ribbons-and-balloons",
      "sante-spa-cuisine",
      "tanjore",
      "the-fern",
    ],
  },

  {
    title: "Corporate Cafeterias",
    folder: "corporate-cafeterias",
    logos: ["amazon", "godrej", "kpmg", "sodexo", "tcs"],
  },

  {
    title: "Educational Institutes",
    folder: "educational-institutes",
    logos: [
      "cv-raman-university",
      "nahar-international-school",
      "universal-business-school",
    ],
  },

  {
    title: "Entertainment & Clubs",
    folder: "entertainment-clubs",
    logos: ["inox", "ministry-of-dance", "miraj-cinemas"],
  },

  {
    title: "Airport Hotels & Restaurants",
    folder: "airport-hotels-restaurants",
    logos: ["tajsats"],
  },

];
const industries = [
  {
    title: "Hotels & Resorts",
    image: "/industries/hotels-resorts.jpg",
  },
  {
    title: "Restaurants, Cafés & Bars",
    image: "/industries/restaurants-cafes.jpg",
  },
  {
    title: "Corporate Cafeterias",
    image: "/industries/corporate-cafeterias.jpg",
  },
  {
    title: "Educational Institutes",
    image: "/industries/educational-institutes.jpg",
  },
  {
    title: "Industrial Canteens",
    image: "/industries/industrial-canteens.jpg",
  },
  {
    title: "Cloud Kitchens",
    image: "/industries/cloud-kitchens.jpg",
  },
  {
    title: "Hospitals",
    image: "/industries/hospitals.jpg",
  },
  {
    title: "Airport Catering",
    image: "/industries/airport-catering.jpg",
  },
];

export default function ClientsPage() {
  return (
    <>
      <HeaderOffsetSpacer />
      <StickyBreadcrumbBar />

      {/* Client Categories */}
      <section className="pb-20 pt-16 md:pt-20">
        <div className="container-custom">
          {clientCategories.map((category) => (
            <div key={category.title} className="mb-20">
              
              <h4 className="mb-8 text-2xl font-semibold text-slate-900">
                {category.title}
              </h4>
              

              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                {category.logos.map((logo) => (
                  <div
                    key={logo}
                    className="flex h-30 items-center justify-center rounded-xl border border-slate-200 bg-white p-1"
                  >
                    <img
                      src={`/clients/${category.folder}/${logo}.jpg`}
                      alt={logo.replace(/-/g, " ")}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="bg-slate-50 py-24">
  <div className="container-custom">

    <div className="mb-14 text-center">
      
      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-red-600">
        Industries
      </span>
      

      
      <h2 className="mt-3 text-4xl font-semibold text-slate-900">
        Commercial Kitchen Solutions
        <br />
        Across Every Industry
      </h2>
      

      
      <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
        From luxury hotels and restaurants to hospitals,
        educational institutions and corporate cafeterias,
        we deliver commercial kitchen solutions designed
        around the unique needs of every industry.
      </p>
      
    </div>

    <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">

      {industries.map((industry) => (

        <div
          key={industry.title}
          className="group relative aspect-[16/10] overflow-hidden rounded-3xl"
        >

          <img
            src={industry.image}
            alt={industry.title}
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-8">

            <div className="mb-4 h-1 w-14 rounded-full bg-red-600" />

            <h3 className="text-3xl font-semibold leading-tight text-white">
              {industry.title}
            </h3>

          </div>

        </div>
        

      ))}

    </div>

  </div>
</section>

      <CTA />
    </>
  );
}