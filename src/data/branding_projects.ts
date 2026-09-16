import {
  buildBrandingGallery,
  type BrandingAsset,
} from "./builders";

// Re-export for consumers (BrandingGalleryGrid, BrandingCasePage, etc.)
export type { BrandingAsset };

export interface BrandingPiece {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  section: "branding";
  /** Cover exclusivo de la marca: /assets/branding/<slug>/<slug>.webp */
  thumbnail: string;
  description: string;
  /** Galería multi-asset; si existe, el detalle usa layout de caso */
  gallery?: BrandingAsset[];
}

export const brandingPieces: BrandingPiece[] = [
  {
    slug: "dsumar",
    title: "D'Sumar",
    subtitle: "Conservas de Pescado.",
    year: "2025",
    section: "branding",
    thumbnail: "/assets/branding/dsumar/dsumar.webp",
    description:
      "Proyecto de branding e identidad visual para una marca especializada en conservas de pescado. Se desarrolló una propuesta gráfica inspirada en la frescura y esencia del mar, buscando transmitir una imagen cercana, atractiva y consistente en sus diferentes aplicaciones.",
    gallery: buildBrandingGallery({
      slug: "dsumar",
      label: "D'Sumar",
      items: 10,
    }),
  },
  {
    slug: "excelencia-grill",
    title: "EXCELENCIA GRILL",
    subtitle: "Pollería",
    year: "2025",
    section: "branding",
    thumbnail: "/assets/branding/excelencia-grill/excelencia-grill.webp",
    description:
      "Desarrollo de branding e identidad visual para Excelencia Grill. La propuesta gráfica se construyó a partir de una paleta en rojo y amarillo, buscando transmitir fuerza, energía y una personalidad visual llamativa, acorde con el concepto gastronómico de la marca.",
    gallery: buildBrandingGallery({
      slug: "excelencia-grill",
      label: "Excelencia Grill",
      items: 8,
    }),
  },
];

export function getBrandingPieceBySlug(slug: string): BrandingPiece | undefined {
  return brandingPieces.find((p) => p.slug === slug);
}
