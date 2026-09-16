# AGENTS.md

Static single-page portfolio for a graphic designer. Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS v4, Framer Motion, Lenis. **pnpm** is the package manager (a `pnpm-lock.yaml` exists; never use npm/yarn).

## Commands

- Install: `pnpm install`
- Dev server: `pnpm dev` (http://localhost:3000)
- Lint: `pnpm lint` (ESLint 9 flat config, `eslint.config.mjs`)
- Build: `pnpm build` (static export)
- Serve the static build: `pnpm start` (`npx serve out`)
- Typecheck: `npx tsc --noEmit` (there is no `typecheck` script; `next build` also type-checks)

There is **no test suite** in this repo.

## Static export constraints (critical)

`next.config.ts` sets `output: "export"` with `images.unoptimized: true`. The build emits a fully static site to **`out/`** (not `.next/`). Consequences:

- No API routes, no SSR/ISR, no runtime `next/image` optimization, no server-side features. `next/image` still works but serves files verbatim from `public/`.
- The dynamic route `src/app/projects/[slug]/page.tsx` is prerendered via `generateStaticParams` (wired to all data arrays). Every slug must exist in the data or that page won't be generated.
- When adding routes, favor static generation; verify with `pnpm build`.

## Data-driven content

Portfolio content lives in `src/data/` — agents edit data, not JSX, to change content:

- `branding_projects.ts` — `BrandingPiece[]`. Each piece has `slug`, `title`, `subtitle`, `year`, `section`, `thumbnail`, `description`, and an optional `gallery` built via `buildBrandingGallery`.
- `social_projects.ts` — `SocialProject[]`. Each has `slug`, `title`, `year`, `section`, `cover`, `thumbnail`, `subtitle`, `palette`, `description`, and `gallery` built via `buildSocialGallery`.
- `audiovisual_projects.ts` — `AudiovisualProject[]` with `slug`, `title`, `year`, `section`, `thumbnail`, `image`, `description`.
- `builders.ts` — Shared gallery builder logic (`buildBrandingGallery`, `buildSocialGallery`), kind maps, and constants. Both branding and social data files import from here.

### Adding a new project

1. Add image assets to `public/assets/` (see paths below).
2. Add the entry to the corresponding `src/data/*_projects.ts`.
3. If it's a branding project, add the slug to `generateStaticParams` in `src/app/projects/[slug]/page.tsx` (it already spreads all data arrays, so just adding to the data file is enough).
4. Verify with `pnpm build`.

### Image asset paths

- **Branding**: `public/assets/branding/<slug>/` — cover is `<slug>.webp`, gallery items are `item-1.webp` … `item-N.webp`. Referenced as `/assets/branding/<slug>/<file>.webp`.
- **Social**: `public/assets/social/<project>/{banners,posts,mockups,reels,logos,flyers}/` — files follow `<kind>-<n>.webp` (or `.webm` for reels). Referenced as `/assets/social/<project>/<kind>s/<kind>-<n>.ext`.
- **Home/brand**: `public/assets/home/` — site identity (`logo-white.webp`, `logo-black.webp`, `hero_logo.webp`, favicons).

## Theming / styling quirks

- Tailwind v4 is configured **in CSS**, not via a config file. Theme tokens (`--color-background`, `--color-accent`, etc.) are defined in the `@theme` block in `src/app/globals.css`. Add/change colors there.
- Light theme overrides are under the `.light` class (toggled on `<html>`).
- Theme transitions use CSS custom properties (`--theme-transition-property`, `--theme-transition-duration`, `--theme-transition-timing`) applied to `html *`. Tailwind utilities can override duration/timing when present.
- `body { background-color }` (not `background` shorthand) to align with the transition-property list.
- `postcss.config.mjs` uses only `@tailwindcss/postcss` (v4 plugin).
- `@/*` path alias maps to `src/*` (`tsconfig.json`).

## Layout / animation notes

- `SmoothScrollProvider.tsx` (Lenis) wraps the app in `src/app/layout.tsx`. Scroll position resets to top on route change via `lenis.scrollTo(0, { immediate: true, force: true })` — using Lenis's API instead of `window.scrollTo` so the internal scroll state is also cleared.
- Scroll-driven reveals use Framer Motion `whileInView`.
- `FadeInView` is a reusable scroll-triggered fade-in wrapper (`transition-[opacity,transform] duration-1000`).
- `HoverShade` is a shared hover overlay (`bg-black/0 → group-hover:bg-black/10 duration-300`) used on `ProjectCard`, `SocialAssetGrid`, `BrandingGalleryGrid`, and `SocialReelCard`.
- The 4 rotating asymmetric grid layouts are `Block1`–`Block4` in `src/components/gallery/ProjectGrid.tsx`; per-section cycle offset is set via the `startBlock` prop in `src/app/page.tsx`.
- Header auto-hides on scroll direction and tracks active section; mobile nav is a full-screen overlay.

## Build and deployment

- `vercel.json` configures clean URLs, long-lived image/font caching, and security headers for Vercel static hosting. The `build` script targets Vercel's static output.
- Deployable to any static host: `pnpm build` then serve the `out/` directory.
- `pnpm-workspace.yaml` only lists `allowBuilds` for `sharp` and `unrs-resolver` — required so postinstall scripts run; keep them.
