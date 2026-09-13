"use client";

import { Fragment, useState } from "react";
import FadeInView from "@/components/shared/FadeInView";
import ShowMoreButton from "@/components/shared/ShowMoreButton";
import ProjectCard from "@/components/gallery/ProjectCard";
import LogoGrid from "@/components/gallery/LogoGrid";
import {
  brandingPieces,
  BRANDING_KIND_LABELS,
  type BrandingPieceKind,
} from "@/data/branding_projects";
import { getLogos } from "@/data/logos_projects";

type BrandingFilter = "todos" | BrandingPieceKind | "logotipos";

const FILTERS: { id: BrandingFilter; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "banner", label: "Banners" },
  { id: "flyer", label: "Flyers" },
  { id: "post", label: "Posts" },
  { id: "mockup", label: "Mockups" },
  { id: "logotipos", label: "Logotipos" },
];

const PIECES_PAGE_SIZE = 4;

function PiecesGrid({ visibleCount }: { visibleCount: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
      {brandingPieces.slice(0, visibleCount).map((piece, i) => (
        <FadeInView key={piece.slug} delay={i * 0.05} className="h-full">
          <ProjectCard
            slug={piece.slug}
            title={piece.title}
            year={piece.year}
            eyebrow={BRANDING_KIND_LABELS[piece.kind]}
            thumbnail={piece.thumbnail}
            variant="large"
          />
        </FadeInView>
      ))}
    </div>
  );
}

function KindGrid({ kind }: { kind: BrandingPieceKind }) {
  const pieces = brandingPieces.filter((p) => p.kind === kind);
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
      {pieces.map((piece, i) => (
        <FadeInView key={piece.slug} delay={i * 0.05} className="h-full">
          <ProjectCard
            slug={piece.slug}
            title={piece.title}
            year={piece.year}
            eyebrow={BRANDING_KIND_LABELS[piece.kind]}
            thumbnail={piece.thumbnail}
            variant="large"
          />
        </FadeInView>
      ))}
    </div>
  );
}

export default function BrandingSection() {
  const [filter, setFilter] = useState<BrandingFilter>("todos");
  const [visiblePieces, setVisiblePieces] = useState(PIECES_PAGE_SIZE);
  const hasMorePieces = visiblePieces < brandingPieces.length;

  const handleFilterChange = (id: BrandingFilter) => {
    setFilter(id);
    setVisiblePieces(PIECES_PAGE_SIZE);
  };

  return (
    <div>
      <FadeInView>
        <div className="mb-12 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-4">
          <div className="flex items-baseline gap-4">
            <span className="text-sm font-mono font-medium text-muted">03</span>
            <h2 className="text-4xl font-bold uppercase tracking-tight md:text-5xl">
              Branding
            </h2>
          </div>
          <div
            role="tablist"
            aria-label="Filtrar piezas de branding"
            className="-mx-6 flex w-[calc(100%+3rem)] items-center gap-4 overflow-x-auto px-6 pb-1 scrollbar-none [mask-image:linear-gradient(to_right,transparent_0,transparent_12px,black_36px,black_calc(100%-36px),transparent_calc(100%-12px),transparent_100%)] md:mx-0 md:w-auto md:gap-5 md:px-0 md:[mask-image:none]"
          >
            {FILTERS.map(({ id, label }, index) => (
              <Fragment key={id}>
                {index > 0 && (
                  <span aria-hidden className="h-4 w-px shrink-0 bg-border" />
                )}
                <button
                  role="tab"
                  aria-selected={filter === id}
                  onClick={() => handleFilterChange(id)}
                  className={`shrink-0 whitespace-nowrap text-xs uppercase tracking-widest transition-colors duration-300 ${
                    filter === id
                      ? "text-foreground"
                      : "cursor-pointer text-subtle hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              </Fragment>
            ))}
          </div>
        </div>
      </FadeInView>

      {filter === "todos" && (
        <>
          <PiecesGrid visibleCount={visiblePieces} />
          {hasMorePieces ? (
            <ShowMoreButton
              onClick={() =>
                setVisiblePieces((prev) => prev + PIECES_PAGE_SIZE)
              }
            />
          ) : null}
        </>
      )}

      {filter !== "todos" && filter !== "logotipos" && (
        <KindGrid kind={filter} />
      )}

      {filter === "logotipos" && <LogoGrid logos={getLogos()} />}
    </div>
  );
}
