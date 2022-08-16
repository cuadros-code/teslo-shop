import { ICartProduct } from 'interfaces/cart';
import React, { useReducer } from 'react';
import { CartContext } from './CartContext';
import { cartReducer } from './cartReducer';

export interface CartState {
  cart: ICartProduct[];
}

const CART_STATE_INITIAL: CartState = {
  cart: []
}

export const CartProvider = ({children}: {children: React.ReactNode}) => {

  const [state, dispatch] = useReducer(cartReducer, CART_STATE_INITIAL)

  const addProductToCart = ( itemproduct: ICartProduct) => {

    const existingFilter = state.cart.find( product => product._id === itemproduct._id 
                                                    && product.size === itemproduct.size )
                                                    
    const existingFilterByIndex = state.cart.findIndex( product => product._id === itemproduct._id 
                                                     && product.size === itemproduct.size )
    
    if(existingFilter){
      const addQuantities: ICartProduct = {
        ...existingFilter,
        quantity: existingFilter.quantity + itemproduct.quantity
      }

      const deleteItem = state.cart.filter( ( _, index ) => index !==  existingFilterByIndex)
    
      return dispatch({
        type: '[CART] - Add product to cart',
        payload: [...deleteItem, addQuantities]
      })
    }

    dispatch({
      type: '[CART] - Add product to cart',
      payload: [...state.cart, itemproduct]
    })

  }

  return (
    <CartContext.Provider 
      value={{
        ...state,
        addProductToCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}