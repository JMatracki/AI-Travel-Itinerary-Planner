import { translations } from "../translations/translations";

export const useTranslations = (language: "en" | "pl") => {
  return translations[language];
};