import { Marker } from "../types";

interface MarkersService {
  getMarkers(): Promise<Marker[]>;
  getOneMarker(id: string): Promise<Marker>;
}
export default MarkersService;
