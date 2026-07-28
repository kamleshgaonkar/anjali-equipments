"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link href="/" className="flex items-center">
          <Image
            src="/logo/anjali-equipments-logo.svg"
            alt="Anjali Equipments"
            width={250}
            height={55}
            priority
          />
        </Link>

        {/* Menu */}

        <nav className="hidden items-center gap-12 lg:flex">

          <Link href="/" className="font-medium hover:text-red-700 transition">
            Home
          </Link>

          <Link href="/products" className="font-medium hover:text-red-700 transition">
            Products
          </Link>

          <Link href="/industries" className="font-medium hover:text-red-700 transition">
            Industries
          </Link>

          <Link href="/projects" className="font-medium hover:text-red-700 transition">
            Projects
          </Link>

          <Link href="/blog" className="font-medium hover:text-red-700 transition">
            Blog
          </Link>

          <Link href="/about" className="font-medium hover:text-red-700 transition">
            About
          </Link>

          <Link href="/contact" className="font-medium hover:text-red-700 transition">
            Contact
          </Link>

        </nav>

        {/* CTA */}

        <button className="rounded-xl bg-red-700 px-6 py-3 font-semibold text-white transition hover:bg-red-800">
          Get Quote
        </button>

      </div>
    </header>
  );
}