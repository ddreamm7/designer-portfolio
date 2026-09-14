import type { BrandingPiece } from "@/data/branding_projects";
import FadeInView from "@/components/shared/FadeInView";
import BrandingGalleryGrid from "./BrandingGalleryGrid";

export default function BrandingCasePage({ project }: { project: BrandingPiece }) {
  const gallery = project.gallery ?? [];
  const hasGallery = gallery.length > 0;

  return (
    <main className="px-6 py-24 md:px-16 lg:px-48">
      {/* Hero editorial — título + subtítulo */}
      <FadeInView>
        <div className="max-w-5xl">
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-balance md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-3 text-lg font-medium tracking-wide text-muted">
            {project.subtitle}
          </p>
        </div>
      </FadeInView>

      <FadeInView delay={0.05}>
        <div className="mt-10 max-w-3xl">
          <p className="whitespace-pre-line text-lg leading-relaxed text-muted">
            {project.description}
          </p>
        </div>
      </FadeInView>


      {hasGallery && (
        <>
          <FadeInView>
            <hr className="mt-0 border-0 border-t border-border md:mt-20" aria-hidden="true" />
          </FadeInView>
          <div className="mt-10 md:mt-12">
            <BrandingGalleryGrid assets={gallery} />
          </div>
        </>
      )}

    </main>
  );
}
