import { createBrowserRouter } from "react-router-dom";
import path from "./paths/paths";
import App from "../components/App/App";

const appRouter = createBrowserRouter([
  {
    path: path.app,
    element: <App />,
    children: [],
  },
]);

export default appRouter;
