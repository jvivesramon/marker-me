import { renderHook } from "@testing-library/react";
import { Marker } from "../../types";
import { markersMock } from "../../mocks/markersMock";
import AxiosMarkersService from "../../services/AxiosMarkersService";
import apiUrl from "../../../../utils/apiUrl/apiUrl";
import useMarkers from "../useMakers";
import { wrapWithProviders } from "../../../../utils/testUtils";
import { server } from "../../../../mocks/node";
import { errorHandlers } from "../../../../mocks/handlers";

describe("Given a getOneMarker function", () => {
  const idMock = "0";

  describe("When it is invoked", () => {
    test("Then it should return one marker", async () => {
      const marker: Marker = markersMock[0];
      const markersService = new AxiosMarkersService(apiUrl);

      const {
        result: {
          current: { getOneMarker },
        },
      } = renderHook(() => useMarkers(markersService), {
        wrapper: wrapWithProviders,
      });

      const expectedMarkersList = await getOneMarker(idMock);

      expect(expectedMarkersList).toStrictEqual(marker);
    });
  });

  describe("When it is invoked and there is an error", () => {
    test("Then it should throw an 'Lo sentimos, no se ha podido cargar el rotulador' error", () => {
      server.resetHandlers(...errorHandlers);

      const expectedError = "Lo sentimos, no se ha podido cargar el rotulador";
      const markersService = new AxiosMarkersService(apiUrl);

      const {
        result: {
          current: { getOneMarker },
        },
      } = renderHook(() => useMarkers(markersService), {
        wrapper: wrapWithProviders,
      });

      const expectedMarkersList = getOneMarker(idMock);

      expect(expectedMarkersList).rejects.toThrow(expectedError);
    });
  });
});
