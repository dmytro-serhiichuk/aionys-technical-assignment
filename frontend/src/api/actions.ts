import { redirect, type ActionFunctionArgs } from "react-router";
import apiClient, { ApiError } from "./apiClient";
import { ROUTES } from "../const/routes";

export type CreateNoteActionData = {
    code: string,
    errors?: Record<string, string[]>
}

export async function createNoteAction({ request }: ActionFunctionArgs): Promise<CreateNoteActionData | Response> {
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