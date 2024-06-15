import { useCallback } from "react";
import MarkersService from "../services/types";
import { Marker } from "../types";
import { useAppDispatch } from "../../../store";
import {
  hideLoadingActionCreator,
  showLoadingActionCreator,
} from "../../ui/uiSlice";
import showToast from "../../../toast/showToast";

const useMarkers = (markersService: MarkersService) => {
  const dispatch = useAppDispatch();

  const getMarkers = useCallback(async (): Promise<Marker[]> => {
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

  const getOneMarker = useCallback(
    async (id: string): Promise<Marker> => {
      try {
        dispatch(showLoadingActionCreator());

        const marker = await markersService.getOneMarker(id);
        dispatch(hideLoadingActionCreator());

        return marker;
      } catch {
        dispatch(hideLoadingActionCreator());

        const error = "Lo sentimos, no se ha podido cargar el rotulador";
        showToast(error, "error");

        throw error;
      }
    },
    [dispatch, markersService],
  );

  return { getMarkers, getOneMarker };
};

export default useMarkers;
