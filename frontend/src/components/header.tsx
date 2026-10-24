import { Link } from "react-router";
import { ROUTES } from "../const/routes";

export default function Header() {
    return (
        <header>
            <h1>
                <Link to={ROUTES.HOME}>Aionys Technical Assignment
                </Link>
            </h1>
            <nav>
                <ul>
                    <li>
                        <Link to={ROUTES.HOME}>Home</Link>
                    </li>
                    <li>
                        <Link to={ROUTES.SEARCH}>Search</Link>
                    </li>
                    <li>
                        <Link to={ROUTES.NEW}>Create</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}