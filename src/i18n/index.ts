import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { createInstance } from "i18next";

import en from "./locales/en.json";
import pl from "./locales/pl.json";

const customI18n = createInstance();
const STORAGE_KEY = "_accessibility-caruma-lang";

customI18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "pl"],
    defaultNS: "translation",
    ns: "translation",
    resources: {
      en: { translation: en },
      pl: { translation: pl }
    },
    react: {
      useSuspense: false
    },
    returnNull: false,
    saveMissing: true,
    parseMissingKeyHandler: (key) => `Translation for '${key}' not found!`,
    detection: {
      order: ["navigator", "localStorage", "cookie", "sessionStorage"],
      caches: ["localStorage"],
      lookupLocalStorage: STORAGE_KEY,
      lookupCookie: STORAGE_KEY,
      lookupSessionStorage: STORAGE_KEY
    }
  });

export { customI18n };
