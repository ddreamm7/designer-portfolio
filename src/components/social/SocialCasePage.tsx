"use client";

import { useState } from "react";
import Image from "next/image";
import type { SocialProject } from "@/data/social_projects";
import FadeInView from "@/components/shared/FadeInView";
import HoverShade from "@/components/shared/HoverShade";
import ImageModal from "@/components/shared/ImageModal";
import SocialGalleryGrid from "./SocialGalleryGrid";
import SocialSectionNav from "./SocialSectionNav";

const KIND_LABELS: Record<string, string> = {
  banner: "Banners",
  post: "Posts",
  reel: "Reels",
  mockup: "Mockups",
};

function groupByKind(gallery: SocialProject["gallery"]) {
  const groups = new Map<string, typeof gallery>();
  for (const asset of gallery) {
    if (!groups.has(asset.kind)) groups.set(asset.kind, []);
    groups.get(asset.kind)!.push(asset);
  }
  // Orden editorial: banners → mockups → posts → reels
  const order = ["banner", "mockup", "post", "reel"];
  return [...groups.entries()].sort(
    (a, b) => order.indexOf(a[0]) - order.indexOf(b[0])
  );
}

export default function SocialCasePage({ project }: { project: SocialProject }) {
  const [coverOpen, setCoverOpen] = useState(false);
  const grouped = groupByKind(project.gallery);
  const kinds = grouped.map(([k]) => k);

  return (
    <main className="px-6 py-24 md:px-16 lg:px-48">
      {/* Hero social — editorial: titular a ancho completo */}
      <FadeInView>
        <div className="max-w-5xl">
          <h1 className="text-4xl font-bold tracking-tight text-balance md:text-6xl">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="mt-3 text-lg font-medium tracking-wide text-muted">
              {project.subtitle}
            </p>
          )}
        </div>
      </FadeInView>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
        <FadeInView delay={0.05} className="flex min-w-0 items-start">
          <div className="flex w-full min-w-0 flex-col items-start justify-start">
            <p className="whitespace-pre-line text-lg leading-relaxed text-muted">
              {project.description}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-6 text-sm">
              <div>
                <p className="text-xs uppercase tracking-widest text-subtle">Año</p>
                <p className="mt-1 font-medium text-foreground">{project.year}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-subtle">Paleta</p>
                <div className="mt-3 flex gap-3">
                  {project.palette.map((color) => (
                    <span
                      key={color}
                      className="h-8 w-8 rounded-full border border-border"
                      style={{ background: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeInView>

        <FadeInView delay={0.1} className="flex min-w-0 items-start">
          <div className="flex w-full min-w-0 items-start">
            <button
              type="button"
              onClick={() => setCoverOpen(true)}
              aria-label={`Ver imagen ampliada: ${project.title}`}
              className="group relative flex aspect-[16/9] w-full cursor-zoom-in items-stretch overflow-hidden rounded-lg border border-border bg-surface text-left"
            >
              <Image
                src={project.cover}
                alt={project.title}
                fill
                sizes="(max-width:768px) 100vw, 560px"
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <HoverShade />
            </button>
          </div>
        </FadeInView>
      </div>

      {coverOpen && (
        <ImageModal src={project.cover} alt={project.title} onClose={() => setCoverOpen(false)} />
      )}

      {/* Nav anchor por kind */}
      {kinds.length > 1 && (
        <div className="mt-16">
          <SocialSectionNav kinds={kinds} />
        </div>
      )}

      {/* Secciones apiladas por kind */}
      <div className="mt-12 space-y-16">
        {grouped.map(([kind, assets]) => (
          <section key={kind} id={`section-${kind}`} className="scroll-mt-28">
            <FadeInView>
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                  {KIND_LABELS[kind] ?? kind}
                </h2>
              </div>
            </FadeInView>
            <SocialGalleryGrid assets={assets} />
          </section>
        ))}
      </div>
    </main>
  );
}
