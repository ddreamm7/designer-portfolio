import { socialProjects, getSocialBySlug } from "@/data/social_projects";
import { brandingPieces, getBrandingPieceBySlug } from "@/data/branding_projects";
// import { audiovisualProjects, getAudiovisualBySlug } from "@/data/audiovisual_projects"; // desactivado - ver audiovisual/README.md
import SocialCasePage from "@/components/social/SocialCasePage";
import BrandingCasePage from "@/components/branding/BrandingCasePage";

export function generateStaticParams() {
  return [...socialProjects, ...brandingPieces].map((project) => ({
    slug: project.slug,
  }));
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

  // Audiovisual desactivado - ver audiovisual/README.md
  return <div>Project not found</div>;
}
