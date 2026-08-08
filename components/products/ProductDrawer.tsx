"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  MessageCircle,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Product } from "@/types/product";
import { motion, AnimatePresence } from "framer-motion";
import QuoteButton from "@/components/quote/QuoteButton";

interface ProductDrawerProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export default function ProductDrawer({
  product,
  open,
  onClose,
}: ProductDrawerProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const images = product
    ? [product.image, ...(product.gallery ?? [])].filter(
        (image): image is string =>
          Boolean(image && image.trim())
      )
    : [];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, product]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <>
      {/* Overlay */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}

      <AnimatePresence>
        {open && product && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 32,
            }}
            className="fixed right-0 top-0 z-[100] h-screen w-full bg-white shadow-2xl md:w-[520px] lg:w-[55vw] xl:w-[50vw] max-w-[900px]"
          >
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex h-full flex-col"
            >
              {/* Header */}

              <div className="flex items-start justify-between border-b border-slate-200 bg-white px-8 py-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-700">
                    {product.model}
                  </p>

                  <h2 className="mt-2 text-3xl font-semibold leading-tight text-slate-900">
                    {product.name}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close product"
                  className="rounded-full border border-slate-200 bg-slate-50 p-3 transition hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Content */}

              <div className="flex-1 overflow-y-auto">

                {/* Product Gallery */}

                {images.length > 0 && (
                  <div className="relative overflow-hidden bg-slate-100">
                    <div
                      ref={emblaRef}
                      className="overflow-hidden"
                    >
                      <div className="flex">
                        {images.map((image, index) => (
                          <div
                            key={`${image}-${index}`}
                            className="relative min-w-0 flex-[0_0_100%] aspect-[3/2]"
                          >
                            <Image
                              src={image}
                              alt={`${product.name} - ${index + 1}`}
                              fill
                              sizes="(max-width: 768px) 100vw, 55vw"
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Previous */}

                    {images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => emblaApi?.scrollPrev()}
                        aria-label="Previous image"
                        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition hover:bg-white"
                      >
                        <ChevronLeft size={22} />
                      </button>
                    )}

                    {/* Next */}

                    {images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => emblaApi?.scrollNext()}
                        aria-label="Next image"
                        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition hover:bg-white"
                      >
                        <ChevronRight size={22} />
                      </button>
                    )}

                    {/* Dots */}

                    {images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() =>
                              emblaApi?.scrollTo(index)
                            }
                            aria-label={`View image ${index + 1}`}
                            className={`h-2.5 rounded-full transition-all ${
                              index === selectedIndex
                                ? "w-8 bg-red-600"
                                : "w-2.5 bg-white/80"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Product Information */}

                <div className="space-y-8 p-8">

                  {/* Model */}

                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      Model
                    </p>

                    <p className="mt-1 text-base text-slate-900">
                      {product.model}
                    </p>
                  </div>

                  {/* Short Description */}

                  {product.shortDescription && (
                    <p className="text-base leading-7 text-slate-600">
                      {product.shortDescription}
                    </p>
                  )}

                  {/* Manufacturer Badge */}

                  <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4">
                    <BadgeCheck
                      size={22}
                      className="shrink-0 text-green-600"
                    />

                    <div>
                      <p className="font-semibold text-slate-900">
                        Manufactured by Anjali Equipments
                      </p>

                      <p className="text-sm text-slate-600">
                        Premium Commercial Kitchen Equipment
                      </p>
                    </div>
                  </div>

                  {/* Material / Warranty / Custom Size */}

                  <div className="grid grid-cols-3 gap-4">

                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        Material
                      </p>

                      <p className="mt-2 font-semibold text-slate-900">
                        {product.material}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        Warranty
                      </p>

                      <p className="mt-2 font-semibold text-slate-900">
                        {product.warranty}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        Custom Size
                      </p>

                      <p className="mt-2 font-semibold text-slate-900">
                        {product.customSizes
                          ? "Available"
                          : "Not Available"}
                      </p>
                    </div>

                  </div>

                  {/* Quote Button */}

                  {/* Quote + WhatsApp */}

<div className="flex flex-wrap gap-3">

<QuoteButton product={product} />

<a
  href={`https://wa.me/918657003003?text=${encodeURIComponent(
    `Hello Anjali Equipments,

I am interested in:

Product: ${product.name}
Model: ${product.model}

Please share the price and further details.

Thank you.`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-green-500 bg-white px-5 py-4 font-semibold text-green-700 transition-all duration-300 hover:bg-green-50"
>
  <MessageCircle size={20} />
  WhatsApp
</a>

</div>

                  {/* Description */}

                  {product.description && (
                    <section className="border-t border-slate-200 pt-8">

                      <h3 className="text-xl font-semibold text-slate-900">
                        Description
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-slate-600">
                        {product.description}
                      </p>

                    </section>
                  )}

                  {/* Features */}

                  {product.features &&
                    product.features.length > 0 && (
                      <section className="border-t border-slate-200 pt-8">

                        <h3 className="text-xl font-semibold text-slate-900">
                          Features
                        </h3>

                        <div className="mt-4 space-y-3">

                          {product.features.map(
                            (feature, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-3 rounded-xl bg-slate-50 p-3"
                              >
                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50 text-xs text-red-600">
                                  ✓
                                </span>

                                <span className="text-sm leading-6 text-slate-700">
                                  {feature}
                                </span>
                              </div>
                            )
                          )}

                        </div>

                      </section>
                    )}

                  {/* Specifications */}

                  {product.specifications &&
                    product.specifications.length > 0 && (
                      <section className="border-t border-slate-200 pt-8">

                        <h3 className="text-xl font-semibold text-slate-900">
                          Specifications
                        </h3>

                        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">

                          {product.specifications.map(
                            (spec, index) => (
                              <div
                                key={spec.label}
                                className={`flex justify-between gap-6 px-4 py-3 text-sm ${
                                  index % 2 === 0
                                    ? "bg-slate-50"
                                    : "bg-white"
                                }`}
                              >
                                <span className="text-slate-500">
                                  {spec.label}
                                </span>

                                <span className="text-right font-medium text-slate-900">
                                  {spec.value}
                                </span>
                              </div>
                            )
                          )}

                        </div>

                      </section>
                    )}

                </div>
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}