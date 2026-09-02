import Image from "next/image";
import { projects, getProjectBySlug, isBrandingProject } from "@/data/projects";
import BrandingCasePage from "@/components/branding/BrandingCasePage";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return <div>Project not found</div>;

  if (isBrandingProject(project)) {
    return <BrandingCasePage project={project} />;
  }

  return (
    <main className="px-6 py-24 md:px-16 lg:px-48">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-stretch">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-mono uppercase tracking-widest text-muted">
            {project.category}
          </p>
          <h1 className="mt-2 text-5xl font-bold tracking-tight md:text-7xl">
            {project.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {project.description}
          </p>
        </div>

        <div className="flex w-full items-stretch">
          <div className="relative my-auto aspect-[17/10] w-full overflow-hidden rounded-lg border border-border bg-surface md:aspect-auto md:h-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width:768px) 100vw, 560px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
