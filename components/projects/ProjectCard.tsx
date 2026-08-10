"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
      <Link
        href={`/projects/${project.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b191c] focus-visible:ring-offset-2"
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />

          {/* View icon */}
          <div className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-slate-900 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight size={19} />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <MapPin size={15} className="shrink-0" />
            <span>{project.location}</span>
          </div>

          <h2 className="mt-2 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-[#8b191c] md:text-2xl">
            {project.title}
          </h2>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
            {project.description}
          </p>

          <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#8b191c]">
            View Project
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>
      </Link>
    </article>
  );
}