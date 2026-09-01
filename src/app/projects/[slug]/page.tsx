import Image from "next/image";
import Link from "next/link";
import { projects, getProjectBySlug } from "@/data/projects";

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

  return (
    <main className="px-6 py-24 md:px-16 lg:px-48">
      <Link
        href="/"
        className="inline-block text-sm font-mono uppercase tracking-widest text-muted transition-colors hover:text-foreground"
      >
        &larr; Back
      </Link>

      <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-2 md:items-start">
        <div>
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

        <div>
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={800}
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </main>
  );
}
