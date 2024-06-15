import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MarkersState, Marker } from "../types";

export const initialMarkersState: MarkersState = {
  markersData: [],
  brands: [],
  categories: [],
  selectedMarker: {
    id: 0,
    name: "",
    shortDescription: "",
    brand: "",
    categories: [],
    description: "",
    image: {
      big: "",
      small: "",
    },
    price: "",
    stock: {
      colors: {},
    },
  },
};

export const markersSlice = createSlice({
  name: "markers",
  initialState: initialMarkersState,
  reducers: {
    loadMarkers: (
      currentMarkersState,
      action: PayloadAction<Marker[]>,
    ): MarkersState => ({
      ...currentMarkersState,
      brands: [...action.payload.flatMap((marker) => marker.brand)],
      markersData: [...action.payload],
      categories: [
        ...action.payload
          .flatMap((marker) => marker.categories)
          .reduce(
            (acc: string[], category: string) =>
              acc.includes(category) ? acc : [...acc, category],
            [],
          ),
      ],
    }),
    loadMarkerById: (
      currentMarkersState,
      action: PayloadAction<Marker>,
    ): MarkersState => ({
      ...currentMarkersState,
      selectedMarker: action.payload,
    }),
    resetMarkersState: (): MarkersState => initialMarkersState,
  },
});

export const {
  loadMarkers: loadMarkersActionCreator,
  loadMarkerById: loadMarkerByIdActionCreator,
  resetMarkersState: resetMarkersStoreActionCreator,
} = markersSlice.actions;

export const markersReducer = markersSlice.reducer;
