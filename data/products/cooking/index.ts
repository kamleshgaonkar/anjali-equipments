import { cookingRanges } from "./cooking-ranges";
import { chineseCooking } from "./chinese-cooking";
import { chapatiEquipment } from "./chapati-equipment";
import { griddlesGrills } from "./griddles-grills";
import { fryers } from "./fryers";
import { steamCooking } from "./steam-cooking";

export const cookingProducts = [
  ...cookingRanges,
  ...chineseCooking,
  ...chapatiEquipment,
  ...griddlesGrills,
  ...fryers,
  ...steamCooking,
];