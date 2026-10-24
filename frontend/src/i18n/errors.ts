import i18n from "./index";

export function translateError(code?: string): string {
    const key = code || "UNKNOWN_ERROR";

    if (i18n.exists(key, { ns: "errors" })) {
        return i18n.t(key, { ns: "errors" });
    }

    return i18n.t("UNKNOWN_ERROR", {
        ns: "errors",
    });
}