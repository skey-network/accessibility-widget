import type { Accessibility } from "@context/accessibilityContext";

import { BORDER, CHAR_SCALING, FONT_SCALING, LINE_SCALING } from "../config";

function getTextChildren(): HTMLElement[] {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const result = new Set<HTMLElement>();

  let n = walker.nextNode();
  while (n) {
    if (n.nodeValue?.trim().length) {
      const p = n.parentElement;
      if (p && !p.closest(".access-btn")) result.add(p);
    }
    n = walker.nextNode();
  }

  return [...result].reverse();
}

function applyTextStyles(access: Accessibility, elements: HTMLElement[]) {
  const height = `${access.lineHeight * LINE_SCALING * 100 + 100}%`;
  const spacing = `${access.charSpacing * CHAR_SCALING}px`;

  document.body.style.setProperty("--access-height", access.lineHeight ? height : "");
  document.body.style.setProperty("--access-spacing", access.charSpacing ? spacing : "");

  elements.forEach((item) => {
    try {
      if (!item.getAttribute("pxsize"))
        item.setAttribute("pxsize", window.getComputedStyle(item).fontSize.replace(/[a-zA-Z]/gm, ""));

      const scale = Math.max(1, access.fontSize * FONT_SCALING + 1);
      item.style.setProperty("--current-size", String(Number(item.getAttribute("pxsize")) * scale));

      if (access.fontSize > 0) item.classList.add("access-text");
      else item.classList.remove("access-text");

      if (access.lineHeight > 0) item.classList.add("access-height");
      else item.classList.remove("access-height");

      if (access.charSpacing > 0) item.classList.add("access-spacing");
      else item.classList.remove("access-spacing");
    } catch {
      console.warn(`Setting pxsize for ${item} failed.`);
    }
  });
}

function applyLinkStyles(access: Accessibility, elements: HTMLAnchorElement[]) {
  elements.forEach((link) => {
    if (access.markLinks) link.classList.add("access-border");
    else link.classList.remove("access-border");
  });
}

function applyTitleStyles(access: Accessibility, elements: HTMLTitleElement[]) {
  elements.forEach((title) => {
    if (access.markTitles) title.classList.add("access-border");
    else title.classList.remove("access-border");
  });
}

export function inject(access: Accessibility) {
  if (!access.grayScale && !access.invert && !access.contrast) document.documentElement.style.filter = "";
  document.documentElement.style.filter = `${access.grayScale ? `grayscale(1)` : ""} ${
    access.invert ? `invert(1)` : ""
  } ${access.contrast ? "brightness(0.4) contrast(1.1) saturate(2) brightness(3)" : ""}`;

  if (access.markLinks || access.markTitles) document.documentElement.style.setProperty("--access-border", BORDER);
  else document.documentElement.style.removeProperty("--access-border");

  applyTextStyles(access, getTextChildren());
  applyLinkStyles(access, Array.from(document.querySelectorAll("a")));
  applyTitleStyles(access, Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6")));
}
