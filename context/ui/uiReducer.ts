import { UiState } from "./UiProvider";

type UiType = 
  | { type: '[ui] - ToggleMenu' }

export const uiReducer = ( state: UiState, action: UiType ): UiState => {
 switch (action.type) {
   case '[ui] - ToggleMenu':
     return {
       ...state,
        isMenuOpen: !state.isMenuOpen,
     }
   default:
     return state;
 }
}