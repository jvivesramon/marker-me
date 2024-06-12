import {
  brandsMock,
  categoriesMock,
  markersMock,
  markersProductsMock,
} from "../../mocks/markersMock";
import { MarkersState } from "../../types";
import {
  initialMarkersState,
  loadMarkersActionCreator,
  markersReducer,
} from "../markersSlice";

describe("Given a loadMarkers reducer", () => {
  describe("When it receives an empty markers state and the action to load two markers", () => {
    test("Then it should return a list with two markers", () => {
      const currentMarkersState: MarkersState = initialMarkersState;

      const loadMarkers = loadMarkersActionCreator(markersMock);

      const expectedNewMarkersState: MarkersState = {
        ...currentMarkersState,
        markersData: markersProductsMock,
        brands: brandsMock,
        categories: categoriesMock,
      };

      const newState: MarkersState = markersReducer(
        currentMarkersState,
        loadMarkers,
      );

      expect(expectedNewMarkersState).toStrictEqual(newState);
    });
  });
});
