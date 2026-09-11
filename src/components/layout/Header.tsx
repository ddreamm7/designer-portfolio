"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "./SmoothScrollProvider";
import ThemeToggle from "./ThemeToggle";


const NAV_ITEMS = [
  { id: "hero", label: "Inicio" },
  { id: "about", label: "Sobre Mí" },
  { id: "redes-sociales", label: "Redes Sociales" },
  { id: "branding", label: "Branding" },
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
    else {
      lenisStart();
      setVisible(true);
      lastScrollYRef.current = window.scrollY;
      tickingRef.current = false;
    }
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
    if (menuOpen) return;

    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id),
    ).filter(Boolean) as HTMLElement[];

    const handleScroll = () => {
      if (menuOpen) return;
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
  }, [isHome, lenis, menuOpen]);

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
    setMenuOpen((prev) => {
      const next = !prev;
      if (!next) {
        setVisible(true);
        lastScrollYRef.current = window.scrollY;
        tickingRef.current = false;
      }
      return next;
    });
  };

  if (!isHome) {
    return (
      <header
        data-lenis-prevent
        className="fixed top-0 right-0 left-0 z-40 border-b border-border/60 bg-background backdrop-blur-md"
      >
        <div className="flex items-center justify-between px-6 py-4 md:px-16 lg:px-48">
          <a href="/" aria-label="Ir al inicio">
            <Image
              src="/assets/home/logo_w.webp"
              alt="Logo"
              width={1186}
              height={1002}
              className="block h-10 w-auto object-contain light:hidden md:h-11"
              priority
            />
            <Image
              src="/assets/home/logo_b.webp"
              alt="Logo"
              width={1186}
              height={1002}
              className="hidden h-10 w-auto object-contain light:block md:h-11"
              priority
            />
          </a>
          <div className="flex items-center gap-4">
            <Link
            href="/"
            className="text-sm font-mono uppercase tracking-widest text-muted transition-colors hover:text-foreground"
          >
            &larr; Volver
            </Link>
            <span aria-hidden className="h-4 w-px bg-border" />
            <ThemeToggle />
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header
        data-lenis-prevent
        className={`animate-header-in fixed top-0 right-0 left-0 z-40 border-b border-border/60 bg-background transition-transform duration-500 ease-out ${
          visible ? "translate-y-0 pointer-events-auto" : "-translate-y-full pointer-events-none"
        }`}
      >
        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center justify-between px-6 py-4 md:px-16 lg:px-48">
          <a
            href="#hero"
            onClick={(e) => handleClick(e, "hero")}
            aria-label="Ir al inicio"
            className="shrink-0"
          >
            <Image
              src="/assets/home/logo_w.webp"
              alt="Logo"
              width={1186}
              height={1002}
              className="block h-10 w-auto object-contain light:hidden md:h-11"
              priority
            />
            <Image
              src="/assets/home/logo_b.webp"
              alt="Logo"
              width={1186}
              height={1002}
              className="hidden h-10 w-auto object-contain light:block md:h-11"
              priority
            />
          </a>
          <div className="flex items-center gap-6">
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
            <span aria-hidden className="h-6 w-px bg-border" />
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile header bar */}
        <div className="lg:hidden flex items-center justify-between px-6 py-4 md:px-16">
          <a href="#hero" onClick={(e) => handleClick(e, "hero")} aria-label="Ir al inicio">
            <Image
              src="/assets/home/logo_w.webp"
              alt="Logo"
              width={1186}
              height={1002}
              className="block h-8 w-auto object-contain light:hidden"
              priority
            />
            <Image
              src="/assets/home/logo_b.webp"
              alt="Logo"
              width={1186}
              height={1002}
              className="hidden h-8 w-auto object-contain light:block"
              priority
            />
          </a>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
            onClick={toggleMenu}
            aria-label={menuOpen ? "Cerrar navegación" : "Abrir navegación"}
            aria-expanded={menuOpen}
            className="relative z-50 flex flex-col gap-1.5 p-2"
          >
            <span
              className={`block h-px w-6 bg-foreground transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-1.75" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-foreground transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-foreground transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-1.75" : ""
              }`}
            />
            </button>
          </div>
        </div>
      </header>

      <div
        data-lenis-prevent
        className={`fixed inset-x-0 bottom-0 z-30 bg-background backdrop-blur-md transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ top: "64px" }}
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
