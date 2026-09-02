import Image from "next/image";
import type { BrandAsset } from "@/data/projects";
import FadeInView from "@/components/FadeInView";
import BrandReelCard from "./BrandReelCard";

function assetAspectClass(asset: BrandAsset) {
  switch (asset.aspect) {
    case "square":
      return "aspect-square";
    case "portrait":
      return "aspect-[3/4]";
    case "wide":
      return asset.kind === "banner" ? "aspect-[3/1]" : "aspect-[16/9]";
    case "9/16":
      return "aspect-[9/16]";
    default:
      return asset.kind === "logo" ? "aspect-square" : asset.kind === "banner" ? "aspect-[3/1]" : "aspect-[4/3]";
  }
}

function AssetCard({ asset, index }: { asset: BrandAsset; index: number }) {
  if (asset.kind === "reel") {
    return (
      <FadeInView delay={index * 0.04}>
        <BrandReelCard
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
      <div className="group overflow-hidden rounded-lg border border-border bg-surface">
        <div className={`relative overflow-hidden bg-surface ${assetAspectClass(asset)} ${isLogo ? "p-6" : ""}`}>
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            sizes={isLogo ? "(max-width:768px) 50vw, 33vw" : "(max-width:768px) 100vw, 50vw"}
            className={`${isLogo ? "object-contain p-2" : "object-cover"} transition-transform duration-500 group-hover:scale-[1.02]`}
          />
          {asset.caption && !isLogo && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
              <p className="text-xs tracking-wide text-white">{asset.caption}</p>
            </div>
          )}
        </div>
        {(asset.caption && isLogo) && (
          <p className="px-3 py-2 text-xs tracking-wide text-muted">{asset.caption}</p>
        )}
      </div>
    </FadeInView>
  );
}

export default function BrandAssetGrid({ assets }: { assets: BrandAsset[] }) {
  if (assets.length === 0) return null;

  const first = assets[0];
  const isReels = first.kind === "reel";
  const isLogos = first.kind === "logo";

  if (isReels) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {assets.map((a, i) => (
          <AssetCard key={`${a.src}-${i}`} asset={a} index={i} />
        ))}
      </div>
    );
  }

  if (isLogos) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {assets.map((a, i) => (
          <AssetCard key={`${a.src}-${i}`} asset={a} index={i} />
        ))}
      </div>
    );
  }

  const isPosts = first.kind === "post";
  if (isPosts) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {assets.map((a, i) => (
          <AssetCard key={`${a.src}-${i}`} asset={a} index={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {assets.map((a, i) => (
        <AssetCard key={`${a.src}-${i}`} asset={a} index={i} />
      ))}
    </div>
  );
}
