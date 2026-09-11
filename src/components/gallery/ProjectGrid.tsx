"use client";

import { useState, useMemo, memo } from "react";
import FadeInView from "@/components/shared/FadeInView";
import ShowMoreButton from "@/components/shared/ShowMoreButton";
import ProjectCard from "./ProjectCard";

interface ProjectItem {
  slug: string;
  title: string;
  year: string;
  thumbnail: string;
}

function card(project: ProjectItem, delay: number) {
  return (
    <FadeInView key={project.slug} delay={delay} className="h-full">
      <ProjectCard
        slug={project.slug}
        title={project.title}
        year={project.year}
        thumbnail={project.thumbnail}
      />
    </FadeInView>
  );
}

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

function splitIntoBlocks(projects: ProjectItem[]): ProjectItem[][] {
  const blocks: ProjectItem[][] = [];
  for (let cursor = 0; cursor < projects.length; cursor += 3) {
    blocks.push(projects.slice(cursor, cursor + 3));
  }
  return blocks;
}

export default function ProjectGrid({ projects }: { projects: ProjectItem[] }) {
  const [visibleCount, setVisibleCount] = useState(1);
  const allBlocks = useMemo(() => splitIntoBlocks(projects), [projects]);
  const totalBlocks = allBlocks.length;
  const hasMore = visibleCount < totalBlocks;

  return (
    <div className="space-y-6">
      {allBlocks.slice(0, visibleCount).map((blockProjects, index) => (
        <div key={index}>
          {blockProjects.length < 3 ? (
            <VideoFallback projects={blockProjects} />
          ) : (
            <VideoBlock projects={blockProjects} />
          )}
        </div>
      ))}

      {hasMore ? (
        <ShowMoreButton onClick={() => setVisibleCount((prev) => prev + 1)} />
      ) : null}
    </div>
  );
}
