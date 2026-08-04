"use client";

import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";

export default function FloatingContact() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-end p-4 sm:p-6">
      <div className="pointer-events-auto flex flex-col gap-3">

        {/* WhatsApp */}
        <Link
          href="https://wa.me/918657003003"
          target="_blank"
          aria-label="WhatsApp"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl sm:h-14 sm:w-14"
        >
          <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
        </Link>

        {/* Call */}
        <Link
          href="tel:+918657003003"
          aria-label="Call"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-red-700 hover:shadow-xl sm:h-14 sm:w-14"
        >
          <Phone className="h-6 w-6 sm:h-7 sm:w-7" />
        </Link>

      </div>
    </div>
  );
}
