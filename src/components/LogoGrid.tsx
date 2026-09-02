"use client";

import Image from "next/image";
import FadeInView from "./FadeInView";
import type { Logo } from "@/data/logotypes";

interface Props {
  logos: Logo[];
}

export default function LogoGrid({ logos }: Props) {
  return (
    <FadeInView>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {logos.map((logo, i) => (
          <FadeInView key={logo.id} delay={i * 0.04}>
            <div className="flex flex-col items-center rounded-lg border border-border bg-surface p-4">
              <div className="relative aspect-3/2 w-full overflow-hidden rounded-md bg-background">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width:768px) 50vw, 25vw"
                />
              </div>
              <span className="mt-3 text-center text-sm font-medium text-foreground">
                {logo.name}
              </span>
            </div>
          </FadeInView>
        ))}
      </div>
    </FadeInView>
  );
}
