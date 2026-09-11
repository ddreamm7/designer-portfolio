export type BrandingPieceKind = "banner" | "flyer" | "post" | "mockup";

export interface BrandingPiece {
  slug: string;
  title: string;
  year: string;
  section: "branding";
  kind: BrandingPieceKind;
  thumbnail: string;
  image: string;
  description: string;
}

export const brandingPieces: BrandingPiece[] = [
  // BRANDING — Banners
  {
    slug: "banner-campana-1",
    title: "Banner Campaña 1",
    year: "2025",
    section: "branding",
    kind: "banner",
    thumbnail: "/images/placeholder.svg",
    image: "/images/placeholder.svg",
    description:
      "Banner publicitario para campaña digital. Composición de alto impacto optimizada para múltiples formatos y plataformas.",
  },
  {
    slug: "banner-campana-2",
    title: "Banner Campaña 2",
    year: "2025",
    section: "branding",
    kind: "banner",
    thumbnail: "/images/placeholder.svg",
    image: "/images/placeholder.svg",
    description:
      "Banner publicitario para campaña digital. Composición de alto impacto optimizada para múltiples formatos y plataformas.",
  },
  {
    slug: "banner-campana-3",
    title: "Banner Campaña 3",
    year: "2025",
    section: "branding",
    kind: "banner",
    thumbnail: "/images/placeholder.svg",
    image: "/images/placeholder.svg",
    description:
      "Banner publicitario para campaña digital. Composición de alto impacto optimizada para múltiples formatos y plataformas.",
  },
  // BRANDING — Flyers
  {
    slug: "flyer-festival-neon",
    title: "Festival Neon Nights",
    year: "2025",
    section: "branding",
    kind: "flyer",
    thumbnail: "/images/placeholder.svg",
    image: "/images/placeholder.svg",
    description:
      "Diseño de flyer para un festival de música electrónica. El diseño utiliza degradados vibrantes y tipografía sans-serif audaz para capturar la energía del evento.",
  },
  {
    slug: "flyer-gallery-opening",
    title: "Inauguración de Galería",
    year: "2025",
    section: "branding",
    kind: "flyer",
    thumbnail: "/images/placeholder.svg",
    image: "/images/placeholder.svg",
    description:
      "Flyer minimalista para la inauguración de una galería de arte contemporáneo. El uso contenido del color y el amplio espacio en blanco reflejan la filosofía curatorial de la galería.",
  },
  {
    slug: "flyer-charity-gala",
    title: "Gala Benéfica",
    year: "2025",
    section: "branding",
    kind: "flyer",
    thumbnail: "/images/placeholder.svg",
    image: "/images/placeholder.svg",
    description:
      "Diseño elegante de flyer para una gala benéfica anual, con detalles en dorado y tipografía serif para transmitir sofisticación y propósito.",
  },
  {
    slug: "flyer-food-market",
    title: "Mercado de Comida Callejera",
    year: "2025",
    section: "branding",
    kind: "flyer",
    thumbnail: "/images/placeholder.svg",
    image: "/images/placeholder.svg",
    description:
      "Flyer lúdico e ilustrado para un mercado de comida callejera de fin de semana. El lettering artesanal y los colores cálidos atraen a un público cercano y comunitario.",
  },
  // BRANDING — Posts
  {
    slug: "social-campaign-bloom",
    title: "Campaña Bloom",
    year: "2025",
    section: "branding",
    kind: "post",
    thumbnail: "/images/placeholder.svg",
    image: "/images/placeholder.svg",
    description:
      "Campaña de redes sociales multiplataforma para Bloom Cosmetics, con carruseles, historias y reels diseñados para maximizar la interacción.",
  },
  {
    slug: "social-campaign-pulse",
    title: "Lanzamiento Pulse Fitness",
    year: "2025",
    section: "branding",
    kind: "post",
    thumbnail: "/images/placeholder.svg",
    image: "/images/placeholder.svg",
    description:
      "Campaña de lanzamiento para la app Pulse Fitness en Instagram y TikTok. Tipografía audaz y composiciones dinámicas impulsaron un aumento del 340% en registros.",
  },
  {
    slug: "social-roast-co",
    title: "Contenido Roast & Co.",
    year: "2025",
    section: "branding",
    kind: "post",
    thumbnail: "/images/placeholder.svg",
    image: "/images/placeholder.svg",
    description:
      "Estrategia y diseño continuo de contenido en redes sociales para una marca de café de especialidad, construyendo un feed visual cohesivo en todas las plataformas.",
  },
];

export function getBrandingPieceBySlug(slug: string): BrandingPiece | undefined {
  return brandingPieces.find((p) => p.slug === slug);
}
