import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROJECT_IMAGE_FALLBACK } from "@/lib/projects/types";
import type { PublicProjectListItem } from "@/lib/projects/types";

export default function ProjectCard({
  project,
}: {
  project: PublicProjectListItem;
}) {
  const imageSrc = project.cover_image || PROJECT_IMAGE_FALLBACK;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative min-h-[300px] cursor-pointer overflow-hidden rounded-[24px] bg-slate-900 md:min-h-[320px] xl:min-h-[340px]"
    >
      <Image
        src={imageSrc}
        alt={project.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/5" />
      <div className="absolute inset-0 bg-red-950/0 transition duration-500 group-hover:bg-red-950/10" />

      <div className="relative flex h-full min-h-[330px] flex-col justify-end p-6 md:p-8">
        <div className="flex items-end justify-between gap-6">
          <div className="min-w-0">
            <h3 className="max-w-md text-2xl font-bold tracking-tight text-white md:text-3xl">
              {project.name}
            </h3>
            {project.location ? (
              <p className="mt-2 text-sm font-medium text-white/70">
                {project.location}
              </p>
            ) : null}
          </div>

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 group-hover:border-red-600 group-hover:bg-red-700">
            <ArrowRight size={19} />
          </div>
        </div>
      </div>
    </Link>
  );
}
