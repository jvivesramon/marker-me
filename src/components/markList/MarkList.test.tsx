import { screen } from "@testing-library/react";
import { renderWithProviders, wrapWithRouter } from "../../utils/testUtils";
import MarkList from "./Patata";
import { initialMarkersState } from "../../entities/markers/slice/markersSlice";
import {
  brandsMock,
  categoriesMock,
  markersProductsMock,
} from "../../entities/markers/mocks/markersMock";
import { RefObject, createRef } from "react";

describe("Given a MarkList component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a list of marks", () => {
      const totalMarks = 2;
      const myRef: RefObject<HTMLDivElement> = createRef();

      renderWithProviders(wrapWithRouter(<MarkList myRef={myRef} />), {
        markers: {
          ...initialMarkersState,
          markersData: markersProductsMock,
          brands: brandsMock,
          categories: categoriesMock,
        },
      });

      const expectedResult = screen.getAllByRole("article");

      expect(expectedResult).toHaveLength(totalMarks);
    });
  });
});
