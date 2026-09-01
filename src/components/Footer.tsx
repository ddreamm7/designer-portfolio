export default function Footer() {
  return (
    <footer className="bg-background text-white py-8 px-6 md:px-48">
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-2 text-sm">
        <p>&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
        <p className="text-white/60">
          Diseñado y desarrollado por{" "}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors"
          >
            The Developer
          </a>
        </p>
      </div>
    </footer>
  );
}
