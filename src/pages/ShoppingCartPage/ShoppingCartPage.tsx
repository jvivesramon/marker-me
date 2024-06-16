import { useEffect, useMemo } from "react";
import ShoppingCartCard from "../../components/ShoppingCartCard/ShoppingCartCard";
import "./ShoppingCartPageStyles.scss";
import AxiosMarkersService from "../../entities/markers/services/AxiosMarkersService";
import apiUrl from "../../utils/apiUrl/apiUrl";
import useMarkers from "../../entities/markers/hooks/useMakers";
import { useAppDispatch, useAppSelector } from "../../store";
import Loading from "../../components/Loaders/Loading";
import { loadShoppingCartMarkersActionCreator } from "../../entities/markers/slice/markersSlice";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import paths from "../../routers/paths/paths";

const ShoppingCartPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const markersClient = useMemo(() => new AxiosMarkersService(apiUrl), []);
  const { getShoppingCartMarkers } = useMarkers(markersClient);

  const { isLoading } = useAppSelector((store) => store.ui);
  const dispatch = useAppDispatch();
  const { shoppingCart } = useAppSelector((store) => store.markers);

  useEffect(() => {
    (async () => {
      const shoppingCartMarkers = await getShoppingCartMarkers();

      dispatch(loadShoppingCartMarkersActionCreator(shoppingCartMarkers));
    })();
  }, [dispatch, getShoppingCartMarkers]);

  const total = shoppingCart.reduce((acc, item) => {
    const itemTotal = Object.values(item.stock.colors).reduce(
      (sum, quantity) => {
        return sum + Number(item.price) * quantity;
      },
      0,
    );

    return acc + itemTotal;
  }, 0);

  return (
    <section className="shopping-cart-container">
      {isLoading ? (
        <Loading />
      ) : (
        <>
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
                    onAdd={() => ""}
                    onDelete={() => ""}
                    onRemove={() => ""}
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
            />
          </div>
        </>
      )}
    </section>
  );
};

export default ShoppingCartPage;
