import {
  HeaderOffsetSpacer,
  StickyBreadcrumbBar,
} from "@/components/layout/StickyBreadcrumbBar";

interface Props {
  eyebrow?: string;
  title?: string;
  description?: string;
  background?: string;
  /**
   * category — taller banner, breadcrumb above image, optional description.
   * default — existing PageHero for other site pages.
   */
  variant?: "default" | "category";
}

export default function PageHero({
  eyebrow,
  title,
  description,
  background = "/hero/hero.jpg",
  variant = "default",
}: Props) {
  const isCategory = variant === "category";

  if (isCategory) {
    return (
      <section className="bg-white">
        {/* Category banner — unchanged approved design */}
        <div className="relative h-[235px] overflow-hidden md:h-[270px] lg:h-[320px]">
          {background ? (
            <>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${background})` }}
              />
              <div className="absolute inset-0 bg-black/70" />
            </>
          ) : (
            <div className="absolute inset-0 bg-slate-900" />
          )}

          <div className="relative flex h-full items-center">
            <div className="container-custom py-8 md:py-10">
              <div className="max-w-3xl">
                {eyebrow ? (
                  <span className="text-xs font-semibold uppercase tracking-[0.35em] text-red-500">
                    {eyebrow}
                  </span>
                ) : null}

                {title ? (
                  <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:mt-3 md:text-5xl">
                    {title}
                  </h1>
                ) : null}

                {description ? (
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85 md:mt-4 md:text-base md:leading-7">
                    {description}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white">
      <HeaderOffsetSpacer />
      <StickyBreadcrumbBar />

      <div className="relative overflow-hidden">
        {background ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${background})` }}
            />
            <div className="absolute inset-0 bg-black/70" />
          </>
        ) : (
          <div className="absolute inset-0 bg-slate-900" />
        )}

        <div className="relative container-custom flex min-h-[80px] items-center py-10 lg:py-14">
          <div className="max-w-3xl">
            {eyebrow ? (
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-red-500">
                {eyebrow}
              </span>
            ) : null}

            {title ? (
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                {title}
              </h1>
            ) : null}

            {description ? (
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85 md:text-base md:leading-7">
                {description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
