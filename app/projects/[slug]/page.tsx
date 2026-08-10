import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import { getProjectBySlug, projects } from "@/lib/projects";
import CTA from "@/components/sections/CTA";
interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }
  const currentIndex = projects.findIndex(
    (item) => item.slug === project.slug
  );
  
  const previousProject =
    currentIndex > 0
      ? projects[currentIndex - 1]
      : null;
  
  const nextProject =
    currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : null;
  return (
    <main className="bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-32 md:px-8 md:pb-16 md:pt-40">

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>

          <div className="mt-10 max-w-4xl">

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-400">
              Project
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
              {project.title}
            </h1>

            <div className="mt-5 flex items-center gap-2 text-white/70">
              <MapPin size={18} />
              <span>{project.location}</span>
            </div>

          </div>
        </div>
      </section>

      {/* Main Project Image */}
      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">

        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-slate-100">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1280px"
            className="object-cover"
          />
        </div>

      </section>

      {/* Project Overview */}
      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8 md:pb-24">

        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">

          {/* Description */}
          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-700">
              Project Overview
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Built around the way the kitchen works.
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              {project.description}
            </p>

          </div>

          {/* Project Information */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Project Details
            </p>

            <div className="mt-5 space-y-4">

              <div className="border-b border-slate-200 pb-4">
                <p className="text-xs text-slate-500">
                  Location
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  {project.location}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Project Type
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  {project.category}
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Scope */}
      <section className="border-y border-slate-200 bg-slate-50">

        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-700">
            Equipment Supplied
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
            Project Scope
          </h2>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

            {project.equipment.map((equipment) => (
              <div
                key={equipment}
                className="rounded-xl border border-slate-200 bg-white px-5 py-4"
              >
                <p className="font-medium text-slate-900">
                  {equipment}
                </p>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">

          <div className="max-w-2xl">

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-700">
              Project Gallery
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              Inside the project
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
                  alt={`${project.title} project image ${index + 1}`}
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
      )}

      {/* Previous / Next Project */}
      {/* Previous / Next Project */}
<section className="border-t border-slate-200 bg-white">
  <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
    <div className="grid gap-3 sm:grid-cols-2">

      {/* Previous Project */}
      {previousProject ? (
        <Link
          href={`/projects/${previousProject.slug}`}
          className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            ← Previous Project
          </p>

          <p className="mt-2 text-lg font-semibold text-slate-900 transition-colors group-hover:text-[#8b191c]">
            {previousProject.title}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {previousProject.location}
          </p>
        </Link>
      ) : (
        <div />
      )}

      {/* Next Project */}
      {nextProject ? (
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group rounded-2xl border border-slate-200 bg-white p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md sm:text-right"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Next Project →
          </p>

          <p className="mt-2 text-lg font-semibold text-slate-900 transition-colors group-hover:text-[#8b191c]">
            {nextProject.title}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {nextProject.location}
          </p>
        </Link>
      ) : (
        <div />
      )}

    </div>
  </div>
</section>

{/* CTA */}
<CTA />
 

    </main>
  );
}