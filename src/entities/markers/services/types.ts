import { Markers } from "../types";

interface MarkersService {
  getMarkers(): Promise<Markers[]>;
}
export default MarkersService;
