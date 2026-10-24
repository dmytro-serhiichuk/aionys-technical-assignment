import { isRouteErrorResponse, useRouteError } from "react-router";
import { ApiError } from "../api/apiClient";
import NotFound from "../pages/NotFound";
import { useTranslation } from "react-i18next";
import { translateError } from "../i18n/errors";

export default function RootErrorBoundary() {
    const error = useRouteError();
    const { t } = useTranslation();

    if ((isRouteErrorResponse(error) && error.status === 404) || 
        (error instanceof ApiError && error.status === 404)) {
        return <NotFound />
    }

    return (
        <div>
            <h1>{t("app.pageTitles.rootErrorBoundary")}</h1>
            <p>
                {error instanceof ApiError 
                    ? translateError(error.code) 
                    : translateError("UNKNOWN_ERROR")}
            </p>
        </div>
    )
}