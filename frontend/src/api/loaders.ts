import type { LoaderFunctionArgs } from "react-router";
import apiClient, { ApiError } from "./apiClient";
import type { NoteResponse } from "./types";

export async function homeLoader() {
    return await apiClient<NoteResponse[]>("notes");
}

export async function searchLoader({request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const idParam = url.searchParams.get("id");

    if (!idParam) return {};

    const id = Number(idParam);

    if (!Number.isInteger(id) || id <= 0) {
        return {
            error: { code: "INVALID_NOTE_ID" },
        };
    }

    try {
        const note = await apiClient<NoteResponse>(`notes/${id}`, { 
            method: "GET" 
        });

        return { note };
    } catch (e) {
        if (e instanceof ApiError && e.status === 404) {
            return {
                error: { code: e.code },
            };
        }
        throw e;
    }
}