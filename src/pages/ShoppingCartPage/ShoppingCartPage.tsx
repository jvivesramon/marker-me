import { useEffect, useMemo } from "react";
import ShoppingCartCard from "../../components/ShoppingCartCard/ShoppingCartCard";
import "./ShoppingCartPageStyles.scss";
import AxiosMarkersService from "../../entities/markers/services/AxiosMarkersService";
import apiUrl from "../../utils/apiUrl/apiUrl";
import useMarkers from "../../entities/markers/hooks/useMakers";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  loadMarkersActionCreator,
  loadShoppingCartMarkersActionCreator,
} from "../../entities/markers/slice/markersSlice";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import paths from "../../routers/paths/paths";
import { Marker, ShoppingCart } from "../../entities/markers/types";
import showToast from "../../toast/showToast";

const ShoppingCartPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const markersClient = useMemo(() => new AxiosMarkersService(apiUrl), []);
  const {
    getShoppingCartMarkers,
    updateMarkerFromShoppingCart,
    getMarkers,
    deleteMarkerFromShoppingCart,
  } = useMarkers(markersClient);

  const dispatch = useAppDispatch();
  const { shoppingCart, markersData } = useAppSelector(
    (store) => store.markers,
  );

  useEffect(() => {
    (async () => {
      const shoppingCartMarkers = await getShoppingCartMarkers();
      const markers = await getMarkers();

      dispatch(loadShoppingCartMarkersActionCreator(shoppingCartMarkers));
      dispatch(loadMarkersActionCreator(markers));
    })();
  }, [dispatch, getMarkers, getShoppingCartMarkers]);

  const reloadComponent = async (): Promise<void> => {
    const updatedShoppingCart = await getShoppingCartMarkers();
    dispatch(loadShoppingCartMarkersActionCreator(updatedShoppingCart));
  };

  const total = shoppingCart.reduce((acc, item) => {
    const itemTotal = Object.values(item.stock.colors).reduce(
      (sum, quantity) => {
        return sum + Number(item.price) * quantity;
      },
      0,
    );

    return acc + itemTotal;
  }, 0);

  const addMoreMarkers = async (
    marker: ShoppingCart,
    markersList: Marker[],
    color: string,
  ) => {
    const selectedColorFromShoppingCart = markersList.find(
      (item) => item.id === marker.id,
    );

    if (
      selectedColorFromShoppingCart?.stock.colors[color] ===
      marker.stock.colors[color]
    ) {
      showToast("No hay más stock disponible de este producto", "error");
      return;
    }

    try {
      await updateMarkerFromShoppingCart(
        marker?.id.toString() as string,
        {
          ...marker,
          total: Number(marker?.total) + 1,
          stock: {
            ...marker?.stock,
            colors: {
              ...marker?.stock.colors,
              [color]: (marker?.stock.colors[color] as number) + 1,
            },
          },
        } as ShoppingCart,
      );

      reloadComponent();
    } catch {
      const error = new Error().message;

      showToast(error, "error");
    }
    return;
  };

  const substractMarkers = async (
    marker: ShoppingCart,
    markersList: ShoppingCart[],
    color: string,
  ) => {
    if (marker.stock.colors[color] === 1) {
      deleteMarkers(marker, markersList, color);

      reloadComponent();
      return;
    }

    try {
      await updateMarkerFromShoppingCart(
        marker?.id.toString() as string,
        {
          ...marker,
          total: Number(marker?.total) - 1,
          stock: {
            ...marker?.stock,
            colors: {
              ...marker?.stock.colors,
              [color]: (marker?.stock.colors[color] as number) - 1,
            },
          },
        } as ShoppingCart,
      );

      reloadComponent();
    } catch {
      const error = new Error().message;

      showToast(error, "error");
    }
    return;
  };

  const deleteMarkers = async (
    marker: ShoppingCart,
    markersList: ShoppingCart[],
    color: string,
  ) => {
    const selectedColorFromShoppingCart = markersList.find(
      (item) => item.id === marker.id,
    );

    if (
      Object.keys(selectedColorFromShoppingCart?.stock.colors as object)
        .length === 1
    ) {
      await deleteMarkerFromShoppingCart(marker.id.toString());

      reloadComponent();

      return;
    }

    const getNewColors = (marker: ShoppingCart) =>
      Object.keys(marker.stock.colors).filter((item) => item !== color);

    try {
      await updateMarkerFromShoppingCart(
        marker?.id.toString() as string,
        {
          ...marker,
          total: Number(marker?.total) - 1,
          stock: {
            ...marker?.stock,
            colors: getNewColors(marker).reduce(
              (acc, item) => {
                acc[item] = marker.stock.colors[item];
                return acc;
              },
              {} as Record<string, number>,
            ),
          },
        } as ShoppingCart,
      );

      reloadComponent();
    } catch {
      const error = new Error().message;

      showToast(error, "error");
    }
    return;
  };

  const goToProcessPayment = (markers: ShoppingCart[]) => {
    if (!markers.length) {
      return;
    }

    navigate(`${paths.payment}`);
  };

  return (
    <section className="shopping-cart-container">
      <h1>Carrito de la compra</h1>
      <div className="shopping-cart-container__header">
        <div className="shopping-cart-container__header--container">
          <p>Descripción</p>
        </div>
        <div className="shopping-cart-container__header--container">
          <p>Subtotal</p>
        </div>
      </div>
      <ul>
        {shoppingCart.map((item) =>
          Object.keys(item.stock.colors).map((color) => (
            <li key={`${item.id}-${color}`}>
              <ShoppingCartCard
                total={item.stock.colors[color]}
                markProps={item}
                onAdd={() => addMoreMarkers(item, markersData, color)}
                onDelete={() => deleteMarkers(item, shoppingCart, color)}
                onRemove={() => substractMarkers(item, shoppingCart, color)}
                color={color}
              />
            </li>
          )),
        )}
      </ul>
      <div className="shopping-cart-container__total">
        <span>Total compra:</span>
        <span>{total.toFixed(2)}€</span>
      </div>
      <div className="button__container">
        <Button
          classname="button__container--shopping"
          text="Seguir comprando"
          actionOnClick={() => navigate(`${paths.markers}`)}
        />

        <Button
          classname="button__container--checkout"
          text="REALIZAR EL PAGO"
          actionOnClick={() => goToProcessPayment(shoppingCart)}
        />
      </div>
    </section>
  );
};

export default ShoppingCartPage;
