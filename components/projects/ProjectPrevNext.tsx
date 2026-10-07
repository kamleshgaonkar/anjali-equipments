import Link from "next/link";
import type { PublicProjectNeighbor } from "@/lib/projects/types";

export default function ProjectPrevNext({
  previous,
  next,
}: {
  previous: PublicProjectNeighbor | null;
  next: PublicProjectNeighbor | null;
}) {
  if (!previous || !next) return null;

  return (
    <section className="border-t border-slate-200 bg-white">
      <div className="container-custom py-16 md:py-24">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-12">
          <Link
            href={`/projects/${previous.slug}`}
            className="group block cursor-pointer"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              ← Previous Project
            </p>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-[#8b191c] md:text-3xl">
              {previous.name}
            </p>
          </Link>

          <Link
            href={`/projects/${next.slug}`}
            className="group block cursor-pointer sm:text-right"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Next Project →
            </p>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-[#8b191c] md:text-3xl">
              {next.name}
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
