import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS } from "../i18n";

export default function LanguageSwitcher() {
    const { i18n, t } = useTranslation();
    
    return (
        <select
            value={i18n.resolvedLanguage}
            onChange={e => i18n.changeLanguage(e.target.value)}
        >
            {SUPPORTED_LANGS.map(lng => (
                <option key={lng} value={lng}>
                    {t(`languages.${lng}`, { lng })}
                </option>
            ))}
        </select>
    );
}   