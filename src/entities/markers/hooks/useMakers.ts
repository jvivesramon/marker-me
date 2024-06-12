import { useCallback } from "react";
import MarkersService from "../services/types";
import { Markers } from "../types";
import { useAppDispatch } from "../../../store";
import {
  hideLoadingActionCreator,
  showLoadingActionCreator,
} from "../../ui/uiSlice";
import showToast from "../../../toast/showToast";

const useMarkers = (markersService: MarkersService) => {
  const dispatch = useAppDispatch();

  const getMarkers = useCallback(async (): Promise<Markers[]> => {
    try {
      dispatch(showLoadingActionCreator());

      const markers = await markersService.getMarkers();
      dispatch(hideLoadingActionCreator());

      return markers;
    } catch {
      dispatch(hideLoadingActionCreator());

      const error = "Lo sentimos, no se han podido cargar los rotuladores";
      showToast(error, "error");

      throw error;
    }
  }, [dispatch, markersService]);

  return { getMarkers };
};

export default useMarkers;
