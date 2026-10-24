import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ukCommon from "./locales/uk/common.json";
import enCommon from "./locales/en/common.json";
import ukErrors from "./locales/uk/errors.json";
import enErrors from "./locales/en/errors.json";

export const SUPPORTED_LANGS = ["uk", "en"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

i18n
    .use(LanguageDetector)
    .use(initReactI18next).init({
    resources: {
        uk: {
            common: ukCommon,
            errors: ukErrors,
        },
        en: {
            common: enCommon,
            errors: enErrors,
        }
    },

    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGS,

    defaultNS: "common",
    ns: ["common", "errors"],

    detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
        lookupLocalStorage: "lang",
    },

    interpolation: {
        escapeValue: false,
    },
});

const syncHtmlLang = (lng: string) => {
    document.documentElement.lang = lng;
};
i18n.on("languageChanged", syncHtmlLang);
syncHtmlLang(i18n.resolvedLanguage ?? "en");

export default i18n;