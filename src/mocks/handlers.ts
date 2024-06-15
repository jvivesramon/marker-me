import { http, HttpResponse } from "msw";
import {
  emptyMarkersMock,
  markersMock,
} from "../entities/markers/mocks/markersMock";

const apiUrl = import.meta.env.VITE_API_URL;

export const handlers = [
  http.get(`${apiUrl}/products`, () => {
    return HttpResponse.json(markersMock, { status: 200 });
  }),
  http.get(`${apiUrl}/products?id=1`, () => {
    return HttpResponse.json(markersMock[0], { status: 200 });
  }),
];

export const errorHandlers = [
  http.get(`${apiUrl}/products`, () => {
    return HttpResponse.json(emptyMarkersMock, { status: 401 });
  }),
  http.get(`${apiUrl}/products?id=1`, () => {
    return HttpResponse.json(emptyMarkersMock, { status: 401 });
  }),
];
