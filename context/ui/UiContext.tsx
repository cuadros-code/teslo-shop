import { createContext } from 'react';

interface UiProps {
  isMenuOpen: boolean;
}

export const UiContext = createContext({} as UiProps);