"use client";

import { useLenis } from "@/components/layout/SmoothScrollProvider";

const LABELS: Record<string, string> = {
  banner: "Banners",
  post: "Posts",
  flyer: "Flyers",
  logo: "Logos",
  reel: "Reels",
  mockup: "Mockups",
};

export default function SocialSectionNav({ kinds }: { kinds: string[] }) {
  const { lenis } = useLenis();

  const handleClick =
    (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;
      if (lenis) lenis.scrollTo(el, { duration: 1.6 });
      else el.scrollIntoView({ behavior: "smooth" });
    };

  if (kinds.length === 0) return null;

  return (
      <nav className="sticky top-[72px] z-20 -mx-6 border-y border-border bg-background px-6 py-5 backdrop-blur-md md:mx-0 md:top-[64px] md:px-0">
      <div className="flex items-center justify-center gap-8 overflow-x-auto scrollbar-subtle md:gap-10">
        {kinds.map((kind) => (
          <a
            key={kind}
            href={`#section-${kind}`}
            onClick={handleClick(`section-${kind}`)}
            className="whitespace-nowrap text-xs uppercase tracking-widest text-muted transition-colors hover:text-foreground"
          >
            {LABELS[kind] ?? kind}
          </a>
        ))}
      </div>
    </nav>
  );
}
