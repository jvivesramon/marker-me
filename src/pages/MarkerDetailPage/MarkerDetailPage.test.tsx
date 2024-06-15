import { screen } from "@testing-library/react";
import { renderWithProviders, wrapWithRouter } from "../../utils/testUtils";
import MarkerDetailPage from "./MarkerDetailPage";
import { initialMarkersState } from "../../entities/markers/slice/markersSlice";
import {
  brandsMock,
  categoriesMock,
  markersMock,
} from "../../entities/markers/mocks/markersMock";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Given a MarkerDetailPage component", () => {
  describe("When it is rendered", () => {
    test("Then it should show the marker title 'Bolígrafos BIC'", () => {
      const spyScrollTo = vi.fn();
      Object.defineProperty(global.window, "scrollTo", { value: spyScrollTo });

      const expectedTitle = "Bolígrafos BIC";

      renderWithProviders(wrapWithRouter(<MarkerDetailPage />), {
        markers: {
          ...initialMarkersState,
          markersData: markersMock,
          brands: brandsMock,
          categories: categoriesMock,
          selectedMarker: markersMock[0],
        },
        ui: { isLoading: false, modalState: { isVisible: false } },
      });

      const title = screen.getByRole("heading", { name: expectedTitle });

      expect(title).toBeInTheDocument();
    });
  });
});
