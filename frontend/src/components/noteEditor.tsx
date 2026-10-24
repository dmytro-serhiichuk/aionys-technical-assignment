import { Form, useActionData } from "react-router";
import type { NoteEditorActionData } from "../api/actions";
import ValidationErrorsList from "./validationErrorsList";
import { useTranslation } from "react-i18next";

type NoteEditorProps = {
    title?: string,
    content?: string
}

export default function NoteEditor({title = "", content = ""}: NoteEditorProps) {
    const { t } = useTranslation();
    const actionData = useActionData<NoteEditorActionData>();

    const isUpdating = title != "" && content != "";

    return (
        <Form method="post">
            {actionData?.errors?.title && (
                <ValidationErrorsList errors={actionData.errors.title} />
            )}
            <label>
                {t("entities.note.title")}
                <input type="text" name="title" defaultValue={title} />
            </label>
            {actionData?.errors?.content && (
                <ValidationErrorsList errors={actionData.errors.content} />
            )}
            <label>
                {t("entities.note.content")}
                <textarea name="content" defaultValue={content}/>
            </label>

            <button>
                {isUpdating ? t("actions.update") : t("actions.create")}
            </button>
        </Form>
    );
}