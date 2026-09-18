"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

// Unificado para reúso en GalleryGrid (branding/social) y resto del sitio.
// Uso: <FadeInView delay={Math.min(index*0.035, 0.35)}> via GalleryGrid.Item
interface FadeInViewProps {
  children: ReactNode;
  className?: string;
  delay?: number; // segundos, cap recomendado 0.35
}

export default function FadeInView({
  children,
  className = "",
  delay = 0,
}: FadeInViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: "-100px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
