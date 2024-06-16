import { Link } from "react-router-dom";
import "./NavbarStyles.scss";
import paths from "../../routers/paths/paths";
import { useAppDispatch, useAppSelector } from "../../store";

import { ShoppingCart } from "../../entities/markers/types";
import AxiosMarkersService from "../../entities/markers/services/AxiosMarkersService";
import apiUrl from "../../utils/apiUrl/apiUrl";
import { useEffect, useMemo } from "react";
import useMarkers from "../../entities/markers/hooks/useMakers";
import { loadShoppingCartMarkersActionCreator } from "../../entities/markers/slice/markersSlice";

const Navbar = (): React.ReactElement => {
  const markersClient = useMemo(() => new AxiosMarkersService(apiUrl), []);
  const { getShoppingCartMarkers } = useMarkers(markersClient);

  const dispatch = useAppDispatch();
  const { shoppingCart } = useAppSelector((store) => store.markers);

  useEffect(() => {
    (async () => {
      const shoppingCartMarkers = await getShoppingCartMarkers();

      dispatch(loadShoppingCartMarkersActionCreator(shoppingCartMarkers));
    })();
  }, [dispatch, getShoppingCartMarkers]);

  const isEmpty = (shoppingCartList: ShoppingCart[]) =>
    !shoppingCartList.length;

  const getTotalItemsFromShoppingCart = (shoppingCart: ShoppingCart[]) => {
    let totalItems = 0;

    shoppingCart.forEach((item) => {
      const colorStock = Object.keys(item.stock.colors).length;
      totalItems += colorStock;
    });

    return totalItems;
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-container__icons">
        <Link to={`${paths.markers}`} className="navbar-container__home-icon">
          <img
            src="/images/navbar/markme-logo.svg"
            alt="MarkMe logo"
            width="192"
            height="29"
          />
        </Link>
        <Link
          to={`${paths.shoppingCart}`}
          className="navbar-container__shopping-cart-button"
        >
          <img
            src="/images/navbar/shopping-cart-icon.svg"
            alt="Shopping card button"
            height="45"
            width="39"
          />
          <div
            className={`shopping-cart-total ${isEmpty(shoppingCart) && "display"}`}
          >
            {getTotalItemsFromShoppingCart(shoppingCart)}
          </div>
        </Link>
      </div>
      <span className="navbar-container__divider"></span>
    </nav>
  );
};

export default Navbar;
