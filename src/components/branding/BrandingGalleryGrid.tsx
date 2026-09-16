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

const PATTERN_10 = [
  "row-span-2", // 1 - base (2 de 10)
  "row-span-4", // 2 portrait (doble altura, 4 de 10)
  "row-span-2", // 3
  "row-span-2", // 4
  "row-span-4", // 5 portrait (doble altura)
  "col-span-2 row-span-2", // 6 wide
  "row-span-2", // 7
  "col-span-2 row-span-2", // 8 wide
  "col-span-2 row-span-2", // 9 wide
  "row-span-2", // 10
] as const;

function spanForIndex(index: number): string {
  return PATTERN_10[index % PATTERN_10.length];
}

export default function BrandingGalleryGrid({ assets }: BrandingGalleryGridProps) {
  const [selected, setSelected] = useState<BrandingAsset | null>(null);

  const spans = useMemo(() => assets.map((_, i) => spanForIndex(i)), [assets]);

  if (assets.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 auto-rows-40 grid-flow-dense md:grid-cols-3 md:grid-flow-dense md:gap-4">
        {assets.map((asset, index) => (
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
