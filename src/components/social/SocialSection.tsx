"use client";

import { useState } from "react";
import FadeInView from "@/components/shared/FadeInView";
import ShowMoreButton from "@/components/shared/ShowMoreButton";
import ProjectCard from "@/components/gallery/ProjectCard";
import { socialProjects } from "@/data/social_projects";

const SOCIAL_PAGE_SIZE = 4;

export default function SocialSection() {
  const [visibleCount, setVisibleCount] = useState(SOCIAL_PAGE_SIZE);
  const hasMore = visibleCount < socialProjects.length;

  return (
    <div>
      <FadeInView>
        <div className="mb-12 flex items-baseline gap-4">
          <span className="text-sm font-mono font-medium text-muted">02</span>
          <h2 className="text-4xl font-bold uppercase tracking-tight md:text-5xl">
            Redes Sociales
          </h2>
        </div>
      </FadeInView>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {socialProjects.slice(0, visibleCount).map((project, i) => (
          <FadeInView key={project.slug} delay={i * 0.05} className="h-full">
            <ProjectCard
              slug={project.slug}
              title={project.title}
              year={project.year}
              thumbnail={project.thumbnail}
              variant="large"
            />
          </FadeInView>
        ))}
      </div>

      {hasMore ? (
        <ShowMoreButton
          onClick={() => setVisibleCount((prev) => prev + SOCIAL_PAGE_SIZE)}
        />
      ) : null}
    </div>
  );
}
