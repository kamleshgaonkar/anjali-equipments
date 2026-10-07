"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Box,
  ChefHat,
  ChevronRight,
  CircleDot,
  Package,
  Refrigerator,
  Truck,
  Utensils,
} from "lucide-react";

const stages = [
  "RECEIVING",
  "STORAGE",
  "PREPARATION",
  "WASH / PROCESS",
  "COOK",
  "HOLD",
  "SERVICE",
];

const scenes = [
  {
    number: "01",
    label: "RECEIVING",
    title: "Every kitchen starts with what comes through the door.",
    description:
      "Ingredients arrive, are checked, unloaded and moved into the kitchen's operational flow.",
  },
  {
    number: "02",
    label: "STORAGE",
    title: "Everything has its place before it becomes a dish.",
    description:
      "From dry storage to refrigeration and freezing, the right storage system keeps ingredients organized and ready.",
  },
  {
    number: "03",
    label: "PREPARATION",
    title: "This is where ingredients become ready for the kitchen.",
    description:
      "Washing, cutting, portioning and preparation turn raw ingredients into components ready for cooking.",
  },
];

export default function FollowTheFood() {
  const sectionRef = useRef<HTMLElement>(null);

  const [rawProgress, setRawProgress] = useState(0);
  const [smoothProgress, setSmoothProgress] = useState(0);

  useEffect(() => {
    let target = 0;
    let animationFrame = 0;

    const handleScroll = () => {
      const section = sectionRef.current;

      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;

      if (scrollable <= 0) return;

      target = Math.min(
        Math.max(-rect.top / scrollable, 0),
        1
      );

      setRawProgress(target);
    };

    const animate = () => {
      setSmoothProgress((current) => {
        const difference = target - current;

        if (Math.abs(difference) < 0.0005) {
          return target;
        }

        return current + difference * 0.09;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    handleScroll();
    animationFrame = requestAnimationFrame(animate);

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  /*
   * The complete section contains:
   *
   * 0.00 - 0.08   Opening
   * 0.08 - 0.34   Receiving
   * 0.34 - 0.58   Storage
   * 0.58 - 0.90   Preparation
   * 0.90 - 1.00   Transition
   */

  const progress = smoothProgress;

  const horizontalProgress = Math.min(
    Math.max((progress - 0.04) / 0.86, 0),
    1
  );

  const sceneOffset = horizontalProgress * -200;

  const activeStage =
    progress < 0.34
      ? 0
      : progress < 0.58
        ? 1
        : progress < 0.9
          ? 2
          : 3;

  return (
    <section
      ref={sectionRef}
      className="relative h-[520vh] bg-[#090b0d] text-white"
    >
      <div className="sticky top-0 h-dvh overflow-hidden">

        {/* ================================================= */}
        {/* ATMOSPHERE */}
        {/* ================================================= */}

        <div className="pointer-events-none absolute inset-0">

          <div className="absolute left-[-15%] top-[-20%] h-[600px] w-[600px] rounded-full bg-red-800/[0.08] blur-[150px]" />

          <div className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-orange-500/[0.04] blur-[150px]" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
            }}
          />
        </div>

        {/* ================================================= */}
        {/* LEFT JOURNEY INDICATOR */}
        {/* ================================================= */}

        <div className="absolute left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
          <div className="relative">

            <div className="absolute left-[4px] top-2 h-[calc(100%-16px)] w-px bg-white/[0.08]" />

            <div className="space-y-6">

              {stages.map((stage, index) => (
                <JourneyStage
                  key={stage}
                  label={stage}
                  active={index === activeStage}
                  completed={index < activeStage}
                />
              ))}

            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* HORIZONTAL CAMERA */}
        {/* ================================================= */}

        <div
          className="absolute inset-0 flex w-[400%]"
          style={{
            transform: `translate3d(${sceneOffset}%, 0, 0)`,
          }}
        >

          {/* ================================================= */}
          {/* SCENE 0: THE KITCHEN */}
          {/* ================================================= */}

          <section className="relative flex h-dvh w-1/4 shrink-0 items-center">

            <div className="mx-auto w-full max-w-7xl px-6 md:px-12">

              <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">

                {/* Copy */}

                <div className="max-w-2xl">

                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-500">
                    Anjali Equipments
                  </p>

                  <h1 className="mt-5 text-5xl font-semibold leading-[0.92] tracking-tight sm:text-6xl lg:text-8xl">
                    Follow
                    <br />
                    the Food.
                  </h1>

                  <p className="mt-7 max-w-xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                    From the receiving dock to the dining table,
                    discover the equipment behind a professional
                    commercial kitchen.
                  </p>

                  <div className="mt-10 flex items-center gap-3 text-sm font-medium text-white/45">
                    <ArrowDown size={17} />
                    <span>Scroll to enter the kitchen</span>
                  </div>

                </div>

                {/* Kitchen map */}

                <KitchenFlow progress={progress} />

              </div>

            </div>
          </section>

          {/* ================================================= */}
          {/* SCENE 1: RECEIVING */}
          {/* ================================================= */}

          <section className="relative flex h-dvh w-1/4 shrink-0 items-center">

            <div className="mx-auto w-full max-w-7xl px-6 md:px-12">

              <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">

                {/* Copy */}

                <div className="max-w-xl">

                  <SceneEyebrow
                    number={scenes[0].number}
                    label={scenes[0].label}
                  />

                  <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                    {scenes[0].title}
                  </h2>

                  <p className="mt-6 text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                    {scenes[0].description}
                  </p>

                  <div className="mt-9 flex items-center gap-3 text-sm font-semibold text-white/80">
                    <span>Receiving equipment</span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15">
                      <ArrowRight size={16} />
                    </span>
                  </div>

                </div>

                {/* Receiving environment */}

                <ReceivingScene progress={progress} />

              </div>

            </div>
          </section>

          {/* ================================================= */}
          {/* SCENE 2: STORAGE */}
          {/* ================================================= */}

          <section className="relative flex h-dvh w-1/4 shrink-0 items-center">

            <div className="mx-auto w-full max-w-7xl px-6 md:px-12">

              <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">

                {/* Storage environment */}

                <StorageScene />

                {/* Copy */}

                <div className="max-w-xl">

                  <SceneEyebrow
                    number={scenes[1].number}
                    label={scenes[1].label}
                  />

                  <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                    {scenes[1].title}
                  </h2>

                  <p className="mt-6 text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                    {scenes[1].description}
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">

                    {[
                      "Storage Rack",
                      "Ingredient Bin",
                      "SS Cupboard",
                      "Refrigerator",
                      "Freezer",
                      "Cold Room",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-white/[0.09] bg-white/[0.025] px-3 py-3 text-xs font-medium text-white/60"
                      >
                        {item}
                      </div>
                    ))}

                  </div>

                  <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-white/80">
                    <span>Storage equipment</span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15">
                      <ArrowRight size={16} />
                    </span>
                  </div>

                </div>

              </div>

            </div>
          </section>

          {/* ================================================= */}
          {/* SCENE 3: PREPARATION */}
          {/* ================================================= */}

          <section className="relative flex h-dvh w-1/4 shrink-0 items-center">

            <div className="mx-auto w-full max-w-7xl px-6 md:px-12">

              <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">

                {/* Copy */}

                <div className="max-w-xl">

                  <SceneEyebrow
                    number={scenes[2].number}
                    label={scenes[2].label}
                  />

                  <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                    {scenes[2].title}
                  </h2>

                  <p className="mt-6 text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                    {scenes[2].description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">

                    {[
                      "Work Tables",
                      "Preparation Tables",
                      "Vegetable Cutting",
                      "Butcher Tables",
                      "Dough Preparation",
                      "Processing",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 text-xs text-white/60"
                      >
                        {item}
                      </div>
                    ))}

                  </div>

                  <div className="mt-9 flex items-center gap-3 text-sm font-semibold text-white/80">
                    <span>Preparation equipment</span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15">
                      <ArrowRight size={16} />
                    </span>
                  </div>

                </div>

                {/* Preparation environment */}

                <PreparationScene progress={progress} />

              </div>

            </div>
          </section>

        </div>

        {/* ================================================= */}
        {/* MOBILE JOURNEY */}
        {/* ================================================= */}

        <div className="absolute bottom-6 left-6 right-6 z-50 lg:hidden">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                {activeStage === 0
                  ? "The Kitchen"
                  : stages[Math.min(activeStage - 1, stages.length - 1)]}
              </p>

              <p className="mt-1 text-xs font-semibold text-white/80">
                {String(
                  Math.min(activeStage + 1, 3)
                ).padStart(2, "0")}{" "}
                / 07
              </p>
            </div>

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
              {Math.round(rawProgress * 100)}%
            </span>

          </div>

          <div className="mt-3 h-px bg-white/10">

            <div
              className="h-full bg-red-600 transition-[width] duration-150"
              style={{
                width: `${rawProgress * 100}%`,
              }}
            />

          </div>

        </div>

        {/* ================================================= */}
        {/* DESKTOP SCROLL HINT */}
        {/* ================================================= */}

        <div
          className={`absolute bottom-8 right-10 z-50 hidden items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/35 transition-opacity duration-500 lg:flex ${
            progress > 0.1 ? "opacity-0" : "opacity-100"
          }`}
        >
          Scroll to explore
          <ChevronRight size={15} />
        </div>

      </div>
    </section>
  );
}

/* ========================================================= */
/* SCENE EYEBROW */
/* ========================================================= */

function SceneEyebrow({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
      {number} / {label}
    </p>
  );
}

/* ========================================================= */
/* JOURNEY STAGE */
/* ========================================================= */

function JourneyStage({
  label,
  active,
  completed,
}: {
  label: string;
  active: boolean;
  completed: boolean;
}) {
  return (
    <div className="relative z-10 flex items-center gap-3">

      <span
        className={`flex h-[9px] w-[9px] rounded-full border transition-all duration-500 ${
          active
            ? "border-red-500 bg-red-500 shadow-[0_0_18px_rgba(239,68,68,0.55)]"
            : completed
              ? "border-red-500/60 bg-red-500/40"
              : "border-white/15 bg-[#090b0d]"
        }`}
      />

      <span
        className={`text-[9px] font-semibold tracking-[0.18em] transition-colors duration-500 ${
          active
            ? "text-white"
            : completed
              ? "text-white/45"
              : "text-white/20"
        }`}
      >
        {label}
      </span>

    </div>
  );
}

/* ========================================================= */
/* KITCHEN FLOW */
/* ========================================================= */

function KitchenFlow({
  progress,
}: {
  progress: number;
}) {
  const foodProgress = Math.min(
    Math.max((progress - 0.04) / 0.38, 0),
    1
  );

  const foodX = 12 + foodProgress * 76;

  const receivingOpacity = Math.min(
    Math.max(progress * 10, 0),
    1
  );

  const storageOpacity = Math.min(
    Math.max((progress - 0.08) * 10, 0),
    1
  );

  const preparationOpacity = Math.min(
    Math.max((progress - 0.17) * 10, 0),
    1
  );

  return (
    <div className="relative h-[420px] sm:h-[520px]">

      <div className="absolute inset-4 rounded-[2rem] border border-white/10 bg-[#101416] shadow-2xl">

        {/* subtle room glow */}

        <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.035),transparent_65%)]" />

        {/* kitchen zones */}

        <FlowZone
          icon={<Truck size={19} />}
          label="RECEIVING"
          className="left-7 top-8"
          opacity={receivingOpacity}
        />

        <FlowZone
          icon={<Box size={19} />}
          label="STORAGE"
          className="right-7 top-8"
          opacity={storageOpacity}
        />

        <FlowZone
          icon={<Package size={19} />}
          label="PREPARATION"
          className="bottom-8 left-1/2 -translate-x-1/2"
          opacity={preparationOpacity}
        />

        {/* operational lines */}

        <div className="absolute left-10 right-10 top-1/2 h-px bg-white/[0.08]" />

        <div className="absolute left-1/2 top-[30%] h-[20%] w-px bg-white/[0.08]" />

        {/* food */}

        <div
          className="absolute top-1/2 z-20 -translate-y-1/2 transition-transform duration-100"
          style={{
            left: `${foodX}%`,
          }}
        >
          <div className="relative">

            <div className="absolute -inset-3 rounded-full bg-red-500/20 blur-md" />

            <div className="relative flex h-5 w-5 items-center justify-center rounded-full border border-red-300 bg-red-500 shadow-[0_0_22px_rgba(239,68,68,0.7)]">
              <CircleDot size={8} />
            </div>

          </div>
        </div>

        {/* labels */}

        <div className="absolute bottom-5 left-6 text-[9px] uppercase tracking-[0.25em] text-white/20">
          Kitchen Flow
        </div>

      </div>

      <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/25">
        One system. Many stations.
      </p>

    </div>
  );
}

function FlowZone({
  icon,
  label,
  className,
  opacity,
}: {
  icon: React.ReactNode;
  label: string;
  className: string;
  opacity: number;
}) {
  return (
    <div
      className={`absolute transition-all duration-500 ${className}`}
      style={{
        opacity,
        transform:
          opacity > 0
            ? undefined
            : "translateY(8px)",
      }}
    >
      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 backdrop-blur-md">

        <span className="text-white/45">
          {icon}
        </span>

        <span className="text-[9px] font-semibold tracking-[0.2em] text-white/50">
          {label}
        </span>

      </div>
    </div>
  );
}

/* ========================================================= */
/* RECEIVING SCENE */
/* ========================================================= */

function ReceivingScene({
  progress,
}: {
  progress: number;
}) {
  const localProgress = Math.min(
    Math.max((progress - 0.08) / 0.26, 0),
    1
  );

  const truckX = localProgress * 48;

  return (
    <div className="relative h-[500px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#121618]">

      {/* bay lighting */}

      <div className="absolute left-1/2 top-0 h-40 w-[60%] -translate-x-1/2 bg-white/[0.025] blur-3xl" />

      {/* Loading bay label */}

      <div className="absolute left-8 top-8 flex items-center gap-2">

        <Truck
          size={15}
          className="text-white/35"
        />

        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
          Loading Bay
        </span>

      </div>

      {/* Floor */}

      <div className="absolute bottom-0 left-0 right-0 h-28 border-t border-white/[0.08] bg-[#0e1113]" />

      {/* floor line */}

      <div className="absolute bottom-28 left-8 right-8 h-px bg-white/[0.08]" />

      {/* Receiving table */}

      <div className="absolute bottom-28 right-10 sm:right-16">

        <div className="relative h-28 w-56">

          {/* tabletop */}

          <div className="absolute left-0 right-0 top-4 h-5 rounded-md border border-white/15 bg-slate-500/60" />

          {/* legs */}

          <div className="absolute bottom-0 left-4 h-20 w-2 bg-slate-600" />
          <div className="absolute bottom-0 right-4 h-20 w-2 bg-slate-600" />

          {/* lower shelf */}

          <div className="absolute bottom-5 left-4 right-4 h-2 bg-slate-700" />

          {/* equipment label */}

          <div className="absolute -right-2 -top-12 rounded-lg border border-white/10 bg-[#171b1d] px-3 py-2 shadow-xl">

            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/60">
              Receiving Table
            </p>

            <p className="mt-1 text-[8px] text-white/30">
              SS Commercial
            </p>

          </div>

        </div>

      </div>

      {/* Trolley */}

      <div className="absolute bottom-32 right-[42%] hidden sm:block">

        <div className="relative h-24 w-16 rounded-lg border border-white/10 bg-slate-800">

          <div className="absolute left-2 right-2 top-3 h-2 rounded-full bg-slate-500" />

          <div className="absolute bottom-[-6px] left-2 h-4 w-4 rounded-full bg-slate-950" />

          <div className="absolute bottom-[-6px] right-2 h-4 w-4 rounded-full bg-slate-950" />

        </div>

      </div>

      {/* Truck */}

      <div
        className="absolute bottom-28 left-8 transition-transform duration-100"
        style={{
          transform: `translateX(${truckX}%)`,
        }}
      >
        <div className="relative h-28 w-52 rounded-xl border border-white/20 bg-white shadow-2xl">

          <div className="absolute right-0 top-4 h-20 w-12 rounded-r-xl bg-slate-100" />

          <div className="absolute left-5 top-5 text-xs font-bold tracking-widest text-slate-800">
            ANJALI
          </div>

          <div className="absolute bottom-[-12px] left-7 h-7 w-7 rounded-full bg-slate-950 ring-4 ring-[#121618]" />

          <div className="absolute bottom-[-12px] right-7 h-7 w-7 rounded-full bg-slate-950 ring-4 ring-[#121618]" />

        </div>
      </div>

      {/* Ingredient crates */}

      <div className="absolute bottom-32 left-[46%] hidden gap-2 sm:flex">

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-10 w-10 rounded-md border border-white/10 bg-slate-700/70"
          />
        ))}

      </div>

    </div>
  );
}

/* ========================================================= */
/* STORAGE SCENE */
/* ========================================================= */

function StorageScene() {
  return (
    <div className="relative order-2 h-[500px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#111517] lg:order-1">

      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.04] via-transparent to-red-500/[0.03]" />

      <div className="absolute left-8 top-8">

        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/35">
          Dry / Cold / Frozen
        </p>

      </div>

      {/* Storage rack */}

      <div className="absolute bottom-10 left-8 h-[310px] w-48 sm:left-14 sm:w-56">

        <div className="absolute inset-y-0 left-0 w-2 rounded-full bg-slate-600" />

        <div className="absolute inset-y-0 right-0 w-2 rounded-full bg-slate-600" />

        {[0, 1, 2, 3].map((row) => (
          <div
            key={row}
            className="absolute left-0 right-0 h-2 rounded-full bg-slate-500"
            style={{
              top: `${row * 31}%`,
            }}
          >

            <div className="absolute left-4 top-[-28px] h-8 w-12 rounded bg-slate-700/80" />

            <div className="absolute left-20 top-[-25px] h-6 w-16 rounded bg-slate-800" />

            <div className="absolute right-2 top-[-30px] h-9 w-9 rounded bg-slate-600/70" />

          </div>
        ))}

      </div>

      {/* Refrigerator */}

      <div className="absolute bottom-10 right-8 h-[300px] w-32 rounded-xl border border-white/15 bg-gradient-to-b from-slate-700 to-slate-900 shadow-2xl sm:right-16 sm:w-40">

        <div className="absolute inset-x-3 top-3 bottom-3 rounded-lg border border-white/10 bg-slate-900/40" />

        <div className="absolute left-5 top-1/2 h-16 w-1 rounded-full bg-white/20" />

        <div className="absolute bottom-6 left-5 text-[9px] font-semibold uppercase tracking-widest text-white/40">
          Cold
        </div>

        <Refrigerator
          className="absolute right-5 top-5 text-white/30"
          size={19}
        />

      </div>

      {/* Ingredient bins */}

      <div className="absolute bottom-12 left-8 flex gap-2 sm:left-14">

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-14 w-14 rounded-lg border border-white/10 bg-slate-700/70"
          />
        ))}

      </div>

      {/* Small storage labels */}

      <div className="absolute bottom-7 right-7 text-right">

        <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
          Organized
        </p>

        <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/20">
          Ready
        </p>

      </div>

    </div>
  );
}

/* ========================================================= */
/* PREPARATION SCENE */
/* ========================================================= */

function PreparationScene({
  progress,
}: {
  progress: number;
}) {
  const localProgress = Math.min(
    Math.max((progress - 0.58) / 0.32, 0),
    1
  );

  const ingredientX = localProgress * 55;

  return (
    <div className="relative h-[500px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#121618]">

      {/* soft light */}

      <div className="absolute left-1/2 top-0 h-48 w-[70%] -translate-x-1/2 bg-orange-400/[0.025] blur-3xl" />

      {/* label */}

      <div className="absolute left-8 top-8 flex items-center gap-2">

        <Utensils
          size={15}
          className="text-white/35"
        />

        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
          Preparation Station
        </span>

      </div>

      {/* Back wall */}

      <div className="absolute inset-x-8 top-24 h-px bg-white/[0.08]" />

      {/* Preparation table */}

      <div className="absolute bottom-32 left-1/2 w-[75%] -translate-x-1/2">

        <div className="relative h-32">

          {/* tabletop */}

          <div className="absolute left-0 right-0 top-0 h-7 rounded-md border border-white/15 bg-slate-500/70" />

          {/* front */}

          <div className="absolute left-2 right-2 top-7 h-24 rounded-b-md border-x border-b border-white/10 bg-slate-700/40" />

          {/* legs */}

          <div className="absolute bottom-[-28px] left-5 h-28 w-2 bg-slate-600" />

          <div className="absolute bottom-[-28px] right-5 h-28 w-2 bg-slate-600" />

          {/* shelf */}

          <div className="absolute bottom-[-10px] left-6 right-6 h-2 bg-slate-600/70" />

        </div>

      </div>

      {/* Cutting board */}

      <div className="absolute bottom-[226px] left-[22%] h-4 w-24 rounded bg-amber-700/60" />

      {/* Vegetable */}

      <div
        className="absolute bottom-[230px] transition-transform duration-100"
        style={{
          left: `${22 + ingredientX * 0.6}%`,
        }}
      >
        <div className="h-8 w-8 rounded-full bg-green-500/70 shadow-[0_0_18px_rgba(34,197,94,0.2)]" />
      </div>

      {/* Knife / preparation tool */}

      <div className="absolute bottom-[237px] right-[24%] h-2 w-24 rotate-[-18deg] rounded-full bg-slate-400/60" />

      {/* Hand wash */}

      <div className="absolute bottom-32 right-7 hidden sm:block">

        <div className="relative h-32 w-24 rounded-lg border border-white/10 bg-slate-700/50">

          <div className="absolute left-5 right-5 top-5 h-14 rounded-full border border-white/10 bg-slate-900/50" />

          <div className="absolute right-3 top-2 h-10 w-2 rounded-full bg-slate-500" />

        </div>

        <p className="mt-3 text-center text-[8px] uppercase tracking-[0.15em] text-white/25">
          Wash
        </p>

      </div>

      {/* Product labels */}

      <div className="absolute bottom-8 left-8 flex flex-wrap gap-2">

        {[
          "Work Table",
          "Preparation Table",
          "Vegetable Cutting",
        ].map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[9px] text-white/40"
          >
            {item}
          </span>
        ))}

      </div>

      {/* Chef icon */}

      <div className="absolute right-8 top-8 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/35">
        <ChefHat size={19} />
      </div>

    </div>
  );
}