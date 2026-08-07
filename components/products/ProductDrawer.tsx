"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  MessageCircle,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Product } from "@/types/product";
import { motion, AnimatePresence } from "framer-motion";
 

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
    ? [product.image, ...(product.gallery ?? [])]
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
  const whatsappNumber = "918657003003";

const whatsappMessage = product
  ? encodeURIComponent(
      `Hello Anjali Equipments,

I am interested in the following product.

*Product:* ${product.name}
*Model:* ${product.model}

Please share:

• Best Price
• Delivery Time
• Product Brochure

Product Link:
${typeof window !== "undefined" ? window.location.href : ""}

Thank you.`
    )
  : "";

const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  return (
    <>
      {/* Overlay */}

      <div
        className={`fixed inset-0 z-90 bg-black/50 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />
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
  {open && (
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
        <AnimatePresence mode="wait">
        {product && (
          <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          className="flex h-full flex-col"
        >

            {/* Header */}

            <div className="flex items-start justify-between border-b border-slate-200 bg-white px-8 py-6">

  <div>
    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-600">
      {product.model}
    </p>

    <h2 className="mt-2 text-3xl font-semibold leading-tight text-slate-900">
      {product.name}
    </h2>
  </div>

  <button
    onClick={onClose}
    className="rounded-full border border-slate-200 bg-slate-50 p-3 transition hover:bg-slate-100"
  >
    <X size={20} />
  </button>

</div>

            {/* Content */}

            <div className="flex-1 overflow-y-auto">

            <div className="relative">

  <div
    ref={emblaRef}
    className="overflow-hidden"
  >
    <div className="flex">

      {images.map((image, index) => (

        <div
          key={index}
          className="relative min-w-0 flex-[0_0_100%] aspect-[3/2]"
        >

          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover"
          />

        </div>

      ))}

    </div>
  </div>

  {/* Previous */}

  {images.length > 1 && (
  <button
    onClick={() => emblaApi?.scrollPrev()}
    className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition hover:bg-white"
  >
    <ChevronLeft size={22} />
  </button>
)}

  {/* Next */}
  {images.length > 1 && (
  <button
    onClick={() => emblaApi?.scrollNext()}
    className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition hover:bg-white"
  >
    <ChevronRight size={22} />
  </button>
)}
  {/* Dots */}

  <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">

    {images.map((_, index) => (

      <button
        key={index}
        onClick={() => emblaApi?.scrollTo(index)}
        className={`h-2.5 rounded-full transition-all ${
          index === selectedIndex
            ? "w-8 bg-red-600"
            : "w-2.5 bg-white/70"
        }`}
      />

    ))}

  </div>

</div>

              <div className="space-y-8 p-8">

              <div className="space-y-4">
  <h3 className="text-xl font-semibold text-slate-900">
    Description
  </h3>

  <p className="leading-8 text-slate-600">
    {product.description}
  </p>
</div>
<div className="border-t border-slate-200 pt-8">
  <h3 className="mb-6 text-xl font-semibold text-slate-900">
    Specifications
  </h3>

  <div className="space-y-4">
    <div className="flex justify-between border-b border-slate-100 pb-3">
      <span className="text-slate-500">Material</span>
      <span className="font-medium">{product.material}</span>
    </div>

    <div className="flex justify-between border-b border-slate-100 pb-3">
      <span className="text-slate-500">Warranty</span>
      <span className="font-medium">{product.warranty}</span>
    </div>

    <div className="flex justify-between pb-3">
      <span className="text-slate-500">Custom Sizes</span>
      <span className="font-medium">
        {product.customSizes ? "Available" : "Standard"}
      </span>
    </div>

    {product.specifications.map((spec) => (
      <div
        key={spec.label}
        className="flex justify-between border-t border-slate-100 pt-3"
      >
        <span className="text-slate-500">{spec.label}</span>
        <span className="font-medium">{spec.value}</span>
      </div>
    ))}
  </div>
</div>
<div className="border-t border-slate-200 pt-8">
  <h3 className="mb-6 text-xl font-semibold text-slate-900">
    Features
  </h3>

  <div className="grid gap-4">
    {product.features.map((feature) => (
      <div
        key={feature}
        className="flex items-start gap-3"
      >
        <span className="mt-1 text-red-600">●</span>

        <span className="leading-7 text-slate-700">
          {feature}
        </span>
      </div>
    ))}
  </div>
</div>

              </div>

            </div>
            <div className="border-t border-slate-200 bg-white p-2">

            <div className="grid grid-cols-2 gap-2">
{/* Get Best Price */}
<a
  href={whatsappUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1EBE5D]"
>
  <MessageCircle size={20} />
  <span>Get Best Price</span>
</a>

  {/* Talk to an Expert */}
  <a
    href="tel:+918657003003"
    className="flex items-center justify-center gap-2 rounded-xl border-2 border-red-600 bg-white px-5 py-4 font-semibold text-red-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-600 hover:text-white"
  >
    <PhoneCall size={20} />
    <span>Talk to an Expert</span>
  </a>
</div>
</div>
          </motion.div>
            )}
</AnimatePresence>
        
          </motion.aside>
  )}
</AnimatePresence>
    </>
  );
}