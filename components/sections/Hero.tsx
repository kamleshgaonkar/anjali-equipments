import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative h-[calc(100vh-80px)] overflow-hidden">

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

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Optional Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-center">

        <div className="container-custom text-center">

          <p className="eyebrow mb-6 text-white/80">
            Premium Commercial Kitchen Solutions
          </p>

          <h1 className="hero-title text-white">
            Commercial Kitchen Equipment
          </h1>

          <h2 className="mt-3 text-4xl font-bold text-red-500 md:text-5xl lg:text-6xl">
            Built To Perform.
          </h2>

          <div className="mt-12">

            <Button>
              Explore Products
            </Button>

          </div>

        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2">

        <div className="flex flex-col items-center gap-3">

          <span className="text-xs uppercase tracking-[0.35em] text-white/70">
            Scroll
          </span>

          <div className="flex h-12 w-7 items-start justify-center rounded-full border border-white/50 p-2">

            <span className="h-2 w-2 animate-bounce rounded-full bg-white" />

          </div>

        </div>

      </div>

    </section>
  );
}