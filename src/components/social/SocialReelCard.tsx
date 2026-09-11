"use client";

import Image from "next/image";
import { useState, useRef } from "react";

interface Props {
  src: string;
  alt: string;
  poster?: string;
  videoSrc?: string;
  caption?: string;
}

export default function SocialReelCard({ src, alt, poster, videoSrc, caption }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (videoSrc) {
    if (!isPlaying) {
      return (
        <div
          onClick={() => setIsPlaying(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setIsPlaying(true);
          }}
          aria-label={`Reproducir ${alt}`}
          className="group relative cursor-pointer overflow-hidden rounded-lg border border-border bg-black"
        >
          <div className="relative aspect-[9/16] overflow-hidden bg-black">
            <Image
              src={poster ?? src}
              alt={alt}
              fill
              sizes="(max-width:768px) 50vw, 33vw"
              className="object-cover"
            />
            <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black backdrop-blur transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
              <span aria-hidden className="ml-0.5 text-lg leading-none">▶</span>
            </span>
          </div>
          {caption && (
            <p className="px-3 py-2 text-xs tracking-wide text-muted">{caption}</p>
          )}
        </div>
      );
    }

    return (
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <div className="aspect-[9/16] overflow-hidden bg-black">
          <video
            ref={videoRef}
            src={videoSrc}
            poster={poster ?? src}
            controls
            autoPlay
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
