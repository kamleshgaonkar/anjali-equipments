"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type HeaderScrollContextValue = {
  headerVisible: boolean;
  headerHeight: number;
  mobileMenuOpen: boolean;
  setHeaderHeight: (height: number) => void;
  setMobileMenuOpen: (open: boolean) => void;
};

const HeaderScrollContext = createContext<HeaderScrollContextValue | null>(
  null
);

const TOP_SHOW_PX = 32;
const DIRECTION_THRESHOLD_PX = 8;
const DEFAULT_HEADER_HEIGHT = 96; // matches Navbar h-24

export function HeaderScrollProvider({ children }: { children: ReactNode }) {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [headerHeight, setHeaderHeightState] = useState(DEFAULT_HEADER_HEIGHT);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const lastScrollY = useRef(0);
  const headerVisibleRef = useRef(true);
  const mobileMenuOpenRef = useRef(false);
  const ticking = useRef(false);

  const setHeaderHeight = useCallback((height: number) => {
    if (height > 0) {
      setHeaderHeightState(height);
    }
  }, []);

  useEffect(() => {
    mobileMenuOpenRef.current = mobileMenuOpen;
    if (mobileMenuOpen) {
      headerVisibleRef.current = true;
      setHeaderVisible(true);
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const update = () => {
      ticking.current = false;
      const y = window.scrollY;
      const lastY = lastScrollY.current;
      const delta = y - lastY;

      if (mobileMenuOpenRef.current || y < TOP_SHOW_PX) {
        if (!headerVisibleRef.current) {
          headerVisibleRef.current = true;
          setHeaderVisible(true);
        }
        lastScrollY.current = y;
        return;
      }

      if (Math.abs(delta) < DIRECTION_THRESHOLD_PX) {
        return;
      }

      const nextVisible = delta < 0;
      if (nextVisible !== headerVisibleRef.current) {
        headerVisibleRef.current = nextVisible;
        setHeaderVisible(nextVisible);
      }
      lastScrollY.current = y;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const value = useMemo(
    () => ({
      headerVisible,
      headerHeight,
      mobileMenuOpen,
      setHeaderHeight,
      setMobileMenuOpen,
    }),
    [
      headerVisible,
      headerHeight,
      mobileMenuOpen,
      setHeaderHeight,
    ]
  );

  return (
    <HeaderScrollContext.Provider value={value}>
      {children}
    </HeaderScrollContext.Provider>
  );
}

export function useHeaderScroll() {
  const ctx = useContext(HeaderScrollContext);
  if (!ctx) {
    throw new Error("useHeaderScroll must be used within HeaderScrollProvider");
  }
  return ctx;
}
