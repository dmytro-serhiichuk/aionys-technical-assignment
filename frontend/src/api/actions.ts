import { redirect, type ActionFunctionArgs } from "react-router";
import apiClient, { ApiError } from "./apiClient";
import { ROUTES } from "../const/routes";

export type NoteEditorActionData = {
    code: string,
    errors?: Record<string, string[]>
}

export async function createNoteAction({ request }: ActionFunctionArgs): Promise<NoteEditorActionData | Response> {
    const formData = await request.formData();

    try {
        await apiClient("notes", { method: "POST", body: formData });
        return redirect(ROUTES.HOME);
    } catch (e) {
        if (e instanceof ApiError && e.status === 400) {
            return { code: e.code, errors: e.errors };
        }
        throw e;
    }
}

export async function updateNoteAction({ request, params }: ActionFunctionArgs): Promise<NoteEditorActionData | Response> {
    const formData = await request.formData();
    const id = params.id;

    try {
        await apiClient(`notes/${id}`, { method: "PUT", body: formData });
        return redirect(ROUTES.HOME);
    } catch (e) {
        if (e instanceof ApiError && e.status === 400) {
            return { code: e.code, errors: e.errors };
        }
        throw e;
    }
}