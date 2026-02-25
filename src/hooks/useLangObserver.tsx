import { useEffect, useState } from "react";
import { customI18n } from "@i18n/index";

export function useLangObserver() {
  const [lang, setLang] = useState(() => {
    return document.documentElement.getAttribute("lang") || "en";
  });

  useEffect(() => {
    const target = document.documentElement;

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === "lang") {
          const newLang = target.getAttribute("lang") || "en";
          if (newLang !== lang) {
            setLang(newLang);
            customI18n.changeLanguage(newLang);
          }
        }
      }
    });

    observer.observe(target, { attributes: true });

    return () => observer.disconnect();
  }, [lang]);

  return lang;
}
