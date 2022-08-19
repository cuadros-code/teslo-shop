import { createContext } from 'react';
import { ICartProduct } from '../../interfaces/cart';

interface CartProps {
  cart              : ICartProduct[],
  numberOfItems     : number;
  subTotal          : number;
  tax               : number;
  total             : number;
  addProductToCart  : (product: ICartProduct) => void
  updateCartQuantity: (product: ICartProduct) => void
  deleteCartProduct : (product: ICartProduct) => void
}

export const CartContext = createContext({} as CartProps);