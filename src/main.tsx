import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/styles.scss";
import { RouterProvider } from "react-router-dom";
import appRouter from "./routers/appRouter.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>,
);
