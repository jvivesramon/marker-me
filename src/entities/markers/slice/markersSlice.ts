import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Markers, MarkersState } from "../types";

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
      action: PayloadAction<Markers[]>,
    ): MarkersState => ({
      ...currentMarkersState,
      brands: [...action.payload.map((brand) => Object.keys(brand)).flat()],
      markersData: [
        ...action.payload.flatMap((brand) =>
          Object.values(brand).flatMap((products) => products),
        ),
      ],
      categories: [
        ...action.payload
          .flatMap((brand) =>
            Object.values(brand).flatMap((products) => products),
          )
          .flatMap((product) => product.categories)
          .reduce(
            (acc: string[], category: string) =>
              acc.includes(category) ? acc : [...acc, category],
            [],
          ),
      ],
    }),
    resetMarkersState: (): MarkersState => initialMarkersState,
  },
});

export const {
  loadMarkers: loadMarkersActionCreator,
  resetMarkersState: resetMarkersStoreActionCreator,
} = markersSlice.actions;

export const markersReducer = markersSlice.reducer;
