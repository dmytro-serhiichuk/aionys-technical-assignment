import { useTranslation } from "react-i18next";
import NoteComponent from "../components/note";
import { useNoteStore } from "../stores/noteStore";

export default function HomePage() {
    const { t } = useTranslation();
    const notes = useNoteStore(state => state.notes);

    return (
        <>
            <h1>{t("app.pageTitles.home")}</h1>

            <div className="note-list">
                {notes.map(note => (
                    <NoteComponent key={note.id} note={note} />
                ))}
            </div>
        </>
    );
}