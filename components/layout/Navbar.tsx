"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHomePage = pathname === "/";
  const isWhite = !isHomePage || scrolled;

  const links = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Clients", href: "/clients" },
    /*
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    */
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ease-out ${
          isWhite
            ? "border-b border-slate-200 bg-white shadow-lg"
            : "border-b border-white/10 bg-transparent backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="relative flex h-14 w-[220px] items-center"
          >
            {/* White Logo */}
            <Image
              src="/logo/anjali-equipments-white-logo.svg"
              alt="Anjali Equipments"
              width={220}
              height={48}
              priority
              className={`absolute left-0 top-1/2 h-auto w-full -translate-y-1/2 transition-opacity duration-300 ${
                isWhite
                  ? "pointer-events-none opacity-0"
                  : "opacity-100"
              }`}
            />

            {/* Dark Logo */}
            <Image
              src="/logo/anjali-equipments-logo.svg"
              alt="Anjali Equipments"
              width={220}
              height={48}
              priority
              className={`absolute left-0 top-1/2 h-auto w-full -translate-y-1/2 transition-opacity duration-300 ${
                isWhite
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden items-center gap-12 lg:flex xl:gap-14">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[17px] font-medium tracking-wide transition-colors duration-300 hover:text-red-600 ${
                  isWhite ? "text-slate-900" : "text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden rounded-xl bg-red-700 px-7 py-3.5 text-[15px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-800 lg:block"
          >
            Get Quote
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 transition-colors duration-300 lg:hidden ${
              isWhite ? "text-slate-900" : "text-white"
            }`}
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[100] bg-white transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-20 items-center justify-between border-b px-5">
          <Image
            src="/logo/anjali-equipments-logo.svg"
            alt="Anjali Equipments"
            width={180}
            height={40}
            className="h-auto w-[160px]"
          />

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 text-slate-900"
          >
            <X size={28} />
          </button>
        </div>

        <nav className="flex flex-col overflow-y-auto px-6 py-6">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-slate-100 py-4 text-lg font-medium text-slate-900 sm:py-5 sm:text-xl"
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-8 rounded-xl bg-red-700 py-4 text-center text-lg font-semibold text-white"
          >
            Get Quote
          </Link>
        </nav>
      </div>
    </>
  );
}