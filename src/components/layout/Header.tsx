"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";


const NAV_ITEMS = [
  { id: "hero", label: "Inicio" },
  { id: "about", label: "Sobre Mí" },
  { id: "redes-sociales", label: "Redes Sociales" },
  { id: "branding", label: "Branding" },
  // { id: "audiovisual", label: "Audiovisual" }, // desactivado - ver audiovisual/README.md
  { id: "contact", label: "Contacto" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const headerHeightRef = useRef(100);

  useEffect(() => {
    document.body.style.overflow = menuOpen && isHome ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, isHome]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.borderBoxSize) {
          headerHeightRef.current = entry.borderBoxSize[0]?.blockSize ?? 100;
        } else {
          headerHeightRef.current = el.getBoundingClientRect().height;
        }
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const buildObserver = useCallback(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id),
    ).filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return null;

    const h = headerHeightRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: `-${h}px 0px 0px 0px`,
        threshold: 0.6,
      },
    );

    for (const sec of sections) observer.observe(sec);
    return observer;
  }, []);

  useEffect(() => {
    if (!isHome || menuOpen) return;
    const observer = buildObserver();
    return () => observer?.disconnect();
  }, [isHome, menuOpen, pathname, buildObserver]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!isHome) return;
    e.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth" });
  };

  const toggleMenu = () => {
    if (!isHome) return;
    setMenuOpen((prev) => !prev);
  };

  if (!isHome) {
    return (
      <header
        ref={headerRef}
        className="fixed top-0 right-0 left-0 z-40 border-b border-border/60 bg-background backdrop-blur-md"
      >
        <div className="flex items-center justify-between px-6 py-4 md:px-16 lg:px-48">
          <a href="/" aria-label="Ir al inicio">
            <Image
              src="/assets/home/logo-white.webp"
              alt="Logo"
              width={1000}
              height={1000}
              className="block h-10 w-auto object-contain light:hidden md:h-11"
              priority
            />
            <Image
              src="/assets/home/logo-black.webp"
              alt="Logo"
              width={1000}
              height={1000}
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
        ref={headerRef}
        className="animate-header-in fixed top-0 right-0 left-0 z-40 border-b border-border/60 bg-background"
      >
        {/* DESKTOP NAVBAR */}
        <nav className="hidden lg:flex items-center justify-between px-6 py-4 md:px-16 lg:px-48">
          <a
            href="#"
            onClick={(e) => handleClick(e, "hero")}
            aria-label="Ir al inicio"
            className="shrink-0"
          >
            <Image
              src="/assets/home/logo-white.webp"
              alt="Logo"
              width={1000}
              height={1000}
              className="block h-10 w-auto object-contain light:hidden md:h-11"
              priority
            />
            <Image
              src="/assets/home/logo-black.webp"
              alt="Logo"
              width={1000}
              height={1000}
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
                className={`relative whitespace-nowrap text-xs tracking-widest transition-all duration-300 ${
                  activeSection === id
                    ? "text-foreground"
                    : "text-muted"
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-1/2 h-px w-full bg-foreground transition-opacity duration-300 -translate-x-1/2 ${
                    activeSection === id ? "opacity-100" : "opacity-0"
                  }`}
                />
              </a>
            ))}
            <span aria-hidden className="h-6 w-px bg-border" />
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile header bar */}
        <div className="lg:hidden flex h-16 items-center justify-between px-6 py-4 md:px-16">
          <a href="#hero" onClick={(e) => handleClick(e, "hero")} aria-label="Ir al inicio">
            <Image
              src="/assets/home/logo-white.webp"
              alt="Logo"
              width={1000}
              height={1000}
              className="block h-8 w-auto object-contain light:hidden"
              priority
            />
            <Image
              src="/assets/home/logo-black.webp"
              alt="Logo"
              width={1000}
              height={1000}
              className="hidden h-8 w-auto object-contain light:block"
              priority
            />
          </a>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle size="sm" />
            <button
            onClick={toggleMenu}
            aria-label={menuOpen ? "Cerrar navegación" : "Abrir navegación"}
            aria-expanded={menuOpen}
            className="relative z-50 flex shrink-0 flex-col gap-1.5 p-2"
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
        className={`fixed inset-x-0 top-16 bottom-0 z-30 bg-background backdrop-blur-md transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
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
                className={`text-xl relative uppercase tracking-widest transition-all duration-300 ${
                  menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                } ${
                  activeSection === id
                    ? "text-foreground"
                    : "text-muted"
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-1/2 h-px w-full bg-foreground transition-opacity duration-300 -translate-x-1/2 ${
                    activeSection === id ? "opacity-100" : "opacity-0"
                  }`}
                />
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
