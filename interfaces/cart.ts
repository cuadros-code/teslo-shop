import { ISizes } from "./products";

export interface ICartProduct {
  _id: string;
  images: string;
  price: number;
  size?: ISizes;
  slug: string;
  title: string;
  gender: 'men'|'women'|'kid'|'unisex';
  quantity: number;
}