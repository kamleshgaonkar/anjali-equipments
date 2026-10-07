"use client";

import { usePathname } from "next/navigation";
import { QuoteProvider } from "@/context/QuoteContext";
import { HeaderScrollProvider } from "@/context/HeaderScrollContext";
import Footer from "@/components/layout/Footer";
import type { ReactNode } from "react";

export default function SiteChrome({
  header,
  children,
}: {
  header: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <QuoteProvider>
      <HeaderScrollProvider>
        {header}
        {children}
        <Footer />
      </HeaderScrollProvider>
    </QuoteProvider>
  );
}