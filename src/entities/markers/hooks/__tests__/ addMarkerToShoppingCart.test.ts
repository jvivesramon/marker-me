import { renderHook } from "@testing-library/react";
import { ShoppingCart } from "../../types";
import { shoppingCartMarkerMock } from "../../mocks/markersMock";
import AxiosMarkersService from "../../services/AxiosMarkersService";
import apiUrl from "../../../../utils/apiUrl/apiUrl";
import useMarkers from "../useMakers";
import { wrapWithProviders } from "../../../../utils/testUtils";
import { server } from "../../../../mocks/node";
import { errorHandlers } from "../../../../mocks/handlers";

describe("Given a addMarkerToShoppingCart function", () => {
  const marker: ShoppingCart = shoppingCartMarkerMock[0];

  describe("When it is invoked", () => {
    test("Then it should return one marker", async () => {
      const markersService = new AxiosMarkersService(apiUrl);

      const {
        result: {
          current: { addMarkerToShoppingCart },
        },
      } = renderHook(() => useMarkers(markersService), {
        wrapper: wrapWithProviders,
      });

      const expectedMarker = await addMarkerToShoppingCart(marker);

      expect(expectedMarker).toStrictEqual(marker);
    });
  });

  describe("When it is invoked and there is an error", () => {
    test("Then it should throw an 'Lo sentimos, no se ha podido añadir el rotulador a la cetsa de la compra' error", () => {
      server.resetHandlers(...errorHandlers);

      const expectedError =
        "Lo sentimos, no se ha podido añadir el rotulador a la cetsa de la compra";
      const markersService = new AxiosMarkersService(apiUrl);

      const {
        result: {
          current: { addMarkerToShoppingCart },
        },
      } = renderHook(() => useMarkers(markersService), {
        wrapper: wrapWithProviders,
      });

      const expectedMarker = addMarkerToShoppingCart(marker);

      expect(expectedMarker).rejects.toThrow(expectedError);
    });
  });
});
