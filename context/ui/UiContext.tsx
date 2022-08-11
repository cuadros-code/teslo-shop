import { createContext } from 'react';

interface UiProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export const UiContext = createContext({} as UiProps);