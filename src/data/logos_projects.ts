export interface LogoProject {
  id: string;
  title: string;
  client: string;
  year: string;
  image: string;
}

export const logosProjects: LogoProject[] = [
  { id: "l1", title: "Logo 1", client: "Cliente", year: "2025", image: "/assets/branding/logotipos/logo-1.webp" },
  { id: "l2", title: "Logo 2", client: "Cliente", year: "2025", image: "/assets/branding/logotipos/logo-2.webp" },
  { id: "l3", title: "Logo 3", client: "Cliente", year: "2025", image: "/assets/branding/logotipos/logo-3.webp" },
  { id: "l4", title: "Logo 4", client: "Cliente", year: "2025", image: "/assets/branding/logotipos/logo-4.webp" },
  { id: "l5", title: "Logo 5", client: "Cliente", year: "2025", image: "/assets/branding/logotipos/logo-5.webp" },
  { id: "l6", title: "Logo 6", client: "Cliente", year: "2025", image: "/assets/branding/logotipos/logo-6.webp" },
  { id: "l7", title: "Logo 7", client: "Cliente", year: "2025", image: "/assets/branding/logotipos/logo-7.webp" },
  { id: "l8", title: "Logo 8", client: "Cliente", year: "2025", image: "/assets/branding/logotipos/logo-8.webp" },
];

export function getLogos(): LogoProject[] {
  return logosProjects;
}
