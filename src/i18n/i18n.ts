import { Resource, createInstance, i18n } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { i18nConfig } from "./i18nConfig";

import en from "../../public/locales/en/translation.json";
import th from "../../public/locales/th/translation.json";

export type i18nKeys = "common";
export const i18nNamespaces: i18nKeys[] = ["common"];

export default async function initTranslations(
  locale?: string,
  namespaces: i18nKeys[] = i18nNamespaces,
  i18nInstance?: i18n,
  resources?: Resource
) {
  const ns = namespaces.length > 0 ? namespaces : i18nNamespaces;
  const defaultNS = ns[0] ?? "common";

  i18nInstance = i18nInstance || createInstance();
  i18nInstance.use(initReactI18next);
  i18nInstance.setDefaultNamespace(defaultNS);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend((lng: string, ns: string) => {
        const res: Record<string, Record<string, any>> = {
          en: { common: en },
          th: { common: th },
        };
        return Promise.resolve(res[lng][ns]);
      })
    );
  }

  if (!locale && typeof window !== "undefined") {
    const savedLang = localStorage.getItem("i18nextLng");
    locale = savedLang || i18nConfig.defaultLocale;
  }

  await i18nInstance.init({
    ns,
    lng: locale || i18nConfig.defaultLocale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS,
    fallbackNS: defaultNS,
    preload: resources ? [] : i18nConfig.locales,
    interpolation: {
      escapeValue: false,
    },
  });

  return {
    t: i18nInstance.t,
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
  };
}
