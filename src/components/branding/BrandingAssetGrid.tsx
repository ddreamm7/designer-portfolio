"use client";

import type { BrandingAsset } from "@/data/branding_projects";
import BrandingMasonryGrid from "./BrandingMasonryGrid";

/**
 * Wrapper de compatibilidad: delega a BrandingMasonryGrid (Pinterest masonry).
 * Mantiene el nombre/import existente usado por BrandingCasePage.
 */
export default function BrandingAssetGrid({ assets }: { assets: BrandingAsset[] }) {
  return <BrandingMasonryGrid assets={assets} desktopColumns={3} />;
}
