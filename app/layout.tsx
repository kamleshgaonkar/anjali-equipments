import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import "./globals.css";
import { QuoteProvider } from "@/context/QuoteContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";

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
      
      <QuoteProvider> 
        <Navbar />

        {children}
      </QuoteProvider>
        <Footer />

        <FloatingContact />
      </body>
    </html>
  );
}