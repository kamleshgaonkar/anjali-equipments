import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import CTA from "@/components/sections/CTA";

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
  "Airport Hotels & Restaurants",
  "Hotels & Resorts",
  "Restaurants, Cafés & Bars",
  "Corporate Cafeterias",
  "Educational Institutes",
  "Industrial Canteens",
  "Cloud Kitchens",
  "Hospitals",
];

export default function ClientsPage() {
  return (
    <>
      {/* Hero */}
       
      <PageHero
       title="Our Clients"
/>

      {/* Client Categories */}
      <section className="py-20">
        <div className="container-custom">
          {clientCategories.map((category) => (
            <div key={category.title} className="mb-20">
              <h2 className="section-title mb-8 text-slate-900">
                {category.title}
              </h2>

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
      <section className="bg-slate-50 py-20">
        <div className="container-custom">
          <h2 className="section-title mb-12 text-center text-slate-900">
            Industries We Serve
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <div
                key={industry}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                ✓ {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}