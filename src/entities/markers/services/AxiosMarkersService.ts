import axios from "axios";
import { Markers } from "../types";
import MarkersService from "./types";

class AxiosMarkersService implements MarkersService {
  constructor(private apiUrl: string) {}

  async getMarkers(): Promise<Markers[]> {
    const { data: brands } = await axios.get<Markers[]>(
      `${this.apiUrl}/brands`,
    );
    return brands;
  }
}

export default AxiosMarkersService;
