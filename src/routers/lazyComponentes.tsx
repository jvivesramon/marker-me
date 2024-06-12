import { lazy } from "react";

export const LazyMarkLisPage = lazy(
  () => import("../pages/MarkListPage/MarkListPage"),
);
