import Breadcrumb from "./Breadcrumb";

interface Props {
  eyebrow: string;
  title: string;
  background: string;
  description?: string;
}

export default function PageHero({
  eyebrow,
  title,
  description,
  background,
}: Props) {
  return (
    <section className="relative overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${background})`,
        }}
      />

      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative container-custom flex min-h-[160px] items-center py-12 lg:py-16">

        <div className="max-w-3xl">

          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-red-500">
            {eyebrow}
          </span>

          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-white">
            {title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
            
{description && (
  <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
    {description}
  </p>
)}

          </p>

          <Breadcrumb />

        </div>

      </div>

    </section>
  );
}