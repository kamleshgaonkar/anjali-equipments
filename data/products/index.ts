import { cookingProducts } from "./cooking";
import { refrigerationProducts } from "./refrigeration";
import { foodPreparationProducts } from "./foodPreparation";
import { storageHandlingProducts } from "./storageHandling";
import { washingProducts } from "./washing";
import { exhaustVentilationProducts } from "./exhaustVentilation";
import { foodHoldingServingProducts } from "./foodHoldingServing";
import { barProducts } from "./bar";
import { bakeryProducts } from "./bakery";
import { otherProducts } from "./other";

export const products = [
  ...cookingProducts,
  ...refrigerationProducts,
  ...foodPreparationProducts,
  ...storageHandlingProducts,
  ...washingProducts,
  ...exhaustVentilationProducts,
  ...foodHoldingServingProducts,
  ...barProducts,
  ...bakeryProducts,
  ...otherProducts,
];