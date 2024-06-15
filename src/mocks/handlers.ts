import { http, HttpResponse } from "msw";
import {
  emptyMarkersMock,
  emptyShoppingCartMock,
  markersMock,
  shoppingCartMarkerMock,
} from "../entities/markers/mocks/markersMock";

const apiUrl = import.meta.env.VITE_API_URL;

export const handlers = [
  http.get(`${apiUrl}/products`, () => {
    return HttpResponse.json(markersMock, { status: 200 });
  }),
  http.get(`${apiUrl}/products`, ({ request }) => {
    const url = new URL(request.url);
    url.searchParams.set("id", shoppingCartMarkerMock[0].id.toString());
    return HttpResponse.json(markersMock[0], { status: 200 });
  }),
  http.get(`${apiUrl}/shopping-cart`, () => {
    return HttpResponse.json(shoppingCartMarkerMock, { status: 200 });
  }),
  http.post(`${apiUrl}/shopping-cart`, () => {
    return HttpResponse.json(shoppingCartMarkerMock[0], { status: 200 });
  }),
  http.put(`${apiUrl}/shopping-cart/1`, ({ request }) => {
    const url = new URL(request.url);
    url.searchParams.set("id", shoppingCartMarkerMock[0].id.toString());
    return HttpResponse.json(shoppingCartMarkerMock[0], { status: 200 });
  }),
  http.delete(`${apiUrl}/shopping-cart/1`, ({ request }) => {
    const url = new URL(request.url);
    url.searchParams.set("id", shoppingCartMarkerMock[0].id.toString());
    return HttpResponse.json(emptyShoppingCartMock, { status: 200 });
  }),
];

export const errorHandlers = [
  http.get(`${apiUrl}/products`, () => {
    return HttpResponse.json(emptyMarkersMock, { status: 401 });
  }),
  http.get(`${apiUrl}/products?id=1`, ({ request }) => {
    const url = new URL(request.url);
    url.searchParams.set("id", shoppingCartMarkerMock[0].id.toString());

    return HttpResponse.json(emptyMarkersMock, { status: 401 });
  }),
  http.get(`${apiUrl}/shopping-cart`, () => {
    return HttpResponse.json(emptyMarkersMock, { status: 401 });
  }),
  http.post(`${apiUrl}/shopping-cart`, () => {
    return HttpResponse.json(emptyShoppingCartMock, { status: 401 });
  }),
  http.put(`${apiUrl}//shopping-cart/1`, ({ request }) => {
    const url = new URL(request.url);
    url.searchParams.set("id", shoppingCartMarkerMock[0].id.toString());

    return HttpResponse.json(emptyShoppingCartMock, { status: 401 });
  }),
  http.delete(`${apiUrl}//shopping-cart/1`, ({ request }) => {
    const url = new URL(request.url);
    url.searchParams.set("id", shoppingCartMarkerMock[0].id.toString());
    return HttpResponse.json(emptyShoppingCartMock, { status: 401 });
  }),
];
