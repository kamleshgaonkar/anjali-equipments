export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: 1,
    name: "Cooking",
    slug: "cooking",
    image: "/categories/cooking.jpg",
    description:
      "Commercial cooking ranges, Chinese cooking equipment, fryers, griddles and specialty cooking solutions.",
  },
  {
    id: 2,
    name: "Refrigeration",
    slug: "refrigeration",
    image: "/categories/refrigeration.jpg",
    description:
      "Commercial refrigerators, freezers, cold rooms and refrigerated preparation equipment.",
  },
  {
    id: 3,
    name: "Preparation",
    slug: "preparation",
    image: "/categories/preparation.jpg",
    description:
      "Work tables, sink units, preparation stations, trolleys and food preparation equipment.",
  },
  {
    id: 4,
    name: "Washing",
    slug: "washing",
    image: "/categories/washing.jpg",
    description:
      "Commercial sinks, dishwashing tables and cleaning equipment.",
  },
  {
    id: 5,
    name: "Storage",
    slug: "storage",
    image: "/categories/storage.jpg",
    description:
      "Shelving, cabinets, storage racks and stainless steel storage solutions.",
  },
  {
    id: 6,
    name: "Serving",
    slug: "serving",
    image: "/categories/serving.jpg",
    description:
      "Bain maries, service counters, display counters and food serving equipment.",
  },
  {
    id: 7,
    name: "Bakery",
    slug: "bakery",
    image: "/categories/bakery.jpg",
    description:
      "Commercial bakery ovens, mixers, dough processing and bakery equipment.",
  },
  {
    id: 8,
    name: "Bulk Cooking",
    slug: "bulk-cooking",
    image: "/categories/bulk-cooking.jpg",
    description:
      "Steam cooking equipment, boilers and large-capacity cooking solutions.",
  },
  {
    id: 9,
    name: "Exhaust & Ventilation",
    slug: "exhaust",
    image: "/categories/exhaust.jpg",
    description:
      "Kitchen exhaust hoods, ducting and ventilation systems.",
  },
  {
    id: 10,
    name: "Bar Equipment",
    slug: "bar-equipment",
    image: "/categories/bar-equipment.jpg",
    description:
      "Commercial bar counters, bottle coolers and cocktail stations.",
  },
];