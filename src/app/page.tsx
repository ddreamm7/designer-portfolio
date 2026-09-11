import Image from "next/image";
import FadeInView from "@/components/shared/FadeInView";
import HeroActions from "@/components/shared/HeroActions";
import ProjectGrid from "@/components/gallery/ProjectGrid";
import SocialSection from "@/components/social/SocialSection";
import BrandingSection from "@/components/branding/BrandingSection";
import { audiovisualProjects } from "@/data/audiovisual_projects";


const SOCIAL_LINKS = [
  { name: "Instagram", href: "https://www.instagram.com/dayanap.designer" },
  { name: "Facebook", href: "https://www.facebook.com/dayanapgdesigner" },
  { name: "Behance", href: "https://behance.net/dayanadesigner4" },
] as const;

const SOFTWARES = [
  { label: "Photoshop", abbr: "Ps" },
  { label: "Illustrator", abbr: "Ai" },
  { label: "InDesign", abbr: "Id" },
  { label: "Premiere Pro", abbr: "Pr" },
  { label: "After Effects", abbr: "Ae" },
  { label: "Lightroom", abbr: "Lr" },
  { label: "CapCut", abbr: "Cc" },
] as const;

function SectionHeader({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <FadeInView>
      <div className="mb-12 flex items-baseline gap-4">
        <span className="text-sm font-mono font-medium text-muted">{number}</span>
        <h2 className="text-4xl font-bold uppercase tracking-tight md:text-5xl">
          {title}
        </h2>
      </div>
    </FadeInView>
  );
}

function ProjectSection() {
  return <ProjectGrid projects={audiovisualProjects} />;
}

export default function HomePage() {
  return (
    <main>
      {/* 00 HERO */}
      <section
        id="hero"
        className="relative grid min-h-dvh grid-cols-1 content-center gap-10 overflow-hidden px-6 py-24 md:grid-cols-2 md:gap-0 md:px-16 md:py-10 lg:px-48"
      >
        <FadeInView className="flex items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[11px] tracking-widest text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              Perú
            </span>
            <h1 className="mt-4 text-6xl font-bold leading-none tracking-tighter md:text-7xl lg:text-8xl">
              Dayana
              <br />
              Pumajulca
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Branding, redes sociales, diseño gráfico y audiovisual.
            </p>
            <HeroActions />
          </div>
        </FadeInView>
        <FadeInView className="flex items-center justify-center md:items-stretch">
          <div className="relative flex w-full items-center justify-center overflow-hidden rounded-[40px] py-4 md:h-full md:rounded-[48px] md:py-0">
            <Image
              src="/assets/home/hero_logo.webp"
              alt="Hero logo"
              width={2250}
              height={1500}
              className="h-auto w-full max-w-130 overflow-hidden rounded-[40px] object-contain md:h-full md:max-h-dvh md:w-full md:max-w-none md:rounded-[48px] md:object-contain"
              priority
              sizes="(max-width: 768px) 90vw, 50vw"
            />
          </div>
        </FadeInView>
      </section>

      {/* 01 ABOUT */}
      <section id="about" className="px-6 py-16 md:py-24 md:px-16 lg:px-48">
        <FadeInView>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="text-sm font-mono font-medium text-muted">01</span>
              <h2 className="mt-1 text-4xl font-bold uppercase tracking-tight md:text-5xl">
                Diseñadora
                <br />
                Gráfica y Audiovisual
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <p className="text-lg leading-relaxed text-muted">
                Hola soy Dayana y soy Diseñadora Gráfica con experiencia en agencias y proyectos digitales. Responsable, organizada y comprometida con la calidad del trabajo.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Enfocada en diseño para redes sociales, branding y edición de contenido audiovisual. Actualmente, me encuentro en constante crecimiento profesional, con el objetivo de seguir ampliando mis conocimientos.
              </p>

              <div className="mt-10 border-t border-border pt-6">
                <p className="mb-3 text-xs font-mono uppercase tracking-widest text-subtle">
                  Softwares
                </p>
                <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
                  {SOFTWARES.map((sw) => (
                    <li key={sw.label} className="text-sm tracking-wide text-muted">
                      <span className="font-mono text-xs text-subtle">{sw.abbr}</span>
                      <span className="mx-1.5 text-border">·</span>
                      {sw.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FadeInView>
      </section>

      {/* 02 REDES SOCIALES */}
      <section id="redes-sociales" className="px-6 py-16 md:py-24 md:px-16 lg:px-48">
        <SocialSection />
      </section>

      {/* 03 BRANDING */}
      <section id="branding" className="px-6 py-16 md:py-24 md:px-16 lg:px-48">
        <BrandingSection />
      </section>

      {/* 04 AUDIOVISUAL */}
      <section id="audiovisual" className="px-6 py-16 md:py-24 md:px-16 lg:px-48">
        <SectionHeader number="04" title="Audiovisual" />
        <ProjectSection />
      </section>

      {/* 05 CONTACT */}
      <footer id="contact" className="px-6 py-16 md:py-24 md:px-16 lg:px-48">
        <FadeInView>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <span className="text-sm font-mono font-medium text-muted">05</span>
              <h2 className="mt-1 text-4xl font-bold uppercase tracking-tight md:text-5xl">
                Contacto
              </h2>
              <p className="mt-4 max-w-md text-muted">
                Disponible para proyectos freelance, dirección creativa y
                colaboraciones. Creemos algo extraordinario juntos.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="tel:+51964322491"
                  className="inline-flex items-center gap-2 text-sm tracking-wide text-muted transition-colors hover:text-foreground"
                >
                  <span className="text-subtle">T</span> +51 964 322 491
                </a>
                <a
                  href="mailto:dayanap.designer@gmail.com"
                  className="inline-flex items-center gap-2 text-sm tracking-wide text-muted transition-colors hover:text-foreground"
                >
                  <span className="text-subtle">@</span> dayanap.designer@gmail.com
                </a>
              </div>
            </div>
            <div className="md:col-span-5 md:col-start-8 md:flex md:flex-col md:justify-end">
              <p className="mb-4 text-sm font-mono uppercase tracking-widest text-muted">
                Social
              </p>
              <div className="flex flex-col gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border-b border-border pb-3 text-sm uppercase tracking-widest text-muted transition-colors hover:text-foreground"
                  >
                    <span>{link.name}</span>
                    <span className="text-subtle transition-colors group-hover:text-foreground">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </FadeInView>
      </footer>
    </main>
  );
}
