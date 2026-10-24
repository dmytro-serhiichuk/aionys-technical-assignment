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

            <div className="container-wrapper">
                <div className="container">
                    <Form method="get">
                        {data?.error && data.error.code !== "NOTE_NOT_FOUND" && (
                            <p className="form-error-message">{translateError(data.error.code)}</p>
                        )}
                        <input name="id" type="number" placeholder={t("entities.note.id")} />

                        <button type="submit">
                            {t("actions.search")}
                        </button>
                    </Form>
                </div>

                {data?.error && data.error.code === "NOTE_NOT_FOUND" && (
                    <div className="container">
                        <h3 className="note-not-found-message">
                            {translateError(data.error.code)}
                        </h3>
                    </div>
                )}

                {data?.note && (
                    <NoteComponent note={data.note} />
                )}
            </div>
            
        </>
    );
}