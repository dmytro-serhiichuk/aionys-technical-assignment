import { Link } from "react-router";
import apiClient, { ApiError } from "../api/apiClient";
import type { NoteResponse } from "../api/types";

export default function NoteComponent({note}: {note: NoteResponse}) {
    const handleRemove = async () => {
        try {
            await apiClient(`notes/${note.id}`, {
                method: "DELETE"
            });
        } catch (e) {
            if (e instanceof ApiError && e.status === 404) {
                // TODO: remove from storage
                return;
            }
            throw e;
        }
    }
    
    return (
        <div>
            <button onClick={handleRemove}>
                Remove
            </button>

            <Link to={`/notes/${note.id}/edit`}>Edit</Link>

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