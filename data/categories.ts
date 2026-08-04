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
      "Commercial cooking ranges, ovens, fryers, griddles and cooking equipment.",
  },
  {
    id: 2,
    name: "Refrigeration",
    slug: "refrigeration",
    image: "/categories/refrigeration.png",
    description:
      "Commercial refrigerators, freezers and cold storage equipment.",
  },
  {
    id: 3,
    name: "Food Preparation",
    slug: "food-preparation",
    image: "/categories/food-preparation.jpg",
    description:
      "Work tables, sinks, preparation tables, cutting stations and preparation equipment.",
  },
  {
    id: 4,
    name: "Storage & Handling",
    slug: "storage-handling",
    image: "/categories/storage-handling.png",
    description:
      "Storage racks, shelving, cupboards, trolleys and handling equipment.",
  },
  {
    id: 5,
    name: "Washing",
    slug: "washing",
    image: "/categories/washing.jpg",
    description:
      "Wash units, sinks, dishwashing and cleaning equipment.",
  },
  {
    id: 6,
    name: "Exhaust & Ventilation",
    slug: "exhaust-ventilation",
    image: "/categories/exhaust-ventilation.jpg",
    description:
      "Kitchen hoods, ducting, fresh air and exhaust systems.",
  },
  {
    id: 7,
    name: "Food Holding & Serving",
    slug: "food-holding-serving",
    image: "/categories/food-holding-serving.png",
    description:
      "Bain maries, pickup counters, service counters and display units.",
  },
  {
    id: 8,
    name: "Bar",
    slug: "bar",
    image: "/categories/bar.jpg",
    description:
      "Bar counters, bottle coolers, cocktail stations and bar equipment.",
  },
  {
    id: 9,
    name: "Bakery",
    slug: "bakery",
    image: "/categories/bakery.jpg",
    description:
      "Bakery ovens, proofers and bakery preparation equipment.",
  },
  {
    id: 10,
    name: "Other",
    slug: "other",
    image: "/categories/others.avif",
    description:
      "Specialized and custom commercial kitchen equipment.",
  },
];