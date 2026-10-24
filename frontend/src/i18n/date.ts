import { useTranslation } from "react-i18next";
import type { Lang } from ".";
import { useCallback } from "react";

function formatDate(
    value: string,
    locale: Lang
): string {
    const date = new Date(value);

    return new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
        timeStyle: "short"
    }).format(date);
}

export function useFormatDate() {
    const { i18n } = useTranslation();

    const locale = i18n.resolvedLanguage as Lang;

    return useCallback(
        (value: string) => formatDate(value, locale), 
        [locale]
    );
}