"use client";

import { ReactNode, useEffect, useRef, createContext, useContext } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

type LenisContextValue = {
  lenis: Lenis | null;
  stop: () => void;
  start: () => void;
};

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  stop: () => {},
  start: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
      prevent: (node) => {
        // Preserve native pull-to-refresh: only prevent scroll chaining
        // for nodes explicitly marked with [data-lenis-prevent] or modal inputs.
        // Do not return true for html/body — overscroll-behavior stays auto.
        const el = node as HTMLElement;
        if (el.closest?.("[data-lenis-prevent]")) return true;
        return el.classList.contains("modal-content") ||
               el.tagName === "INPUT" ||
               el.tagName === "TEXTAREA";
      },
    });
    lenisRef.current = lenis;
    return () => {
      lenis.start();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Al cambiar de ruta se vuelve al inicio (comportamiento original).
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
  }, [pathname]);

  const value: LenisContextValue = {
    get lenis() { return lenisRef.current; },
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
  };

  return (
    <LenisContext.Provider value={value}>
      {children}
    </LenisContext.Provider>
  );
}
