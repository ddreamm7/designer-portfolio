export default function Footer() {
  return (
    <footer className="bg-background  py-8 px-6 md:px-48">
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-2 text-sm">
        <p className="text-muted">&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
