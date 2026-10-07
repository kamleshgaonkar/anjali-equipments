"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { useHeaderScroll } from "@/context/HeaderScrollContext";
import { PROJECT_IMAGE_FALLBACK } from "@/lib/projects/types";

export default function ProjectDetailHero({
  name,
  coverImage,
  projectType,
  location,
  shortDescription,
}: {
  name: string;
  coverImage: string | null;
  projectType: string | null;
  location: string | null;
  shortDescription: string | null;
}) {
  const { headerHeight } = useHeaderScroll();
  const imageSrc = coverImage || PROJECT_IMAGE_FALLBACK;

  return (
    <section
      className="relative flex min-h-[80svh] items-center justify-center overflow-x-hidden overflow-y-hidden md:min-h-[calc(100svh-var(--project-chrome))]"
      style={{
        ["--project-chrome" as string]: `${headerHeight + 44}px`,
      }}
    >
      <Image
        src={imageSrc}
        alt={name}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      /> 

      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.48)_0%,rgba(0,0,0,0.28)_42%,rgba(0,0,0,0.16)_100%)]" />

      <div className="relative z-10 flex w-full items-center justify-center px-5 py-16">
        <div className="mx-auto w-full max-w-[700px] text-center">
          {projectType ? (
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-500">
              {projectType}
            </p>
          ) : null}

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:mt-5 md:text-5xl lg:text-[clamp(3rem,4vw,4rem)] lg:leading-[1.1]">
            {name}
          </h1>

          {location ? (
            <div className="mt-4 flex items-center justify-center gap-2 text-white/85 md:mt-5">
              <MapPin size={18} />
              <span className="text-sm md:text-base">{location}</span>
            </div>
          ) : null}

          {shortDescription ? (
            <p className="mx-auto mt-5 max-w-[700px] text-sm leading-6 text-white/85 md:mt-6 md:text-base md:leading-7">
              {shortDescription}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
