"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  slug: string;
  title: string;
  year: string;
  thumbnail: string;
  variant?: "default" | "large";
}

function ProjectCard({
  slug,
  title,
  year,
  thumbnail,
  variant = "default",
}: ProjectCardProps) {
  const isLarge = variant === "large";

  return (
    <Link href={`/projects/${slug}`} className={isLarge ? "block h-full" : undefined}>
      <div className="group cursor-pointer flex flex-col h-full">
        <div
          className={
            isLarge
              ? "relative overflow-hidden rounded-lg bg-surface aspect-[16/9]"
              : "relative overflow-hidden rounded-lg bg-surface flex-1 min-h-[180px]"
          }
        >
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes={
              isLarge
                ? "(max-width: 768px) 100vw, 50vw"
                : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            }
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="mt-4">
          <p className="text-xs uppercase tracking-widest text-muted">
            {year}
          </p>
          <h3 className="mt-1 text-lg font-semibold">{title}</h3>
        </div>
      </div>
    </Link>
  );
}

export default memo(ProjectCard);
