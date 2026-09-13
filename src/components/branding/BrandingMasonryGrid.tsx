"use client";

import Image from "next/image";
import { useState } from "react";
import type { BrandingAsset } from "@/data/branding_projects";
import FadeInView from "@/components/shared/FadeInView";
import ImageModal from "@/components/shared/ImageModal";

type Columns = 2 | 3;

interface BrandingMasonryGridProps {
  assets: BrandingAsset[];
  /** Columnas en desktop. Listing usa 2, detalle usa 3 */
  desktopColumns?: Columns;
}

function aspectToRatio(aspect?: BrandingAsset["aspect"]): string | undefined {
  switch (aspect) {
    case "square":
      return "1 / 1";
    case "16/9":
      return "16 / 9";
    case "32/9":
      return "32 / 9";
    case "9/16":
      return "9 / 16";
    default:
      return undefined;
  }
}

function MasonryItem({
  asset,
  index,
  onOpen,
}: {
  asset: BrandingAsset;
  index: number;
  onOpen: (a: BrandingAsset) => void;
}) {
  const ratio =
    asset.width && asset.height
      ? `${asset.width} / ${asset.height}`
      : aspectToRatio(asset.aspect);

  // Cap vertical flyers y panorámicos para no dominar la columna
  const isTall = asset.aspect === "9/16" || asset.kind === "flyer";
  const isUltraWide = asset.aspect === "32/9";
  const capClass = isUltraWide
    ? "max-h-[360px]"
    : isTall
      ? "max-h-[620px] md:max-h-[520px]"
      : "max-h-[640px]";

  return (
    <FadeInView delay={index * 0.035} className="mb-4 break-inside-avoid">
      <button
        type="button"
        onClick={() => onOpen(asset)}
        aria-label={`Ver imagen ampliada: ${asset.alt}`}
        className="group block w-full cursor-zoom-in overflow-hidden rounded-lg border border-border bg-surface text-left"
      >
        {/* h-auto + w-full respeta tamaño natural, max-h evita huecos extremos */}
        <div className={`relative w-full overflow-hidden ${capClass}`}>
          <Image
            src={asset.src}
            alt={asset.alt}
            width={asset.width ?? 800}
            height={asset.height ?? 600}
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.015]"
            style={ratio ? { aspectRatio: ratio } : undefined}
          />
        </div>
      </button>
    </FadeInView>
  );
}

export default function BrandingMasonryGrid({
  assets,
  desktopColumns = 3,
}: BrandingMasonryGridProps) {
  const [selected, setSelected] = useState<BrandingAsset | null>(null);

  if (assets.length === 0) return null;

  const columnsClass =
    desktopColumns === 2
      ? "columns-1 md:columns-2"
      : "columns-1 md:columns-2 lg:columns-3";

  return (
    <>
      <div className={`${columnsClass} gap-4 [column-fill:_balance]`}>
        {assets.map((asset, i) => (
          <MasonryItem
            key={`${asset.src}-${i}`}
            asset={asset}
            index={i}
            onOpen={setSelected}
          />
        ))}
      </div>
      {selected && (
        <ImageModal
          src={selected.src}
          alt={selected.alt}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
