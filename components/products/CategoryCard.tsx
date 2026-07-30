import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export default function CategoryCard({
  name,
  slug,
  image,
  description,
}: CategoryCardProps) {
  return (
    <Link
      href={`/products/${slug}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-slate-900">
          {name}
        </h2>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
          {description}
        </p>

        <div className="mt-6 inline-flex items-center gap-2 font-semibold text-red-700 transition-all group-hover:gap-3">
          Explore Category
          <span>→</span>
        </div>
      </div>
    </Link>
  );
}