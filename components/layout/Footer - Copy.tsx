import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const companyLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const productLinks = [
  "Preparation Equipment",
  "Cooking Equipment",
  "Refrigeration Equipment",
  "Display Counters",
  "Bakery Equipment",
  "Storage Equipment",
];

export default function Footer() {
  return (
    <footer className="bg-[#171717] text-white">

      <div className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-14 lg:grid-cols-12">

          {/* Company */}

          <div className="lg:col-span-5">

            <Image
              src="/logo/anjali-equipments-white-logo.svg"
              alt="Anjali Equipments"
              width={180}
              height={60}
              className="h-auto"
            />

            <p className="mt-6 max-w-md leading-8 text-slate-400">
              Anjali Equipments manufactures premium stainless steel
              commercial kitchen equipment for hotels, restaurants,
              hospitals, cloud kitchens and institutional kitchens
              across India.
            </p>

          </div>

          {/* Company Links */}

          <div className="lg:col-span-2">

            <h3 className="mb-6 text-lg font-semibold">
              Company
            </h3>

            <ul className="space-y-4">

              {companyLinks.map((item) => (

                <li key={item.name}>

                  <Link
                    href={item.href}
                    className="text-slate-400 transition hover:text-red-500"
                  >
                    {item.name}
                  </Link>

                </li>

              ))}

            </ul>

          </div>

          {/* Products */}

          <div className="lg:col-span-2">

            <h3 className="mb-6 text-lg font-semibold">
              Products
            </h3>

            <ul className="space-y-4">

              {productLinks.map((item) => (

                <li key={item}>

                  <Link
                    href="/products"
                    className="text-slate-400 transition hover:text-red-500"
                  >
                    {item}
                  </Link>

                </li>

              ))}

            </ul>

          </div>

          {/* Contact */}

          <div className="lg:col-span-3">

            <h3 className="mb-6 text-lg font-semibold">
              Contact
            </h3>

            <div className="space-y-5">

              <div className="flex items-start gap-3">

                <Phone
                  size={18}
                  className="mt-1 text-red-500"
                />

                <span className="text-slate-400">
                +91 86570 03003
                </span>

              </div>

              <div className="flex items-start gap-3">

                <Mail
                  size={18}
                  className="mt-1 text-red-500"
                />

                <span className="text-slate-400 break-all">
                  info@anjaliequipments.com
                </span>

              </div>

              <div className="flex items-start gap-3">

                <MapPin
                  size={18}
                  className="mt-1 text-red-500"
                />

                <span className="text-slate-400">
                  Mumbai, Maharashtra, India
                </span>

              </div>

            </div>

            {/* CTA 

            <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h4 className="text-xl font-semibold">
                Need a Commercial Kitchen?
              </h4>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Talk to our experts and get the right kitchen
                equipment solution for your business.
              </p>

              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-700 px-6 py-3 font-semibold transition hover:bg-red-800"
              >
                Request Quote

                <ArrowRight size={18} />

              </Link>

            </div>*/}

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-white/10 pb-28 sm:pb-6">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-slate-500 md:flex-row">

          <p>
            © 2026 Anjali Equipments. All Rights Reserved.
          </p>

          <div className="flex gap-6">

            <Link
              href="/privacy-policy"
              className="hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-and-conditions"
              className="hover:text-white"
            >
              Terms & Conditions
            </Link>

          </div>

          <p>
            Designed & Developed by{" "}
            <span className="font-semibold text-white">
              Creashna
            </span>
          </p>

        </div>

      </div>

    </footer>
  );
}