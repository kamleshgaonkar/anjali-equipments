import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/data/products";

type Props = {
    params: Promise<{
        slug: string;
        product: string;
    }>;
};

export default async function ProductPage({ params }: Props) {
    const { slug, product } = await params;

    const selectedProduct = products.find(
        (item) =>
            item.category === slug &&
            item.slug === product
    );

    if (!selectedProduct) {
        notFound();
    }

    const categoryProducts = products.filter(
        (item) =>
            item.category === slug &&
            item.id !== selectedProduct.id
    );

    return (
        <main className="mx-auto max-w-7xl px-6 py-20">

            {/* Breadcrumb */}

            <div className="mb-10 flex items-center gap-2 text-sm text-slate-500">

                <Link href="/">Home</Link>

                <span>/</span>

                <Link href="/products">Products</Link>

                <span>/</span>

                <Link href={`/products/${slug}`} className="capitalize">
                    {slug.replace(/-/g, " ")}
                </Link>

                <span>/</span>

                <span className="font-medium text-slate-900">
                    {selectedProduct.name}
                </span>

            </div>

            {/* Product Section */}

            <div className="grid gap-16 lg:grid-cols-2">

                {/* Left */}

                <div className="relative h-[550px] overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">

                    <Image
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        fill
                        priority
                        className="object-contain p-5"
                    />

                </div>

                {/* Right */}

                <div>

                    <p className="mb-4 inline-flex rounded-full bg-red-50 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-red-700">
                        {selectedProduct.category.replace(/-/g, " ")}
                    </p>

                    <h1 className="text-5xl font-bold">
                        {selectedProduct.name}
                    </h1>

                    <p className="mt-8 text-lg leading-8 text-slate-600">
                        {selectedProduct.description}
                    </p>
                    <div className="mt-10 grid grid-cols-3 gap-4">

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
                            <h3 className="text-3xl font-bold text-red-700">18+</h3>
                            <p className="mt-1 text-sm text-slate-600">
                                Years Experience
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
                            <h3 className="text-3xl font-bold text-red-700">2500+</h3>
                            <p className="mt-1 text-sm text-slate-600">
                                Projects Delivered
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
                            <h3 className="text-3xl font-bold text-red-700">500+</h3>
                            <p className="mt-1 text-sm text-slate-600">
                                Happy Clients
                            </p>
                        </div>

                    </div>
                    <div className="mt-10 flex flex-wrap gap-4">

                        <Link
                            href="/contact"
                            className="rounded-xl bg-red-700 px-8 py-4 font-semibold text-white transition hover:bg-red-800"
                        >
                            Request Quote
                        </Link>


                    </div>

                    {/* Features */}

                    <h2 className="mt-14 text-2xl font-bold">
                        Features
                    </h2>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">

                        {selectedProduct.features.map((feature) => (

                            <div
                                key={feature}
                                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-red-200 hover:bg-red-50"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-lg font-bold text-red-700">
                                    ✓
                                </div>

                                <p className="font-medium text-slate-700">
                                    {feature}
                                </p>

                            </div>

                        ))}

                    </div>

                    {/* Specifications */}

                    <h2 className="mt-14 text-2xl font-bold">
                        Specifications
                    </h2>

                    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                        {selectedProduct.specifications.map((spec, index) => (

                            <div
                                key={spec.label}
                                className={`flex items-center justify-between px-6 py-5 transition hover:bg-slate-50 ${index !== selectedProduct.specifications.length - 1
                                        ? "border-b border-slate-200"
                                        : ""
                                    } ${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                                    }`}
                            >

                                <span className="font-medium text-slate-600">
                                    {spec.label}
                                </span>

                                <span className="font-semibold text-slate-900">
                                    {spec.value}
                                </span>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

            {/* Related Products */}

            <section className="mt-24">
                <div className="mb-10">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-700">
                        EXPLORE MORE
                    </p>

                    <h2 className="mt-2 text-4xl font-bold">
                        Related Equipment
                    </h2>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

                    {categoryProducts.slice(0, 4).map((product) => (

                        <Link
                            key={product.id}
                            href={`/products/${product.category}/${product.slug}`}
                            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:border-red-200 hover:shadow-2xl"
                        >

                            <div className="relative h-52 border-b border-slate-200 bg-slate-50">

                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-5 transition duration-300 group-hover:scale-105"
                                />

                            </div>

                            <div className="p-5">

                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                                    {product.category.replace(/-/g, " ")}
                                </p>

                                <h3 className="mt-2 text-xl font-bold text-slate-900">
                                    {product.name}
                                </h3>

                                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                                    {product.description}
                                </p>

                                <div className="mt-5 inline-flex items-center gap-2 font-semibold text-red-700 transition group-hover:gap-3">
                                    View Details
                                    <span>→</span>
                                </div>

                            </div>

                        </Link>

                    ))}

                </div>

            </section>

            {/* Bottom CTA */}

            <section className="mt-32 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-50 via-white to-slate-50">

                <div className="mx-auto max-w-5xl px-8 py-20 text-center">

                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-700">
                        COMPLETE COMMERCIAL KITCHEN SOLUTIONS
                    </p>

                    <h2 className="mt-4 text-4xl font-bold text-slate-900">
                        Planning a Commercial Kitchen Project?
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                        Looking for more than just one product? Our experts help you design,
                        manufacture and install complete commercial kitchen solutions for
                        hotels, restaurants, cloud kitchens, hospitals, educational
                        institutions and industrial canteens.
                    </p>

                    <p className="mt-5 text-base font-medium text-slate-700">
                        Need expert guidance? Speak with our kitchen specialists today.
                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-5">

                        <Link
                            href="/contact"
                            className="flex h-14 w-72 items-center justify-center rounded-xl bg-red-700 font-semibold text-white transition hover:bg-red-800"
                        >
                            Request Quote
                        </Link>

                        <Link
                            href="/contact?service=complete-kitchen"
                            className="flex h-14 w-72 items-center justify-center rounded-xl border-2 border-red-700 bg-white font-semibold text-red-700 transition hover:bg-red-700 hover:text-white"
                        >
                            Get Complete Kitchen Proposal
                        </Link>

                    </div>

                    {/* Trust Badges */}

                    <div className="mt-14 grid gap-6 md:grid-cols-3">

                        <div className="rounded-2xl border border-slate-200 bg-white p-6">

                            <div className="text-4xl">🏭</div>

                            <h3 className="mt-4 font-semibold">
                                Custom Manufacturing
                            </h3>

                            <p className="mt-2 text-sm text-slate-600">
                                Equipment built to your exact dimensions and kitchen layout.
                            </p>

                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-6">

                            <div className="text-4xl">🚚</div>

                            <h3 className="mt-4 font-semibold">
                                PAN India Delivery
                            </h3>

                            <p className="mt-2 text-sm text-slate-600">
                                Safe and reliable delivery for commercial kitchen projects.
                            </p>

                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-6">

                            <div className="text-4xl">🛠</div>

                            <h3 className="mt-4 font-semibold">
                                Installation Support
                            </h3>

                            <p className="mt-2 text-sm text-slate-600">
                                Professional installation and after-sales service support.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}