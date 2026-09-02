export type AssetKind = "banner" | "post" | "flyer" | "reel" | "logo";

export interface BrandAsset {
  src: string;
  alt: string;
  kind: AssetKind;
  caption?: string;
  aspect?: "square" | "portrait" | "landscape" | "wide" | "9/16";
  poster?: string;
  videoSrc?: string;
}

interface BaseProject {
  slug: string;
  title: string;
  category: string;
  section: string;
  thumbnail: string;
  description: string;
}

export interface SimpleProject extends BaseProject {
  section: string;
  image: string;
  portrait?: string;
}

export interface BrandingProject extends BaseProject {
  section: "branding";
  cover: string;
  subtitle: string;
  palette: string[];
  year: string;
  gallery: BrandAsset[];
}

export type Project = SimpleProject | BrandingProject;

export function isBrandingProject(project: Project): project is BrandingProject {
  return project.section === "branding" && "gallery" in project;
}

export const projects: Project[] = [
  // BRANDING
  {
    slug: "md",
    title: "MD Lash Factor",
    category: "Branding",
    section: "branding",
    cover: "/assets/brandings/md/md.png",
    thumbnail: "/assets/brandings/md/md.png",
    subtitle: "Sérum de pestañas",
    palette: ["#7c8ca5", "#c5eafb", "#ffffff"],
    year: "2024",
    description: "Diseño y desarrollo de contenido visual para redes sociales, incluyendo posts, banners, reels y carruseles, orientados a fortalecer la identidad de marca, potenciar la comunicación visual y generar mayor interacción con la audiencia.",
    gallery: [
      { src: "/assets/brandings/md/banners/banner_1.png", alt: "MD — Banner 1", kind: "banner", aspect: "wide" },
      { src: "/assets/brandings/md/banners/banner_2.png", alt: "MD — Banner 2", kind: "banner", aspect: "wide" },
      { src: "/assets/brandings/md/banners/banner_3.png", alt: "MD — Banner 3", kind: "banner", aspect: "wide" },
      { src: "/assets/brandings/md/posts/post_1.png", alt: "MD — Post 1", kind: "post", aspect: "square" },
      { src: "/assets/brandings/md/posts/post_2.png", alt: "MD — Post 2", kind: "post", aspect: "square" },
      { src: "/assets/brandings/md/posts/post_3.png", alt: "MD — Post 3", kind: "post", aspect: "square" },
      { src: "/assets/brandings/md/posts/post_4.png", alt: "MD — Post 4", kind: "post", aspect: "square" },
      { src: "/assets/brandings/md/posts/post_5.png", alt: "MD — Post 5", kind: "post", aspect: "square" },
      { src: "/assets/brandings/md/posts/post_6.png", alt: "MD — Post 6", kind: "post", aspect: "square" },
      { src: "/assets/brandings/md/posts/post_7.png", alt: "MD — Post 7", kind: "post", aspect: "square" },
      { src: "/assets/brandings/md/posts/post_8.png", alt: "MD — Post 8", kind: "post", aspect: "square" },
      { src: "/assets/brandings/md/reels/reel_1.mp4", alt: "MD — Reel 1", kind: "reel", aspect: "9/16", poster: "/assets/brandings/md/reels/reel_1.png", videoSrc: "/assets/brandings/md/reels/reel_1.mp4" },
      { src: "/assets/brandings/md/reels/reel_2.mp4", alt: "MD — Reel 2", kind: "reel", aspect: "9/16", poster: "/assets/brandings/md/reels/reel_2.png", videoSrc: "/assets/brandings/md/reels/reel_2.mp4" },
      { src: "/assets/brandings/md/reels/reel_3.mp4", alt: "MD — Reel 3", kind: "reel", aspect: "9/16", poster: "/assets/brandings/md/reels/reel_3.png", videoSrc: "/assets/brandings/md/reels/reel_3.mp4" },
      { src: "/assets/brandings/md/reels/reel_4.mp4", alt: "MD — Reel 4", kind: "reel", aspect: "9/16", poster: "/assets/brandings/md/reels/reel_4.png", videoSrc: "/assets/brandings/md/reels/reel_4.mp4" },
    ],
  },
  // SOCIAL MEDIA
  {
    slug: "social-campaign-bloom",
    title: "Campaña Bloom",
    category: "Redes Sociales",
    section: "social-media",
    thumbnail: "/images/placeholder.svg",
    image: "/images/placeholder.svg",
    description:
      "Campaña de redes sociales multiplataforma para Bloom Cosmetics, con carruseles, historias y reels diseñados para maximizar la interacción.",
  },
  {
    slug: "social-campaign-pulse",
    title: "Lanzamiento Pulse Fitness",
    category: "Redes Sociales",
    section: "social-media",
    thumbnail: "/images/placeholder.svg",
    image: "/images/placeholder.svg",
    description:
      "Campaña de lanzamiento para la app Pulse Fitness en Instagram y TikTok. Tipografía audaz y composiciones dinámicas impulsaron un aumento del 340% en registros.",
  },
  {
    slug: "social-roast-co",
    title: "Contenido Roast & Co.",
    category: "Redes Sociales",
    section: "social-media",
    thumbnail: "/images/placeholder.svg",
    image: "/images/placeholder.svg",
    description:
      "Estrategia y diseño continuo de contenido en redes sociales para una marca de café de especialidad, construyendo un feed visual cohesivo en todas las plataformas.",
  },
  // FLYERS
  {
    slug: "flyer-festival-neon",
    title: "Festival Neon Nights",
    category: "Flyers",
    section: "flyers",
    thumbnail: "/images/placeholder.svg",
    image: "/images/placeholder.svg",
    description:
      "Diseño de flyer para un festival de música electrónica. El diseño utiliza degradados vibrantes y tipografía sans-serif audaz para capturar la energía del evento.",
  },
  {
    slug: "flyer-gallery-opening",
    title: "Inauguración de Galería",
    category: "Flyers",
    section: "flyers",
    thumbnail: "/images/placeholder.svg",
    image: "/images/placeholder.svg",
    description:
      "Flyer minimalista para la inauguración de una galería de arte contemporáneo. El uso contenido del color y el amplio espacio en blanco reflejan la filosofía curatorial de la galería.",
  },
  {
    slug: "flyer-charity-gala",
    title: "Gala Benéfica",
    category: "Flyers",
    section: "flyers",
    thumbnail: "/images/placeholder.svg",
    image: "/images/placeholder.svg",
    description:
      "Diseño elegante de flyer para una gala benéfica anual, con detalles en dorado y tipografía serif para transmitir sofisticación y propósito.",
  },
  {
    slug: "flyer-food-market",
    title: "Mercado de Comida Callejera",
    category: "Flyers",
    section: "flyers",
    thumbnail: "/images/placeholder.svg",
    image: "/images/placeholder.svg",
    description:
      "Flyer lúdico e ilustrado para un mercado de comida callejera de fin de semana. El lettering artesanal y los colores cálidos atraen a un público cercano y comunitario.",
  },
  // AUDIOVISUAL
  {
    slug: "video-reel-2024",
    title: "Showreel 2024",
    category: "Audiovisual",
    section: "audiovisual",
    thumbnail: "/images/placeholder.svg",
    image: "/images/placeholder.svg",
    description:
      "Showreel curado de motion design con secuencias de títulos, animaciones de logotipos y contenido de vídeo promocional producido durante 2024.",
  },
  {
    slug: "video-brand-anthem",
    title: "Himno de Marca Terra",
    category: "Audiovisual",
    section: "audiovisual",
    thumbnail: "/images/placeholder.svg",
    image: "/images/placeholder.svg",
    description:
      "Vídeo himno de marca de 60 segundos para Terra Organics, que combina tomas de dron, planos macro y tipografía cinética.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsBySection(section: string): Project[] {
  return projects.filter((p) => p.section === section);
}
