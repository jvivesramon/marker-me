import { lazy } from "react";

export const LazyMarkLisPage = lazy(
  () => import("../pages/MarkerListPage/MarkerListPage"),
);

export const LazyMarkDetailPage = lazy(
  () => import("../pages/MarkerDetailPage/MarkerDetailPage"),
);

export const LazyShoppingCartPage = lazy(
  () => import("../pages/ShoppingCartPage/ShoppingCartPage"),
);

export const LazyPaymentLoadingPage = lazy(
  () => import("../components/Loaders/PaymentLoading/PaymentLoading"),
);

export const LazyNotFoundPage = lazy(
  () => import("../pages/NotFoundPage/NotFoundPage"),
);
