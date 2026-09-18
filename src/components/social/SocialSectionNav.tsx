"use client";

const LABELS: Record<string, string> = {
  banner: "Banners",
  post: "Posts",
  reel: "Reels",
  mockup: "Mockups",
};

export default function SocialSectionNav({ kinds }: { kinds: string[] }) {
  const handleClick =
    (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth" });
    };

  if (kinds.length === 0) return null;

  return (
      <nav className="sticky top-[72px] z-20 -mx-6 border-y border-border bg-background px-6 py-5 md:mx-0 md:top-[64px] md:px-0">
      <div className="flex items-center justify-start gap-8 overflow-x-auto pb-1 scrollbar-none mask-linear-to-r from-transparent via-black to-transparent md:justify-center md:gap-10 md:mask-none">
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
