import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import CTA from "@/components/sections/CTA";
import {
  HeaderOffsetSpacer,
  StickyBreadcrumbBar,
} from "@/components/layout/StickyBreadcrumbBar";
import ProjectDetailHero from "@/components/projects/ProjectDetailHero";
import ProjectPrevNext from "@/components/projects/ProjectPrevNext";
import ProjectScopeList from "@/components/projects/ProjectScopeList";
import {
  fetchActiveProjectBySlug,
  fetchActiveProjects,
  getProjectNeighbors,
} from "@/lib/projects";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchActiveProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Anjali Equipments",
    };
  }

  return {
    title: project.seo_title || `${project.name} | Anjali Equipments`,
    description:
      project.seo_description || project.short_description || undefined,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const [project, projects] = await Promise.all([
    fetchActiveProjectBySlug(slug),
    fetchActiveProjects(),
  ]);

  if (!project) {
    notFound();
  }

  const { previous, next } = getProjectNeighbors(projects, project.slug);
  const hasOverview = Boolean(project.overview?.trim());
  const hasDetails = Boolean(project.location || project.project_type);
  const overviewHeading =
    project.overview_heading?.trim() || "Project Overview";

  return (
    <main className="bg-white">
      <HeaderOffsetSpacer />
      <StickyBreadcrumbBar />

      <ProjectDetailHero
        name={project.name}
        coverImage={project.cover_image}
        projectType={project.project_type}
        location={project.location}
        shortDescription={project.short_description}
      />

      {hasOverview || hasDetails ? (
        <section className="container-custom py-16 md:py-24">
          <div
            className={`grid gap-12 ${
              hasDetails && (hasOverview || project.overview_heading?.trim())
                ? "lg:grid-cols-[1fr_360px]"
                : ""
            }`}
          >
            {hasOverview || project.overview_heading?.trim() ? (
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                  {overviewHeading}
                </h2>

                {hasOverview ? (
                  <p className="mt-6 max-w-3xl whitespace-pre-line text-lg leading-8 text-slate-600">
                    {project.overview}
                  </p>
                ) : null}
              </div>
            ) : null}

            {hasDetails ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Project Details
                </p>

                <div className="mt-5 space-y-4">
                  {project.location ? (
                    <div
                      className={
                        project.project_type
                          ? "border-b border-slate-200 pb-4"
                          : ""
                      }
                    >
                      <p className="text-xs text-slate-500">Location</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {project.location}
                      </p>
                    </div>
                  ) : null}

                  {project.project_type ? (
                    <div>
                      <p className="text-xs text-slate-500">Project Type</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {project.project_type}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <ProjectScopeList items={project.project_scope} />

      {project.gallery.length > 0 ? (
        <section className="container-custom py-16 md:py-24">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Gallery
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {project.gallery.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className={`relative overflow-hidden rounded-2xl bg-slate-100 ${
                  index === 0
                    ? "aspect-[16/10] md:col-span-2"
                    : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={image}
                  alt={`${project.name} project image ${index + 1}`}
                  fill
                  sizes={
                    index === 0
                      ? "(max-width: 768px) 100vw, 1280px"
                      : "(max-width: 768px) 100vw, 50vw"
                  }
                className="object-cover transition duration-700 hover:scale-105"
              />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <ProjectPrevNext previous={previous} next={next} />

      <CTA />
    </main>
  );
}
