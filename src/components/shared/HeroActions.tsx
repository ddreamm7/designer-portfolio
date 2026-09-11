"use client";

import { useLenis } from "@/components/layout/SmoothScrollProvider";

export default function HeroActions() {
  const { lenis } = useLenis();

  const handleClick =
    (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;
      if (lenis) lenis.scrollTo(el, { duration: 1.8 });
      else el.scrollIntoView({ behavior: "smooth" });
    };

  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <a
        href="#branding"
        onClick={handleClick("branding")}
        className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium tracking-wide text-background transition-colors hover:bg-foreground/90"
      >
        Ver proyectos →
      </a>
      <a
        href="#contact"
        onClick={handleClick("contact")}
        className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium tracking-wide text-foreground transition-colors hover:bg-surface"
      >
        Contacto
      </a>
    </div>
  );
}
