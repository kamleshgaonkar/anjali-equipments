"use client";

import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">

      {/* WhatsApp */}
      <Link
        href="https://wa.me/918657003003"
        target="_blank"
        aria-label="WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      >
        <MessageCircle className="h-7 w-7" />
      </Link>

      {/* Call */}
      <Link
        href="tel:+918657003003"
        aria-label="Call"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-red-700 hover:shadow-xl"
      >
        <Phone className="h-7 w-7" />
      </Link>

    </div>
  );
}