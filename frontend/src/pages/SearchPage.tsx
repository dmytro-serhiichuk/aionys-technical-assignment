import { Form, useLoaderData } from "react-router";
import NoteComponent from "../components/note";
import type { searchLoader } from "../api/loaders";
import { useTranslation } from "react-i18next";
import { translateError } from "../i18n/errors";

export default function SearchPage() {
    const { t } = useTranslation();
    const data = useLoaderData<typeof searchLoader>();

    return (
        <>
            <h1>{t("app.pageTitles.searchNote")}</h1>

            <Form method="get">
                {data?.error && (
                    <p>{translateError(data.error.code)}</p>
                )}
                <label>
                    {t("entities.note.id")}
                    <input name="id" type="number" />
                </label>

                <button type="submit">
                    {t("actions.search")}
                </button>
            </Form>

            {data?.note && (
                <>
                    <hr />
                    <NoteComponent note={data.note} />
                </>
            )}
        </>
    );
}