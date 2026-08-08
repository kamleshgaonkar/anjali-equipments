"use client";

import { useQuoteContext } from "@/context/QuoteContext";

export function useQuote() {
  return useQuoteContext();
}
