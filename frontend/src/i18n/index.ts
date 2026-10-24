import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ukCommon from "./locales/uk/common.json";
import enCommon from "./locales/en/common.json";
import ukErrors from "./locales/uk/errors.json";
import enErrors from "./locales/en/errors.json";

i18n.use(initReactI18next).init({
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

    lng: "uk",
    fallbackLng: "en",
    supportedLngs: ["en", "uk"],

    defaultNS: "common",
    ns: ["common", "errors"],

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;