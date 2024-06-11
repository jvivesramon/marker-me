import { screen } from "@testing-library/react";
import { renderWithProviders, wrapWithRouter } from "../../utils/testUtils";
import Layout from "./Layout";

describe("Given a Layout component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a 'MarkMe' logo", () => {
      renderWithProviders(wrapWithRouter(<Layout />));

      const expectedAltText = "MarkMe logo";

      const expectedResult = screen.getByRole("img", { name: expectedAltText });

      expect(expectedResult).toBeInTheDocument();
    });
  });
});
