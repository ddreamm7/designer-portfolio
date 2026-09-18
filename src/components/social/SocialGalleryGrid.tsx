"use client";

import Image from "next/image";
import { useState } from "react";
import type { SocialAsset } from "@/data/social_projects";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import HoverShade from "@/components/shared/HoverShade";
import ImageModal from "@/components/shared/ImageModal";
import ReelCard from "@/components/shared/ReelCard";

// Mapeo centralizado por kind: kind → {colSpan, aspect, sizes}
// Altura la decide aspect (* / 9), ancho colSpan; sin row-span ni auto-rows fijo
const KIND_CONFIG: Record<string, { colSpan: 1 | 2; aspect: string; sizes: string }> = {
  banner: { colSpan: 2, aspect: "aspect-[32/9]", sizes: "(max-width:768px) 100vw, 50vw" },
  reel: { colSpan: 1, aspect: "aspect-[9/16]", sizes: "(max-width:768px) 50vw, 25vw" },
  mockup: { colSpan: 2, aspect: "aspect-[16/9]", sizes: "(max-width:768px) 100vw, 50vw" },
};

// Posts: pattern 6 square — 2 cols grande = 2x2 (2 filas), 1 col = 1x1
const POSTS_COL_SPAN: (1 | 2)[] = [2, 1, 1, 2, 1, 1];
const POSTS_ROW_SPAN: (1 | 2)[] = [2, 1, 1, 2, 1, 1];

function configForAsset(
  asset: SocialAsset,
  index: number,
): { colSpan: 1 | 2; rowSpan: 1 | 2; aspect: string; sizes: string } {
  if (asset.kind === "post") {
    const colSpan = POSTS_COL_SPAN[index % POSTS_COL_SPAN.length];
    const rowSpan = POSTS_ROW_SPAN[index % POSTS_ROW_SPAN.length];
    return { colSpan, rowSpan, aspect: "aspect-square", sizes: colSpan === 2 ? "(max-width:768px) 100vw, 50vw" : "(max-width:768px) 50vw, 25vw" };
  }
  const kind = KIND_CONFIG[asset.kind];
  if (kind) return { colSpan: kind.colSpan, rowSpan: 1 as const, aspect: kind.aspect, sizes: kind.sizes };
  return {
    colSpan: 1 as const,
    rowSpan: 1 as const,
    aspect: "aspect-[16/9]",
    sizes: "(max-width:768px) 100vw, 50vw",
  };
}

export default function SocialGalleryGrid({ assets }: { assets: SocialAsset[] }) {
  const [selected, setSelected] = useState<SocialAsset | null>(null);

  if (assets.length === 0) return null;

  const isReelsOnly = assets.length > 0 && assets.every((a) => a.kind === "reel");
  const isPostsOnly = assets.length > 0 && assets.every((a) => a.kind === "post");

  return (
    <>
      <GalleryGrid squareRows={isPostsOnly}>
        {assets.map((asset, index) => {
          if (asset.kind === "reel") {
            return (
              <GalleryGrid.Item key={`${asset.src}-${index}`} colSpan={1} index={index}>
                <ReelCard
                  src={asset.src}
                  alt={asset.alt}
                  poster={asset.poster}
                  videoSrc={asset.videoSrc}
                  caption={asset.caption}
                />
              </GalleryGrid.Item>
            );
          }

          const { colSpan, rowSpan, aspect, sizes } = configForAsset(asset, index);

          return (
            <GalleryGrid.Item
              key={`${asset.src}-${index}`}
              colSpan={colSpan}
              rowSpan={isPostsOnly ? rowSpan : 1}
              index={index}
            >
              <button
                type="button"
                onClick={() => setSelected(asset)}
                aria-label={`Ver imagen ampliada: ${asset.alt}`}
                className="group block h-full w-full cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-surface text-left shadow-sm"
              >
                <div
                  className={`relative w-full overflow-hidden bg-surface ${isPostsOnly ? "h-full" : aspect}`}
                >
                  <Image
                    src={asset.src}
                    alt={asset.alt}
                    fill
                    sizes={sizes}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <HoverShade />
                  {asset.caption && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
                      <p className="text-xs tracking-wide text-white">{asset.caption}</p>
                    </div>
                  )}
                </div>
              </button>
            </GalleryGrid.Item>
          );
        })}
      </GalleryGrid>

      {!isReelsOnly && selected && (
        <ImageModal src={selected.src} alt={selected.alt} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
