import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import FloatingContact from "@/components/layout/FloatingContact";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-fira",
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
        className={`${firaSans.variable} ${firaSans.className} bg-white text-slate-900`}
      >
        <Navbar />

        {children}

        <Footer />

        <FloatingContact />
      </body>
    </html>
  );
}