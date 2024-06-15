import { Marker, ShoppingCart } from "../types";

export const markersMock: Marker[] = [
  {
    id: 1,
    name: "Bolígrafos BIC",
    shortDescription: "Bolígrafos de escritura suave",
    description:
      "Con su diseño clásico y elegante, los bolígrafos BIC ofrecen una experiencia de escritura suave y sin esfuerzo en cada trazo. La punta de bola de alta calidad garantiza líneas nítidas y precisas en cada palabra, mientras que el cuerpo ergonómico proporciona un agarre cómodo durante horas de escritura.",
    price: "1.20",
    categories: ["escritura y oficina", "punta redonda", "escolares"],
    stock: {
      colors: {
        green: 2,
        red: 12,
        black: 10,
        blue: 43,
      },
    },
    image: {
      small: "https://i.ibb.co/KWhLbz5/boligrafo-bic-cristal.webp",
      big: "https://i.ibb.co/441ggyR/boligrafo-bic-cristal.webp",
    },
    brand: "BIC",
  },

  {
    id: 2,
    name: "Carioca Birello Doble Punta 12ud",
    shortDescription: "Rotuladores de doble punta",
    description:
      "Los rotuladores Carioca Birello cuentan con doble punta, una fina y otra gruesa, ideales para una variedad de aplicaciones artísticas y de escritura. Con colores vibrantes y una calidad duradera, son una excelente opción para artistas y estudiantes por igual.",
    price: "12.99",
    categories: ["dibujo y arte", "punta doble", "escolares"],
    stock: {
      colors: {
        multicolor: 15,
      },
    },
    image: {
      small: "https://i.ibb.co/HnTBzDb/carioca-markers-lavable.webp",
      big: "https://i.ibb.co/Fn7TF0g/carioca-markers-lavable.webp",
    },
    brand: "Carioca",
  },
];

export const emptyMarkersMock: Marker[] = [];

export const categoriesMock: string[] = [
  "escritura y oficina",
  "punta redonda",
  "escolares",
  "dibujo y arte",
  "punta doble",
];

export const shoppingCartMarkerMock: ShoppingCart[] = [
  { ...markersMock[0], total: 1 },
  { ...markersMock[1], total: 2 },
];

export const emptyShoppingCartMock = {};

export const brandsMock: string[] = ["BIC", "Carioca"];
