import { Product } from "@/types/product";
import { manufacturedDefaults } from "../helpers";

export const steamCooking: Product[] = [
  {
    ...manufacturedDefaults,
    id: "AE-CK-026",
    model: "AE-CK-026",
    name: "Dimsum Steamer",
    slug: "dimsum-steamer",
    category: "Cooking",
    group: "Steam Cooking",
    image: "/products/cooking/dimsum-steamer/hero.webp",
  },
  {
    ...manufacturedDefaults,
    id: "AE-CK-027",
    model: "AE-CK-027",
    name: "Idli Steamer",
    slug: "idli-steamer",
    category: "Cooking",
    group: "Steam Cooking",
    image: "/products/cooking/idli-steamer/hero.webp",
  },
  {
    ...manufacturedDefaults,
    id: "AE-CK-028",
    model: "AE-CK-028",
    name: "Steam Cooking Unit",
    slug: "steam-cooking-unit",
    category: "Cooking",
    group: "Steam Cooking",
    image: "/products/cooking/steam-cooking-unit/hero.webp",
  },
];