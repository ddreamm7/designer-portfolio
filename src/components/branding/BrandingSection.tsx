"use client";

import { useState } from "react";
import FadeInView from "@/components/shared/FadeInView";
import ShowMoreButton from "@/components/shared/ShowMoreButton";
import ProjectCard from "@/components/gallery/ProjectCard";
import { brandingPieces } from "@/data/branding_projects";

const PIECES_PAGE_SIZE = 4;

export default function BrandingSection() {
  const [visiblePieces, setVisiblePieces] = useState(PIECES_PAGE_SIZE);
  const hasMorePieces = visiblePieces < brandingPieces.length;

  return (
    <div>
      <FadeInView>
        <div className="mb-12 flex items-baseline gap-4">
          <span className="text-sm font-mono font-medium text-muted">03</span>
          <h2 className="text-4xl font-bold uppercase tracking-tight md:text-5xl">
            Branding
          </h2>
        </div>
      </FadeInView>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {brandingPieces.slice(0, visiblePieces).map((piece, i) => (
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

      {hasMorePieces ? (
        <ShowMoreButton
          onClick={() =>
            setVisiblePieces((prev) => prev + PIECES_PAGE_SIZE)
          }
        />
      ) : null}
    </div>
  );
}
