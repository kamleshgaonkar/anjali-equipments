import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative h-[calc(85vh-80px)] overflow-hidden">

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

        <div className="flex h-full items-end lg:items-center pb-24 lg:pb-0">

            {/* Left Content */}
            <div className="w-full max-w-[680px]">

              {/* Eyebrow */}

              <div className="mb-8 flex items-center gap-4">

                <span className="h-px w-10 bg-red-600" />

                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                  Since 2010
                </span>

              </div>

              {/* Heading */}

              <h1 className="
text-5xl
sm:text-6xl
lg:text-7xl
font-semibold
leading-[0.95]
tracking-tight
text-white
max-w-3xl
">

                Engineering
                <br />
                Commercial Kitchen
                <br />
                Excellence.

              </h1>

              {/* Body */}

              <p className="
mt-7
max-w-[340px]
lg:max-w-xl
text-base
lg:text-lg
leading-8
text-white/80
">

                Designing, manufacturing and installing premium
                SS304 commercial kitchen equipment trusted by
                hotels, restaurants, hospitals and institutional
                kitchens across India.

              </p>

              {/* Buttons */}

              <div className="mt-10 flex flex-col sm:flex-row gap-4">

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