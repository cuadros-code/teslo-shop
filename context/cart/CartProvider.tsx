import { ICartProduct } from 'interfaces/cart'
import React, { useEffect, useReducer } from 'react'
import { CartContext } from './CartContext'
import { cartReducer } from './cartReducer'
import Cookie from 'js-cookie'

export interface CartState {
  isLoaded: boolean
  cart: ICartProduct[]
  numberOfItems: number
  subTotal: number
  tax: number
  total: number
}

const CART_STATE_INITIAL: CartState = {
  cart: Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  isLoaded: false,
}

export const CartProvider = ({children}: {children: React.ReactNode}) => {

  const [state, dispatch] = useReducer(cartReducer, CART_STATE_INITIAL )

  useEffect(() => {
    Cookie.set('cart', JSON.stringify(state.cart))
  }, [state.cart])

  useEffect(() => {
    const numberOfItems = state.cart.reduce( (acc, el) =>  el.quantity + acc , 0)
    const subTotal = state.cart.reduce( (acc, el) =>  (el.price * el.quantity) + acc , 0)
    const taxRate = 0.15

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * ( taxRate + 1 )
    }

    dispatch({
      type: '[CART] - Update order summary',
      payload: orderSummary
    })

  }, [state.cart])

  const addProductToCart = ( itemproduct: ICartProduct) => {
    const existingFilter = state.cart.find( product => product._id === itemproduct._id 
                                                    && product.size === itemproduct.size )
    if(existingFilter){
      const result = state.cart.reduce((acc, item) => {
        if (item._id === itemproduct._id && item.size === itemproduct.size) {
          item.quantity += itemproduct.quantity
        }
        return acc.concat(item as any)
      }, [])

      return dispatch({
        type: '[CART] - Add product to cart',
        payload: [...result]
      })
    }

    dispatch({
      type: '[CART] - Add product to cart',
      payload: [...state.cart, itemproduct]
    })
  }

  const updateCartQuantity = ( product: ICartProduct ) => {
    dispatch({
      type: '[CART] - Change cart quantity',
      payload: product
    })
  }

  const deleteCartProduct = ( product: ICartProduct ) => {
    dispatch({
      type: '[CART] - Delete product from cart',
      payload: product
    })
  }

  return (
    <CartContext.Provider 
      value={{
        ...state,
        addProductToCart,
        updateCartQuantity,
        deleteCartProduct
      }}
    >
      {children}
    </CartContext.Provider>
  )
}