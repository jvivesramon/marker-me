import { lazy } from "react";

export const LazyMarkLisPage = lazy(
  () => import("../pages/MarkListPage/MarkListPage"),
);

export const LazyNotFoundPage = lazy(
  () => import("../pages/NotFoundPage/NotFoundPage"),
);
