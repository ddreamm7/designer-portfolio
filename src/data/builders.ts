// ---------------------------------------------------------------------------
// Gallery builders — shared by branding & social data files.
// This file contains ALL structural logic (kind maps, path generation,
// aspect defaults). The data files only define interfaces + arrays.
// ---------------------------------------------------------------------------

const IMG_EXT = ".webp";
const VIDEO_EXT = ".webm";

// ---- Branding -----------------------------------------------------------

export interface BrandingGallerySpec {
  /** Slug del proyecto, carpeta destino ej. "dsumar" */
  slug: string;
  label: string;
  /** Número de items: genera item-1.webp … item-N.webp */
  items: number;
}

export interface BrandingAsset {
  src: string;
  alt: string;
}

export function buildBrandingGallery(spec: BrandingGallerySpec): BrandingAsset[] {
  const gallery: BrandingAsset[] = [];
  for (let i = 1; i <= spec.items; i++) {
    gallery.push({
      src: `/assets/branding/${spec.slug}/item-${i}${IMG_EXT}`,
      alt: `${spec.label} — ${i}`,
    });
  }
  return gallery;
}

// ---- Social -------------------------------------------------------------

export type SocialAssetKind =
  | "banner"
  | "post"
  | "flyer"
  | "reel"
  | "logo"
  | "mockup";

export interface SocialAsset {
  src: string;
  alt: string;
  kind: SocialAssetKind;
  caption?: string;
  aspect?: "square" | "16/9" | "32/9" | "9/16";
  poster?: string;
  videoSrc?: string;
}

const KIND_ASPECT: Record<SocialAssetKind, NonNullable<SocialAsset["aspect"]>> = {
  banner: "32/9",
  post: "square",
  reel: "9/16",
  logo: "square",
  flyer: "9/16",
  mockup: "16/9",
};

const KIND_LABEL: Record<SocialAssetKind, string> = {
  banner: "Banner",
  post: "Post",
  reel: "Reel",
  logo: "Logo",
  flyer: "Flyer",
  mockup: "Mockup",
};

// Orden editorial: banners → mockups → posts → reels → logos → flyers
const KIND_ORDER: SocialAssetKind[] = [
  "banner",
  "mockup",
  "post",
  "reel",
  "logo",
  "flyer",
];

export interface SocialGallerySpec {
  /** Carpeta base del caso, ej. "/assets/social/md" */
  base: string;
  /** Nombre corto para el alt, ej. "MD" */
  label: string;
  banners?: number;
  posts?: number;
  mockups?: number;
  reels?: number;
  logos?: number;
  flyers?: number;
}

export function buildSocialGallery(spec: SocialGallerySpec): SocialAsset[] {
  const counts: Record<SocialAssetKind, number> = {
    banner: spec.banners ?? 0,
    post: spec.posts ?? 0,
    mockup: spec.mockups ?? 0,
    reel: spec.reels ?? 0,
    logo: spec.logos ?? 0,
    flyer: spec.flyers ?? 0,
  };
  const gallery: SocialAsset[] = [];
  for (const kind of KIND_ORDER) {
    const count = counts[kind];
    for (let i = 1; i <= count; i++) {
      if (kind === "reel") {
        const poster = `${spec.base}/reels/reel-${i}${IMG_EXT}`;
        gallery.push({
          src: poster,
          alt: `${spec.label} — Reel ${i}`,
          kind,
          aspect: KIND_ASPECT[kind],
          poster,
          videoSrc: `${spec.base}/reels/reel-${i}${VIDEO_EXT}`,
        });
      } else {
        gallery.push({
          src: `${spec.base}/${kind}s/${kind}-${i}${IMG_EXT}`,
          alt: `${spec.label} — ${KIND_LABEL[kind]} ${i}`,
          kind,
          aspect: KIND_ASPECT[kind],
        });
      }
    }
  }
  return gallery;
}
