import { useNavigate } from "react-router";
import apiClient, { ApiError } from "../api/apiClient";
import type { NoteResponse } from "../api/types";
import { useNoteStore } from "../stores/noteStore";
import { useTranslation } from "react-i18next";
import { useFormatDate } from "../i18n/date";

export default function NoteComponent({note}: {note: NoteResponse}) {
    const { t } = useTranslation();
    const formatDate = useFormatDate();
    const removeNote = useNoteStore(state => state.removeNote);
    const navigate = useNavigate();

    const handleRemove = async () => {
        try {
            await apiClient(`notes/${note.id}`, {
                method: "DELETE"
            });
            removeNote(note.id);
        } catch (e) {
            if (e instanceof ApiError && e.status === 404) {
                removeNote(note.id);
                return;
            }
            throw e;
        }
    }
    
    return (
        <div className="note" data-testid="note">
            <div className="note-top-container">
                <div className="note-info-container">
                    <h2>{note.title}</h2>
                    <p>{t("entities.note.id")}: {note.id}</p>
                    <p>{t("entities.note.createdAt", { date: formatDate(note.createdAt) })}</p>
                    {note.updatedAt && (
                        <p>{t("entities.note.updatedAt", { date: formatDate(note.updatedAt) })}</p>
                    )}
                </div>
                <div className="note-buttons-container">
                    <button onClick={handleRemove}>
                        {t("actions.remove")}
                    </button>
                    <button onClick={() => navigate(`/notes/${note.id}/edit`)}>
                        {t("actions.edit")}
                    </button>
                </div>
            </div>
            <hr />
            <p>{note.content}</p>
        </div>
    );
}