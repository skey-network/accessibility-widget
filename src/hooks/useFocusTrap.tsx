import { useEffect, useRef, useState } from "react";

const isVisible = (el: HTMLElement) => {
  if (!el) return false;

  const style = window.getComputedStyle(el);
  if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") {
    return false;
  }

  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0;
};

export function useFocusTrap() {
  const [isUsingKeyboard, setIsUsingKeyboard] = useState(false);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !ref.current) return;
    const htmlRef = ref.current;

    function onKeyDown(e: KeyboardEvent) {
      const focusable = [
        ...htmlRef.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ].filter(isVisible);

      if (focusable.length === 0) return;

      setIsUsingKeyboard(true);

      const currentIndex = focusable.indexOf(document.activeElement as HTMLElement);
      let back = e.shiftKey,
        move = false;
      let nextIndex: number;

      if (e.key === " " && document.activeElement?.tagName === "svg") {
        e.preventDefault();
        e.stopImmediatePropagation();
        document.activeElement.dispatchEvent(
          new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true
          })
        );

        return;
      }

      if (e.key === "Tab") move = true;

      if (e.key.startsWith("Arrow")) {
        move = true;
        if (e.key.endsWith("Left") || e.key.endsWith("Up")) back = true;
        if (e.key.endsWith("Right") || e.key.endsWith("Down")) back = false;
      }

      if (!move) return;
      e.preventDefault();

      if (back) {
        nextIndex = currentIndex <= 0 ? focusable.length - 1 : currentIndex - 1;
      } else {
        nextIndex = currentIndex >= focusable.length - 1 || currentIndex === -1 ? 0 : currentIndex + 1;
      }

      focusable[nextIndex]?.focus();
    }

    function onMouseDown() {
      setIsUsingKeyboard(false);
    }

    ref.current.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onMouseDown);

    return () => {
      htmlRef.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, [active, isUsingKeyboard]);

  return { ref, isUsingKeyboard, active, setActive };
}
