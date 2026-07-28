type Props = {
    title: string;
    subtitle?: string;
  };
  
  export default function SectionTitle({ title, subtitle }: Props) {
    return (
      <div className="mb-12 text-center">
        {subtitle && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-red-700">
            {subtitle}
          </p>
        )}
  
        <h2 className="text-4xl font-bold text-slate-900">
          {title}
        </h2>
      </div>
    );
  }