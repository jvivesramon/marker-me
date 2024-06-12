import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/testUtils";
import Button from "./Button";

describe("Given a Button component", () => {
  describe("When it is rendered and receives a shopping cart icon", () => {
    test("Then it should show show an image with the alternative text 'Shopping cart icon'", () => {
      const expectedAltText = "Shopping cart icon";

      renderWithProviders(
        <Button
          classname=""
          image={
            <img
              src="/images/markCard/shopping-cart.svg"
              alt="Shopping cart icon"
            />
          }
        />,
      );
      const sessionButton = screen.getByRole("button", {
        name: expectedAltText,
      });

      expect(sessionButton).toBeInTheDocument();
    });
  });
});
