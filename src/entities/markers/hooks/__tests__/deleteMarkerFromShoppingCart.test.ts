import { renderHook } from "@testing-library/react";
import AxiosMarkersService from "../../services/AxiosMarkersService";
import apiUrl from "../../../../utils/apiUrl/apiUrl";
import useMarkers from "../useMakers";
import { wrapWithProviders } from "../../../../utils/testUtils";
import { server } from "../../../../mocks/node";
import { errorHandlers } from "../../../../mocks/handlers";

describe("Given a deleteMarkerFromShoppingCart function", () => {
  const idMock = "1";

  describe("When it is invoked", () => {
    test("Then it should return an empty list", async () => {
      const markersService = new AxiosMarkersService(apiUrl);

      const {
        result: {
          current: { deleteMarkerFromShoppingCart },
        },
      } = renderHook(() => useMarkers(markersService), {
        wrapper: wrapWithProviders,
      });

      const expectedMarker = await deleteMarkerFromShoppingCart(idMock);

      expect(expectedMarker).toStrictEqual({});
    });
  });

  describe("When it is invoked and there is an error", () => {
    test("Then it should throw an 'Lo sentimos, no se ha podido eliminar el rotulador de la cesta de la compra' error", () => {
      server.resetHandlers(...errorHandlers);

      const expectedError =
        "Lo sentimos, no se ha podido eliminar el rotulador de la cesta de la compra";
      const markersService = new AxiosMarkersService(apiUrl);

      const {
        result: {
          current: { deleteMarkerFromShoppingCart },
        },
      } = renderHook(() => useMarkers(markersService), {
        wrapper: wrapWithProviders,
      });

      const expectedMarker = deleteMarkerFromShoppingCart(idMock);

      expect(expectedMarker).rejects.toThrow(expectedError);
    });
  });
});
