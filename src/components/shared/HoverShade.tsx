export default function HoverShade() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10"
    />
  );
}
