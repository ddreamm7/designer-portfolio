"use client";

import { Fragment, useState } from "react";
import FadeInView from "@/components/shared/FadeInView";
import ShowMoreButton from "@/components/shared/ShowMoreButton";
import ProjectCard from "@/components/gallery/ProjectCard";
import LogoGrid from "@/components/gallery/LogoGrid";
import {
  brandingPieces,
  type BrandingPieceKind,
} from "@/data/branding_projects";
import { getLogos } from "@/data/logos_projects";

type BrandingFilter = "todos" | BrandingPieceKind | "logotipos";

const FILTERS: { id: BrandingFilter; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "banner", label: "Banners" },
  { id: "flyer", label: "Flyers" },
  { id: "post", label: "Posts" },
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
        <div className="mb-12 flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-4">
            <span className="text-sm font-mono font-medium text-muted">03</span>
            <h2 className="text-4xl font-bold uppercase tracking-tight md:text-5xl">
              Branding
            </h2>
          </div>
          <div
            role="tablist"
            aria-label="Filtrar piezas de branding"
            className="flex items-center gap-4 md:gap-5"
          >
            {FILTERS.map(({ id, label }, index) => (
              <Fragment key={id}>
                {index > 0 && (
                  <span aria-hidden className="h-4 w-px bg-border" />
                )}
                <button
                  role="tab"
                  aria-selected={filter === id}
                  onClick={() => handleFilterChange(id)}
                  className={`text-xs uppercase tracking-widest transition-colors duration-300 ${
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
