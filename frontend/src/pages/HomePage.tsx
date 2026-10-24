import NoteComponent from "../components/note";
import { useNoteStore } from "../stores/noteStore";

export default function HomePage() {
    const notes = useNoteStore(state => state.notes);

    return (
        <>
            <h1>Home</h1>

            {notes.map(note => (
                <NoteComponent key={note.id} note={note} />
            ))}
        </>
    );
}