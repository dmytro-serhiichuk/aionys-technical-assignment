import { useLoaderData } from "react-router";
import { updateNoteLoader } from "../api/loaders";
import NoteEditor from "../components/noteEditor";
import { useTranslation } from "react-i18next";

export default function UpdateNotePage() {
    const { t } = useTranslation();
    const note = useLoaderData<typeof updateNoteLoader>();

    return (
        <>
            <h1>{t("app.pageTitles.updateNote")}</h1>

            <NoteEditor title={note.title} content={note.content} />
        </>
    )
}