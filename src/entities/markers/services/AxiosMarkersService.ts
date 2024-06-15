import axios from "axios";
import { Marker } from "../types";
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
}

export default AxiosMarkersService;
