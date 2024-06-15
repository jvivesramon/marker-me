export interface Stock {
  colors: {
    [color: string]: number;
  };
}

export interface Image {
  small: string;
  big: string;
}

export interface Marker {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  price: string;
  categories: string[];
  stock: Stock;
  image: Image;
  brand: string;
}

export interface Products {
  products: Marker[];
}

export interface MarkersState {
  markersData: Marker[];
  brands: string[];
  categories: string[];
  selectedMarker: Marker;
}
