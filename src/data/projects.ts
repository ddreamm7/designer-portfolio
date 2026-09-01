export interface Project {
  slug: string;
  title: string;
  category: string;
  section: string;
  thumbnail: string;
  image: string;
  description: string;
}

import { projects } from "./mock-projects";
export { projects };

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsBySection(section: string): Project[] {
  return projects.filter((p) => p.section === section);
}
