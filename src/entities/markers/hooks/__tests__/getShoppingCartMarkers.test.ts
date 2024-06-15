import { renderHook } from "@testing-library/react";
import { shoppingCartMarkerMock } from "../../mocks/markersMock";
import AxiosMarkersService from "../../services/AxiosMarkersService";
import apiUrl from "../../../../utils/apiUrl/apiUrl";
import useMarkers from "../useMakers";
import { wrapWithProviders } from "../../../../utils/testUtils";
import { server } from "../../../../mocks/node";
import { errorHandlers } from "../../../../mocks/handlers";
import { ShoppingCart } from "../../types";

describe("Given a getShoppingCartMark function", () => {
  describe("When it is invoked", () => {
    test("Then it should return a list of two markers", async () => {
      const markersList: ShoppingCart[] = shoppingCartMarkerMock;
      const markersService = new AxiosMarkersService(apiUrl);

      const {
        result: {
          current: { getShoppingCartMarkers },
        },
      } = renderHook(() => useMarkers(markersService), {
        wrapper: wrapWithProviders,
      });

      const expectedMarkersList = await getShoppingCartMarkers();

      expect(expectedMarkersList).toStrictEqual(markersList);
    });
  });

  describe("When it is invoked and there is an error", () => {
    test("Then it should throw an 'Lo sentimos, no se han podido cargar los artículos del carrito de compras", () => {
      server.resetHandlers(...errorHandlers);

      const expectedError =
        "Lo sentimos, no se han podido cargar los artículos del carrito de compras";
      const markersService = new AxiosMarkersService(apiUrl);

      const {
        result: {
          current: { getShoppingCartMarkers },
        },
      } = renderHook(() => useMarkers(markersService), {
        wrapper: wrapWithProviders,
      });

      const expectedMarkersList = getShoppingCartMarkers();
      expect(expectedMarkersList).rejects.toThrow(expectedError);
    });
  });
});
