import type { NoteResponse } from "../api/types";

export default function NoteComponent({note}: {note: NoteResponse}) {
    return (
        <div>
            <p>Id: {note.id}</p>
            <p>Created at: {note.createdAt}</p>
            {note.updatedAt && (<p>Upated at: {note.updatedAt}</p>)}
            <hr />
            <p><strong>{note.title}</strong></p>
            <hr />
            <p>{note.content}</p>
            <hr />
        </div>
    );
}