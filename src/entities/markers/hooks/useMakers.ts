import { useCallback } from "react";
import MarkersService from "../services/types";
import { Markers } from "../types";

const useMarkers = (markersService: MarkersService) => {
  const getMarkers = useCallback(async (): Promise<Markers[]> => {
    try {
      const markers = await markersService.getMarkers();

      return markers;
    } catch {
      const error = "Lo sentimos, no se han podido cargar los rotuladores";

      throw error;
    }
  }, [markersService]);

  return { getMarkers };
};

export default useMarkers;
