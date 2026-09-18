"use client";

import Image from "next/image";
import { useState } from "react";
import type { BrandingAsset } from "@/data/branding_projects";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import HoverShade from "@/components/shared/HoverShade";
import ImageModal from "@/components/shared/ImageModal";

interface BrandingGalleryGridProps {
  assets: BrandingAsset[];
}

// Layout Branding 8 (repite cada 8) — 4 cols, 1:1 base, fila = 25cqw (≈ ancho 1 col)
// 1:1x1 (1x1), 2:1x1 (1x1), 3:2x1 (2x1), 4:1x1 (1x1), 5:2x1 (2x1), 6:1x2 (1x2), 7:2x1 (2x1), 8:1x1 (1x1)
const BRANDING_COL_SPAN: (1 | 2)[] = [1, 1, 2, 1, 2, 1, 2, 1];
const BRANDING_ROW_SPAN: (1 | 2)[] = [1, 1, 1, 1, 1, 2, 1, 1];

function colSpanForIndex(index: number): 1 | 2 {
  return BRANDING_COL_SPAN[index % BRANDING_COL_SPAN.length];
}

function rowSpanForIndex(index: number): 1 | 2 {
  return BRANDING_ROW_SPAN[index % BRANDING_ROW_SPAN.length];
}

export default function BrandingGalleryGrid({
  assets,
}: BrandingGalleryGridProps) {
  const [selected, setSelected] = useState<BrandingAsset | null>(null);

  if (assets.length === 0) return null;

  return (
    <>
      <GalleryGrid squareRows>
        {assets.map((asset, index) => (
          <GalleryGrid.Item
            key={`${asset.src}-${index}`}
            colSpan={colSpanForIndex(index)}
            rowSpan={rowSpanForIndex(index)}
            index={index}
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
          </GalleryGrid.Item>
        ))}
      </GalleryGrid>

      {selected ? (
        <ImageModal
          src={selected.src}
          alt={selected.alt}
          onClose={() => setSelected(null)}
        />
      ) : null}
    </>
  );
}
