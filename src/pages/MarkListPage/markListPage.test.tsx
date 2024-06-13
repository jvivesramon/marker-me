import { screen } from "@testing-library/react";
import { renderWithProviders, wrapWithRouter } from "../../utils/testUtils";
import { initialMarkersState } from "../../entities/markers/slice/markersSlice";
import {
  brandsMock,
  categoriesMock,
  markersProductsMock,
} from "../../entities/markers/mocks/markersMock";
import MarkListPage from "./MarkListPage";

describe("Given a MarkListPage component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a list of marks", async () => {
      const expectedTitle = "Bolígrafos BIC";

      renderWithProviders(wrapWithRouter(<MarkListPage />), {
        markers: {
          ...initialMarkersState,
          markersData: markersProductsMock,
          brands: brandsMock,
          categories: categoriesMock,
        },
        ui: { isLoading: false, modalState: { isVisible: false } },
      });

      const expectedResult = await screen.findByRole("heading", {
        name: expectedTitle,
      });

      expect(expectedResult).toBeInTheDocument();
    });
  });
});
