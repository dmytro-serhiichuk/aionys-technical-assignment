import { createBrowserRouter } from "react-router";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import RootErrorBoundary from "./components/rootErrorBoundary";
import { homeLoader, searchLoader } from "./api/loaders";
import { ROUTES } from "./const/routes";
import SearchPage from "./pages/SearchPage";
import CreateNotePage from "./pages/CreateNotePage";
import { createNoteAction } from "./api/actions";

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
                path: "*",
                Component: NotFound
            }
        ]
    }
]);

export default router;