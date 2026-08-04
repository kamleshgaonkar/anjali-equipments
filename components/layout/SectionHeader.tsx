interface Props {
    eyebrow: string;
    title: string;
    description?: string;
    align?: "left" | "center";
  }
  
  export default function SectionHeader({
    eyebrow,
    title,
    description,
    align = "center",
  }: Props) {
    return (
      <div
        className={`max-w-3xl ${
          align === "center"
            ? "mx-auto text-center"
            : "text-left"
        }`}
      >
        <span className="text-sm font-semibold uppercase tracking-[0.35em] text-red-600">
          {eyebrow}
        </span>
  
        <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-5xl">
          {title}
        </h2>
  
        {description && (
          <p className="mt-6 text-lg leading-8 text-slate-600">
            {description}
          </p>
        )}
      </div>
    );
  }