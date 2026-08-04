import CTA from "@/components/sections/CTA";

export default function ProjectsPage() {
    return (
      <section>
      <main className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
          Our Projects
        </h1>
  
        <p className="mt-8 max-w-3xl text-lg text-slate-600">
          Explore some of the commercial kitchen projects completed by
          Anjali Equipments across hotels, restaurants, hospitals and
          institutional kitchens.
        </p>
  
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1,2,3,4,5,6].map((item)=>(
            <div
              key={item}
              className="overflow-hidden rounded-xl border shadow-sm"
            >
              <div className="h-60 bg-slate-200"></div>
  
              <div className="p-6">
                <h3 className="text-xl font-semibold">
                  Project {item}
                </h3>
  
                <p className="mt-2 text-slate-600">
                  Commercial Kitchen Installation
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <CTA />
      </section>
    );
  }