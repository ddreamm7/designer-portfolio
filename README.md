<div align="center">

# Creative Portfolio

**Minimalist dark-theme portfolio for a graphic designer & content editor**

Built with [Next.js](https://nextjs.org) 16, [React](https://react.dev) 19, [TypeScript](https://www.typescriptlang.org) 5, [Tailwind CSS](https://tailwindcss.com) 4, [Framer Motion](https://www.framer.com/motion), and [Lenis](https://lenis.darkroom.engineering).

[Getting started](#getting-started) • [Project structure](#project-structure) • [Customization](#customization) • [Deployment](#deployment)

</div>

A single-page portfolio website that showcases creative work across branding, social media, and audiovisual projects. Features a symmetric bento grid, smooth scrolling, scroll-driven fade-in animations, and dedicated project detail pages.

## Features

- **Symmetric bento grid** — Rotating block layouts that cycle per section, with `HoverShade` overlay on project cards
- **Progressive content loading** — "See More" buttons reveal additional project blocks on demand
- **Auto-hiding header** — Sticky navigation that hides on scroll-down velocity and reappears on scroll-up, with active section tracking
- **Mobile hamburger menu** — Full-screen overlay with animated nav items and staggered link appearance
- **Smooth scrolling** — Lenis-powered smooth wheel scroll, resets to top on route change via Lenis API
- **Scroll-triggered animations** — Sections and project cards fade in once via `whileInView` (Framer Motion)
- **Project detail pages** — Dynamic route (`projects/[slug]`) with `generateStaticParams` for fully static generation
- **Dark/Light theme** — Custom color palette with CSS variable-based theme transitions, persisted in localStorage
- **Zoomable images** — Click-to-zoom on project detail images via `ZoomableImage` component
- **No runtime dependencies** — Fully static site, zero API or backend requirements

## Built with

| | |
|---|---|
| **Framework** | [Next.js](https://nextjs.org) 16 |
| **UI Library** | [React](https://react.dev) 19 |
| **Animation** | [Framer Motion](https://www.framer.com/motion) 12 |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering) 1 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) 4 |
| **Language** | [TypeScript](https://www.typescriptlang.org) 5 |
| **Package Manager** | [pnpm](https://pnpm.io) |
| **Linting** | [ESLint](https://eslint.org) 9 |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) 20+
- [pnpm](https://pnpm.io/installation)

### Install

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
pnpm build
```

Produces a fully static export in `out/` (`next.config.ts` sets `output: "export"`).

### Lint

```bash
pnpm lint
```

### Typecheck

```bash
npx tsc --noEmit
```

## Project structure

```
src/
├── app/
│   ├── globals.css               # Tailwind v4 theme tokens, reset, scrollbar styles
│   ├── layout.tsx                 # Root layout — fonts, Lenis provider, header, footer
│   ├── page.tsx                   # Home page — hero, about, social, branding, audiovisual, contact
│   └── projects/
│       └── [slug]/
│           └── page.tsx           # SSG project detail page (generateStaticParams)
├── components/
│   ├── branding/
│   │   ├── BrandingCasePage.tsx   # Branding detail page (single-column)
│   │   ├── BrandingGalleryGrid.tsx # Bento gallery layout for branding
│   │   └── BrandingSection.tsx    # Branding section on home page
│   ├── gallery/
│   │   ├── ProjectCard.tsx        # Reusable project card with HoverShade
│   │   └── ProjectGrid.tsx        # Main page grid with Block1-Block4 layouts
│   ├── layout/
│   │   ├── Header.tsx             # Auto-hiding sticky header + mobile nav
│   │   ├── Footer.tsx
│   │   ├── SmoothScrollProvider.tsx # Lenis wrapper with route-change scroll reset
│   │   ├── ThemeProvider.tsx       # Dark/light toggle, persisted in localStorage
│   │   └── ThemeToggle.tsx
│   ├── shared/
│   │   ├── FadeInView.tsx         # Scroll-triggered fade-in wrapper
│   │   ├── HeroActions.tsx        # CTA buttons in hero section
│   │   ├── HoverShade.tsx         # Shared hover overlay (bg-black/0 → group-hover:bg-black/10)
│   │   ├── ImageModal.tsx         # Fullscreen image viewer
│   │   ├── ShowMoreButton.tsx     # Progressive reveal button
│   │   └── ZoomableImage.tsx      # Click-to-zoom image wrapper
│   └── social/
│       ├── SocialAssetGrid.tsx    # Social asset grid with HoverShade
│       ├── SocialCasePage.tsx     # Social detail page (grouped by kind)
│       ├── SocialReelCard.tsx     # Reel card with video poster
│       ├── SocialSection.tsx      # Social section on home page
│       └── SocialSectionNav.tsx   # Kind-based navigation for social details
└── data/
    ├── builders.ts                # Shared gallery builders (buildBrandingGallery, buildSocialGallery)
    ├── branding_projects.ts       # BrandingPiece[] + getBrandingPieceBySlug
    ├── social_projects.ts         # SocialProject[] + getSocialBySlug
    └── audiovisual_projects.ts    # AudiovisualProject[] + getAudiovisualBySlug
public/
├── assets/
│   ├── branding/<slug>/           # <slug>.webp (cover) + item-1.webp … item-N.webp
│   ├── social/<project>/{banners,posts,mockups,reels,logos,flyers}/ # <kind>-<n>.webp
│   └── home/                      # Site identity: logo-white/black.webp, hero_logo.webp, favicons
└── images/placeholder.svg         # Fallback
```

## Customization

### Branding

Edit [`src/data/branding_projects.ts`](src/data/branding_projects.ts) to add, remove, or update branding pieces. Each piece has `slug`, `title`, `subtitle`, `year`, `section`, `thumbnail`, `description`, and an optional `gallery` built via `buildBrandingGallery({ slug, label, items })`.

> [!TIP]
> Place branding images in `public/assets/branding/<slug>/` where the cover is `<slug>.webp` and gallery items are `item-1.webp` through `item-N.webp`.

### Social

Edit [`src/data/social_projects.ts`](src/data/social_projects.ts). Assets live in `public/assets/social/<project>/{banners,posts,mockups,reels,logos,flyers}/` and follow the naming pattern `<kind>-<n>.webp` (or `.webm` for reels).

### Audiovisual

Edit [`src/data/audiovisual_projects.ts`](src/data/audiovisual_projects.ts).

### Content & copy

- **Hero / About / Contact text** — edit directly in [`src/app/page.tsx`](src/app/page.tsx)
- **Social links** — the Contact section contains the list of social URLs
- **Email** — update the `mailto:href` in the Contact section
- **Meta tags** — edit the `metadata` export in [`src/app/layout.tsx`](src/app/layout.tsx)

### Theme colors

The custom color palette is defined in [`src/app/globals.css`](src/app/globals.css) under the `@theme` block:

| Token | Default | Description |
|---|---|---|
| `--color-background` | `#050505` | Page background |
| `--color-surface` | `#0f0f0f` | Card / surface background |
| `--color-foreground` | `#fafafa` | Text color |
| `--color-muted` | `#a3a3a3` | Secondary text |
| `--color-subtle` | `#525252` | Subtle text / icons |
| `--color-border` | `#1d1d1d` | Section separators |
| `--color-accent` | `#ffffff` | Selection highlight |

Light theme overrides are under the `.light` class in the same file.

### Block layouts

The 4 rotating grid layouts are defined in [`src/components/gallery/ProjectGrid.tsx`](src/components/gallery/ProjectGrid.tsx) as `Block1`–`Block4`. Each renders projects in a different asymmetric arrangement. The cycle offset per section is set via the `startBlock` prop in [`src/app/page.tsx`](src/app/page.tsx).

## Deployment

The site is a fully static Next.js app and can be deployed to any static hosting provider.

### Deploy to Vercel

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new)

### Build locally for static hosting

```bash
pnpm build
```

The output in `out/` can be served with `pnpm start` (`npx serve out`) or exported for any static file server.
