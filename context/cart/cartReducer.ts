import { CartState, ShippingAddress } from "./CartProvider";
import { ICartProduct } from '../../interfaces/cart';

type CartType = 
  | { type: '[CART] - Load cart from cookies | storage', payload: ICartProduct[] }
  | { type: '[CART] - Add product to cart', payload: ICartProduct[] }
  | { type: '[CART] - Change cart quantity', payload: ICartProduct }
  | { type: '[CART] - Delete product from cart', payload: ICartProduct }
  | { type: '[CART] - Address from cookies', payload: ShippingAddress }
  | { type: '[CART] - Update Address', payload: ShippingAddress }
  | { 
      type: '[CART] - Update order summary', 
      payload: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
      }
    }


export const cartReducer = ( state: CartState, action: CartType ): CartState => {
  switch (action.type) {
    case '[CART] - Load cart from cookies | storage':
      return {
        ...state,
        cart: [...action.payload]
      }
    case '[CART] - Add product to cart':
      return {
        ...state,
        cart: [...action.payload]
      }
    case '[CART] - Change cart quantity':
      return {
        ...state,
        cart: state.cart.map( product => {
          if( product._id !== action.payload._id ) return product
          if( product.size !== action.payload.size ) return product
          return action.payload
        })
      }
    case '[CART] - Delete product from cart':
      return {
        ...state,
        cart: state.cart.filter( product => 
          (product._id === action.payload._id && product.size === action.payload.size) ? null : product
        )
      }
    case '[CART] - Update order summary':
      return {
        ...state,
        ...action.payload
      }
    case '[CART] - Address from cookies':
    case '[CART] - Update Address':
      return {
        ...state,
         shippingAddress: action.payload
      }
    default:
      return state;
  }
}