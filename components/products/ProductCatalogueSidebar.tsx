"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import type { CatalogueSubcategory } from "@/lib/catalogue";
import { useHeaderScroll } from "@/context/HeaderScrollContext";

type SidebarProduct = {
  id: string;
  name: string;
  slug: string;
};

interface ProductCatalogueSidebarProps {
  categoryTitle: string;
  categorySlug: string;
  groups: CatalogueSubcategory[];
  activeGroupSlug: string;
  activeProductSlug: string;
}

const BREADCRUMB_HEIGHT_DESKTOP = 44;

export default function ProductCatalogueSidebar({
  categoryTitle,
  categorySlug,
  groups,
  activeGroupSlug,
  activeProductSlug,
}: ProductCatalogueSidebarProps) {
  const { headerVisible, headerHeight } = useHeaderScroll();
  const [expandedSlug, setExpandedSlug] = useState(activeGroupSlug);

  useEffect(() => {
    setExpandedSlug(activeGroupSlug);
  }, [activeGroupSlug]);

  const stickyTop = useMemo(() => {
    const breadcrumb = BREADCRUMB_HEIGHT_DESKTOP;
    return (headerVisible ? headerHeight : 0) + breadcrumb + 12;
  }, [headerVisible, headerHeight]);

  return (
    <nav
      aria-label={`${categoryTitle} catalogue`}
      className="sticky max-h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain pr-1"
      style={{ top: stickyTop }}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
        {categoryTitle} Equipment
      </p>

      <ul className="mt-5 space-y-1 border-t border-stone-200 pt-4">
        {groups.map((group) => {
          const isExpanded = expandedSlug === group.slug;
          const products = group.products as SidebarProduct[];

          return (
            <li key={group.slug}>
              <button
                type="button"
                onClick={() =>
                  setExpandedSlug((current) =>
                    current === group.slug ? "" : group.slug
                  )
                }
                aria-expanded={isExpanded}
                className="flex w-full items-center justify-between gap-2 py-2.5 text-left text-[14px] font-semibold text-stone-900 transition hover:text-[#8b191c]"
              >
                <span className="min-w-0 leading-snug">{group.title}</span>
                <ChevronDown
                  size={16}
                  strokeWidth={2}
                  className={`shrink-0 text-stone-400 transition-transform duration-200 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  aria-hidden
                />
              </button>

              {isExpanded ? (
                <ul className="mb-2 space-y-0.5 border-l border-stone-200 pb-2 pl-3">
                  {products.length === 0 ? (
                    <li className="py-1.5 text-[13px] text-stone-400">
                      Products coming soon
                    </li>
                  ) : (
                    products.map((product) => {
                      const isActive =
                        group.slug === activeGroupSlug &&
                        product.slug === activeProductSlug;
                      const href = `/products/${categorySlug}/${group.slug}/${product.slug}`;

                      return (
                        <li key={product.id}>
                          <Link
                            href={href}
                            aria-current={isActive ? "page" : undefined}
                            className={`relative block py-1.5 pl-3 text-[13px] leading-snug transition ${
                              isActive
                                ? "font-semibold text-stone-900 before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-[2px] before:bg-[#8b191c]"
                                : "text-stone-600 hover:text-[#8b191c]"
                            }`}
                          >
                            {product.name}
                          </Link>
                        </li>
                      );
                    })
                  )}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
