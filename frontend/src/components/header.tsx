import { Link } from "react-router";
import { ROUTES } from "../const/routes";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./languageSwitcher";

export default function Header() {
    const { t } = useTranslation();

    return (
        <header>
            <h1 className="app-title">
                <Link to={ROUTES.HOME}>{t("app.title")}</Link>
            </h1>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to={ROUTES.HOME}>{t("app.nav.home")}</Link>
                        </li>
                        <li>
                            <Link to={ROUTES.SEARCH}>{t("app.nav.search")}</Link>
                        </li>
                        <li>
                            <Link to={ROUTES.NEW}>{t("app.nav.create")}</Link>
                        </li>
                    </ul>
                </nav>
                <LanguageSwitcher />
            </div>
        </header>
    );
}