"use client";

import { useState, useMemo, memo } from "react";
import FadeInView from "@/components/FadeInView";
import ProjectCard from "@/components/ProjectCard";

interface ProjectItem {
  slug: string;
  title: string;
  category: string;
  thumbnail: string;
}

const BLOCK_SIZES = [3, 3, 3, 3];

function card(project: ProjectItem, delay: number) {
  return (
    <FadeInView key={project.slug} delay={delay} className="h-full">
      <ProjectCard
        slug={project.slug}
        title={project.title}
        category={project.category}
        thumbnail={project.thumbnail}
      />
    </FadeInView>
  );
}

/* FallbackBlock — for incomplete blocks (< 3 projects) */
const FallbackBlock = memo(function FallbackBlock({ projects }: { projects: ProjectItem[] }) {
  return (
    <div className="w-full md:h-135 grid gap-6 grid-cols-1 md:grid-cols-2">
      {projects.map((project, i) => (
        <FadeInView key={project.slug} delay={i * 0.05} className="h-full">
          <ProjectCard
            slug={project.slug}
            title={project.title}
            category={project.category}
            thumbnail={project.thumbnail}
          />
        </FadeInView>
      ))}
    </div>
  );
});

/* Block1 — Split Top: 40/60 top, 100 bottom */
const Block1 = memo(function Block1({ projects }: { projects: ProjectItem[] }) {
  const [a, b, c] = projects;
  return (
    <div className="grid grid-cols-1 md:grid-cols-10 md:grid-rows-2 gap-6 h-full">
      {a && (
        <div className="md:col-span-4 md:row-start-1">{card(a, 0)}</div>
      )}
      {b && (
        <div className="md:col-span-6 md:col-start-5 md:row-start-1">
          {card(b, 0.05)}
        </div>
      )}
      {c && (
        <div className="md:col-span-10 md:row-start-2">{card(c, 0.1)}</div>
      )}
    </div>
  );
});

/* Block2 — Left Stack: 50/50 left, 50 right */
const Block2 = memo(function Block2({ projects }: { projects: ProjectItem[] }) {
  const [a, b, c] = projects;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-6 h-full">
      {a && <div className="md:col-start-1 md:row-start-1">{card(a, 0)}</div>}
      {b && <div className="md:col-start-1 md:row-start-2">{card(b, 0.05)}</div>}
      {c && <div className="md:col-start-2 md:row-span-2">{card(c, 0.1)}</div>}
    </div>
  );
});

/* Block3 — Split Bottom: 100 top, 60/40 bottom */
const Block3 = memo(function Block3({ projects }: { projects: ProjectItem[] }) {
  const [a, b, c] = projects;
  return (
    <div className="grid grid-cols-1 md:grid-cols-10 md:grid-rows-2 gap-6 h-full">
      {a && (
        <div className="md:col-span-10 md:row-start-1">{card(a, 0)}</div>
      )}
      {b && (
        <div className="md:col-span-6 md:row-start-2">{card(b, 0.1)}</div>
      )}
      {c && (
        <div className="md:col-span-4 md:col-start-7 md:row-start-2">
          {card(c, 0.05)}
        </div>
      )}
    </div>
  );
});

/* Block4 — Right Stack: 50 left, 50/50 right */
const Block4 = memo(function Block4({ projects }: { projects: ProjectItem[] }) {
  const [a, b, c] = projects;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-6 h-full">
      {a && <div className="md:col-start-2 md:row-start-1">{card(a, 0)}</div>}
      {b && <div className="md:col-start-2 md:row-start-2">{card(b, 0.05)}</div>}
      {c && <div className="md:col-start-1 md:row-span-2">{card(c, 0.1)}</div>}
    </div>
  );
});

/* VideoBlock — 3 columns */
const VideoBlock = memo(function VideoBlock({ projects }: { projects: ProjectItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-24">
      {projects.map((project, i) => (
        <div key={project.slug} className="aspect-9/16">
          {card(project, i * 0.05)}
        </div>
      ))}
    </div>
  );
});

/* VideoFallback — always 3 columns, empty slots get a placeholder */
const VideoFallback = memo(function VideoFallback({ projects }: { projects: ProjectItem[] }) {
  const slots = [0, 1, 2] as const;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-24">
      {slots.map((i) => {
        const project = projects[i];
        return project ? (
          <div key={project.slug} className="aspect-9/16">
            {card(project, i * 0.05)}
          </div>
        ) : (
          <div
            key={`empty-${i}`}
            className="aspect-9/16 bg-surface rounded-lg flex items-center justify-center"
          >
            <span className="text-xs uppercase tracking-widest text-muted">
              Próximo Proyecto
            </span>
          </div>
        );
      })}
    </div>
  );
});

const BLOCK_RENDERERS = [Block1, Block2, Block3, Block4];

function splitIntoBlocks(
  projects: ProjectItem[],
  blockSizes: number[],
): ProjectItem[][] {
  const blocks: ProjectItem[][] = [];
  let cursor = 0;
  let blockIdx = 0;
  while (cursor < projects.length) {
    const size = blockSizes[blockIdx % blockSizes.length];
    blocks.push(projects.slice(cursor, cursor + size));
    cursor += size;
    blockIdx++;
  }
  return blocks;
}

function renderBlock(
  projects: ProjectItem[],
  blockIndex: number,
  startBlock: number,
) {
  if (projects.length < 3) {
    return <FallbackBlock projects={projects} />;
  }
  const Comp =
    BLOCK_RENDERERS[(blockIndex + startBlock) % BLOCK_RENDERERS.length];
  return <Comp projects={projects} />;
}

export default function ProjectGrid({
  projects,
  startBlock = 0,
  variant = "default",
}: {
  projects: ProjectItem[];
  startBlock?: number;
  variant?: "default" | "video";
}) {
  const [visibleCount, setVisibleCount] = useState(1);
  const allBlocks = useMemo(() => {
    const sizes = variant === "video" ? [3] : BLOCK_SIZES;
    return splitIntoBlocks(projects, sizes);
  }, [projects, variant]);
  const totalBlocks = allBlocks.length;
  const hasMore = visibleCount < totalBlocks;

  return (
    <div className="space-y-6">
      {allBlocks.slice(0, visibleCount).map((blockProjects, index) => (
        <div key={index}>
          {variant === "video" ? (
            <div>
              {blockProjects.length < 3 ? (
                <VideoFallback projects={blockProjects} />
              ) : (
                <VideoBlock projects={blockProjects} />
              )}
            </div>
          ) : (
            <div className={blockProjects.length < 3 ? "" : "md:h-270"}>
              {renderBlock(blockProjects, index, startBlock)}
            </div>
          )}
        </div>
      ))}

      {hasMore ? (
        <div className="relative flex justify-center pt-16 md:pt-24">
          <button
            onClick={() => setVisibleCount((prev) => prev + 1)}
            className="group relative border border-white/20 px-10 py-4 text-sm uppercase tracking-widest text-foreground/60 transition-all duration-300 hover:border-white hover:text-foreground"
          >
            Ver Más
            <span className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
