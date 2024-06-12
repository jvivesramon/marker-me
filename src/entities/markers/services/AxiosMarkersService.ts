import axios from "axios";
import { Markers } from "../types";
import paths from "../../../routers/paths/paths";
import MarkersService from "./types";

class AxiosMarkersService implements MarkersService {
  constructor(private apiUrl: string) {}

  async getMarkers(): Promise<Markers[]> {
    const { data: brands } = await axios.get<Markers[]>(
      `${this.apiUrl}${paths.markers}`,
    );
    return brands;
  }
}

export default AxiosMarkersService;
