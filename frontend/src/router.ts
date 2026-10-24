import { createBrowserRouter } from "react-router";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import RootErrorBoundary from "./components/rootErrorBoundary";
import { homeLoader, searchLoader, updateNoteLoader } from "./api/loaders";
import { ROUTES } from "./const/routes";
import SearchPage from "./pages/SearchPage";
import CreateNotePage from "./pages/CreateNotePage";
import { createNoteAction, updateNoteAction } from "./api/actions";
import UpdateNotePage from "./pages/UpdateNotePage";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        ErrorBoundary: RootErrorBoundary,
        children: [
            {
                index: true,
                Component: HomePage,
                loader: homeLoader
            },
            {
                path: ROUTES.SEARCH,
                Component: SearchPage,
                loader: searchLoader
            },
            {
                path: ROUTES.NEW,
                Component: CreateNotePage,
                action: createNoteAction
            },
            {
                path: ROUTES.EDIT,
                Component: UpdateNotePage,
                loader: updateNoteLoader,
                action: updateNoteAction
            },
            {
                path: "*",
                Component: NotFound
            }
        ]
    }
]);

export default router;