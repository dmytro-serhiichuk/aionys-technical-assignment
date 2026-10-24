import { Form, useLoaderData } from "react-router";
import NoteComponent from "../components/note";
import type { searchLoader } from "../api/loaders";

export default function SearchPage() {
    const data = useLoaderData<typeof searchLoader>();

    return (
        <>
            <h1>Search Page</h1>

            <Form method="get">
                {data?.error && (
                    <p>Error: {data.error.code}</p>
                )}
                <label>
                    Note id
                    <input name="id" type="number" />
                </label>

                <button type="submit">Search</button>
            </Form>

            {data?.note && (
                <>
                    <hr />
                    <NoteComponent note={data.note} />
                </>
            )}
        </>
    );
}