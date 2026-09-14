"use client";

import Image from "next/image";
import { useState } from "react";
import type { SocialAsset } from "@/data/social_projects";
import FadeInView from "@/components/shared/FadeInView";
import HoverShade from "@/components/shared/HoverShade";
import ImageModal from "@/components/shared/ImageModal";
import SocialReelCard from "./SocialReelCard";

function assetAspectClass(asset: SocialAsset) {
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
      return asset.kind === "logo" ? "aspect-square" : "aspect-[16/9]";
  }
}

function AssetCard({
  asset,
  index,
  onOpen,
}: {
  asset: SocialAsset;
  index: number;
  onOpen: (asset: SocialAsset) => void;
}) {
  if (asset.kind === "reel") {
    return (
      <FadeInView delay={index * 0.04}>
        <SocialReelCard
          src={asset.src}
          alt={asset.alt}
          poster={asset.poster}
          videoSrc={asset.videoSrc}
          caption={asset.caption}
        />
      </FadeInView>
    );
  }

  const isLogo = asset.kind === "logo";

  return (
    <FadeInView delay={index * 0.04}>
      <button
        type="button"
        onClick={() => onOpen(asset)}
        aria-label={`Ver imagen ampliada: ${asset.alt}`}
        className="group block w-full cursor-zoom-in overflow-hidden rounded-lg border border-border bg-surface text-left"
      >
        <div className={`relative overflow-hidden bg-surface ${assetAspectClass(asset)} ${isLogo ? "p-6" : ""}`}>
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            sizes={isLogo ? "(max-width:768px) 50vw, 33vw" : "(max-width:768px) 100vw, 50vw"}
            className={`${isLogo ? "object-contain p-2" : "object-cover"} transition-transform duration-500 group-hover:scale-[1.02]`}
          />
          <HoverShade />
          {asset.caption && !isLogo && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
              <p className="text-xs tracking-wide text-white">{asset.caption}</p>
            </div>
          )}
        </div>
        {(asset.caption && isLogo) && (
          <p className="px-3 py-2 text-xs tracking-wide text-muted">{asset.caption}</p>
        )}
      </button>
    </FadeInView>
  );
}

export default function SocialAssetGrid({ assets }: { assets: SocialAsset[] }) {
  const [selected, setSelected] = useState<SocialAsset | null>(null);

  const modal = selected && (
    <ImageModal
      src={selected.src}
      alt={selected.alt}
      onClose={() => setSelected(null)}
    />
  );

  if (assets.length === 0) return null;

  const first = assets[0];
  const isReels = first.kind === "reel";
  const isLogos = first.kind === "logo";

  if (isReels) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {assets.map((a, i) => (
          <AssetCard
            key={`${a.src}-${i}`}
            asset={a}
            index={i}
            onOpen={setSelected}
          />
        ))}
      </div>
    );
  }

  if (isLogos) {
    return (
      <>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {assets.map((a, i) => (
            <AssetCard
              key={`${a.src}-${i}`}
              asset={a}
              index={i}
              onOpen={setSelected}
            />
          ))}
        </div>
        {modal}
      </>
    );
  }

  const isPosts = first.kind === "post";
  if (isPosts) {
    return (
      <>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {assets.map((a, i) => (
            <AssetCard
              key={`${a.src}-${i}`}
              asset={a}
              index={i}
              onOpen={setSelected}
            />
          ))}
        </div>
        {modal}
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {assets.map((a, i) => (
          <AssetCard
            key={`${a.src}-${i}`}
            asset={a}
            index={i}
            onOpen={setSelected}
          />
        ))}
      </div>
      {modal}
    </>
  );
}
