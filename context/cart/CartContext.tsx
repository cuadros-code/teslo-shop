import { createContext } from 'react';
import { ICartProduct } from '../../interfaces/cart';

interface CartProps {
  cart: ICartProduct[]
  addProductToCart: (product: ICartProduct) => void
  updateCartQuantity: (product: ICartProduct) => void
  deleteCartProduct: (product: ICartProduct) => void
}

export const CartContext = createContext({} as CartProps);