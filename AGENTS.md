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

`next.config.ts` sets `output: "export"` with `images.unoptimized: true`. The build emits a fully static site to **`out/`** (not `.next/` — the README's "output in `.next/`" note is stale). Consequences:

- No API routes, no SSR/ISR, no runtime `next/image` optimization, no server-side features. `next/image` still works but serves files verbatim from `public/`.
- The dynamic route `src/app/projects/[slug]/page.tsx` is prerendered via `generateStaticParams` (wired to `src/data/projects.ts`). Every slug must exist in the data or that page won't be generated.
- When adding routes, favor static generation; verify with `pnpm build`.

## Data-driven content

Portfolio content lives in `src/data/` — agents edit data, not JSX, to change content:

- `mock-projects.ts` — the `Project` array (shape in `projects.ts`). Each item has `slug`, `title`, `category`, `section`, `thumbnail`, `image`, `description`. Sections: `branding`, `social-media`, `flyers`, `audiovisual`.
- `mock-logos.ts` / `logotypes.ts` — logo carousel entries.
- Image assets go under `public/images/projects/` and `public/assets/logos`, referenced as `/images/projects/<file>` etc.

When adding a project, add its image file to `public/` **and** the entry to `mock-projects.ts`, otherwise the build will not pick it up.

## Theming / styling quirks

- Tailwind v4 is configured **in CSS**, not via a config file. Theme tokens (`--color-background`, `--color-accent`, etc.) are defined in the `@theme inline` block in `src/app/globals.css`. Add/change colors there.
- `postcss.config.mjs` uses only `@tailwindcss/postcss` (v4 plugin).
- `@/*` path alias maps to `src/*` (`tsconfig.json`).

## Layout / animation notes

- `SmoothScrollProvider.tsx` (Lenis) wraps the app in `src/app/layout.tsx`; scroll-driven reveals use Framer Motion `whileInView`.
- The 4 rotating asymmetric grid layouts are `Block1`–`Block4` in `src/components/ProjectGrid.tsx`; per-section cycle offset is set via the `startBlock` prop in `src/app/page.tsx`.
- Header auto-hides on scroll direction and tracks active section; mobile nav is a full-screen overlay.

## Deployment

- `vercel.json` configures clean URLs, long-lived image/font caching, and security headers for Vercel static hosting. The `build` script targets Vercel's static output.
- Deployable to any static host: `pnpm build` then serve the `out/` directory.
- `pnpm-workspace.yaml` only lists `allowBuilds` for `sharp` and `unrs-resolver` — required so postinstall scripts run; keep them.
