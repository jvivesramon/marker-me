import { renderHook } from "@testing-library/react";
import { ShoppingCart } from "../../types";
import { shoppingCartMarkerMock } from "../../mocks/markersMock";
import AxiosMarkersService from "../../services/AxiosMarkersService";
import apiUrl from "../../../../utils/apiUrl/apiUrl";
import useMarkers from "../useMakers";
import { wrapWithProviders } from "../../../../utils/testUtils";
import { server } from "../../../../mocks/node";
import { errorHandlers } from "../../../../mocks/handlers";

describe("Given an updateMarkerFromShoppingCart function", () => {
  const marker: ShoppingCart = shoppingCartMarkerMock[0];
  const idMock = "1";

  describe("When it is invoked", () => {
    test("Then it should return one marker", async () => {
      const markersService = new AxiosMarkersService(apiUrl);

      const {
        result: {
          current: { updateMarkerFromShoppingCart },
        },
      } = renderHook(() => useMarkers(markersService), {
        wrapper: wrapWithProviders,
      });

      const expectedMarker = await updateMarkerFromShoppingCart(idMock, marker);

      expect(expectedMarker).toStrictEqual(marker);
    });
  });

  describe("When it is invoked and there is an error", () => {
    test("Then it should throw an 'Lo sentimos, no se pueden añadir más rotuladores' error", () => {
      server.resetHandlers(...errorHandlers);

      const expectedError = "Lo sentimos, no se pueden añadir más rotuladores";
      const markersService = new AxiosMarkersService(apiUrl);

      const {
        result: {
          current: { updateMarkerFromShoppingCart },
        },
      } = renderHook(() => useMarkers(markersService), {
        wrapper: wrapWithProviders,
      });

      const expectedMarker = updateMarkerFromShoppingCart(idMock, marker);

      expect(expectedMarker).rejects.toThrow(expectedError);
    });
  });
});
