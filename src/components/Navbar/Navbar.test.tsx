import { screen } from "@testing-library/react";
import { renderWithProviders, wrapWithRouter } from "../../utils/testUtils";

import Navbar from "./Navbar";

describe("Given a Navbar component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a 'MarkMe logo'", () => {
      const textImage = "MarkMe logo";

      renderWithProviders(wrapWithRouter(<Navbar />));

      const expectedResult = screen.getByRole("img", { name: textImage });

      expect(expectedResult).toBeInTheDocument();
    });
  });

  describe("When it is rendered", () => {
    test("Then it should show a 'Shopping card button'", () => {
      const textImage = "Shopping card button";

      renderWithProviders(wrapWithRouter(<Navbar />));

      const expectedResult = screen.getByRole("img", { name: textImage });

      expect(expectedResult).toBeInTheDocument();
    });
  });
});
