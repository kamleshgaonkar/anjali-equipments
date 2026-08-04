import CTA from "@/components/sections/CTA";

export default function BlogPage() {
    return (
      <section>
      <main className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
          Blogs & Articles
        </h1>
  
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {[1,2,3].map((blog)=>(
            <div
              key={blog}
              className="overflow-hidden rounded-xl border shadow-sm"
            >
              <div className="h-60 bg-slate-200"></div>
  
              <div className="p-6">
                <h3 className="text-2xl font-bold">
                  Blog Title
                </h3>
  
                <p className="mt-4 text-slate-600">
                  Short blog description goes here...
                </p>
              </div>
            </div>
          ))}
        </div>
       
      </main> <CTA />
      </section>
    );
  }