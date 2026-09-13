export type BrandingPieceKind = "banner" | "flyer" | "post" | "mockup";

export const BRANDING_KIND_LABELS: Record<BrandingPieceKind, string> = {
  banner: "Banner",
  flyer: "Flyer",
  post: "Post",
  mockup: "Mockup",
};

export interface BrandingAsset {
  src: string;
  alt: string;
  kind: BrandingPieceKind;
  aspect?: "square" | "16/9" | "32/9" | "9/16";
  /** Dimensiones intrínsecas para masonry (evita CLS y permite ratio natural) */
  width?: number;
  height?: number;
}

export interface BrandingPiece {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  section: "branding";
  kind: BrandingPieceKind;
  thumbnail: string;
  image: string;
  description: string;
  /** Cover para hero de detalle; fallback a `image` si no se define */
  cover?: string;
  /** Galería multi-asset; si existe, el detalle usa layout de caso */
  gallery?: BrandingAsset[];
}

// --- Generador de galerías branding (kind → slug) ---
const IMG_EXT = ".webp";

const KIND_PLURAL: Record<BrandingPieceKind, string> = {
  banner: "banners",
  flyer: "flyers",
  post: "posts",
  mockup: "mockups",
};

const KIND_ASPECT: Record<BrandingPieceKind, BrandingAsset["aspect"]> = {
  banner: "16/9",
  flyer: "9/16",
  post: "square",
  mockup: "16/9",
};

const KIND_LABEL: Record<BrandingPieceKind, string> = {
  banner: "Banner",
  flyer: "Flyer",
  post: "Post",
  mockup: "Mockup",
};

export interface BrandingGallerySpec {
  /** Slug del proyecto, carpeta destino ej. "dsumar" */
  slug: string;
  label: string;
  banners?: number;
  flyers?: number;
  posts?: number;
  mockups?: number;
}

export function buildBrandingGallery(spec: BrandingGallerySpec): BrandingAsset[] {
  const counts: Record<BrandingPieceKind, number> = {
    banner: spec.banners ?? 0,
    flyer: spec.flyers ?? 0,
    post: spec.posts ?? 0,
    mockup: spec.mockups ?? 0,
  };
  const order: BrandingPieceKind[] = ["banner", "mockup", "post", "flyer"];
  const gallery: BrandingAsset[] = [];
  for (const kind of order) {
    const count = counts[kind];
    for (let i = 1; i <= count; i++) {
      const plural = KIND_PLURAL[kind];
      gallery.push({
        src: `/assets/branding/${plural}/${spec.slug}/${kind}-${i}${IMG_EXT}`,
        alt: `${spec.label} — ${KIND_LABEL[kind]} ${i}`,
        kind,
        aspect: KIND_ASPECT[kind],
      });
    }
  }
  return gallery;
}

export const brandingPieces: BrandingPiece[] = [
  // BRANDING — Banners
  {
    slug: "dsumar",
    title: "D'Sumar",
    subtitle: "Campaña digital",
    year: "2025",
    section: "branding",
    kind: "banner",
    thumbnail: "/assets/branding/banners/dsumar/banner-6.webp",
    image: "/assets/branding/banners/dsumar/banner-6.webp",
    cover: "/assets/branding/banners/dsumar/banner-6.webp",
    description:
      "Banner publicitario para campaña digital. Composición de alto impacto optimizada para múltiples formatos y plataformas.",
    gallery: buildBrandingGallery({
      slug: "dsumar",
      label: "D'Sumar",
      banners: 9,
    }),
  },
  {
    slug: "excelencia-grill",
    title: "EXCELENCIA GRILL",
    subtitle: "Pollería",
    year: "2025",
    section: "branding",
    kind: "banner",
    thumbnail: "/assets/branding/banners/excelencia-grill/banner-1.webp",
    image: "/assets/branding/banners/excelencia-grill/banner-1.webp",
    cover: "/assets/branding/banners/excelencia-grill/banner-1.webp",
    description:
      "Desarrollo de branding e identidad visual para Excelencia Grill. La propuesta gráfica se construyó a partir de una paleta en rojo y amarillo, buscando transmitir fuerza, energía y una personalidad visual llamativa, acorde con el concepto gastronómico de la marca.",
    gallery: buildBrandingGallery({
      slug: "excelencia-grill",
      label: "Excelencia Grill",
      banners: 1,
    }),
  },
  {
    slug: "banner-campana-3",
    title: "Banner Campaña 3",
    subtitle: "Campaña digital",
    year: "2025",
    section: "branding",
    kind: "banner",
    thumbnail: "/assets/branding/banners/banner-3.webp",
    image: "/assets/branding/banners/banner-3.webp",
    description:
      "Banner publicitario para campaña digital. Composición de alto impacto optimizada para múltiples formatos y plataformas.",
  },
  // BRANDING — Flyers
  {
    slug: "flyer-festival-neon",
    title: "Festival Neon Nights",
    subtitle: "Festival de música",
    year: "2025",
    section: "branding",
    kind: "flyer",
    thumbnail: "/assets/branding/flyers/flyer-1.webp",
    image: "/assets/branding/flyers/flyer-1.webp",
    description:
      "Diseño de flyer para un festival de música electrónica. El diseño utiliza degradados vibrantes y tipografía sans-serif audaz para capturar la energía del evento.",
  },
  {
    slug: "flyer-gallery-opening",
    title: "Inauguración de Galería",
    subtitle: "Arte contemporáneo",
    year: "2025",
    section: "branding",
    kind: "flyer",
    thumbnail: "/assets/branding/flyers/flyer-2.webp",
    image: "/assets/branding/flyers/flyer-2.webp",
    description:
      "Flyer minimalista para la inauguración de una galería de arte contemporáneo. El uso contenido del color y el amplio espacio en blanco reflejan la filosofía curatorial de la galería.",
  },
  {
    slug: "flyer-charity-gala",
    title: "Gala Benéfica",
    subtitle: "Evento benéfico",
    year: "2025",
    section: "branding",
    kind: "flyer",
    thumbnail: "/assets/branding/flyers/flyer-3.webp",
    image: "/assets/branding/flyers/flyer-3.webp",
    description:
      "Diseño elegante de flyer para una gala benéfica anual, con detalles en dorado y tipografía serif para transmitir sofisticación y propósito.",
  },
  {
    slug: "flyer-food-market",
    title: "Mercado de Comida Callejera",
    subtitle: "Mercado gastronómico",
    year: "2025",
    section: "branding",
    kind: "flyer",
    thumbnail: "/assets/branding/flyers/flyer-4.webp",
    image: "/assets/branding/flyers/flyer-4.webp",
    description:
      "Flyer lúdico e ilustrado para un mercado de comida callejera de fin de semana. El lettering artesanal y los colores cálidos atraen a un público cercano y comunitario.",
  },
  // BRANDING — Posts
  {
    slug: "social-campaign-bloom",
    title: "Campaña Bloom",
    subtitle: "Cosmética natural",
    year: "2025",
    section: "branding",
    kind: "post",
    thumbnail: "/assets/branding/posts/post-1.webp",
    image: "/assets/branding/posts/post-1.webp",
    description:
      "Campaña de redes sociales multiplataforma para Bloom Cosmetics, con carruseles, historias y reels diseñados para maximizar la interacción.",
  },
  {
    slug: "social-campaign-pulse",
    title: "Lanzamiento Pulse Fitness",
    subtitle: "App fitness",
    year: "2025",
    section: "branding",
    kind: "post",
    thumbnail: "/assets/branding/posts/post-2.webp",
    image: "/assets/branding/posts/post-2.webp",
    description:
      "Campaña de lanzamiento para la app Pulse Fitness en Instagram y TikTok. Tipografía audaz y composiciones dinámicas impulsaron un aumento del 340% en registros.",
  },
  {
    slug: "social-roast-co",
    title: "Contenido Roast & Co.",
    subtitle: "Café de especialidad",
    year: "2025",
    section: "branding",
    kind: "post",
    thumbnail: "/assets/branding/posts/post-3.webp",
    image: "/assets/branding/posts/post-3.webp",
    description:
      "Estrategia y diseño continuo de contenido en redes sociales para una marca de café de especialidad, construyendo un feed visual cohesivo en todas las plataformas.",
  },
];

export function getBrandingPieceBySlug(slug: string): BrandingPiece | undefined {
  return brandingPieces.find((p) => p.slug === slug);
}
