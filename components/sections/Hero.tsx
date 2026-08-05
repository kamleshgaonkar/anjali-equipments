import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-svh overflow-hidden lg:h-[100vh] lg:min-h-0">

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

        <div className="flex min-h-svh items-center justify-center pt-24 pb-20 lg:h-full lg:min-h-0 lg:items-center lg:justify-start lg:pt-20 lg:pb-0">

            {/* Left Content */}
            <div className="w-full max-w-[680px] text-center lg:text-left">

              {/* Eyebrow */}

              <div className="mb-6 flex items-center justify-center gap-4 sm:mb-8 lg:justify-start">

                <span className="h-px w-10 bg-red-600" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 sm:tracking-[0.35em]">
                  Since 2010
                </span>

              </div>

              {/* Heading */}

              <h1 className="
mx-auto
max-w-3xl
text-4xl
font-semibold
leading-[0.98]
tracking-tight
text-white
sm:text-6xl
lg:mx-0
lg:text-left
lg:text-7xl
">

                Engineering
                <br />
                Commercial Kitchen
                <br />
                Excellence.

              </h1>

              {/* Body */}

              <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/80 sm:mt-7 sm:leading-8 lg:mx-0 lg:text-left lg:text-lg">

                Designing, manufacturing and installing premium
                SS304 commercial kitchen equipment trusted by
                hotels, restaurants, hospitals and institutional
                kitchens across India.

              </p>

              {/* Buttons */}

             {/* Buttons */}

<div className="mt-8 flex w-full flex-col items-center gap-3 sm:mt-10 lg:flex-row lg:items-start lg:gap-4">

<div className="w-full max-w-[340px] lg:w-auto lg:max-w-none">
  <Button className="w-full lg:w-auto">
    Explore Products
  </Button>
</div>

<div className="w-full max-w-[340px] lg:w-auto lg:max-w-none">
  <Link
    href="/projects"
    className="flex w-full items-center justify-center rounded-xl border border-white/30 px-7 py-4 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-slate-900 lg:w-auto"
  >
    View Projects
  </Link>
</div>

</div>

            </div>

          </div>

        </div>

      </div>


    </section>
  );
}
