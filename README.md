<div align="center">

# Creative Portfolio

**Minimalist dark-theme portfolio for a graphic designer & content editor**

Built with [Next.js](https://nextjs.org) 16, [React](https://react.dev) 19, [TypeScript](https://www.typescriptlang.org) 5, [Tailwind CSS](https://tailwindcss.com) 4, [Framer Motion](https://www.framer.com/motion), and [Lenis](https://lenis.darkroom.engineering).

[Getting started](#getting-started) • [Project structure](#project-structure) • [Customization](#customization) • [Deployment](#deployment)

</div>

A single-page portfolio website that showcases creative work across branding, social media, flyers, logotypes, and audiovisual projects. Features an asymmetric masonry grid, smooth scrolling, scroll-driven fade-in animations, and dedicated project detail pages.

## Features

- **Asymmetric masonry grid** — 4 rotating block layouts that cycle per section, making every project showcase feel unique
- **Progressive content loading** — "See More" buttons reveal additional project blocks on demand
- **Draggable logo carousel** — Horizontal drag-to-scroll gallery for logotypes
- **Auto-hiding header** — Sticky navigation that hides on scroll-down velocity and reappears on scroll-up, with active section tracking
- **Mobile hamburger menu** — Full-screen overlay with animated nav items and staggered link appearance
- **Smooth scrolling** — Lenis-powered smooth wheel scroll, resets to top on route change
- **Scroll-triggered animations** — Sections and project cards fade in once via `whileInView` (Framer Motion)
- **Project detail pages** — Dynamic route (`projects/[slug]`) with `generateStaticParams` for fully static generation
- **Dark minimal theme** — Custom color palette (near-black background, lavender accent), Geist typography
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
│   ├── branding/BrandingSection.tsx # Branding filters + LogoGrid
│   ├── gallery/{ProjectGrid,LogoGrid,ProjectCard}.tsx
│   ├── layout/{Header,Footer,SmoothScrollProvider,ThemeProvider}.tsx
│   └── shared/{FadeInView,ShowMoreButton}.tsx
└── data/
    ├── branding_projects.ts       # BrandingPiece[] (banner|flyer|post|mockup)
    ├── logos_projects.ts          # LogoProject[] for logotipos filter
    ├── social_projects.ts         # SocialProject[] + buildSocialGallery helper
    └── audiovisual_projects.ts    # AudiovisualProject[]
public/
├── assets/
│   ├── branding/{banners,flyers,posts,mockups,logotipos}/ # Branding assets
│   ├── social/<project>/{banners,posts,mockups,reels,logos,flyers}/ # Social assets
│   └── home/{logo-white/black.webp,hero_logo.webp,favicon-*.ico} # Site identity
└── images/placeholder.svg         # Fallback
```

## Customization

### Branding

Edit [`src/data/branding_projects.ts`](src/data/branding_projects.ts) to add, remove, or update branding pieces. Each piece has `kind` (`banner` | `flyer` | `post` | `mockup`), plus `slug`, `title`, `year`, `thumbnail`, `image`, `description`.

> [!TIP]
> Place branding images in `public/assets/branding/<kind>/` where `<kind>` is `banners`, `flyers`, `posts`, `mockups`, or `logotipos`, and reference them as `/assets/branding/<kind>/<file>.webp`.

### Logos (Branding — Logotipos)

Edit [`src/data/logos_projects.ts`](src/data/logos_projects.ts) to replace logo entries. Place logo images in `public/assets/branding/logotipos/` and reference them as `/assets/branding/logotipos/<file>.webp` (used by the `logotipos` filter in `BrandingSection`).

### Social & Audiovisual

- **Social:** edit [`src/data/social_projects.ts`](src/data/social_projects.ts) — assets live in `public/assets/social/<project>/{banners,posts,mockups,reels,logos,flyers}/`
- **Audiovisual:** edit [`src/data/audiovisual_projects.ts`](src/data/audiovisual_projects.ts)

### Content & copy

- **Hero / About / Contact text** — edit directly in [`src/app/page.tsx`](src/app/page.tsx)
- **Social links** — the Contact section (around line 158) contains the list of social URLs
- **Email** — update the `mailto:href` in the Contact section (line 148)
- **Meta tags** — edit the `metadata` export in [`src/app/layout.tsx`](src/app/layout.tsx)

### Theme colors

The custom color palette is defined in [`src/app/globals.css`](src/app/globals.css) under the `@theme inline` block:

| Token | Default | Description |
|---|---|---|
| `--color-background` | `#050505` | Page background |
| `--color-surface` | `#0f0f0f` | Card / surface background |
| `--color-foreground` | `#fafafa` | Text color |
| `--color-muted` | `#a3a3a3` | Secondary text |
| `--color-subtle` | `#525252` | Subtle text / icons |
| `--color-border` | `#1d1d1d` | Section separators |
| `--color-accent` | `#cba6f7` | Selection highlight |

### Block layouts

The 4 rotating grid layouts are defined in [`src/components/ProjectGrid.tsx`](src/components/ProjectGrid.tsx) as `Block1`–`Block4`. Each renders 3 projects in a different asymmetric arrangement. The cycle offset per section is set via the `startBlock` prop in [`src/app/page.tsx`](src/app/page.tsx).

## Deployment

The site is a fully static Next.js app and can be deployed to any static hosting provider.

### Deploy to Vercel

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new)

### Build locally for static hosting

```bash
pnpm build
```

The output in `out/` can be served with `pnpm start` (`npx serve out`) or exported for any static file server.
