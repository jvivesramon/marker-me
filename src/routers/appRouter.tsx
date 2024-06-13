import { Navigate, createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import path from "./paths/paths";
import App from "../components/App/App";
import { LazyMarkLisPage } from "./lazyComponentes";

const appRouter = createBrowserRouter([
  {
    path: path.app,
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to={path.markers} replace />,
      },
      {
        path: path.markers,
        element: (
          <Suspense>
            <LazyMarkLisPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default appRouter;
