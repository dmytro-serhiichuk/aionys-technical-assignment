import { translateError } from "../i18n/errors";

export default function ValidationErrorsList({errors} : {errors: string[]}) {
    return (
        <ul className="form-error-list">
            {errors.map((error, i) => (
                <li key={i} className="form-error-message">
                    {translateError(error)}
                </li>
            ))}
        </ul>
    );
}