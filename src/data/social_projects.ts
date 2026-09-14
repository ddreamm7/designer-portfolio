import {
  buildSocialGallery,
  type SocialAsset,
} from "./builders";

// Re-export for consumers (SocialAssetGrid, SocialCasePage, etc.)
export type { SocialAsset, SocialAssetKind } from "./builders";

export interface SocialProject {
  slug: string;
  title: string;
  year: string;
  section: "social";
  thumbnail: string;
  description: string;
  cover: string;
  subtitle: string;
  palette: string[];
  gallery: SocialAsset[];
}

export const socialProjects: SocialProject[] = [
  {
    slug: "md",
    title: "MD Lash Factor",
    year: "2024",
    section: "social",
    cover: "/assets/social/md/md.webp",
    thumbnail: "/assets/social/md/md.webp",
    subtitle: "Sérum de Pestañas",
    palette: ["#7c8ca5", "#c5eafb", "#ffffff"],
    description: "Diseño y desarrollo de contenido visual para redes sociales, incluyendo posts, banners, reels y carruseles, orientados a fortalecer la identidad de marca, potenciar la comunicación visual y generar mayor interacción con la audiencia.",
    gallery: buildSocialGallery({
      base: "/assets/social/md",
      label: "MD",
      banners: 3,
      posts: 8,
      reels: 5,
    }),
  },
  {
    slug: "dermanet",
    title: "DERMANET",
    year: "2024",
    section: "social",
    cover: "/assets/social/dermanet/dermanet.webp",
    thumbnail: "/assets/social/dermanet/dermanet.webp",
    subtitle: "Productos Dermatológicos",
    palette: ["#6fa1d8", "#3b38c6", "#ffffff"],
    description: "Diseño y creación de contenido visual para redes sociales, desarrollando posts, banners y reels alineados con la identidad de marca. El proyecto busca fortalecer su presencia digital mediante una comunicación visual clara, atractiva y consistente.",
    gallery: buildSocialGallery({
      base: "/assets/social/dermanet",
      label: "Dermanet",
      banners: 4,
      mockups: 2,
      posts: 8,
      reels: 2,
    }),
  },
];

export function getSocialBySlug(slug: string): SocialProject | undefined {
  return socialProjects.find((p) => p.slug === slug);
}
