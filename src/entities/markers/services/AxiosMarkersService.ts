import axios from "axios";
import { Marker, ShoppingCart } from "../types";
import MarkersService from "./types";

class AxiosMarkersService implements MarkersService {
  constructor(private apiUrl: string) {}

  async getMarkers(): Promise<Marker[]> {
    const { data: products } = await axios.get<Marker[]>(
      `${this.apiUrl}/products`,
    );
    return products;
  }

  async getOneMarker(id: string): Promise<Marker> {
    const {
      data: [markers],
    } = await axios.get<Marker[]>(`${this.apiUrl}/products?id=${id}`);

    return markers;
  }

  async getShoppingCartMarkers(): Promise<ShoppingCart[]> {
    const { data: shoppingCart } = await axios.get<ShoppingCart[]>(
      `${this.apiUrl}/shopping-cart`,
    );
    return shoppingCart;
  }

  async AddMarkerToShoppingCart(marker: ShoppingCart): Promise<ShoppingCart> {
    const { data: shoppingCart } = await axios.post<ShoppingCart>(
      `${this.apiUrl}/shopping-cart`,
      { body: marker },
    );
    return shoppingCart;
  }

  async UpdateMarkerFromShoppingCart(
    id: string,
    marker: ShoppingCart,
  ): Promise<ShoppingCart> {
    const { data: shoppingCart } = await axios.put<ShoppingCart>(
      `${this.apiUrl}/shopping-cart/${id}`,
      { body: marker },
    );
    return shoppingCart;
  }

  async DeleteMarkerFromShoppingCart(id: string): Promise<ShoppingCart> {
    const { data: shoppingCart } = await axios.delete<ShoppingCart>(
      `${this.apiUrl}/shopping-cart/${id}`,
    );
    return shoppingCart;
  }
}

export default AxiosMarkersService;
