import { Locales } from "@/middleware";
import "server-only";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  de: () => import("@/dictionaries/de.json").then((module) => module.default),
  "de-DE": () =>
    import("@/dictionaries/de.json").then((module) => module.default),
  "en-US": () =>
    import("@/dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locales) => dictionaries[locale]();
