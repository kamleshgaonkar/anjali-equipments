"use client";

import { useState } from "react";
import { ArrowRight, Plus, X } from "lucide-react";

interface KitchenHotspotProps {
  name: string;
  description?: string;
  x: number;
  y: number;
  onAddToQuote?: () => void;
}

export default function KitchenHotspot({
  name,
  description,
  x,
  y,
  onAddToQuote,
}: KitchenHotspotProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="absolute z-20"
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="group relative flex items-center gap-2"
        aria-label={`Explore ${name}`}
      >
        <span className="relative flex h-5 w-5 items-center justify-center">
          <span className="absolute h-5 w-5 animate-ping rounded-full bg-red-500/30" />
          <span className="relative h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.9)]" />
        </span>

        <span className="hidden whitespace-nowrap rounded-full border border-white/10 bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition group-hover:border-red-500/50 sm:block">
          {name}
        </span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setOpen(false)}
          />

          <div className="absolute left-0 top-8 z-40 w-[280px] overflow-hidden rounded-2xl border border-white/10 bg-[#111517]/95 p-5 shadow-2xl backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <X size={15} />
            </button>

            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-red-500">
              Anjali Equipment
            </p>

            <h3 className="mt-2 pr-6 text-lg font-semibold text-white">
              {name}
            </h3>

            {description && (
              <p className="mt-2 text-sm leading-6 text-white/60">
                {description}
              </p>
            )}

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={onAddToQuote}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-red-700"
              >
                <Plus size={14} />
                Add to Quote
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-1 rounded-lg border border-white/10 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-white/5"
              >
                View
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}