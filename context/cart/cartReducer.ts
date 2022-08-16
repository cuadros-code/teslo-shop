import { CartState } from "./CartProvider";
import { ICartProduct } from '../../interfaces/cart';

type CartType = 
  | { type: '[CART] - Load cart from cookies | storage', payload: ICartProduct[] }
  | { type: '[CART] - Add product to cart', payload: ICartProduct[] }

export const cartReducer = ( state: CartState, action: CartType ): CartState => {
  switch (action.type) {
      case '[CART] - Load cart from cookies | storage':
        return {
          ...state,
        }
      case '[CART] - Add product to cart':
        return {
          ...state,
          cart: [...action.payload]
        }
    default:
      return state;
  }
}