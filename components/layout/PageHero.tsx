import Breadcrumb from "./Breadcrumb";

interface Props {
  eyebrow: string;
  title: string;
  background: string; 
}

export default function PageHero({
  eyebrow,
  title,
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
      <div className="relative container-custom flex min-h-[80px] items-center pb-6 pt-28 lg:pb-10 lg:pt-32">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-red-500">
            {eyebrow}
          </span>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            {title}
          </h1>
 

          <div className="mt-1">
            <Breadcrumb />
          </div>
        </div>
      </div>
    </section>
  );
}