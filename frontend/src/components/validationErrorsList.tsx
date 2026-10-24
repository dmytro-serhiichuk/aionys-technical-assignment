import { translateError } from "../i18n/errors";

export default function ValidationErrorsList({errors} : {errors: string[]}) {
    return (
        <ul>
            {errors.map((error, i) => (
                <li key={i}>
                    {translateError(error)}
                </li>
            ))}
        </ul>
    );
}