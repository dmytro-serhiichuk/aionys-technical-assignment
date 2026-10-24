import { useTranslation } from "react-i18next";
import NoteEditor from "../components/noteEditor";

export default function CreateNotePage() {
    const { t } = useTranslation();

    return (
        <>
            <h1>{t("app.pageTitles.createNote")}</h1>

            <NoteEditor />
        </>
    );
}