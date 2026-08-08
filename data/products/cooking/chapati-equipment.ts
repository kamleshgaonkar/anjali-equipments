import { Product } from "@/types/product";
import { manufacturedDefaults } from "../helpers";

export const chapatiEquipment: Product[] = [
  {
    ...manufacturedDefaults,
    id: "AE-CK-014",
    model: "AE-CK-014",
    name: "Chapati Plate",
    slug: "chapati-plate",
    category: "Cooking",
    group: "Chapati Equipment",
    image: "/products/cooking/chapati-plate/hero.webp",
  },
  {
    ...manufacturedDefaults,
    id: "AE-CK-015",
    model: "AE-CK-015",
    name: "Chapati Plate with Puffer",
    slug: "chapati-plate-with-puffer",
    category: "Cooking",
    group: "Chapati Equipment",
    image: "/products/cooking/chapati-plate-with-puffer/hero.webp",
  },
  {
    ...manufacturedDefaults,
    id: "AE-CK-016",
    model: "AE-CK-016",
    name: "Chapati Bhatti",
    slug: "chapati-bhatti",
    category: "Cooking",
    group: "Chapati Equipment",
    image: "/products/cooking/chapati-bhatti/hero.webp",
  },
];