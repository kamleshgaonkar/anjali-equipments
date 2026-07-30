import { Product } from "@/types/product";

export const cookingProducts: Product[] = [
  {
    id: "AE-CK-001",

    model: "AE-CK-001",

    name: "Single Burner Gas Range",

    slug: "single-burner-gas-range",

    category: "cooking",

    image: "/products/cooking/single-burner-gas-range/main.webp",

    gallery: [
      "/products/cooking/single-burner-gas-range/gallery-1.webp",
      "/products/cooking/single-burner-gas-range/gallery-2.webp",
    ],

    shortDescription:
      "Heavy-duty SS304 single burner gas range for commercial kitchens.",

    description:
      "Manufactured using premium SS304 stainless steel with a high-performance cast iron burner. Designed for hotels, restaurants, cafés, cloud kitchens and industrial kitchens.",

    features: [
      "SS304 Stainless Steel Body",
      "Heavy Duty Cast Iron Burner",
      "High Efficiency",
      "Adjustable Nylon Bullet Feet",
      "Custom Sizes Available",
    ],

    specifications: [
      {
        label: "Material",
        value: "SS304",
      },
      {
        label: "Height",
        value: "850 mm",
      },
      {
        label: "Burner",
        value: "1 Heavy Duty Burner",
      },
    ],

    material: "SS304",

    customSizes: true,

    warranty: "1 Year",

    featured: true,

    seoTitle:
      "Single Burner Gas Range | Commercial Kitchen Equipment",

    seoDescription:
      "Premium SS304 single burner gas range manufactured by Anjali Equipments.",
  },
];