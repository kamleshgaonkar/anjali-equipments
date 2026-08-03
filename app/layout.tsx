import type { Metadata } from "next";
import { Blinker } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";

const blinker = Blinker({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-blinker",
  display: "swap",
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
      <body
  
        className={`${blinker.variable} ${blinker.className} bg-white text-slate-900`}
      
      >
        <Navbar />

        {children}

        <Footer />

        <FloatingContact />
      </body>
    </html>
  );
}