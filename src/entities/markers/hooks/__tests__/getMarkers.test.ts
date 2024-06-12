import { renderHook } from "@testing-library/react";
import { Markers } from "../../types";
import { markersMock } from "../../mocks/markersMock";
import AxiosMarkersService from "../../services/AxiosMarkersService";
import apiUrl from "../../../../utils/apiUrl/apiUrl";
import useMarkers from "../useMakers";
import { wrapWithProviders } from "../../../../utils/testUtils";
import { server } from "../../../../mocks/node";
import { errorHandlers } from "../../../../mocks/handlers";

describe("Given a getMarkers function", () => {
  describe("When it is invoked", () => {
    test("Then it should return a list of two markers", async () => {
      const markersList: Markers[] = markersMock;
      const markersService = new AxiosMarkersService(apiUrl);

      const {
        result: {
          current: { getMarkers },
        },
      } = renderHook(() => useMarkers(markersService), {
        wrapper: wrapWithProviders,
      });

      const expectedMarkersList = await getMarkers();

      expect(expectedMarkersList).toStrictEqual(markersList);
    });
  });

  describe("When it is invoked and there is an error", () => {
    test("Then it should throw an 'Lo sentimos, no se han podido cargar los rotuladores' error", () => {
      server.resetHandlers(...errorHandlers);

      const expectedError =
        "Lo sentimos, no se han podido cargar los rotuladores";
      const markersService = new AxiosMarkersService(apiUrl);

      const {
        result: {
          current: { getMarkers },
        },
      } = renderHook(() => useMarkers(markersService), {
        wrapper: wrapWithProviders,
      });

      const expectedMarkersList = getMarkers();
      expect(expectedMarkersList).rejects.toThrow(expectedError);
    });
  });
});
