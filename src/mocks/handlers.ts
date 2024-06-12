import { http, HttpResponse } from "msw";
import paths from "../routers/paths/paths";
import {
  emptyMarkersMock,
  markersMock,
} from "../entities/markers/mocks/markersMock";

const apiUrl = import.meta.env.VITE_API_URL;

export const handlers = [
  http.get(`${apiUrl}${paths.markers}`, () => {
    return HttpResponse.json(markersMock, { status: 200 });
  }),
];

export const errorHandlers = [
  http.get(`${apiUrl}${paths.markers}`, () => {
    return HttpResponse.json(emptyMarkersMock, { status: 401 });
  }),
];
