import { createBrowserRouter } from "react-router";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import RootErrorBoundary from "./components/rootErrorBoundary";
import { homeLoader, searchLoader } from "./api/loaders";
import { ROUTES } from "./const/routes";
import SearchPage from "./pages/SearchPage";

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
                path: "*",
                Component: NotFound
            }
        ]
    }
]);

export default router;