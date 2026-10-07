"use client";

import Breadcrumb from "@/components/layout/Breadcrumb";
import { useHeaderScroll } from "@/context/HeaderScrollContext";

/** Reserves space for the fixed public header so content starts below it. */
export function HeaderOffsetSpacer() {
  const { headerHeight } = useHeaderScroll();

  return (
    <div
      aria-hidden
      className="shrink-0 bg-white"
      style={{ height: headerHeight }}
    />
  );
}

/**
 * Compact sticky breadcrumb strip.
 * Sits under the header when visible, and at top:0 when the header is hidden.
 */
export function StickyBreadcrumbBar() {
  const { headerVisible, headerHeight } = useHeaderScroll();

  return (
    <div
      className="sticky z-[90] border-b border-slate-200 bg-white transition-[top] duration-300 ease-out motion-reduce:transition-none"
      style={{ top: headerVisible ? headerHeight : 0 }}
    >
      <div className="container-custom flex h-9 items-center md:h-11">
        <Breadcrumb tone="onLight" />
      </div>
    </div>
  );
}
