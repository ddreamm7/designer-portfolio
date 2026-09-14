export interface AudiovisualProject {
  slug: string;
  title: string;
  year: string;
  section: "audiovisual";
  thumbnail: string;
  image: string;
  description: string;
}

export const audiovisualProjects: AudiovisualProject[] = [
  {
    slug: "video-reel-2024",
    title: "Showreel 2024",
    year: "2025",
    section: "audiovisual",
    thumbnail: "/",
    image: "/",
    description:
      "Showreel curado de motion design con secuencias de títulos, animaciones de logotipos y contenido de vídeo promocional producido durante 2024.",
  },
];

export function getAudiovisualBySlug(slug: string): AudiovisualProject | undefined {
  return audiovisualProjects.find((p) => p.slug === slug);
}
