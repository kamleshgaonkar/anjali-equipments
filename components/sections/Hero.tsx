import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100svh-80px)] overflow-hidden lg:h-[calc(85vh-80px)] lg:min-h-0">

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />

      {/* Hero Content */}
      <div className="relative z-10 h-full">

        <div className="container-custom h-full">

          <div className="flex min-h-[calc(100svh-80px)] items-end pb-28 pt-10 sm:pb-24 lg:min-h-0 lg:h-full lg:items-center lg:pb-0 lg:pt-0">

            {/* Left Content */}
            <div className="w-full max-w-[680px]">

              {/* Eyebrow */}

              <div className="mb-6 flex items-center gap-4 sm:mb-8">

                <span className="h-px w-10 bg-red-600" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 sm:tracking-[0.35em]">
                  Since 2010
                </span>

              </div>

              {/* Heading */}

              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl sm:leading-[0.95] lg:text-7xl">

                Engineering
                <br />
                Commercial Kitchen
                <br />
                Excellence.

              </h1>

              {/* Body */}

              <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:mt-7 sm:leading-8 lg:text-lg">

                Designing, manufacturing and installing premium
                SS304 commercial kitchen equipment trusted by
                hotels, restaurants, hospitals and institutional
                kitchens across India.

              </p>

              {/* Buttons */}

              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">

                <Button>
                  Explore Products
                </Button>

                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center rounded-lg border border-white/30 px-8 py-4 font-medium text-white transition-all duration-300 hover:bg-white hover:text-slate-900"
                >
                  View Projects
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>


    </section>
  );
}
