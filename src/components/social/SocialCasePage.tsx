import Image from "next/image";
import type { SocialProject } from "@/data/social_projects";
import FadeInView from "@/components/shared/FadeInView";
import SocialAssetGrid from "./SocialAssetGrid";
import SocialSectionNav from "./SocialSectionNav";

const KIND_LABELS: Record<string, string> = {
  banner: "Banners",
  post: "Posts",
  flyer: "Flyers",
  logo: "Logos",
  reel: "Reels",
  mockup: "Mockups",
};

function groupByKind(gallery: SocialProject["gallery"]) {
  const groups = new Map<string, typeof gallery>();
  for (const asset of gallery) {
    if (!groups.has(asset.kind)) groups.set(asset.kind, []);
    groups.get(asset.kind)!.push(asset);
  }
  // Orden editorial: banners → mockups → posts → reels (flyer/logo si aparecen)
  const order = ["banner", "mockup", "post", "reel", "logo", "flyer"];
  return [...groups.entries()].sort(
    (a, b) => order.indexOf(a[0]) - order.indexOf(b[0])
  );
}

export default function SocialCasePage({ project }: { project: SocialProject }) {
  const grouped = groupByKind(project.gallery);
  const kinds = grouped.map(([k]) => k);

  return (
    <main className="px-6 py-24 md:px-16 lg:px-48">
      {/* Hero social */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-stretch">
        <FadeInView className="flex">
          <div className="flex w-full flex-col justify-center">
            <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-6xl">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="mt-2 text-lg font-medium tracking-wide text-muted">
                {project.subtitle}
              </p>
            )}
            <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-muted">
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

        <FadeInView delay={0.1} className="flex">
          <div className="flex w-full items-stretch">
            <div className="relative my-auto aspect-[17/10] w-full max-h-full overflow-hidden rounded-lg border border-border bg-surface md:aspect-auto md:h-full md:max-h-none">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                sizes="(max-width:768px) 100vw, 560px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </FadeInView>
      </div>

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
            <SocialAssetGrid assets={assets} />
          </section>
        ))}
      </div>
    </main>
  );
}
