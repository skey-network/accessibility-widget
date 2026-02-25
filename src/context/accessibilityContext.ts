import { createContext, useContext } from "react";

import { inject } from "@utils/injector";
import type { ValidKeys } from "@src/types/global";

export interface AccessibilityContextProps {
  access: Accessibility;
}

export const AccessibilityContext = createContext<AccessibilityContextProps | undefined>(undefined);

export const useAccess = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error("Used 'useAccess' hook without <Widget> provider");
  return context;
};

const LS_KEY = "_accessibility";

export class Accessibility {
  fontSize: number;
  lineHeight: number;
  charSpacing: number;
  markLinks: boolean;
  markTitles: boolean;
  contrast: boolean;
  grayScale: boolean;
  invert: boolean;

  listeners = new Set<() => void>();

  constructor() {
    this.fontSize = this.lineHeight = this.charSpacing = 0;
    this.markLinks = this.markTitles = this.contrast = this.grayScale = this.invert = false;

    this.load();
  }

  private load() {
    try {
      const stored = localStorage.getItem(LS_KEY);
      if (!stored) return;

      Object.assign(this, JSON.parse(stored));
      this.listeners = new Set<() => void>();
    } catch {
      console.warn("Failed to load accessibility settings");
    }
  }

  private save() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(this));

      this.runListeners();
      inject(this);
    } catch {
      console.warn(`Failed to save accessibility`);
    }
  }

  clear() {
    this.fontSize = this.lineHeight = this.charSpacing = 0;
    this.markLinks = this.markTitles = this.contrast = this.grayScale = this.invert = false;
    this.save();
  }

  addListener(cb: () => void) {
    this.listeners.add(cb);
  }

  removeListener(cb: () => void) {
    this.listeners.delete(cb);
  }

  public runListeners() {
    this.listeners.forEach((listener) => requestAnimationFrame(listener));
  }

  set(key: ValidKeys, value: number) {
    (this[key as never] as number) = value;
    this.save();
  }

  public inject() {
    inject(this);
  }
}
