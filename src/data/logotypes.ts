export interface Logo {
  id: string;
  name: string;
  src: string;
}

import { logos as mockLogos } from "./mock-logos";

export const logos: Logo[] = mockLogos;

export function getLogos(): Logo[] {
  return logos;
}
