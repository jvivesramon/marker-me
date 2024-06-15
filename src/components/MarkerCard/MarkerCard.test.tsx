import { screen } from "@testing-library/react";
import { renderWithProviders, wrapWithRouter } from "../../utils/testUtils";
import {
  brandsMock,
  categoriesMock,
  markersMock,
} from "../../entities/markers/mocks/markersMock";
import MarkCard from "./MarkerCard";
import { initialMarkersState } from "../../entities/markers/slice/markersSlice";

describe("Given a MarkCard component", () => {
  describe("When it receives the mark 'BIC'", () => {
    test("Then it should show an image with the alternative text 'Bolígrafos BIC mark'", () => {
      const expectedAlternativeText = `${markersMock[0].name} marker`;

      renderWithProviders(
        wrapWithRouter(<MarkCard markProps={markersMock[0]} />),
        {
          markers: {
            ...initialMarkersState,
            markersData: markersMock,
            brands: brandsMock,
            categories: categoriesMock,
          },
        },
      );

      const image = screen.getByAltText(expectedAlternativeText);

      expect(image).toBeInTheDocument();
    });

    test("Then it should show the title 'Bolígrafos BIC'", () => {
      const expectedTitle = `${markersMock[0].name}`;

      renderWithProviders(
        wrapWithRouter(<MarkCard markProps={markersMock[0]} />),
        {
          markers: {
            ...initialMarkersState,
            markersData: markersMock,
            brands: brandsMock,
            categories: categoriesMock,
          },
        },
      );

      const title = screen.getByRole("heading", { name: expectedTitle });

      expect(title).toBeInTheDocument();
    });
  });
});
