import { useEffect, useMemo, useState } from "react";
import AxiosMarkersService from "../../entities/markers/services/AxiosMarkersService";
import "./MarkerDetailPageStyles.scss";
import apiUrl from "../../utils/apiUrl/apiUrl";
import { useAppDispatch, useAppSelector } from "../../store";
import useMarkers from "../../entities/markers/hooks/useMakers";
import { useParams } from "react-router-dom";
import {
  loadMarkerByIdActionCreator,
  resetMarkersStoreActionCreator,
} from "../../entities/markers/slice/markersSlice";
import Loading from "../../components/Loaders/Loading";
import Button from "../../components/Button/Button";

const MarkerDetailPage = (): React.ReactElement => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectColor, setSelectColor] = useState(false);

  const markersClient = useMemo(() => new AxiosMarkersService(apiUrl), []);
  const { getOneMarker } = useMarkers(markersClient);
  const { id } = useParams();
  const { isLoading } = useAppSelector((store) => store.ui);
  const dispatch = useAppDispatch();
  const { selectedMarker } = useAppSelector((store) => store.markers);

  useEffect(() => {
    (async () => {
      scrollTo(0, 0);

      if (id) {
        const selectedMarker = await getOneMarker(id);

        if (selectedMarker) {
          dispatch(loadMarkerByIdActionCreator(selectedMarker));
        }
      }
    })();

    return () => {
      dispatch(resetMarkersStoreActionCreator());
    };
  }, [dispatch, getOneMarker, id]);

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

  const checkIfSelectedColor = (color: string): void => {
    !color && setSelectColor(true);
  };

  const changeStates = (color: string) => {
    setSelectedColor(color);
    setSelectColor(false);
  };

  return (
    <section className="detail-container">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div>
            <img
              className="marker-image"
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
                (color, position) => (
                  <li
                    className={`marker-info__colors--container ${isSelected(color) ? "marker-info__colors--selected" : ""}`}
                    key={position}
                  >
                    <Button
                      style={{
                        backgroundColor: isValidColor(color) ? color : "black",
                      }}
                      classname="marker-info__colors--container-color"
                      actionOnClick={() => changeStates(color)}
                    />
                  </li>
                ),
              )}
            </ul>
            <p hidden={!selectColor && true} className="marker-info__warning">
              Please, select a color
            </p>
            <Button
              classname="marker-info__button"
              text="Añadir a la cesta"
              actionOnClick={() => checkIfSelectedColor(selectedColor)}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default MarkerDetailPage;
