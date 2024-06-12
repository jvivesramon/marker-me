import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ModalStateStructure, UiSliceStructure } from "./types";

const uiState: UiSliceStructure = {
  isLoading: false,
  modalState: {
    isVisible: false,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState: uiState,
  reducers: {
    showLoading: (currentState: UiSliceStructure) => ({
      ...currentState,
      isLoading: true,
    }),
    hideLoading: (currentState: UiSliceStructure) => ({
      ...currentState,
      isLoading: false,
    }),
    showModal: (
      currentState: UiSliceStructure,
      action: PayloadAction<ModalStateStructure>,
    ) => ({
      ...currentState,
      modalState: {
        ...action.payload,
      },
    }),
    hideModal: (currentState: UiSliceStructure) => ({
      ...currentState,
      modalState: { ...uiState.modalState },
    }),
  },
});

export const {
  showLoading: showLoadingActionCreator,
  hideLoading: hideLoadingActionCreator,
  showModal: showModalActionCreator,
  hideModal: hideModalActionCreator,
} = uiSlice.actions;

export const uiReducer = uiSlice.reducer;
