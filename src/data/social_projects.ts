export type SocialAssetKind = "banner" | "post" | "flyer" | "reel" | "logo";

export interface SocialAsset {
  src: string;
  alt: string;
  kind: SocialAssetKind;
  caption?: string;
  aspect?: "square" | "portrait" | "landscape" | "wide" | "9/16";
  poster?: string;
  videoSrc?: string;
}

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

export function isSocialProject(
  project: SocialProject | { section: string },
): project is SocialProject {
  return project.section === "social" && "gallery" in project;
}

// --- Generador de galerías (escalable) ---
// Cambiar de formato en el futuro = editar solo estas dos constantes.
const IMG_EXT = ".webp";
const VIDEO_EXT = ".webm";

const KIND_ASPECT: Record<SocialAssetKind, NonNullable<SocialAsset["aspect"]>> = {
  banner: "wide",
  post: "square",
  reel: "9/16",
  logo: "square",
  flyer: "portrait",
};

const KIND_LABEL: Record<SocialAssetKind, string> = {
  banner: "Banner",
  post: "Post",
  reel: "Reel",
  logo: "Logo",
  flyer: "Flyer",
};

// Orden editorial: banners → posts → reels → logos → flyers
const KIND_ORDER: SocialAssetKind[] = ["banner", "post", "reel", "logo", "flyer"];

export interface SocialGallerySpec {
  /** Carpeta base del caso, ej. "/assets/social/md" */
  base: string;
  /** Nombre corto para el alt, ej. "MD" */
  label: string;
  banners?: number;
  posts?: number;
  reels?: number;
  logos?: number;
  flyers?: number;
}

export function buildSocialGallery(spec: SocialGallerySpec): SocialAsset[] {
  const counts: Record<SocialAssetKind, number> = {
    banner: spec.banners ?? 0,
    post: spec.posts ?? 0,
    reel: spec.reels ?? 0,
    logo: spec.logos ?? 0,
    flyer: spec.flyers ?? 0,
  };
  const gallery: SocialAsset[] = [];
  for (const kind of KIND_ORDER) {
    const count = counts[kind];
    for (let i = 1; i <= count; i++) {
      if (kind === "reel") {
        const poster = `${spec.base}/reels/reel_${i}${IMG_EXT}`;
        gallery.push({
          src: poster,
          alt: `${spec.label} — Reel ${i}`,
          kind,
          aspect: KIND_ASPECT[kind],
          poster,
          videoSrc: `${spec.base}/reels/reel_${i}${VIDEO_EXT}`,
        });
      } else {
        gallery.push({
          src: `${spec.base}/${kind}s/${kind}_${i}${IMG_EXT}`,
          alt: `${spec.label} — ${KIND_LABEL[kind]} ${i}`,
          kind,
          aspect: KIND_ASPECT[kind],
        });
      }
    }
  }
  return gallery;
}

export const socialProjects: SocialProject[] = [
  {
    slug: "md",
    title: "MD Lash Factor",
    year: "2024",
    section: "social",
    cover: "/assets/social/md/md.webp",
    thumbnail: "/assets/social/md/md.webp",
    subtitle: "Sérum de pestañas",
    palette: ["#7c8ca5", "#c5eafb", "#ffffff"],
    description: "Diseño y desarrollo de contenido visual para redes sociales, incluyendo posts, banners, reels y carruseles, orientados a fortalecer la identidad de marca, potenciar la comunicación visual y generar mayor interacción con la audiencia.",
    gallery: buildSocialGallery({
      base: "/assets/social/md",
      label: "MD",
      banners: 3,
      posts: 8,
      reels: 4,
    }),
  },
];

export function getSocialBySlug(slug: string): SocialProject | undefined {
  return socialProjects.find((p) => p.slug === slug);
}
