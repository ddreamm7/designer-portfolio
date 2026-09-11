"use client";

interface Props {
  onClick: () => void;
}

export default function ShowMoreButton({ onClick }: Props) {
  return (
    <div className="relative flex justify-center pt-16 md:pt-24">
      <button
        onClick={onClick}
        className="group relative border border-foreground/20 px-10 py-4 text-sm uppercase tracking-widest text-foreground/60 transition-all duration-300 hover:border-foreground hover:text-foreground"
      >
        Ver Más
        <span className="absolute bottom-0 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
      </button>
    </div>
  );
}
