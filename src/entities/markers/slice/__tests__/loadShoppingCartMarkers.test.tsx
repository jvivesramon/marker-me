import { shoppingCartMarkerMock } from "../../mocks/markersMock";
import { MarkersState } from "../../types";
import {
  initialMarkersState,
  loadShoppingCartMarkersActionCreator,
  markersReducer,
} from "../markersSlice";

describe("Given a loadShoppingCartMarkers reducer", () => {
  describe("When it receives an empty markers state and the action to load two markers", () => {
    test("Then it should return a list with two markers", () => {
      const currentMarkersState: MarkersState = initialMarkersState;

      const loadMarkers = loadShoppingCartMarkersActionCreator(
        shoppingCartMarkerMock,
      );

      const expectedNewMarkersState: MarkersState = {
        ...currentMarkersState,
        shoppingCart: [...shoppingCartMarkerMock],
      };

      const newState: MarkersState = markersReducer(
        currentMarkersState,
        loadMarkers,
      );

      expect(expectedNewMarkersState).toStrictEqual(newState);
    });
  });
});
