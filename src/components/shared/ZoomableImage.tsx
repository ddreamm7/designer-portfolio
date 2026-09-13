"use client";

import { useState } from "react";
import Image from "next/image";
import ImageModal from "./ImageModal";

interface ZoomableImageProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  wrapperClassName?: string;
  priority?: boolean;
}

/**
 * Imagen con modal de tamaño completo al hacer click.
 * Para páginas server (detalle de proyecto, cover social).
 */
export default function ZoomableImage({
  src,
  alt,
  sizes,
  className,
  wrapperClassName,
  priority = false,
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Ver imagen ampliada: ${alt}`}
        className={`block h-full w-full cursor-zoom-in ${wrapperClassName ?? ""}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={className}
        />
      </button>
      {open && (
        <ImageModal src={src} alt={alt} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
