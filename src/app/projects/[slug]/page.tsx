import { socialProjects, getSocialBySlug } from "@/data/social_projects";
import { brandingPieces, getBrandingPieceBySlug } from "@/data/branding_projects";
import {
  audiovisualProjects,
  getAudiovisualBySlug,
} from "@/data/audiovisual_projects";
import SocialCasePage from "@/components/social/SocialCasePage";
import BrandingCasePage from "@/components/branding/BrandingCasePage";
import ZoomableImage from "@/components/shared/ZoomableImage";

export function generateStaticParams() {
  return [...socialProjects, ...brandingPieces, ...audiovisualProjects].map(
    (project) => ({
      slug: project.slug,
    }),
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const social = getSocialBySlug(slug);
  if (social) {
    return <SocialCasePage project={social} />;
  }

  const branding = getBrandingPieceBySlug(slug);
  if (branding) {
    return <BrandingCasePage project={branding} />;
  }

  const project = getAudiovisualBySlug(slug);
  if (!project) return <div>Project not found</div>;

  return (
    <main className="px-6 py-24 md:px-16 lg:px-48">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-stretch">
        <div className="flex flex-col justify-center">
          <h1 className="mt-2 text-5xl font-bold tracking-tight md:text-7xl">
            {project.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {project.description}
          </p>
        </div>

        <div className="flex w-full items-stretch">
          <div className="relative my-auto aspect-[17/10] w-full overflow-hidden rounded-lg border border-border bg-surface md:aspect-auto md:h-full">
            <ZoomableImage
              src={project.image}
              alt={project.title}
              sizes="(max-width:768px) 100vw, 560px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
