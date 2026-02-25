import { useEffect } from "react";

export const useSiblingWatcher = (targetSelector: string, callback: () => void) => {
  useEffect(() => {
    // 1. Look for the common parent
    const parent = document.body;

    const observer = new MutationObserver(() => {
      // 2. Look for the element we are waiting for
      const target = document.querySelector(targetSelector);

      if (!target) {
        callback();
        // Optional: disconnect if you only need to run this once per load
        // observer.disconnect();
      }
    });

    observer.observe(parent, {
      childList: true, // Watch for adding/removing children
      subtree: true // Watch all levels deep
    });

    return () => observer.disconnect();
  }, [targetSelector, callback]);
};
