"use client";

import Image from "next/image";
import { useState } from "react";
import type { BrandingAsset } from "@/data/branding_projects";
import FadeInView from "@/components/shared/FadeInView";
import ImageModal from "@/components/shared/ImageModal";

function assetAspectClass(asset: BrandingAsset) {
  switch (asset.aspect) {
    case "square":
      return "aspect-square";
    case "9/16":
      return "aspect-[9/16]";
    case "16/9":
      return "aspect-[16/9]";
    case "32/9":
      return "aspect-[32/9]";
    default:
      return "aspect-[16/9]";
  }
}

function AssetCard({
  asset,
  index,
  onOpen,
}: {
  asset: BrandingAsset;
  index: number;
  onOpen: (a: BrandingAsset) => void;
}) {
  return (
    <FadeInView delay={index * 0.04}>
      <button
        type="button"
        onClick={() => onOpen(asset)}
        aria-label={`Ver imagen ampliada: ${asset.alt}`}
        className="group block w-full cursor-zoom-in overflow-hidden rounded-lg border border-border bg-surface text-left"
      >
        <div className={`relative overflow-hidden bg-surface ${assetAspectClass(asset)}`}>
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            sizes="(max-width:768px) 100vw, 900px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </button>
    </FadeInView>
  );
}

export default function BrandingAssetGrid({ assets }: { assets: BrandingAsset[] }) {
  const [selected, setSelected] = useState<BrandingAsset | null>(null);

  if (assets.length === 0) return null;

  const first = assets[0];
  const isWide = first.kind === "banner" || first.aspect === "16/9" || first.aspect === "32/9";
  const isPost = first.kind === "post" || first.aspect === "square";

  // Posts: grid 2 cols (2x2), Banners wide: 2 cols (2x2) incluso en mobile
  if (isPost) {
    return (
      <>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {assets.map((a, i) => (
            <AssetCard key={`${a.src}-${i}`} asset={a} index={i} onOpen={setSelected} />
          ))}
        </div>
        {selected && (
          <ImageModal src={selected.src} alt={selected.alt} onClose={() => setSelected(null)} />
        )}
      </>
    );
  }

  if (isWide) {
    return (
      <>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {assets.map((a, i) => (
            <AssetCard key={`${a.src}-${i}`} asset={a} index={i} onOpen={setSelected} />
          ))}
        </div>
        {selected && (
          <ImageModal src={selected.src} alt={selected.alt} onClose={() => setSelected(null)} />
        )}
      </>
    );
  }

  // flyer 9/16 or mockup 16/9
  const cols = first.kind === "flyer" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-2";
  return (
    <>
      <div className={`grid gap-4 ${cols}`}>
        {assets.map((a, i) => (
          <AssetCard key={`${a.src}-${i}`} asset={a} index={i} onOpen={setSelected} />
        ))}
      </div>
      {selected && (
        <ImageModal src={selected.src} alt={selected.alt} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
