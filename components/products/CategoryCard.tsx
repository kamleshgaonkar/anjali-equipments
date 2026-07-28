import Link from "next/link";
import Image from "next/image";

type Props = {
  name: string;
  slug: string;
  image: string;
};

export default function CategoryCard({
  name,
  slug,
  image,
}: Props) {
  return (
    <Link
      href={`/products/${slug}`}
      className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-xl"
    >
      <div className="relative h-60 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold">{name}</h3>

        <p className="mt-2 text-slate-600">
          View Products →
        </p>
      </div>
    </Link>
  );
}