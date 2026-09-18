"use client";

import { useEffect, useRef, useState } from "react";
import FadeInView from "@/components/shared/FadeInView";

export type GalleryColSpan = 1 | 2;
export type GalleryRowSpan = 1 | 2;

const COL_SPAN_CLASS: Record<GalleryColSpan, string> = {
  1: "",
  2: "col-span-2",
};

const ROW_SPAN_CLASS: Record<GalleryRowSpan, string> = {
  1: "",
  2: "row-span-2",
};

interface GalleryGridProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Si true, fila = ancho 1 col (cuadrado perfecto). Para branding/posts mixtos
   * donde 1x1=1 fila, 2x2=2 filas, 1x2=2 filas. Medido con ResizeObserver.
   * Si false (default), grid-auto-rows: auto y altura la decide aspect del hijo.
   */
  squareRows?: boolean;
}

export function GalleryGrid({ children, className = "", squareRows = false }: GalleryGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rowHeight, setRowHeight] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!squareRows) return;
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const isMd = window.innerWidth >= 768;
      const cols = isMd ? 4 : 2;
      const gap = isMd ? 16 : 12; // md:gap-4 =16px, gap-3=12px
      const colW = (el.clientWidth - (cols - 1) * gap) / cols;
      setRowHeight(`${colW}px`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [squareRows]);

  return (
    <div
      ref={ref}
      className={`grid grid-cols-2 gap-3 grid-flow-dense md:grid-cols-4 md:gap-4 ${className}`}
      style={squareRows && rowHeight ? { gridAutoRows: rowHeight } : { gridAutoRows: "auto" }}
    >
      {children}
    </div>
  );
}

interface GalleryGridItemProps {
  colSpan: GalleryColSpan;
  rowSpan?: GalleryRowSpan;
  index: number;
  children: React.ReactNode;
}

GalleryGrid.Item = function GalleryGridItem({
  colSpan,
  rowSpan = 1,
  index,
  children,
}: GalleryGridItemProps) {
  return (
    <div className={`${COL_SPAN_CLASS[colSpan]} ${ROW_SPAN_CLASS[rowSpan]}`}>
      <FadeInView delay={Math.min(index * 0.035, 0.35)} className="h-full">
        {children}
      </FadeInView>
    </div>
  );
};

export default GalleryGrid;
