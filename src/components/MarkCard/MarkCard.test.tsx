import { screen } from "@testing-library/react";
import { renderWithProviders, wrapWithRouter } from "../../utils/testUtils";
import {
  brandsMock,
  categoriesMock,
  markersProductsMock,
} from "../../entities/markers/mocks/markersMock";
import MarkCard from "./MarkCard";
import { initialMarkersState } from "../../entities/markers/slice/markersSlice";

describe("Given a MarkCard component", () => {
  describe("When it receives the mark 'BIC'", () => {
    test("Then it should show an image with the alternative text 'Bolígrafos BIC mark'", () => {
      const expectedAlternativeText = `${markersProductsMock[0].name} mark`;

      renderWithProviders(
        wrapWithRouter(<MarkCard markProps={markersProductsMock[0]} />),
        {
          markers: {
            ...initialMarkersState,
            markersData: markersProductsMock,
            brands: brandsMock,
            categories: categoriesMock,
          },
        },
      );

      const image = screen.getByAltText(expectedAlternativeText);

      expect(image).toBeInTheDocument();
    });

    test("Then it should show the title 'Bolígrafos BIC'", () => {
      const expectedTitle = `${markersProductsMock[0].name}`;

      renderWithProviders(
        wrapWithRouter(<MarkCard markProps={markersProductsMock[0]} />),
        {
          markers: {
            ...initialMarkersState,
            markersData: markersProductsMock,
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
