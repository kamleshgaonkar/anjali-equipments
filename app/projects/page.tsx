import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/lib/projects";
import CTA from "@/components/sections/CTA"; 
export const metadata = {
  title: "Projects | Anjali Equipments",
  description:
    "Explore commercial kitchen projects delivered by Anjali Equipments.",
};

export default function ProjectsPage() {
  return (
    <main className="bg-white">

      {/* Hero */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-32 md:px-8 md:pb-20 md:pt-40">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-400">
            Our Projects
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">
            Commercial Kitchens.
            <br />
            Built for Performance.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg md:leading-8">
            A selection of commercial kitchen projects designed,
            manufactured and delivered by Anjali Equipments.
          </p>

        </div>
      </section>

      {/* Projects */}
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-20">

        <div className="mb-10 flex items-end justify-between gap-6">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-700">
              Selected Work
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Our Projects
            </h2>
          </div>

          <p className="hidden text-sm text-slate-500 sm:block">
            {projects.length} Projects
          </p>

        </div>

        {projects.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              Projects Coming Soon
            </h2>

            <p className="mt-2 text-slate-600">
              We are currently updating our project portfolio.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
              />
            ))}
          </div>
        )}

      </section>
      <CTA />

    </main>
  );
}