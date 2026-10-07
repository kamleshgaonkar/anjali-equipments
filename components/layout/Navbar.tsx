"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useQuote } from "@/hooks/useQuote";
import { useHeaderScroll } from "@/context/HeaderScrollContext";
import type { NavCatalogueCategory } from "@/lib/catalogue/types";
import ProductsMegaMenu from "@/components/layout/ProductsMegaMenu";
import {
  Menu,
  X,
  House,
  Building2,
  CookingPot,
  Handshake,
  Phone,
  MessageCircle,
  ClipboardList,
  BriefcaseBusiness,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const MEGA_CLOSE_DELAY_MS = 200;

export default function Navbar({
  catalogue = [],
}: {
  catalogue?: NavCatalogueCategory[];
}) {
  const pathname = usePathname();
  const { totalItems } = useQuote();
  const { headerVisible, setHeaderHeight, setMobileMenuOpen } =
    useHeaderScroll();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);

  const isHomePage = pathname === "/";
  const isWhite = !isHomePage || scrolled;
  const links = [
    { name: "Home", href: "/", icon: House },
    { name: "About Us", href: "/about", icon: Building2 },
    { name: "Products", href: "/products", icon: CookingPot },
    { name: "Projects", href: "/projects", icon: BriefcaseBusiness },
    { name: "Clients", href: "/clients", icon: Handshake },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  const isNavActive = (href: string) => {
    if (href === "/products") {
      return pathname === "/products" || pathname.startsWith("/products/");
    }

    if (href === "/projects") {
      return pathname === "/projects" || pathname.startsWith("/projects/");
    }

    return pathname === href;
  };

  const productsOnRoute = isNavActive("/products");
  const productsActive = productsOnRoute || megaOpen;

  const socialLinks = [
    { icon: FaInstagram, href: "#" },
    { icon: FaFacebookF, href: "#" },
    { icon: FaLinkedinIn, href: "#" },
    { icon: FaYoutube, href: "#" },
  ];

  function clearCloseTimer() {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function openMega() {
    clearCloseTimer();
    setMegaOpen(true);
  }

  function scheduleCloseMega() {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setMegaOpen(false);
    }, MEGA_CLOSE_DELAY_MS);
  }

  function closeMega() {
    clearCloseTimer();
    setMegaOpen(false);
  }

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setMobileMenuOpen(open);
  }, [open, setMobileMenuOpen]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const publishHeight = () => {
      setHeaderHeight(el.getBoundingClientRect().height);
    };

    publishHeight();
    const observer = new ResizeObserver(publishHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, [setHeaderHeight, isWhite]);

  useEffect(() => {
    closeMega();
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!headerVisible) closeMega();
  }, [headerVisible]);

  useEffect(() => {
    if (!megaOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMega();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [megaOpen]);

  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  const productsLinkClass = `relative py-2 text-[17px] font-medium tracking-wide transition-colors duration-300 ${
    productsActive
      ? "text-red-600"
      : isWhite || megaOpen
        ? "text-slate-900 hover:text-red-600"
        : "text-white hover:text-red-600"
  }`;

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[90] bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out motion-reduce:transition-none ${
          headerVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isWhite || megaOpen
            ? "border-b border-slate-200 bg-white shadow-lg"
            : "border-b border-white/10 bg-transparent backdrop-blur-sm"
        }`}
      >
        <div
          ref={headerRef}
          className="container-custom flex h-24 items-center justify-between"
        >
          <Link
            href="/"
            onClick={closeMega}
            className="relative flex h-14 w-[220px] items-center"
          >
            <Image
              src="/logo/anjali-equipments-white-logo.svg"
              alt="Anjali Equipments"
              width={220}
              height={48}
              priority
              className={`absolute left-0 top-1/2 h-auto w-full -translate-y-1/2 transition-opacity duration-300 ${
                isWhite || megaOpen
                  ? "pointer-events-none opacity-0"
                  : "opacity-100"
              }`}
            />
            <Image
              src="/logo/anjali-equipments-logo.svg"
              alt="Anjali Equipments"
              width={220}
              height={48}
              priority
              className={`absolute left-0 top-1/2 h-auto w-full -translate-y-1/2 transition-opacity duration-300 ${
                isWhite || megaOpen
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            />
          </Link>

          <nav className="hidden items-center gap-12 lg:flex xl:gap-14">
            {links.map((link) => {
              if (link.href === "/products") {
                return (
                  <div
                    key={link.name}
                    className="flex h-24 items-center"
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleCloseMega}
                  >
                    <Link
                      href="/products"
                      aria-expanded={megaOpen}
                      aria-haspopup="true"
                      aria-controls="products-mega-menu"
                      className={productsLinkClass}
                    >
                      Products
                      <span
                        className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-red-600 transition-all duration-300 ${
                          productsOnRoute ? "w-full" : "w-0"
                        }`}
                      />
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMega}
                  className={`relative py-2 text-[17px] font-medium tracking-wide transition-colors duration-300 ${
                    isNavActive(link.href)
                      ? "text-red-600"
                      : isWhite || megaOpen
                        ? "text-slate-900 hover:text-red-600"
                        : "text-white hover:text-red-600"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-red-600 transition-all duration-300 ${
                      isNavActive(link.href) ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <Link
            href="/quote"
            onClick={closeMega}
            aria-label={
              totalItems > 0
                ? `View quote request, ${totalItems} ${
                    totalItems === 1 ? "item" : "items"
                  }`
                : "View quote request"
            }
            title="Quote Request"
            className={`relative hidden h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 lg:flex ${
              isWhite || megaOpen
                ? "text-slate-900 hover:bg-slate-100"
                : "text-white hover:bg-white/10"
            }`}
          >
            <ClipboardList size={25} strokeWidth={1.8} />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">
                {totalItems}
              </span>
            )}
          </Link>

          <div className="flex items-center gap-1 lg:hidden">
            <Link
              href="/quote"
              aria-label={
                totalItems > 0
                  ? `View quote request, ${totalItems} ${
                      totalItems === 1 ? "item" : "items"
                    }`
                  : "View quote request"
              }
              title="Quote Request"
              className={`relative inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 ${
                isWhite
                  ? "text-slate-900 hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <ClipboardList size={25} strokeWidth={1.8} />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 transition-colors duration-300 ${
                isWhite ? "text-slate-900" : "text-white"
              }`}
            >
              <Menu size={28} />
            </button>
          </div>

          <div
            className={`fixed inset-0 z-[100] h-dvh overflow-y-auto bg-white transition-transform duration-300 ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
            aria-hidden={!open}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="relative flex h-12 w-[200px] items-center"
              >
                <Image
                  src="/logo/anjali-equipments-logo.svg"
                  alt="Anjali Equipments"
                  width={200}
                  height={44}
                  className="h-auto w-full"
                />
              </Link>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-full border border-slate-200 p-2 transition hover:bg-slate-100"
              >
                <X size={24} />
              </button>
            </div>

            <div className="h-[calc(100dvh-81px)] overflow-y-auto overscroll-contain px-5 py-6">
              <nav className="space-y-2">
                {links.map((link) => {
                  const Icon = link.icon;

                  if (link.href === "/products") {
                    return (
                      <div key={link.name}>
                        <div
                          className={`flex items-center gap-4 rounded-xl border-l-4 px-4 py-4 ${
                            isNavActive(link.href)
                              ? "border-red-600 bg-red-50 text-red-600"
                              : "border-transparent text-slate-800"
                          }`}
                        >
                          <Icon size={21} />
                          <span className="text-lg font-medium">Products</span>
                        </div>

                        <div className="mb-2 ml-8 space-y-1 border-l border-slate-200 pl-4">
                          {catalogue.map((category) => (
                            <Link
                              key={category.id}
                              href={`/products/${category.slug}`}
                              onClick={() => setOpen(false)}
                              className={`block rounded-lg px-3 py-2.5 text-base font-medium transition ${
                                pathname === `/products/${category.slug}` ||
                                pathname.startsWith(
                                  `/products/${category.slug}/`
                                )
                                  ? "text-red-600"
                                  : "text-slate-700 hover:text-red-600"
                              }`}
                            >
                              {category.name}
                            </Link>
                          ))}
                          <Link
                            href="/products"
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-3 py-2.5 text-base font-semibold text-[#8b191c]"
                          >
                            View All Equipment
                          </Link>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-4 rounded-xl border-l-4 px-4 py-4 transition-all ${
                        isNavActive(link.href)
                          ? "border-red-600 bg-red-50 text-red-600"
                          : "border-transparent text-slate-800 hover:bg-slate-100"
                      }`}
                    >
                      <Icon size={21} />
                      <span className="text-lg font-medium">{link.name}</span>
                    </Link>
                  );
                })}
              </nav>

              <Link
                href="/quote"
                onClick={() => setOpen(false)}
                className="mt-6 flex items-center justify-between rounded-2xl bg-red-700 p-4 text-white"
              >
                <div className="flex items-center gap-3">
                  <ClipboardList size={22} />
                  <div>
                    <p className="font-semibold">Quote Request</p>
                    <p className="text-sm text-red-100">
                      {totalItems > 0
                        ? `${totalItems} ${
                            totalItems === 1 ? "product" : "products"
                          } selected`
                        : "No products selected"}
                    </p>
                  </div>
                </div>
                {totalItems > 0 && (
                  <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-white px-2 text-sm font-bold text-red-700">
                    {totalItems}
                  </span>
                )}
              </Link>

              <div className="mt-8 space-y-4">
                <a
                  href="tel:+918657003003"
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-red-600 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <Phone size={22} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Call Us
                    </p>
                    <p className="font-semibold text-slate-900">
                      +91 86570 03003
                    </p>
                  </div>
                </a>

                <a
                  href="https://wa.me/918657003003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-green-500 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <MessageCircle size={22} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      WhatsApp
                    </p>
                    <p className="font-semibold text-slate-900">
                      Chat with our team
                    </p>
                  </div>
                </a>
              </div>

              <div className="mt-8 border-t border-slate-200 pt-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-red-600 hover:text-red-600 hover:shadow-lg"
                      >
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>
              <div className="h-8" />
            </div>
          </div>
        </div>

        <div
          id="products-mega-menu"
          onMouseEnter={openMega}
          onMouseLeave={scheduleCloseMega}
          className={`absolute inset-x-0 top-full hidden overflow-hidden border-t border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)] transition-[opacity,transform,visibility] duration-200 lg:block ${
            megaOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible pointer-events-none -translate-y-1 opacity-0"
          }`}
        >
          <ProductsMegaMenu
            catalogue={catalogue}
            onNavigate={closeMega}
          />
        </div>
      </header>
    </>
  );
}
