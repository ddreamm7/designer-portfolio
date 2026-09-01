"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "@/components/SmoothScrollProvider";

const NAV_ITEMS = [
  { id: "hero", label: "Inicio" },
  { id: "about", label: "Sobre Mí" },
  { id: "branding", label: "Branding" },
  { id: "social-media", label: "Redes Sociales" },
  { id: "flyers", label: "Flyers" },
  { id: "logofolio", label: "Logofolio" },
  { id: "audiovisual", label: "Audiovisual" },
  { id: "contact", label: "Contacto" },
];

const SCROLL_VELOCITY_THRESHOLD = 1.2;

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { lenis, stop: lenisStop, start: lenisStart } = useLenis();
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    if (menuOpen) lenisStop();
    else lenisStart();
  }, [menuOpen, lenisStop, lenisStart]);

  useEffect(() => () => lenisStart(), [lenisStart]);

  useEffect(() => {
    if (isHome) {
      setActiveSection("hero");
      setVisible(true);
      setMenuOpen(false);
      lenisStart();
      lastScrollYRef.current = window.scrollY;
    } else {
      setMenuOpen(false);
      lenisStart();
      setVisible(true);
    }
  }, [pathname, isHome, lenisStart]);

  useEffect(() => {
    if (!isHome) return;

    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id),
    ).filter(Boolean) as HTMLElement[];

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollYRef.current;
      const goingDown = scrollDiff > 0;

      if (currentScrollY < 100) setVisible(true);
      else if (goingDown && Math.abs(scrollDiff) > SCROLL_VELOCITY_THRESHOLD) setVisible(false);
      else if (!goingDown && Math.abs(scrollDiff) > 0.15) setVisible(true);

      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const scrollPos = scrollY + window.innerHeight * 0.4;
        let current = NAV_ITEMS[0].id;

        for (let i = 0; i < sections.length; i++) {
          const rect = sections[i].getBoundingClientRect();
          const sectionTop = rect.top + scrollY;
          if (sectionTop <= scrollPos) current = NAV_ITEMS[i].id;
        }

        setActiveSection(current);
        lastScrollYRef.current = currentScrollY;
        tickingRef.current = false;
      });
    };

    let off: (() => void) | undefined;
    if (lenis) {
      const onLenisScroll = ({ direction }: { direction: number }) => {
        if (window.scrollY < 100 || direction === -1) setVisible(true);
      };
      lenis.on("scroll", onLenisScroll);
      off = () => lenis.off("scroll", onLenisScroll);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      off?.();
    };
  }, [isHome, lenis]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!isHome) return;
    e.preventDefault();
    lenisStart();
    const element = document.getElementById(id);
    if (!element) return;
    if (lenis) lenis.scrollTo(element, { duration: 2 });
    else element.scrollIntoView({ behavior: "smooth" });
  };

  const toggleMenu = () => {
    if (!isHome) return;
    setMenuOpen((prev) => !prev);
  };

  if (!isHome) {
    return (
      <header
        data-lenis-prevent
        className="fixed top-0 right-0 left-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md pointer-events-none"
      >
        <div className="px-6 py-6 md:px-16 lg:px-48" aria-hidden />
      </header>
    );
  }

  return (
    <>
      <header
        data-lenis-prevent
        className={`fixed top-0 right-0 left-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md transition-transform duration-500 ease-out ${
          visible ? "translate-y-0 pointer-events-auto" : "-translate-y-full pointer-events-none"
        }`}
      >
        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center justify-center gap-6 px-6 py-6 md:px-16 lg:px-48">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className={`group relative whitespace-nowrap text-xs tracking-widest transition-all duration-300 ${
                activeSection === id
                  ? " text-foreground"
                  : "font-medium text-muted hover:text-foreground"
              }`}
            >
              {label}
              <span className="absolute -bottom-1 left-1/2 h-px w-0 bg-foreground transition-all duration-300 -translate-x-1/2 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Mobile header bar */}
        <div className="lg:hidden flex items-center justify-between px-6 md:px-16 py-6">
          <span className="text-xs uppercase tracking-widest text-muted">Portfolio</span>
          <button
            onClick={toggleMenu}
            aria-label={menuOpen ? "Cerrar navegación" : "Abrir navegación"}
            aria-expanded={menuOpen}
            className="relative z-50 flex flex-col gap-1.5 p-2"
          >
            <span
              className={`block h-px w-6 bg-foreground transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-foreground transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-foreground transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      <div
        data-lenis-prevent
        className={`fixed inset-x-0 bottom-0 z-30 bg-background/95 backdrop-blur-md transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ top: "72px" }}
      >
        <nav className="flex flex-col items-center gap-8 pt-12 pb-24 min-h-full justify-center">
          {NAV_ITEMS.map(({ id, label }, i) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                handleClick(e, id);
                toggleMenu();
              }}
              style={{ transitionDelay: `${menuOpen ? i * 0.05 : 0}s` }}
              className={`text-xl uppercase tracking-widest transition-all duration-300 ${
                menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              } ${
                activeSection === id
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
