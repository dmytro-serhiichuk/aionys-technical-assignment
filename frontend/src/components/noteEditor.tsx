import { Form, useActionData } from "react-router";
import type { CreateNoteActionData } from "../api/actions";
import ValidationErrorsList from "./validationErrorsList";

type NoteEditorProps = {
    title?: string,
    content?: string
}

export default function NoteEditor({title = "", content = ""}: NoteEditorProps) {
    const actionData = useActionData<CreateNoteActionData>();

    return (
        <Form method="post">
            {actionData?.errors?.title && (
                <ValidationErrorsList errors={actionData.errors.title} />
            )}
            <label>
                Title
                <input type="text" name="title" defaultValue={title} />
            </label>
            {actionData?.errors?.content && (
                <ValidationErrorsList errors={actionData.errors.content} />
            )}
            <label>
                Content
                <textarea name="content" defaultValue={content}/>
            </label>

            <button>Submit</button>
        </Form>
    );
}