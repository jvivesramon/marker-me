import { emptyMarkersMock, markersMock } from "../../mocks/markersMock";
import { MarkersState } from "../../types";
import {
  initialMarkersState,
  loadMarkerByIdActionCreator,
  markersReducer,
} from "../markersSlice";

describe("Given a loadMarkerById reducer", () => {
  describe("When it receives an empty 'selectedMarker' state and a loadMarkerById action with the 'Bolígrafos BIC' as payload", () => {
    test("Then it should return a new state with the 'Bolígrafos BIC'", () => {
      const currentEmptyState: MarkersState = {
        markersData: [],
        brands: [],
        categories: [],
        selectedMarker: initialMarkersState.selectedMarker,
        shoppingCart: [],
      };
      const expectedNewMarkersState: MarkersState = {
        markersData: emptyMarkersMock,
        brands: [],
        categories: [],
        selectedMarker: markersMock[0],
        shoppingCart: [],
      };

      const loadMarkerById = loadMarkerByIdActionCreator(markersMock[0]);

      const newState: MarkersState = markersReducer(
        currentEmptyState,
        loadMarkerById,
      );

      expect(expectedNewMarkersState).toStrictEqual(newState);
    });
  });
});
