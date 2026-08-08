"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

import { Product } from "@/types/product";

export interface QuoteItem extends Product {
  quantity: number;
}

interface QuoteContextType {
  items: QuoteItem[];
  totalItems: number;

  addItem: (product: Product) => void;
  removeItem: (id: string) => void;

  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;

  clearQuote: () => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(
  undefined
);

export function QuoteProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<QuoteItem[]>([]);

  // Load from LocalStorage

  useEffect(() => {
    const saved = localStorage.getItem("quote-request");

    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  // Save to LocalStorage

  useEffect(() => {
    localStorage.setItem(
      "quote-request",
      JSON.stringify(items)
    );
  }, [items]);

  const addItem = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const increaseQuantity = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearQuote = () => {
    setItems([]);
  };

  const totalItems = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.quantity,
        0
      ),
    [items]
  );

  return (
    <QuoteContext.Provider
      value={{
        items,
        totalItems,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearQuote,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuoteContext() {
  const context = useContext(QuoteContext);

  if (!context) {
    throw new Error(
      "useQuoteContext must be used inside QuoteProvider"
    );
  }

  return context;
}