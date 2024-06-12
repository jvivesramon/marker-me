import {
  falseLoadingState,
  hideModalMock,
  showModalMock,
  trueLoadingState,
} from "./mocks/uiMocks";
import {
  hideModalActionCreator,
  hideLoadingActionCreator,
  showModalActionCreator,
  showLoadingActionCreator,
  uiReducer,
} from "./uiSlice";

describe("Given a showLoading reducer", () => {
  describe("When it is called", () => {
    test("Then it should return the new loading state set to true", () => {
      const newExpectedLoadingState = uiReducer(
        falseLoadingState,
        showLoadingActionCreator(),
      );

      expect(newExpectedLoadingState).toStrictEqual(trueLoadingState);
    });
  });
});

describe("Given a hideLoading reducer", () => {
  describe("When it is called", () => {
    test("Then it should return the new loading state set to false", () => {
      const newExpectedLoadingState = uiReducer(
        trueLoadingState,
        hideLoadingActionCreator(),
      );

      expect(newExpectedLoadingState).toStrictEqual(falseLoadingState);
    });
  });
});

describe("Given a showModal reducer", () => {
  describe("When it is called", () => {
    test("Then it should return a new modalState with isVisible set to true", () => {
      const newExpectedModalState = uiReducer(
        hideModalMock,
        showModalActionCreator({
          isVisible: true,
        }),
      );
      expect(newExpectedModalState).toStrictEqual(showModalMock);
    });
  });
});

describe("Given a hideModal reducer", () => {
  describe("When it is called", () => {
    test("Then it should return a new modalState with isVisible set to false", () => {
      const newExpectedModalState = uiReducer(
        showModalMock,
        hideModalActionCreator(),
      );

      expect(newExpectedModalState).toStrictEqual(hideModalMock);
    });
  });
});
