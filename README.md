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

Produces a fully static export in `.next/`.

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
│   ├── page.tsx                   # Home page — hero, about, 6 project sections, contact
│   └── projects/
│       └── [slug]/
│           └── page.tsx           # SSG project detail page
├── components/
│   ├── FadeInView.tsx             # Scroll-triggered fade-in wrapper
│   ├── Footer.tsx                 # Copyright footer
│   ├── Header.tsx                 # Auto-hiding nav + mobile hamburger overlay
│   ├── LogoCarousel.tsx           # Draggable horizontal logo scroller
│   ├── ProjectCard.tsx            # Image card with hover zoom + overlay
│   ├── ProjectGrid.tsx            # Block renderer with "See More" pagination
│   └── SmoothScrollProvider.tsx   # Lenis smooth scroll context
└── data/
    ├── logotypes.ts               # Logo type definitions + helpers
    ├── mock-logos.ts              # Mock logo entries
    ├── mock-projects.ts           # 10 mock projects across 4 sections
    └── projects.ts                # Project interface + query helpers
```

## Customization

### Projects

Edit [`src/data/mock-projects.ts`](src/data/mock-projects.ts) to add, remove, or update portfolio items. Each project belongs to a `section` (`branding`, `social-media`, `flyers`, `audiovisual`) and includes a `slug`, `title`, `description`, `thumbnail`, and `image` path.

> [!TIP]
> Place project images in `public/images/projects/` and reference them as `/images/projects/<filename>`.

### Logos

Edit [`src/data/mock-logos.ts`](src/data/mock-logos.ts) to replace logo entries. Place logo SVGs or images in `public/assets/logos`.

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

The output in `.next/` can be served with `pnpm start` or exported for any static file server.
