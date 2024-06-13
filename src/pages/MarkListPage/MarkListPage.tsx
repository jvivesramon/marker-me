import { useAppDispatch, useAppSelector } from "../../store";
import { useEffect, useMemo } from "react";
import { useRef } from "react";
import apiUrl from "../../utils/apiUrl/apiUrl";
import "./MarkListPageStyles.scss";
import AxiosMarkersService from "../../entities/markers/services/AxiosMarkersService";
import useMarkers from "../../entities/markers/hooks/useMakers";
import { loadMarkersActionCreator } from "../../entities/markers/slice/markersSlice";
import Loading from "../../components/Loaders/Loading";
import Button from "../../components/Button/Button";
import MarkList from "../../components/MarkList/MarkList";

const MarkListPage = (): React.ReactElement => {
  const markersClient = useMemo(() => new AxiosMarkersService(apiUrl), []);
  const { getMarkers } = useMarkers(markersClient);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.ui);
  const myRef = useRef<HTMLElement>(null);

  useEffect(() => {
    (async () => {
      const markers = await getMarkers();
      dispatch(loadMarkersActionCreator(markers));
    })();
  }, [dispatch, getMarkers]);

  const scrollToMarkList = () => {
    if (myRef.current) {
      myRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mark-list-page">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="landing-image">
            <div className="gradient-overlay"></div>
            <div className="landing-text">
              <h1 className="landing-text__title">
                Rotuladores que {""}
                <span className="landing-text__weight">marcan</span> la
                diferencia
              </h1>
              <Button
                classname="collection-button"
                text="Ver la colección"
                actionOnClick={scrollToMarkList}
              ></Button>
            </div>
          </div>
          <MarkList myRef={myRef} />
        </>
      )}
    </div>
  );
};

export default MarkListPage;
