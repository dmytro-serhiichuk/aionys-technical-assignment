import { useLoaderData } from "react-router";
import { homeLoader } from "../api/loaders";
import NoteComponent from "../components/note";

export default function HomePage() {
    const notes = useLoaderData<typeof homeLoader>();

    return (
        <>
            <h1>Home</h1>

            {notes.map(note => (
                <NoteComponent key={note.id} note={note} />
            ))}
        </>
    );
}