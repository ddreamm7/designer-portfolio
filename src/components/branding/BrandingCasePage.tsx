import type { BrandingPiece } from "@/data/branding_projects";
import { BRANDING_KIND_LABELS } from "@/data/branding_projects";
import FadeInView from "@/components/shared/FadeInView";
import ZoomableImage from "@/components/shared/ZoomableImage";
import BrandingAssetGrid from "./BrandingAssetGrid";

export default function BrandingCasePage({ project }: { project: BrandingPiece }) {
  const gallery = project.gallery ?? [];
  const hasGallery = gallery.length > 0;
  const cover = project.cover ?? project.image;

  return (
    <main className="px-6 py-24 md:px-16 lg:px-48">
      {/* Hero editorial — categoría + título + subtítulo */}
      <FadeInView>
        <div className="max-w-5xl">
          <p className="text-xs uppercase tracking-widest text-muted">
            {BRANDING_KIND_LABELS[project.kind]}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-balance md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-3 text-lg font-medium tracking-wide text-muted">
            {project.subtitle}
          </p>
        </div>
      </FadeInView>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-stretch">
        <FadeInView delay={0.05} className="flex min-w-0">
          <div className="flex w-full min-w-0 flex-col justify-center">
            <p className="whitespace-pre-line text-lg leading-relaxed text-muted">
              {project.description}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-6 text-sm">
              <div>
                <p className="text-xs uppercase tracking-widest text-subtle">Año</p>
                <p className="mt-1 font-medium text-foreground">{project.year}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-subtle">Categoría</p>
                <p className="mt-1 font-medium text-foreground">
                  {BRANDING_KIND_LABELS[project.kind]}
                </p>
              </div>
            </div>
          </div>
        </FadeInView>

        <FadeInView delay={0.1} className="flex min-w-0 hidden">
          <div className="flex w-full min-w-0 items-stretch">
            <div className="relative my-auto aspect-[17/10] w-full max-h-full overflow-hidden rounded-lg border border-border bg-surface md:aspect-auto md:h-full md:max-h-none">
              <ZoomableImage
                src={cover}
                alt={project.title}
                sizes="(max-width:768px) 100vw, 560px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </FadeInView>
      </div>

      {hasGallery && (
        <div className="mt-16">
          <FadeInView>
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                {BRANDING_KIND_LABELS[project.kind]}s
              </h2>
            </div>
          </FadeInView>
          <BrandingAssetGrid assets={gallery} />
        </div>
      )}
    </main>
  );
}
