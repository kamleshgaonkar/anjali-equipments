import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import FloatingContact from "@/components/layout/FloatingContact";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const heading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});



const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
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
        className={`${heading.variable} ${body.variable} bg-white text-slate-900`}
      >
<Navbar />

{children}

<Footer />

<FloatingContact />
      </body>
    </html>
  );
}