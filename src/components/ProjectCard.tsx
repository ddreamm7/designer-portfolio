"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  slug: string;
  title: string;
  category: string;
  thumbnail: string;
}

function ProjectCard({
  slug,
  title,
  category,
  thumbnail,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`}>
      <div className="group cursor-pointer flex flex-col h-full">
        <div className="relative overflow-hidden rounded-lg bg-surface flex-1 min-h-[180px]">
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/50" />
        </div>
        <div className="mt-4">
          <p className="text-xs uppercase tracking-widest text-muted">
            {category}
          </p>
          <h3 className="mt-1 text-lg font-semibold">{title}</h3>
        </div>
      </div>
    </Link>
  );
}

export default memo(ProjectCard);
