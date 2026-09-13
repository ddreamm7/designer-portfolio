"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "@/components/layout/SmoothScrollProvider";

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

/**
 * Modal simple de imagen a tamaño completo.
 * Fondo oscuro dimmed, imagen centrada con `object-contain`.
 * Cierra con click en el backdrop, botón X o tecla Escape.
 */
export default function ImageModal({ src, alt, onClose }: ImageModalProps) {
  const { stop, start } = useLenis();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    stop();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      start();
    };
  }, [onClose, stop, start]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm md:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar imagen ampliada"
        className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-xl leading-none text-white transition-colors hover:bg-white/20"
      >
        <span aria-hidden>×</span>
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="eager"
        decoding="async"
        onClick={(e) => e.stopPropagation()}
        className="modal-content max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
      />
    </div>,
    document.body,
  );
}
