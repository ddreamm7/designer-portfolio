"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import FadeInView from "./FadeInView";
import type { Logo } from "@/data/logotypes";

interface Props {
  logos: Logo[];
}

export default function LogoCarousel({ logos }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleDragStart = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    setIsDragging(true);
    startXRef.current = clientX;
    scrollLeftRef.current = track.scrollLeft;
    track.classList.add("select-none");
  }, []);

  const handleDragMove = useCallback(
    (clientX: number) => {
      if (!isDragging) return;
      const track = trackRef.current;
      if (!track) return;
      const walk = (clientX - startXRef.current) * 1.5;
      track.scrollLeft = scrollLeftRef.current - walk;
    },
    [isDragging],
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    if (trackRef.current) {
      trackRef.current.classList.remove("select-none");
    }
  }, []);

  return (
    <FadeInView>
      <div
        ref={trackRef}
        className="flex overflow-x-auto overscroll-x-contain cursor-grab scrollbar-subtle pb-8"
        onMouseDown={(e) => handleDragStart(e.pageX)}
        onMouseMove={(e) => handleDragMove(e.pageX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].pageX)}
        onTouchMove={(e) => {
          handleDragMove(e.touches[0].pageX);
          if (isDragging) e.preventDefault();
        }}
        onTouchEnd={handleDragEnd}
      >
        {logos.map((logo) => (
          <div
            key={logo.id}
            className="shrink-0 w-32 sm:w-36 md:w-40 lg:w-48 mr-8 md:mr-16 flex flex-col items-center"
          >
            <div className="relative aspect-[3/2] w-full rounded-lg overflow-hidden bg-surface">
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                className="object-contain pointer-events-none"
                draggable={false}
                sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 176px, 192px"
              />
            </div>
            <span className="mt-8 text-center text-sm font-medium text-foreground">
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </FadeInView>
  );
}
