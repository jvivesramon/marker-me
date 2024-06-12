export interface Stock {
  colors: {
    [color: string]: number;
  };
}

export interface Image {
  small: string;
  big: string;
}

export interface Product {
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

export interface Markers {
  [brandName: string]: Product[];
}

export interface MarkersState {
  markersData: Product[];
  brands: string[];
  categories: string[];
  selectedMarker: Product;
}
