export interface Logo {
  id: string;
  name: string;
  src: string;
}

export const logos: Logo[] = [
  { id: "l1", name: "Logo 1", src: "/images/placeholder.svg" },
  { id: "l2", name: "Logo 2", src: "/images/placeholder.svg" },
  { id: "l3", name: "Logo 3", src: "/images/placeholder.svg" },
  { id: "l4", name: "Logo 4", src: "/images/placeholder.svg" },
  { id: "l5", name: "Logo 5", src: "/images/placeholder.svg" },
  { id: "l6", name: "Logo 6", src: "/images/placeholder.svg" },
  { id: "l7", name: "Logo 7", src: "/images/placeholder.svg" },
  { id: "l8", name: "Logo 8", src: "/images/placeholder.svg" },
];

export function getLogos(): Logo[] {
  return logos;
}
