import { Marker, ShoppingCart } from "../types";

interface MarkersService {
  getMarkers(): Promise<Marker[]>;
  getOneMarker(id: string): Promise<Marker>;
  getShoppingCartMarkers(): Promise<ShoppingCart[]>;
  AddMarkerToShoppingCart(marker: ShoppingCart): Promise<ShoppingCart>;
  UpdateMarkerFromShoppingCart(
    id: string,
    marker: ShoppingCart,
  ): Promise<ShoppingCart>;
  DeleteMarkerFromShoppingCart(id: string): Promise<ShoppingCart>;
}
export default MarkersService;
