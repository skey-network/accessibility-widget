import type { Accessibility } from "@context/accessibilityContext";

export type ValidKeys = {
  [K in keyof Accessibility]: Accessibility[K] extends number ? K : Accessibility[K] extends boolean ? K : never;
}[keyof Accessibility];

export type Brands = "CARUMA" | "GO2NFT" | "SKEY";
