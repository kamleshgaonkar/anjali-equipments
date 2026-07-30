"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Industries", href: "/industries" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-6">
          {/* Logo */}

          <Link href="/" className="flex items-center">
            <Image
              src="/logo/anjali-equipments-logo.svg"
              alt="Anjali Equipments"
              width={220}
              height={48}
              priority
              className="h-auto w-[180px] lg:w-[250px]"
            />
          </Link>

          {/* Desktop Menu */}

          <nav className="hidden items-center gap-10 lg:flex">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-medium transition hover:text-red-700"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}

          <Link
            href="/contact"
            className="hidden rounded-xl bg-red-700 px-6 py-3 font-semibold text-white transition hover:bg-red-800 lg:block"
          >
            Get Quote
          </Link>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setOpen(true)}
            className="rounded-lg p-2 lg:hidden"
          >
            <Menu size={30} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}

      <div
        className={`fixed inset-0 z-[100] bg-white transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b px-5">
          <Image
            src="/logo/anjali-equipments-logo.svg"
            alt="Anjali Equipments"
            width={180}
            height={40}
          />

          <button onClick={() => setOpen(false)}>
            <X size={30} />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-slate-100 py-5 text-xl font-medium"
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