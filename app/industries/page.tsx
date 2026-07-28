const industries = [
    "Hotels",
    "Restaurants",
    "Cloud Kitchens",
    "Hospitals",
    "Industrial Canteens",
    "Educational Institutions",
    "Corporate Cafeterias",
    "Resorts",
  ];
  
  export default function IndustriesPage() {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="text-5xl font-bold">
          Industries We Serve
        </h1>
  
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {industries.map((item) => (
            <div
              key={item}
              className="rounded-xl border p-8 text-center shadow-sm"
            >
              <h3 className="text-xl font-semibold">
                {item}
              </h3>
            </div>
          ))}
        </div>
      </main>
    );
  }