"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import type { BrandingAsset } from "@/data/branding_projects";
import FadeInView from "@/components/shared/FadeInView";
import HoverShade from "@/components/shared/HoverShade";
import ImageModal from "@/components/shared/ImageModal";

interface BrandingGalleryGridProps {
  assets: BrandingAsset[];
}

/**
 * Bento exclusivo de Branding — enfoque A con fallback B.
 * - Máx. 24 ítems.
 * - Portraits (row-span-3) con moderación: máx. 1 cada ~6.
 * - Spans por posición (la imagen nunca define la celda: fill + object-cover).
 * - Patrones cerrados por cantidad para evitar huecos intermedios;
 *   el ciclo 6 base (2×2 + 1×2) llena bandas de 2 filas exactas (3 cols).
 */
const COL_PATTERN_6 = [1, 3, 2, 3, 2, 3, 1] as const;
const PORTRAIT_INDICES = new Set([1, 6, 12, 18, 24]);

function spanForIndex(index: number): string {
  const col = COL_PATTERN_6[index % COL_PATTERN_6.length];
  const isPortrait = PORTRAIT_INDICES.has(index);

  if (col === 2) {
    return "row-span-2 md:col-span-2 md:row-span-2";
  }
  if (isPortrait) {
    return "row-span-2 md:row-span-4";
  }
  return "row-span-2";
}

function patchedSpans(n: number, base: string[]): string[] {
  if (n === 0) return base;
  const patched = [...base];
  const area = (s: string) => (s.includes("md:col-span-2") ? 4 : s.includes("md:row-span-3") ? 3 : 2);
  const cells = patched.reduce((a, s) => a + area(s), 0);
  const mod = cells % 3;
  if (mod === 0) return patched;
  const last = patched[n - 1];
  const isWide = last.includes("md:col-span-2");
  const isPortrait = last.includes("md:row-span-3");
  if (!isWide && !isPortrait) return patched; // 1×2 no se toca: ya es mínimo
  if (mod === 1 && isWide) {
    // 4 → 3 (−1) para cerrar a múltiplo de 3
    patched[n - 1] = "row-span-2 md:row-span-4";
    return patched;
  }
  if (mod === 2 && isWide) {
    // 4 → 2 (−2) para cerrar
    patched[n - 1] = "row-span-2";
    return patched;
  }
  if (mod === 2 && isPortrait) {
    // 3 → 2 (−1) para cerrar
    patched[n - 1] = "row-span-2";
    return patched;
  }
  return patched;
}

function buildPattern(n: number): string[] {
  const base = Array.from({ length: n }, (_, i) => spanForIndex(i));
  const clamped = base.slice(0, 24);
  return patchedSpans(clamped.length, clamped);
}
export default function BrandingGalleryGrid({ assets }: BrandingGalleryGridProps) {
  const [selected, setSelected] = useState<BrandingAsset | null>(null);

  const visible = useMemo(() => assets.slice(0, 24), [assets]);
  const spans = useMemo(() => buildPattern(visible.length), [visible.length]);

  if (visible.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 auto-rows-40 md:grid-cols-3 md:grid-flow-dense md:gap-4">
        {visible.map((asset, index) => (
          <FadeInView
            key={`${asset.src}-${index}`}
            delay={Math.min(index * 0.035, 0.35)}
            className={spans[index]}
          >
            <button
              type="button"
              onClick={() => setSelected(asset)}
              aria-label={`Ver imagen ampliada: ${asset.alt}`}
              className="group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-surface text-left shadow-sm"
            >
              <Image
                src={asset.src}
                alt={asset.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <HoverShade />
            </button>
          </FadeInView>
        ))}
      </div>

      {selected ? (
        <ImageModal src={selected.src} alt={selected.alt} onClose={() => setSelected(null)} />
      ) : null}
    </>
  );
}
