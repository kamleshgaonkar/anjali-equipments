import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

const companyLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const productLinks = [

  {
    label: "Cooking Equipment",
    href: "/products/cooking",
  },
  {
    label: "Refrigeration Equipment",
    href: "/products/refrigeration",
  },
  {
    label: "Preparation Equipment",
    href: "/products/preparation",
  },
  {
    label: "Display Counters",
    href: "/products/display-counters",
  },
  {
    label: "Bakery Equipment",
    href: "/products/bakery",
  },
  {
    label: "Storage Equipment",
    href: "/products/storage",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white shadow-[0_-8px_20px_rgba(15,23,42,0.03)] text-gray-600">

      <div className="container-custom py-20">

        <div className="grid gap-14 lg:grid-cols-12">

          {/* Company */}

          <div className="lg:col-span-5">

<Image
  src="/logo/anjali-equipments-logo.svg"
  alt="Anjali Equipments"
  width={180}
  height={60}
  className="h-auto"
/>

<p className="mt-6 max-w-md leading-8">
  Anjali Equipments manufactures premium stainless steel commercial kitchen
  equipment for hotels, restaurants, hospitals, cloud kitchens and
  institutional kitchens across India.
</p>

{/* GSTIN */}

<div className="mt-8">

  <p className="text-xs uppercase tracking-[0.25em]">
    GSTIN
  </p>

  <p className="mt-2 font-medium">
  27CZNPS0856A1Z7
  </p>

</div>

{/* Social Media */}

<div className="mt-8">

  <p className="mb-4 text-xs uppercase tracking-[0.25em]">
    Follow Us
  </p>

  <div className="flex items-center gap-5">

  <Link
    href="https://www.facebook.com/anjaliequipments/"
    target="_blank"
    className="text-gray-400 transition-all duration-300 hover:text-[#1877F2] hover:scale-110"
  >
    <FaFacebookF size={18} />
  </Link>

  <Link
    href="https://www.instagram.com/anjaliequipments/"
    target="_blank"
    className="text-gray-400 transition-all duration-300 hover:text-[#E4405F] hover:scale-110"
  >
    <FaInstagram size={18} />
  </Link>

  <Link
    href="https://www.linkedin.com/company/anjali-equipments/"
    target="_blank"
    className="text-gray-400 transition-all duration-300 hover:text-[#0A66C2] hover:scale-110"
  >
    <FaLinkedinIn size={18} />
  </Link>


</div>

</div>

</div>

          {/* Company Links */}

          <div className="lg:col-span-2">

            <h3 className="mb-6 font-heading text-xl font-semibold text-slate-900">
              Company
            </h3>

            <ul className="space-y-4">

              {companyLinks.map((item) => (

                <li key={item.name}>

                  <Link
                    href={item.href}
                    className="transition hover:text-red-500"
                  >
                    {item.name}
                  </Link>

                </li>

              ))}

            </ul>

          </div>

        {/* Products */}
<div className="lg:col-span-2">
  <h3 className="mb-6 font-heading text-xl font-semibold text-slate-900">
    Products
  </h3>

  <ul className="space-y-4">
    {productLinks.map((item) => (
      <li key={item.label}>
        <Link
          href={item.href}
          className="transition hover:text-red-500"
        >
          {item.label}
        </Link>
      </li>
    ))}
  </ul>
</div>

          {/* Contact */}
{/* Contact */}

<div className="lg:col-span-3">

  <h3 className="mb-6 font-heading text-xl font-semibold text-slate-900">
    Contact
  </h3>

  <div className="space-y-5">

    <div className="flex items-start gap-3">

      <Phone
        size={18}
        className="mt-1 text-red-500"
      />

      <span>
        <a href="tel:+918657003003" className="text-red-500 hover:text-red-600" target="_blank">+91 86570 03003</a>  
      </span>

    </div>

    <div className="flex items-start gap-3">

      <Mail
        size={18}
        className="mt-1 text-red-500"
      />

      <span className="break-all">
        <a href="mailto:info@anjaliequipments.com" className="text-red-500 hover:text-red-600" target="_blank">info@anjaliequipments.com</a>  
      </span>

    </div>

    <div className="flex items-start gap-3">

      <MapPin
        size={18}
        className="mt-1 text-red-500"
      />

      <span>
        Plot B, A Wing 201,<br />
        Govardhan Complex, Caves Road,<br />
        Jogeshwari East,<br />
        Mumbai, Maharashtra, India - 400 060.
      </span>

    </div>

  </div>

</div>

</div>

</div>

{/* Bottom */}

{/* Bottom */}
<div className="border-t border-slate-200 pb-28 sm:pb-6">
  <div className="container-custom flex flex-col items-center justify-between gap-4 py-6 text-sm md:flex-row">
    <p>
      © 2026 Anjali Equipments. All Rights Reserved.
    </p>

    <p>
  Designed & Developed by{" "}
  <a
    href="https://creashna.com"
    target="_blank"
    rel="noopener noreferrer"
    className="font-semibold text-gray-600 transition hover:text-red-600"
  >
    Creashna
  </a>
</p>
  </div>
</div>

</footer>
  );
}