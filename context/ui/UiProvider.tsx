import React, { useReducer } from 'react';
import { UiContext } from './UiContext';
import { uiReducer } from './uiReducer';

export interface UiState {
  isMenuOpen: boolean;
}

const UI_STATE_INITIAL: UiState = {
  isMenuOpen: false,
}

export const UiProvider = ({children}: {children: React.ReactNode}) => {

  const [state, dispatch] = useReducer(uiReducer, UI_STATE_INITIAL)

  const toggleMenu = () => {
    dispatch({ type: '[ui] - ToggleMenu' })
  }

  return (
    <UiContext.Provider 
      value={{
        ...state,
        toggleMenu,
      }}
    >
      {children}
    </UiContext.Provider>
  )
}