"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Plus,
  X,
} from "lucide-react";

type Stage = {
    number: string;
    name: string;
    title: string;
    description: string;
    cameraX: number;
  };

type Hotspot = {
  id: string;
  stage: number;
  name: string;
  category: string;
  description: string;
  x: number;
  y: number;
};

const stages: Stage[] = [
    {
      number: "01",
      name: "RECEIVING",
      title: "Where the kitchen begins.",
      description:
        "Ingredients enter the operation, get checked and move into the kitchen flow.",
      cameraX: 0,
    },
    {
      number: "02",
      name: "STORAGE",
      title: "Everything has its place.",
      description:
        "Dry, chilled and frozen ingredients are organised and kept ready for production.",
      cameraX: 14,
    },
    {
      number: "03",
      name: "PREPARATION",
      title: "Where ingredients become ready.",
      description:
        "Dedicated workstations turn raw ingredients into something ready for the cooking line.",
      cameraX: 28,
    },
    {
      number: "04",
      name: "WASHING",
      title: "Cleanliness keeps everything moving.",
      description:
        "Washing zones keep utensils, ingredients and service equipment ready for the next cycle.",
      cameraX: 42,
    },
    {
      number: "05",
      name: "COOKING",
      title: "Where the kitchen comes alive.",
      description:
        "The heart of the operation. Heat, timing and precision come together on the cooking line.",
      cameraX: 56,
    },
    {
      number: "06",
      name: "BAKERY",
      title: "Precision meets craft.",
      description:
        "Preparation, proofing, baking and cooling come together in a dedicated production zone.",
      cameraX: 68,
    },
    {
      number: "07",
      name: "HOLDING",
      title: "Ready when service calls.",
      description:
        "Cooked food stays at the right temperature until it is ready to leave the kitchen.",
      cameraX: 80,
    },
    {
      number: "08",
      name: "SERVICE",
      title: "From kitchen to customer.",
      description:
        "The final stage. Food leaves production and enters the dining experience.",
      cameraX: 94,
    },
  ];

const hotspots: Hotspot[] = [
  {
    id: "receiving-table",
    stage: 0,
    name: "Receiving Table",
    category: "Preparation Equipment",
    description:
      "A stainless-steel receiving station designed for checking and handling incoming supplies.",
    x: 9,
    y: 63,
  },
  {
    id: "platform-trolley",
    stage: 0,
    name: "Platform Trolley",
    category: "Trolleys",
    description:
      "Mobile handling equipment for moving supplies efficiently through the kitchen.",
    x: 19,
    y: 70,
  },

  {
    id: "storage-rack",
    stage: 1,
    name: "Storage Rack",
    category: "Storage Equipment",
    description:
      "Open stainless-steel storage designed to keep kitchen supplies organised and accessible.",
    x: 23,
    y: 52,
  },
  {
    id: "refrigerator",
    stage: 1,
    name: "Vertical Refrigerator",
    category: "Refrigeration Equipment",
    description:
      "Commercial cold storage for temperature-sensitive ingredients.",
    x: 32,
    y: 47,
  },
  {
    id: "ingredient-bin",
    stage: 1,
    name: "Ingredient Bin",
    category: "Storage Equipment",
    description:
      "Dedicated storage for dry ingredients and bulk kitchen supplies.",
    x: 28,
    y: 71,
  },

  {
    id: "work-table",
    stage: 2,
    name: "Work Table",
    category: "Preparation Equipment",
    description:
      "A durable stainless-steel workstation for everyday kitchen preparation.",
    x: 39,
    y: 67,
  },
  {
    id: "prep-table",
    stage: 2,
    name: "Preparation Table",
    category: "Preparation Equipment",
    description:
      "Designed around efficient ingredient preparation and workflow.",
    x: 48,
    y: 58,
  },

  {
    id: "double-sink",
    stage: 3,
    name: "Double Sink Unit",
    category: "Washing Equipment",
    description:
      "Commercial washing equipment designed for high-volume kitchen operations.",
    x: 53,
    y: 61,
  },
  {
    id: "dish-landing",
    stage: 3,
    name: "Dish Landing Table",
    category: "Washing Equipment",
    description:
      "A dedicated landing surface supporting efficient dishwashing workflow.",
    x: 61,
    y: 68,
  },

  {
    id: "cooking-range",
    stage: 4,
    name: "Four Burner Cooking Range",
    category: "Cooking Equipment",
    description:
      "A professional cooking range built for demanding commercial kitchen operations.",
    x: 66,
    y: 57,
  },
  {
    id: "tandoor",
    stage: 4,
    name: "Gas Tandoor",
    category: "Cooking Equipment",
    description:
      "Commercial tandoor equipment for high-temperature Indian cooking.",
    x: 74,
    y: 55,
  },
  {
    id: "exhaust-hood",
    stage: 4,
    name: "Kitchen Exhaust Hood",
    category: "Exhaust & Ventilation",
    description:
      "Designed to remove heat, smoke and cooking vapours from the production line.",
    x: 70,
    y: 32,
  },

  {
    id: "bakery-rack",
    stage: 5,
    name: "Bakery Rack",
    category: "Bakery Equipment",
    description:
      "Organised tray storage for professional bakery production.",
    x: 80,
    y: 59,
  },

  {
    id: "bain-marie",
    stage: 6,
    name: "Bain Marie",
    category: "Food Holding & Serving",
    description:
      "Temperature-controlled food holding equipment for efficient service.",
    x: 88,
    y: 61,
  },

  {
    id: "service-counter",
    stage: 7,
    name: "Service Counter",
    category: "Display Counters",
    description:
      "The final point between kitchen production and customer service.",
    x: 96,
    y: 60,
  },
];

export default function KitchenJourney() {
  const [stage, setStage] = useState(0);
  const [activeHotspot, setActiveHotspot] =
    useState<Hotspot | null>(null);

  const journeyRef = useRef<HTMLDivElement>(null);
  const wheelLock = useRef(false);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (!journeyRef.current) return;

      const rect = journeyRef.current.getBoundingClientRect();

      const inside =
        rect.top <= window.innerHeight &&
        rect.bottom >= 0;

      if (!inside) return;

      event.preventDefault();

      if (wheelLock.current) return;

      if (Math.abs(event.deltaY) < 15) return;

      wheelLock.current = true;

      if (event.deltaY > 0) {
        setStage((current) =>
          Math.min(current + 1, stages.length - 1)
        );
      } else {
        setStage((current) =>
          Math.max(current - 1, 0)
        );
      }

      setActiveHotspot(null);

      window.setTimeout(() => {
        wheelLock.current = false;
      }, 850);
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const currentStage = stages[stage];

  const isCooking = stage === 4;

  return (
    <main
      ref={journeyRef}
      className="relative h-[100dvh] w-full overflow-hidden bg-[#07090a] text-white"
    >
      {/* =====================================================
          PANORAMIC KITCHEN
      ====================================================== */}

      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 h-full"
          style={{
            width: "190%",
            transform: `translate3d(-${currentStage.cameraX}%, 0, 0)`,
            transition:
              "transform 1500ms cubic-bezier(.16, 1, .3, 1)",
            willChange: "transform",
          }}
        >
          {/* REAL PANORAMA */}
       {/* Far background */}
<div
  className="absolute inset-y-0 left-0 bg-cover bg-center bg-no-repeat"
  style={{
    width: "190%",
    backgroundImage:
      "url('/images/kitchen/kitchen-panorama.jpg')",
    transform: `translate3d(-${currentStage.cameraX * 0.72}%, 0, 0)`,
    transition:
      "transform 1800ms cubic-bezier(.16,1,.3,1)",
    willChange: "transform",
  }}
/>

{/* Midground cinematic layer */}
<div
  className="pointer-events-none absolute inset-y-0 left-0"
  style={{
    width: "190%",
    transform: `translate3d(-${currentStage.cameraX * 0.88}%, 0, 0)`,
    transition:
      "transform 1600ms cubic-bezier(.16,1,.3,1)",
  }}
>
  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
</div>

          {/* Cinematic overlay */}
          <div className="absolute inset-0 bg-black/35" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/10 to-black/40" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

          {/* Hotspots */}
          {hotspots.map((hotspot) => {
            if (hotspot.stage !== stage) return null;

            return (
              <button
                key={hotspot.id}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveHotspot(hotspot);
                }}
                className="absolute z-20"
                style={{
                    left: `${hotspot.x}%`,
                    top: `${hotspot.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                aria-label={`Explore ${hotspot.name}`}
              >
                <span className="group relative flex items-center">

{/* Outer pulse */}
<span className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/30 animate-ping" />

{/* Glow */}
<span className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/20 blur-md transition duration-300 group-hover:bg-red-500/50" />

{/* Marker */}
<span className="relative flex h-5 w-5 items-center justify-center rounded-full border border-white bg-red-600 shadow-[0_0_25px_rgba(239,68,68,.8)] transition duration-300 group-hover:scale-125">

  <span className="h-1.5 w-1.5 rounded-full bg-white" />

</span>

{/* Label */}
<span className="ml-3 translate-y-1 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[10px] font-medium text-white opacity-70 backdrop-blur-md transition duration-300 group-hover:opacity-100">
  {hotspot.name}
</span>

</span>
              </button>
            );
          })}
        </div>
      </div>
{/* Cooking atmosphere */}
<div
  className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${
    isCooking ? "opacity-100" : "opacity-0"
  }`}
>
  <div className="absolute inset-0 bg-orange-950/20 mix-blend-screen" />

  <div className="absolute bottom-[18%] left-[52%] h-40 w-96 rounded-full bg-orange-500/10 blur-[90px]" />

  <div className="absolute bottom-[24%] left-[66%] h-32 w-64 rounded-full bg-red-500/10 blur-[70px]" />
</div>
      {/* =====================================================
          TOP NAV
      ====================================================== */}

      <header className="absolute left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-10">
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80"
        >
          Anjali Equipments
        </Link>

        <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          Follow the Food
        </div>
      </header>

      {/* =====================================================
          LEFT JOURNEY NAV
      ====================================================== */}

      <aside className="absolute left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <div className="relative space-y-5">
          <div className="absolute bottom-2 left-[4px] top-2 w-px bg-white/10" />

          {stages.map((item, index) => (
            <button
              key={item.number}
              type="button"
              onClick={() => {
                setStage(index);
                setActiveHotspot(null);
              }}
              className="relative z-10 flex items-center gap-3"
            >
              <span
                className={`h-2 w-2 rounded-full border transition-all duration-500 ${
                  index === stage
                    ? "border-red-500 bg-red-500 shadow-[0_0_16px_rgba(239,68,68,.9)]"
                    : "border-white/25 bg-[#07090a]"
                }`}
              />

              <span
                className={`text-[9px] font-semibold uppercase tracking-[0.22em] transition ${
                  index === stage
                    ? "text-white"
                    : "text-white/25"
                }`}
              >
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </aside>

      {/* =====================================================
          STORY
      ====================================================== */}

      <section className="absolute inset-0 z-30 pointer-events-none">
        <div className="mx-auto flex h-full w-full max-w-7xl items-center px-6 md:px-16 lg:px-24">
          <div className="max-w-xl">
            <p
              key={`number-${stage}`}
              className="animate-[fadeIn_.7s_ease-out] text-xs font-semibold uppercase tracking-[0.35em] text-red-500"
            >
              {currentStage.number} / {currentStage.name}
            </p>

            <h1
              key={`title-${stage}`}
              className="mt-5 animate-[fadeIn_.7s_ease-out] text-5xl font-semibold leading-[0.92] tracking-tight text-white md:text-6xl lg:text-[76px]"
            >
              {currentStage.title}
            </h1>

            <p
              key={`description-${stage}`}
              className="mt-7 max-w-md animate-[fadeIn_.9s_ease-out] text-sm leading-7 text-white/65 md:text-base"
            >
              {currentStage.description}
            </p>

            <div className="mt-8 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70">
              <ArrowRight size={14} />
              Explore the equipment
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BOTTOM PROGRESS
      ====================================================== */}

      <div className="absolute bottom-7 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2">
        {stages.map((item, index) => (
          <button
            key={item.number}
            type="button"
            onClick={() => {
              setStage(index);
              setActiveHotspot(null);
            }}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === stage
                ? "w-12 bg-red-500"
                : "w-5 bg-white/20"
            }`}
            aria-label={`Go to ${item.name}`}
          />
        ))}
      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ====================================================== */}

      {stage === 0 && (
        <div className="absolute bottom-7 right-7 z-40 hidden items-center gap-3 text-[9px] uppercase tracking-[0.28em] text-white/40 md:flex">
          Scroll to explore
          <ArrowDown size={13} />
        </div>
      )}

      {/* =====================================================
          PRODUCT PANEL
      ====================================================== */}

      {activeHotspot && (
        <>
          <button
            type="button"
            aria-label="Close product panel"
            className="absolute inset-0 z-[60] cursor-default bg-black/20"
            onClick={() => setActiveHotspot(null)}
          />

          <div className="absolute bottom-6 right-6 z-[70] w-[min(380px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-white/10 bg-[#101415]/95 p-6 shadow-2xl backdrop-blur-2xl animate-[panelIn_.35s_ease-out]">
            <button
              type="button"
              onClick={() => setActiveHotspot(null)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <X size={15} />
            </button>

            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-red-500">
              {activeHotspot.category}
            </p>

            <h2 className="mt-3 pr-8 text-2xl font-semibold text-white">
              {activeHotspot.name}
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/55">
              {activeHotspot.description}
            </p>

            <div className="mt-6 flex gap-2">
              <Link
                href="/products"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-xs font-semibold text-white transition hover:bg-red-700"
              >
                View Product
                <ArrowRight size={14} />
              </Link>

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-xs font-semibold text-white transition hover:bg-white/5"
              >
                <Plus size={14} />
                Quote
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}