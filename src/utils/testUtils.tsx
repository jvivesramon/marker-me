import { RootState, setupStore, store } from "../store";
import { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import paths from "../routers/paths/paths";

export const renderWithProviders = (
  ui: React.ReactElement,
  preloadedState?: Partial<RootState>,
) => {
  const testStore = preloadedState ? setupStore(preloadedState) : store;

  const Wrapper = ({ children }: PropsWithChildren): React.ReactElement => {
    return <Provider store={testStore}>{children}</Provider>;
  };

  render(ui, { wrapper: Wrapper });
};
export const wrapWithRouter = (ui: React.ReactElement) => {
  const routes = [
    {
      path: paths.app,
      element: ui,
    },
    {
      path: paths.markers,
      element: ui,
    },
  ];

  const router = createMemoryRouter(routes);

  return <RouterProvider router={router} />;
};

export const wrapWithProviders = ({
  children,
}: PropsWithChildren): React.ReactElement => (
  <Provider store={store}>{children}</Provider>
);
