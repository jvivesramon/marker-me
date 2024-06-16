import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AxiosMarkersService from "../../entities/markers/services/AxiosMarkersService";
import "./MarkerDetailPageStyles.scss";
import apiUrl from "../../utils/apiUrl/apiUrl";
import { useAppDispatch, useAppSelector } from "../../store";
import useMarkers from "../../entities/markers/hooks/useMakers";
import {
  loadMarkerByIdActionCreator,
  loadShoppingCartMarkersActionCreator,
} from "../../entities/markers/slice/markersSlice";
import Loading from "../../components/Loaders/Loading";
import Button from "../../components/Button/Button";
import { ShoppingCart } from "../../entities/markers/types";
import showToast from "../../toast/showToast";
import paths from "../../routers/paths/paths";

const MarkerDetailPage = (): React.ReactElement => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectAColor, setSelectAColor] = useState(false);
  const [allowedToAddMarker, setAllowedToAddMarker] = useState(false);
  const [selectedMarkerColor, setSelectedMarkerColor] = useState(
    {} as ShoppingCart,
  );
  const navigate = useNavigate();

  const markersClient = useMemo(() => new AxiosMarkersService(apiUrl), []);
  const {
    getOneMarker,
    addMarkerToShoppingCart,
    updateMarkerFromShoppingCart,
    getShoppingCartMarkers,
  } = useMarkers(markersClient);
  const { id } = useParams();
  const { isLoading } = useAppSelector((store) => store.ui);
  const dispatch = useAppDispatch();
  const { selectedMarker, shoppingCart } = useAppSelector(
    (store) => store.markers,
  );

  useEffect(() => {
    (async () => {
      scrollTo(0, 0);

      if (id) {
        const selectedMarker = await getOneMarker(id);
        const shoppingCartMarker = await getShoppingCartMarkers();

        if (selectedMarker) {
          dispatch(loadMarkerByIdActionCreator(selectedMarker));
          dispatch(loadShoppingCartMarkersActionCreator(shoppingCartMarker));
        }
      }
    })();
  }, [dispatch, getOneMarker, getShoppingCartMarkers, id]);

  const isValidColor = (color: string) => {
    const validationColor = new Option().style;
    validationColor.color = color;
    return validationColor.color !== "";
  };

  const getFirstUpperCaseLetterCategories = (categories: string[]) => {
    return categories
      .map(
        (category: string) =>
          category.charAt(0).toUpperCase() + category.slice(1),
      )
      .join(", ");
  };

  const isSelected = (color: string): boolean => {
    return color === selectedColor;
  };

  const changeStates = (color: string, marker: ShoppingCart) => {
    setSelectedColor(color);
    setSelectAColor(false);
    setSelectedMarkerColor(marker);
    setAllowedToAddMarker(true);
  };

  const checkIfSelectedColor = (color: string): void => {
    if (!color) {
      setSelectAColor(true);
    }
  };

  const onAddToShoppingCart = async (markerToShop: ShoppingCart) => {
    const selectedColorFromShoppingCart = shoppingCart.find(
      (item) => item.id === markerToShop.id,
    );

    const isColor = () =>
      Object.keys(
        selectedColorFromShoppingCart?.stock.colors as object,
      ).includes(selectedColor);

    if (
      selectedColorFromShoppingCart?.stock.colors[selectedColor] ===
      markerToShop.stock.colors[selectedColor]
    ) {
      showToast("No hay más stock disponible de este producto", "error");
      return;
    }

    if (allowedToAddMarker) {
      if (shoppingCart.some((marker) => marker.id === markerToShop.id)) {
        try {
          await updateMarkerFromShoppingCart(
            selectedColorFromShoppingCart?.id.toString() as string,
            {
              ...selectedColorFromShoppingCart,
              total: Number(selectedColorFromShoppingCart?.total) + 1,
              stock: {
                ...selectedColorFromShoppingCart?.stock,
                colors: {
                  ...selectedColorFromShoppingCart?.stock.colors,
                  [selectedColor]: isColor()
                    ? (selectedColorFromShoppingCart?.stock.colors[
                        selectedColor
                      ] as number) + 1
                    : 1,
                },
              },
            } as ShoppingCart,
          );

          showToast(
            "Se ha añadido correctamente a la cesta de la compra",
            "success",
          );

          const updatedShoppingCart = await getShoppingCartMarkers();
          dispatch(loadShoppingCartMarkersActionCreator(updatedShoppingCart));

          navigate(`${paths.markers}`);
        } catch {
          const error = new Error().message;

          showToast(error, "error");
        }
        return;
      }

      try {
        await addMarkerToShoppingCart({
          ...markerToShop,
          total: 1,
          stock: {
            ...markerToShop?.stock,
            colors: {
              [selectedColor]: 1,
            },
          },
        } as ShoppingCart);

        showToast(
          "Se ha añadido correctamente a la cesta de la compra",
          "success",
        );

        const updatedShoppingCart = await getShoppingCartMarkers();
        dispatch(loadShoppingCartMarkersActionCreator(updatedShoppingCart));

        navigate(`${paths.markers}`);
      } catch {
        const error = new Error().message;

        showToast(error, "error");
      }

      return;
    }

    return;
  };

  const onClick = (color: string, marker: ShoppingCart) => {
    checkIfSelectedColor(color);

    if (!selectAColor && allowedToAddMarker) {
      onAddToShoppingCart(marker);
    }

    return;
  };

  return (
    <section className="detail-container">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="back-to-page-container">
            <Button
              classname=""
              text="Volver atrás"
              actionOnClick={() => navigate(-1)}
            />
          </div>
          <div className="marker-container">
            <div className="marker-image__container">
              <img
                src={selectedMarker.image.big}
                alt="marker image"
                width={296}
                height={302}
              />
            </div>
            <div className="marker-info">
              <h1 className="marker-info__name">{selectedMarker.name}</h1>
              <h2 className="marker-info__short-description">
                {selectedMarker.shortDescription}
              </h2>
              <p className="marker-info__categories">
                {getFirstUpperCaseLetterCategories(selectedMarker.categories)}
              </p>
              <p className="marker-info__price">{`${selectedMarker.price}€ ud.`}</p>
              <p className="marker-info__description">
                {selectedMarker.description}
              </p>
              <p className="marker-info__select-color">Selecciona un color:</p>
              <ul className="marker-info__colors">
                {Object.keys(selectedMarker.stock.colors).map(
                  (color, position) =>
                    selectedMarker.stock.colors[color] && (
                      <li
                        className={`marker-info__colors--container ${isSelected(color) ? "marker-info__colors--selected" : ""}`}
                        key={position}
                      >
                        <Button
                          style={{
                            backgroundColor: isValidColor(color)
                              ? color
                              : "black",
                          }}
                          classname="marker-info__colors--container-color"
                          actionOnClick={() =>
                            changeStates(color, { ...selectedMarker, total: 1 })
                          }
                        />
                      </li>
                    ),
                )}
              </ul>
              <p
                className={`marker-info__warning ${selectAColor ? "" : "display"}`}
              >
                Porfavor, selecciona un color
              </p>
              <Button
                classname="marker-info__button"
                text="Añadir a la cesta"
                actionOnClick={() =>
                  onClick(selectedColor, selectedMarkerColor)
                }
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default MarkerDetailPage;
