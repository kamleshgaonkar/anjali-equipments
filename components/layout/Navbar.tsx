"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import {
  Menu,
  X,
  House,
  Building2,
  CookingPot,
  Handshake,
  Phone,
  MessageCircle,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHomePage = pathname === "/";
  const isWhite = !isHomePage || scrolled;

  const links = [
    {
      name: "Home",
      href: "/",
      icon: House,
    },
    {
      name: "About Us",
      href: "/about",
      icon: Building2,
    },
    {
      name: "Products",
      href: "/products",
      icon: CookingPot,
    },
    {
      name: "Clients",
      href: "/clients",
      icon: Handshake,
    },
    {
      name: "Contact",
      href: "/contact",
      icon: Phone,
    },
  ];

  const socialLinks = [
    {
      icon: FaInstagram,
      href: "#",
    },
    {
      icon: FaFacebookF,
      href: "#",
    },
    {
      icon: FaLinkedinIn,
      href: "#",
    },
    {
      icon: FaYoutube,
      href: "#",
    },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>

<div
  onClick={() => setOpen(false)}
  className={`fixed inset-0 z-[90] bg-black/40 transition-opacity duration-300 ${
    open
      ? "opacity-100"
      : "pointer-events-none opacity-0"
  }`}
/>
<header
  className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
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

    {/* Desktop Navigation */}

    <nav className="hidden items-center gap-12 lg:flex xl:gap-14">

      {links.map((link) => (

        <Link
          key={link.name}
          href={link.href}
          className={`relative py-2 text-[17px] font-medium tracking-wide transition-colors duration-300 ${
            pathname === link.href
              ? "text-red-600"
              : isWhite
                ? "text-slate-900 hover:text-red-600"
                : "text-white hover:text-red-600"
          }`}
        >
          {link.name}

          <span
            className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-red-600 transition-all duration-300 ${
              pathname === link.href
                ? "w-full"
                : "w-0"
            }`}
          />

        </Link>

      ))}

    </nav>

    {/* Desktop CTA */}

    <Link
      href="/contact"
      className="hidden rounded-xl bg-red-700 px-7 py-3.5 text-[15px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-800 lg:block"
    >
     Request a Free Quote
    </Link>

    {/* Mobile Menu Button */}

    <button
      type="button"
      aria-label="Open menu"
      aria-expanded={open}
      onClick={() => setOpen(true)}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 transition-colors duration-300 lg:hidden ${
        isWhite
          ? "text-slate-900"
          : "text-white"
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
       <div className="border-b border-slate-200 bg-white px-6 py-6">

<div className="flex items-start justify-between">

  <div>

    <Image
      src="/logo/anjali-equipments-logo.svg"
      alt="Anjali Equipments"
      width={220}
      height={48}
      className="h-auto w-[180px]"
    />
 
  </div>

  <button
    onClick={() => setOpen(false)}
    className="rounded-full border border-slate-200 p-2 transition hover:bg-slate-100"
  >
    <X size={24} />
  </button>

</div>

</div>

<nav className="flex flex-1 flex-col overflow-y-auto px-5 py-6">
{links.map((link) => {
  const Icon = link.icon;

  return (
    <Link
      key={link.name}
      href={link.href}
      onClick={() => setOpen(false)}
      className={`mb-2 flex items-center gap-4 rounded-xl border-l-4 px-4 py-4 transition-all duration-300 ${
        pathname === link.href
          ? "border-red-600 bg-red-50 text-red-600"
          : "border-transparent text-slate-800 hover:bg-slate-100"
      }`}
    >
      <Icon size={22} />

      <span className="text-lg font-medium">
        {link.name}
      </span>
    </Link>
  );
})}

<div className="mt-8 space-y-3">

  <a
    href="tel:+918657003003"
    className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-red-600 hover:shadow-md"
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
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
    className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-green-500 hover:shadow-md"
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
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

<div className="mt-8">

  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
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
<Link
  href="/contact"
  onClick={() => setOpen(false)}
  className="mt-8 flex h-14 items-center justify-center rounded-xl bg-red-700 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-800"
>
  Request a Free Quote
</Link>

<div className="mt-10 border-t border-slate-200 pt-6 text-center">

  <p className="font-semibold text-slate-900">
    Anjali Equipments
  </p>

  <p className="mt-1 text-sm text-slate-500">
    Commercial Kitchen Equipment Manufacturer
  </p>

  <p className="mt-4 text-xs text-slate-400">
    © {new Date().getFullYear()} All Rights Reserved
  </p>

</div>
        </nav>
      </div>
    </>
  );
}