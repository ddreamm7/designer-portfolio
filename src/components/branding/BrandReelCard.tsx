"use client";

import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  poster?: string;
  videoSrc?: string;
  caption?: string;
}

export default function BrandReelCard({ src, alt, poster, videoSrc, caption }: Props) {
  if (videoSrc) {
    return (
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <div className="aspect-[9/16] overflow-hidden bg-black">
          <video
            src={videoSrc}
            poster={poster ?? src}
            controls
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
        </div>
        {caption && (
          <p className="px-3 py-2 text-xs tracking-wide text-muted">{caption}</p>
        )}
      </div>
    );
  }

  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-surface">
      <div className="relative aspect-[9/16] overflow-hidden bg-surface">
        <Image
          src={poster ?? src}
          alt={alt}
          fill
          sizes="(max-width:768px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-[10px] uppercase tracking-widest text-white">
          Reel
        </span>
      </div>
      {caption && (
        <p className="px-3 py-2 text-xs tracking-wide text-muted">{caption}</p>
      )}
    </div>
  );
}
