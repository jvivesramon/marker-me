import { UiSliceStructure } from "../types";

export const showModalMock: UiSliceStructure = {
  isLoading: false,
  modalState: {
    isVisible: true,
  },
};

export const hideModalMock: UiSliceStructure = {
  isLoading: false,
  modalState: {
    isVisible: false,
  },
};

export const falseLoadingState = {
  isLoading: false,
  modalState: { isVisible: false },
};

export const trueLoadingState = {
  isLoading: true,
  modalState: { isVisible: false },
};
