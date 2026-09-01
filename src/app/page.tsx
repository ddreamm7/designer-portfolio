import FadeInView from "@/components/FadeInView";
import LogoCarousel from "@/components/LogoCarousel";
import ProjectGrid from "@/components/ProjectGrid";
import { getLogos } from "@/data/logotypes";
import { getProjectsBySection } from "@/data/projects";

const SOCIAL_LINKS = [
  { name: "Instagram", href: "https://instagram.com" },
  { name: "LinkedIn", href: "https://linkedin.com" },
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

function ProjectSection({
  section,
  startBlock = 0,
  variant = "default",
}: {
  section: string;
  startBlock?: number;
  variant?: "default" | "video";
}) {
  const items = getProjectsBySection(section);
  return (
    <ProjectGrid
      projects={items}
      startBlock={startBlock}
      variant={variant}
    />
  );
}

export default function HomePage() {
  return (
    <main>
      {/* 00 HERO */}
      <section id="hero" className="flex min-h-screen items-center px-6 md:px-16 lg:px-48">
        <FadeInView>
          <div>
            <p className="mb-4 text-sm font-mono uppercase tracking-widest text-muted">
              Diseñadora Gráfica y Editora de Contenido
            </p>
            <h1 className="text-6xl font-bold leading-none tracking-tighter md:text-8xl lg:text-9xl">
              Portfolio
              <br />
              Creativo
            </h1>
            <p className="mt-8 max-w-md text-lg text-muted">
                Una colección curada de trabajos de branding, redes sociales, diseño
              impreso y audiovisual.
            </p>
          </div>
        </FadeInView>
      </section>

      {/* 01 ABOUT */}
      <section id="about" className="px-6 py-16 md:py-24 md:px-16 lg:px-48">
        <FadeInView>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="text-sm font-mono font-medium text-muted">01</span>
              <p className="mb-3 mt-1 text-sm font-mono uppercase tracking-widest text-muted">
                Sobre Mí
              </p>
              <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                Diseñadora y<br />Creadora de Contenido
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <p className="text-lg leading-relaxed text-muted">
                Con formación en diseño gráfico y edición de contenidos, creo
                identidades visuales que comunican con claridad y propósito.
                Cada proyecto es una oportunidad para destilar ideas complejas en
                un diseño limpio y memorable.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Me especializo en branding, diseño editorial, estrategia de redes
                sociales y producción audiovisual, siempre guiada por un
                compromiso con el trabajo intencional y cuidado al detalle.
              </p>
              <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-sm uppercase tracking-widest text-muted">
                <span>Branding</span>
                <span>Editorial</span>
                <span>Redes Sociales</span>
                <span>Audiovisual</span>
              </div>
            </div>
          </div>
        </FadeInView>
      </section>

      {/* 02 BRANDING */}
      <section id="branding" className="px-6 py-16 md:py-24 md:px-16 lg:px-48">
        <SectionHeader number="02" title="Branding" />
        <ProjectSection section="branding" startBlock={0} />
      </section>

      {/* 03 SOCIAL MEDIA */}
      <section id="social-media" className="px-6 py-16 md:py-24 md:px-16 lg:px-48">
        <SectionHeader number="03" title="Redes Sociales" />
        <ProjectSection section="social-media" startBlock={1} />
      </section>

      {/* 04 FLYERS */}
      <section id="flyers" className="px-6 py-16 md:py-24 md:px-16 lg:px-48">
        <SectionHeader number="04" title="Flyers" />
        <ProjectSection section="flyers" startBlock={2} />
      </section>

      {/* 05 LOGOFOLIO */}
      <section id="logofolio" className="px-6 py-16 md:py-24 md:px-16 lg:px-48">
        <SectionHeader number="05" title="Logofolio" />
        <LogoCarousel logos={getLogos()} />
      </section>

      {/* 06 AUDIOVISUAL */}
      <section id="audiovisual" className="px-6 py-16 md:py-24 md:px-16 lg:px-48">
        <SectionHeader number="06" title="Audiovisual" />
        <ProjectSection section="audiovisual" variant="video" />
      </section>

      {/* 07 CONTACT */}
      <footer id="contact" className="px-6 py-16 md:py-24 md:px-16 lg:px-48">
        <FadeInView>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <span className="text-sm font-mono font-medium text-muted">07</span>
              <h2 className="mt-1 text-4xl font-bold uppercase tracking-tight md:text-5xl">
                Contacto
              </h2>
              <p className="mt-4 max-w-md text-muted">
                Disponible para proyectos freelance, dirección creativa y
                colaboraciones. Creemos algo extraordinario juntos.
              </p>
              <a
                href="mailto:hello@designer.com"
                className="mt-6 inline-block text-lg font-medium text-muted transition-colors hover:text-foreground"
              >
                hello@designer.com
              </a>
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
