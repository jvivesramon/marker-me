import { useCallback } from "react";
import MarkersService from "../services/types";
import { Marker, ShoppingCart } from "../types";
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

  const getShoppingCartMarkers = useCallback(async (): Promise<
    ShoppingCart[]
  > => {
    try {
      dispatch(showLoadingActionCreator());

      const shoppingMarkers = await markersService.getShoppingCartMarkers();
      dispatch(hideLoadingActionCreator());

      return shoppingMarkers;
    } catch {
      dispatch(hideLoadingActionCreator());

      const error =
        "Lo sentimos, no se han podido cargar los artículos del carrito de compras";
      showToast(error, "error");

      throw error;
    }
  }, [dispatch, markersService]);

  const addMarkerToShoppingCart = useCallback(
    async (marker: ShoppingCart): Promise<ShoppingCart> => {
      try {
        dispatch(showLoadingActionCreator());

        const product = await markersService.AddMarkerToShoppingCart(marker);
        dispatch(hideLoadingActionCreator());

        return product;
      } catch {
        dispatch(hideLoadingActionCreator());

        const error =
          "Lo sentimos, no se ha podido añadir el rotulador a la cetsa de la compra";
        showToast(error, "error");

        throw error;
      }
    },
    [dispatch, markersService],
  );

  const updateMarkerFromShoppingCart = useCallback(
    async (id: string, marker: ShoppingCart): Promise<ShoppingCart> => {
      try {
        dispatch(showLoadingActionCreator());

        const product = await markersService.UpdateMarkerFromShoppingCart(
          id,
          marker,
        );
        dispatch(hideLoadingActionCreator());

        return product;
      } catch {
        dispatch(hideLoadingActionCreator());

        const error = "Lo sentimos, no se pueden añadir más rotuladores";
        showToast(error, "error");

        throw error;
      }
    },
    [dispatch, markersService],
  );

  const deleteMarkerFromShoppingCart = useCallback(
    async (id: string): Promise<ShoppingCart> => {
      try {
        dispatch(showLoadingActionCreator());

        const marker = await markersService.DeleteMarkerFromShoppingCart(id);
        dispatch(hideLoadingActionCreator());

        return marker;
      } catch {
        dispatch(hideLoadingActionCreator());

        const error =
          "Lo sentimos, no se ha podido eliminar el rotulador de la cesta de la compra";
        showToast(error, "error");

        throw error;
      }
    },
    [dispatch, markersService],
  );

  return {
    getMarkers,
    getOneMarker,
    getShoppingCartMarkers,
    addMarkerToShoppingCart,
    updateMarkerFromShoppingCart,
    deleteMarkerFromShoppingCart,
  };
};

export default useMarkers;
