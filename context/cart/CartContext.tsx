import { createContext } from 'react';
import { ICartProduct } from '../../interfaces/cart';
import { ShippingAddress } from './CartProvider';

interface CartProps {
  cart              : ICartProduct[],
  numberOfItems     : number;
  subTotal          : number;
  tax               : number;
  total             : number;
  shippingAddress  ?: ShippingAddress

  addProductToCart  : (product: ICartProduct) => void
  updateCartQuantity: (product: ICartProduct) => void
  deleteCartProduct : (product: ICartProduct) => void
  updateAddress     : (address: ShippingAddress) => void
}

export const CartContext = createContext({} as CartProps);