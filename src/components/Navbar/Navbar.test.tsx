import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

describe("Given a Navbar component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a 'MarkMe logo'", () => {
      const textImage = "MarkMe logo";

      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>,
      );

      const expectedResult = screen.getByRole("img", { name: textImage });

      expect(expectedResult).toBeInTheDocument();
    });
  });

  describe("When it is rendered", () => {
    test("Then it should show a 'Shopping card button'", () => {
      const textImage = "Shopping card button";

      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>,
      );

      const expectedResult = screen.getByRole("img", { name: textImage });

      expect(expectedResult).toBeInTheDocument();
    });
  });
});
