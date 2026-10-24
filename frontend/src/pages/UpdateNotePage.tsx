import { useLoaderData } from "react-router";
import { updateNoteLoader } from "../api/loaders";
import NoteEditor from "../components/noteEditor";

export default function UpdateNotePage() {
    const note = useLoaderData<typeof updateNoteLoader>();

    return (
        <>
            <h1>Update Note:</h1>

            <NoteEditor title={note.title} content={note.content} />
        </>
    )
}