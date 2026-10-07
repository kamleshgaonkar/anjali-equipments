import ProjectCard from "@/components/projects/ProjectCard";
import CTA from "@/components/sections/CTA";
import {
  HeaderOffsetSpacer,
  StickyBreadcrumbBar,
} from "@/components/layout/StickyBreadcrumbBar";
import { fetchActiveProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Projects | Anjali Equipments",
  description:
    "Explore commercial kitchen projects delivered by Anjali Equipments.",
};

export default async function ProjectsPage() {
  const projects = await fetchActiveProjects();

  return (
    <main className="bg-white">
      <section className="bg-white">
        <HeaderOffsetSpacer />
        <StickyBreadcrumbBar />

        <div className="relative h-[280px] overflow-visible md:h-[320px] lg:h-[390px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(/images/kitchen/kitchen-panorama.jpg)",
            }}
          />
          <div className="absolute inset-0 bg-black/70" />

          <div className="relative flex h-full items-center">
            <div className="container-custom w-full py-8 md:py-10">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-500">
                  Our Projects
                </p>

                <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-white md:mt-4 md:text-4xl lg:text-5xl lg:leading-[1.1]">
                  Commercial Kitchens.
                  <br />
                  Built for Performance.
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-6 text-white/85 md:mt-5 md:text-base md:leading-7">
                  A selection of commercial kitchen projects designed,
                  manufactured and delivered by Anjali Equipments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-custom py-16 lg:py-24">
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3 xl:gap-6 2xl:grid-cols-4">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTA />
    </main>
  );
}
