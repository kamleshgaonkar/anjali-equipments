import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";
import NavbarShell from "@/components/layout/NavbarShell";

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-oxanium",
});

export const metadata: Metadata = {
  title: "Anjali Equipments",
  description: "Commercial Kitchen Equipment Manufacturer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oxanium.variable}`}>
        <SiteChrome header={<NavbarShell />}>{children}</SiteChrome>
      </body>
    </html>
  );
}
