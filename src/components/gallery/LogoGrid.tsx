"use client";

import Image from "next/image";
import { useState } from "react";
import FadeInView from "../shared/FadeInView";
import ImageModal from "../shared/ImageModal";
import type { LogoProject } from "@/data/logos_projects";

interface Props {
  logos: LogoProject[];
}

export default function LogoGrid({ logos }: Props) {
  const [selected, setSelected] = useState<LogoProject | null>(null);

  return (
    <FadeInView>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {logos.map((logo, i) => (
          <FadeInView key={logo.id} delay={i * 0.04}>
            <button
              type="button"
              onClick={() => setSelected(logo)}
              aria-label={`Ver imagen ampliada: ${logo.title}`}
              className="flex w-full cursor-zoom-in flex-col items-center rounded-lg border border-border bg-surface p-4 transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="relative aspect-3/2 w-full overflow-hidden rounded-md bg-background">
                <Image
                  src={logo.image}
                  alt={logo.title}
                  fill
                  className="object-contain p-2 light:brightness-0"
                  sizes="(max-width:768px) 50vw, 25vw"
                />
              </div>
              <span className="mt-3 text-center text-sm font-medium text-foreground">
                {logo.title}
              </span>
              <span className="mt-1 text-center text-xs tracking-wide text-muted">
                {logo.client} · {logo.year}
              </span>
            </button>
          </FadeInView>
        ))}
      </div>
      {selected && (
        <ImageModal
          src={selected.image}
          alt={selected.title}
          onClose={() => setSelected(null)}
        />
      )}
    </FadeInView>
  );
}
