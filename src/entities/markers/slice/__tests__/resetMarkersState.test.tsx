import { emptyMarkersMock, markersMock } from "../../mocks/markersMock";
import { MarkersState } from "../../types";
import {
  initialMarkersState,
  markersReducer,
  resetMarkersStoreActionCreator,
} from "../markersSlice";

describe("Given a resetSliceState reducer", () => {
  describe("When it called", () => {
    test("Then it should return a reseted state", () => {
      const currentMarkersState: MarkersState = {
        markersData: emptyMarkersMock,
        brands: [],
        categories: [],
        selectedMarker: markersMock[0],
        shoppingCart: [],
      };

      const expectedNewEmptyState: MarkersState = {
        markersData: [],
        brands: [],
        categories: [],
        selectedMarker: initialMarkersState.selectedMarker,
        shoppingCart: [],
      };

      const resetStateSlice = resetMarkersStoreActionCreator();

      const newState: MarkersState = markersReducer(
        currentMarkersState,
        resetStateSlice,
      );

      expect(expectedNewEmptyState).toStrictEqual(newState);
    });
  });
});
